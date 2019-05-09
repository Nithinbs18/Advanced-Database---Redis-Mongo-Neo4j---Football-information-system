var redis = require('redis');
var client = redis.createClient(6379, "127.0.0.1");

client.on('connect', function() {
    //console.log('Redis client connected');
});


client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

function getMatch(matchId, callback){
    client.get('match:' + matchId, function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        else{
            callback(rows);
        }
    })
}

function getTeamPlayers(teamId, callback){
    var array = [];
    var j = 1;
    client.smembers('players_cl' + teamId, function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        else{
            for(var i in rows){
                array[i] = "player:" + rows[i];
                //console.log(array[i] + "    "  + rows[i]);
                if(Object.keys(rows).length == j++){
                    client.mget(array,function(error,result){
                        if(error){
                            console.log(err);
                            return;
                        }
                        else{
                            callback(result);
                        }
                    })
                }
            }
        }
    })
}

function getPlayerInfo(playerId, callback){
    client.get('player:' + playerId, function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        else{
            callback(rows);
        }
    })
}

function getTeamInfo(teamId, callback){
    client.get('team:' + teamId, function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        else{
            callback(rows);
        }
    })
}

function getComment(commentId, callback){
    client.get('comment:' + commentId, function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        else{
            callback(rows);
        }
    })
}

function getMatchComments(matchId, callback){
    var array = [];
    var j = 1;
    client.smembers('comments_mat' + matchId, function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        else{
            for(var i in rows){
                array[i] = "comment:" + rows[i];
                //console.log(array[i] + "    "  + rows[i]);
                if(Object.keys(rows).length == j++){
                    client.mget(array,function(error,result){
                        if(error){
                            console.log(err);
                            return;
                        }
                        else{
                            callback(result);
                        }
                    })
                }
            }
        }
    })
}

function getEvent(eventId, callback){
    client.get('event:' + eventId, function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        else{
            callback(rows);
        }
    })
}

function getMatchEvents(matchId, callback){
    var array = [];
    var j = 1;
    client.smembers('events_mat' + matchId, function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        else{
            for(var i in rows){
                array[i] = "event:" + rows[i];
                //console.log(array[i] + "    "  + rows[i]);
                if(Object.keys(rows).length == j++){
                    client.mget(array,function(error,result){
                        if(error){
                            console.log(err);
                            return;
                        }
                        else{
                            callback(result);
                        }
                    })
                }
            }
        }
    })
}

function getPlayerEvents(playerId, callback){
    var array = [];
    var j = 1;
    client.smembers('events_pl' + playerId, function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        else{
            //console.log("Player event keys = " + rows);
            for(var i in rows){
                array[i] = "event:" + rows[i];
                //console.log(array[i] + "    "  + rows[i]);
                if(Object.keys(rows).length == j++){
                    client.mget(array,function(error,result){
                        if(error){
                            console.log(err);
                            return;
                        }
                        else{
                            callback(result);
                        }
                    })
                }
            }
        }
    })
}

function getTeamManager(managerId, callback){
    client.get('manager:' + managerId, function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        else{
            callback(rows);
        }
    })
}

function getTeamStartingPlayers(teamId, callback){
    var array = [];
    var j = 1;
    client.smembers('starting_players_cl' + teamId, function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        else{
            for(var i in rows){
                array[i] = "player:" + rows[i];
                //console.log(array[i] + "    "  + rows[i]);
                if(Object.keys(rows).length == j++){
                    client.mget(array,function(error,result){
                        if(error){
                            console.log(err);
                            return;
                        }
                        else{
                            callback(result);
                        }
                    })
                }
            }
        }
    })
}

function getTeamBenchPlayers(teamId, callback){
    var array = [];
    var j = 1;
    client.smembers('bench_players_cl' + teamId, function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        else{
            for(var i in rows){
                array[i] = "player:" + rows[i];
                //console.log(array[i] + "    "  + rows[i]);
                if(Object.keys(rows).length == j++){
                    client.mget(array,function(error,result){
                        if(error){
                            console.log(err);
                            return;
                        }
                        else{
                            callback(result);
                        }
                    })
                }
            }
        }
    })
}

module.exports = {getMatch, getTeamPlayers, getPlayerInfo, getTeamInfo, getComment,getEvent,getMatchComments,getMatchEvents,getPlayerEvents, getTeamManager, getTeamStartingPlayers, getTeamBenchPlayers};