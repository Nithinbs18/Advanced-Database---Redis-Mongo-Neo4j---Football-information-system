const redis = require('./connection/redis');

redis.getMatch(4,function(match){
    var jsonMatch = JSON.parse(match);
    console.log(jsonMatch)
    console.log(Object.keys(jsonMatch))
});

/*redis.getTeamPlayers(2,function(players){
    //console.log(players);
    for(var i in players){
        redis.getPlayerInfo(players[i], function(playerInfo){
            var jsonPlayerInfo = JSON.parse(playerInfo);
            //console.log(Object.keys(jsonPlayerInfo));
            //console.log(jsonPlayerInfo);
            console.log(jsonPlayerInfo.name);
        })
    }
});
*/
redis.getTeamInfo(2,function(team){
    var jsonTeam = JSON.parse(team);
    console.log(jsonTeam)
    console.log(Object.keys(jsonTeam))
});

redis.getMatchComments(4,function(matchComments){
    for(var i in matchComments){
        redis.getComment(matchComments[i], function(comment){
            var jsonComment = JSON.parse(comment);
            //console.log(Object.keys(jsonComment));
            console.log(jsonComment);
        })
    }
});

redis.getMatchEvents(4,function(matchEvents){
    for(var i in matchEvents){
        redis.getEvent(matchEvents[i], function(event){
            var jsonEvent = JSON.parse(event);
            //console.log(Object.keys(jsonEvent));
            console.log(jsonEvent);
        })
    }
});