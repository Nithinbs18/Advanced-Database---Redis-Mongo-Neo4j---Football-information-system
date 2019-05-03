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
    client.smembers('comments_mat' + matchId, function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        else{
            callback(rows);
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
    client.smembers('events_mat' + matchId, function(err,rows){
        if(err){
            console.log(err);
            return;
        }
        else{
            callback(rows);
        }
    })
}

module.exports = {getMatch, getTeamPlayers, getPlayerInfo, getTeamInfo, getComment,getEvent,getMatchComments,getMatchEvents};