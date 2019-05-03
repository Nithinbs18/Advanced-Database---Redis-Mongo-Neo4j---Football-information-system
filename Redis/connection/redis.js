var redis = require('redis');
var client = redis.createClient(6379, "192.168.0.38");

client.on('connect', function() {
    console.log('Redis client connected');
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
    client.smembers('players_cl' + teamId, function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        else{
            callback(rows);
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

module.exports = {getMatch, getTeamPlayers, getPlayerInfo};