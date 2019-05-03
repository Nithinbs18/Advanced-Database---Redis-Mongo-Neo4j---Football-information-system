const redis = require('./connection/redis');

redis.getMatch(4,function(match){
    var jsonMatch = JSON.parse(match);
    console.log(jsonMatch)
    console.log(Object.keys(jsonMatch))
});

redis.getTeamPlayers(2,function(players){
    //console.log(players);
    for(var i in players){
        redis.getPlayerInfo(players[i], function(playerInfo){
            var jsonPlayerInfo = JSON.parse(playerInfo);
            //console.log(Object.keys(jsonPlayerInfo));
            console.log(jsonPlayerInfo);
        })
    }
});

redis.getTeamInfo(2,function(team){
    var jsonTeam = JSON.parse(team);
    console.log(jsonTeam)
    console.log(Object.keys(jsonTeam))
});
