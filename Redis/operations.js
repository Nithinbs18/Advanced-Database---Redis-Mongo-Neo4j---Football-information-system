const redis = require('./connection/redis');

function getMatchInfo(matchId, callback){
    redis.getMatch(matchId,function(match){
        var jsonMatch = JSON.parse(match);
        callback(jsonMatch)
    });
}

function getTeamPlayers(teamId, callback){
    var array = [];
    var j = 1;
    redis.getTeamPlayers(teamId,function(players){
        for(var i in players){
            array[i] = JSON.parse(players[i]);
            if(Object.keys(players).length == j++){
                //console.log(array);
                callback(array);
            }
        }
    });
}

function getTeamInfo(teamId, callback){
    redis.getTeamInfo(teamId, function(team){
        var jsonTeam = JSON.parse(team);
        callback(jsonTeam)
    });
}

function getMatchComments(matchId, callback){
    var array = [];
    var j = 1;
    redis.getMatchComments(matchId,function(comments){
        for(var i in comments){
            array[i] = JSON.parse(comments[i]);
            if(Object.keys(comments).length == j++){
                //console.log(array);
                callback(array);
            }
        }
    });
}

function getMatchEvents(matchId, callback){
    var array = [];
    var j = 1;
    redis.getMatchEvents(matchId,function(events){
        for(var i in events){
            array[i] = JSON.parse(events[i]);
            if(Object.keys(events).length == j++){
                //console.log(array);
                callback(array);
            }
        }
    });
}

function getPlayerEvents(playerId, callback){
    //console.log("Getting Player Events");
    redis.getPlayerEvents(playerId,function(playerEvents){
        array = [];
        var j = 1;
        //console.log("player events are: " + playerEvents);
        if(Object.keys(playerEvents).length==0){
            callback(array);
        }
        else{
            for(var i in playerEvents){
                    var jsonEvent = JSON.parse(playerEvents[i]);
                    array.push(jsonEvent);
                    //console.log("JsonEvent = " + jsonEvent);
                    if(Object.keys(playerEvents).length == j++){
                        //console.log(array);
                        callback(array);
                    }
            }
        }
    });
}

function getMatchStats(matchId, t1, t2, callback){
    team1 = {"id":"cl" + t1, "goals":0, "assists":0, "fouls":0, "cards_yellow":0, "cards_red":0, "corner":0, "total_shots":0, "shots_on_target":0, "total_passes":0, "passes_completed":0};
    team2 = {"id":"cl" + t2, "goals":0, "assists":0, "fouls":0, "cards_yellow":0, "cards_red":0, "corner":0, "total_shots":0, "shots_on_target":0, "total_passes":0, "passes_completed":0};
    redis.getMatchEvents(matchId,function(matchEvents){
        var j = 1;
        array = [];
        if(Object.keys(matchEvents).length==0){
            callback(array);
        }
        else{
            for(var i in matchEvents){
                    var jsonEvent = JSON.parse(matchEvents[i]);
                    if(jsonEvent.eventType=="goal"){
                        if(jsonEvent.team == team1.id){
                            team1.goals++;
                            if(jsonEvent.hasOwnProperty("assist")){
                                team1.assists++;
                            }
                        } else{
                            team2.goals++;
                            if(jsonEvent.hasOwnProperty("assist")){
                                team2.assists++;
                            }
                        }
                    }
                    if(jsonEvent.eventType=="foul"){
                        if(jsonEvent.team == team1.id){
                            team1.fouls++;
                        } else{
                            team2.fouls++;
                        }
                    }
                    if(jsonEvent.eventType=="yellow card"){
                        if(jsonEvent.team == team1.id){
                            team1.cards_yellow++;
                        } else{
                            team2.cards_yellow++;
                        }
                    }
                    if(jsonEvent.eventType=="red card"){
                        if(jsonEvent.team == team1.id){
                            team1.cards_red++;
                        } else{
                            team2.cards_red++;
                        }
                    }
                    if(jsonEvent.eventType=="corner"){
                        if(jsonEvent.team == team1.id){
                            team1.corner++;
                        } else{
                            team2.corner++;
                        }
                    }
                    if(jsonEvent.eventType=="shot"){
                        if(jsonEvent.team == team1.id){
                            team1.total_shots++;
                            if(jsonEvent.shotType=="on target"){
                                team1.shots_on_target++;
                            }
                        } else{
                            team2.total_shots++;
                            if(jsonEvent.shotType=="on target"){
                                team2.shots_on_target++;
                            }
                        }
                    }
                    if(jsonEvent.eventType=="pass"){
                        if(jsonEvent.team == team1.id){
                            team1.total_passes++;
                            if(jsonEvent.passResult=="successful"){
                                team1.passes_completed++;
                            }
                        } else{
                            team2.total_passes++;
                            if(jsonEvent.passResult=="successful"){
                                team2.passes_completed++;
                            }
                        }
                    }
                    //console.log(jsonEvent);
                    if(Object.keys(matchEvents).length == j++){
                        //console.log(array);
                        array.push(team1);
                        array.push(team2);
                        callback(array);
                    }
            }
        }
    });   
}

