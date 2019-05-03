const redis = require('./connection/redis');

redis.getMatch(4,function(match){
    console.log(match)
});

redis.getTeamPlayers(2,function(players){
    //console.log(players);
    for(var i in players){
        redis.getPlayerInfo(players[i], function(playerInfo){
            console.log(playerInfo);
        })
    }
});