function getPlayerMatchStats(playerId, callback){
    playerStats = {"id":"PL"+playerId, "minutes_played":0, "goals":0, "assists":0, "fouls":0, "penalties_conceded":0, "penalties_taken":0, "cards_yellow":0, "cards_red":0, "total_shots":0, "shots_on_target":0, "total_passes":0, "passes_completed":0};
    redis.getPlayerEvents(playerId,function(playerEvents){
        var j = 1;
        console.log("playerEvents lenght = " + Object.keys(playerEvents).length)
        if(Object.keys(playerEvents).length==0){
            callback(playerStats);
        }
        else{
            playerStats.minutes_played = 90;
            for(var i in playerEvents){
                    var jsonEvent = JSON.parse(playerEvents[i]);
                    if(jsonEvent.eventType=="goal"){
                        if(jsonEvent.hasOwnProperty("assist")){
                            if(jsonEvent.assist==playerStats.id){
                                playerStats.assists++;
                            }else{
                                playerStats.goals++;
                            }
                        }else{
                            playerStats.goals++;
                        }
                    }
                    if(jsonEvent.eventType=="foul"){
                        playerStats.fouls++;
                    }
                    if(jsonEvent.eventType=="yellow card"){
                        playerStats.cards_yellow++;
                    }
                    if(jsonEvent.eventType=="red card"){
                        playerStats.cards_red++;
                    }
                    if(jsonEvent.eventType=="shot"){
                        playerStats.total_shots++;
                        if(jsonEvent.shotType=="on target"){
                            playerStats.shots_on_target++;
                        }
                    }
                    if(jsonEvent.eventType=="pass"){
                        playerStats.total_passes++;
                        if(jsonEvent.passResult=="successful"){
                            playerStats.passes_completed++;
                        }
                    }
                    if(jsonEvent.eventType=="substitution"){
                        var array = jsonEvent.gameTime.split(":");
                        var minutes = array[0];
                        var array2 = jsonEvent.gameTime.split(" ");
                        var half = array2[1];
                        console.log(minutes);
                        console.log(half);
                        console.log(jsonEvent.playerIn + "    "  + jsonEvent.playerOut);
                        if(jsonEvent.playerIn==playerStats.id){
                            if(half=="SH"){
                                playerStats.minutes_played = 45 - parseInt(minutes);
                            } else {
                                playerStats.minutes_played = 90 - parseInt(minutes);
                            }
                        }else{
                            if(half=="SH"){
                                playerStats.minutes_played = 45 + parseInt(minutes);
                            } else {
                                playerStats.minutes_played = parseInt(minutes);
                            }
                        }
                    }
                    if(Object.keys(playerEvents).length == j++){
                        callback(playerStats);
                    }
                
            }
        }
    });
    callback(playerStats);
}

function getTeamManager(managerId, callback){
    redis.getTeamManager(managerId, function(manager){
        var jsonManager = JSON.parse(manager);
        callback(jsonManager)
    });
}

function getTeamStartingPlayers(teamId, callback){
    var array = [];
    var j = 1;
    redis.getTeamStartingPlayers(teamId,function(players){
        for(var i in players){
            array[i] = JSON.parse(players[i]);
            if(Object.keys(players).length == j++){
                //console.log(array);
                callback(array);
            }
        }
    });
}

function getTeamBenchPlayers(teamId, callback){
    var array = [];
    var j = 1;
    redis.getTeamBenchPlayers(teamId,function(players){
        for(var i in players){
            array[i] = JSON.parse(players[i]);
            if(Object.keys(players).length == j++){
                //console.log(array);
                callback(array);
            }
        }
    });
}

function getStatsForAllPlayers(matchId, callback){
    var array = [];
    var j = 1;
    var i = 0;
    players = [74, 58, 55, 70, 73, 64, 8, 20, 22, 16, 18];
    numberOfPlayers = players.length;
    console.log("number of players = " + numberOfPlayers);
    while(i < 11){
        getPlayerMatchStats(players[i], function(stats){
            console.log("i = " + i + " ----- player = " + players[i]);
            console.log(stats);
            array.push = stats;
            i++;
            if(numberOfPlayers = j++){
                callback(array);
            }
        })
    }
}

module.exports = {getMatchInfo, getTeamPlayers, getTeamInfo, getMatchComments, getMatchEvents, getPlayerEvents, getMatchStats, getPlayerMatchStats, getTeamManager, getTeamStartingPlayers, getTeamBenchPlayers, getStatsForAllPlayers}