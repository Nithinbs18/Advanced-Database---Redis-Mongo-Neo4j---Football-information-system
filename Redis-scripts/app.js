const operations = require('./operations');
var prompt = require('prompt');

var gameName;

operations.getMatchInfo(4, function(matchInfo){
    console.log(matchInfo);
    gameName = matchInfo.name;
})
menu(1);

function menu(option){
    if(option == 1){
        console.log("MAIN MENU")
        console.log("1. Live Games")

        var prompt_attributes = [
            {
            name: 'selection'
            }
        ];
        prompt.start();
        prompt.get(prompt_attributes, function (err, result) {
            if (err) {
                console.log(err);
                return 1;
            }else {
                console.log('Command-line received data:');
                var selection = result.selection;
                var message = "  selection : " + selection;
                console.log(message);
                if(selection == "exit"){
                    return;
                }
                menu(2);
                return;
            }
        });
    }
    if(option == 2){
        console.log("MATCH MENU")
        console.log(gameName)
        console.log("1. See match events")
        console.log("2. See match stats")
        console.log("3. See home club info")
        console.log("4. See away club info")
        console.log("5. See home team manager")
        console.log("6. See away team manager")
        console.log("7. See home team starting players")
        console.log("8. See away team starting players")
        console.log("9. See home team players in bench")
        console.log("10. See away team players in bench")
        console.log("11. See home team players")
        console.log("12. See away team players")
        console.log("13. See match comments")
        console.log("14. Go to player menu")
        console.log("15. Go back to main menu")
        
        var prompt_attributes = [
            {
            name: 'selection'
            }
        ];
        prompt.start();
        prompt.get(prompt_attributes, function (err, result) {
            if (err) {
                console.log(err);
                return 1;
            }else {
                console.log('Command-line received data:');
                var selection = result.selection;
                var message = "  selection : " + selection;
                console.log(message);
                if(selection == 1){
                    operations.getMatchEvents(4,function(events){
                        console.log(events);
                    })
                }
                if(selection == 2){
                    operations.getMatchStats(4,3,2,function(stats){
                        console.log(stats);
                    })
                }
                if(selection == 3){
                    operations.getTeamInfo(3,function(team){
                        console.log(team)
                    })
                }
                if(selection == 4){
                    operations.getTeamInfo(2,function(team){
                        console.log(team)
                    })
                }
                if(selection == 5){
                    operations.getTeamManager(3,function(manager){
                        console.log(manager)
                    })
                }
                if(selection == 6){
                    operations.getTeamManager(2,function(manager){
                        console.log(manager)
                    })
                }
                if(selection == 7){
                    operations.getTeamStartingPlayers(3,function(players){
                        console.log(players)
                    })
                }
                if(selection == 8){
                    operations.getTeamStartingPlayers(2,function(players){
                        console.log(players)
                    })
                }
                if(selection == 9){
                    operations.getTeamBenchPlayers(3,function(players){
                        console.log(players)
                    })
                }
                if(selection == 10){
                    operations.getTeamBenchPlayers(2,function(players){
                        console.log(players)
                    })
                }
                if(selection == 11){
                    operations.getTeamPlayers(3,function(players){
                        console.log(players)
                    })
                }
                if(selection == 12){
                    operations.getTeamPlayers(2,function(players){
                        console.log(players)
                    })
                }
                if(selection == 13){
                    operations.getMatchComments(4,function(comments){
                        console.log(comments);
                    })
                }
                if(selection == 14){
                    menu(3);
                    return; 
                }
                if(selection == 15){
                    menu(1);
                    return; 
                }
                if(selection == "exit"){
                    return;
                }
                else{
                    menu(2);
                    return
                }
            }
        });
    }
    if(option == 3){
        console.log("PLAYER MENU")
        console.log(gameName)
        console.log("1. See player stats in current match for Alexis Sanchez")
        console.log("2. See player events in current match for Alexis Sanchez")
        console.log("3. See player stats in current match for Marouane Fellaini")
        console.log("4. See player events in current match for Marouane Fellaini")
        console.log("5. See player stats in current match for Xherdan Shaqiri")
        console.log("6. See player events in current match for Xherdan Shaqiri")
        //console.log("5. Get stats for all players in match")
        console.log("7. Go back to match menu")

        var prompt_attributes = [
            {
            name: 'selection'
            }
        ];
        prompt.start();
        prompt.get(prompt_attributes, function (err, result) {
            if (err) {
                console.log(err);
                return 1;
            }else {
                console.log('Command-line received data:');
                var selection = result.selection;
                var message = "  selection : " + selection;
                console.log(message);
                if(selection == 1){
                    operations.getPlayerMatchStats(58,function(stats){
                        console.log(stats);
                    })
                }
                if(selection == 2){
                    operations.getPlayerEvents(58,function(events){
                        console.log(events);
                    })
                }
                if(selection == 3){
                    operations.getPlayerMatchStats(55,function(stats){
                        console.log(stats);
                    })
                }
                if(selection == 4){
                    operations.getPlayerEvents(55,function(events){
                        console.log(events);
                    })
                }
                if(selection == 5){
                    operations.getPlayerMatchStats(8,function(stats){
                        console.log(stats);
                    })
                }
                if(selection == 6){
                    operations.getPlayerEvents(8,function(events){
                        console.log(events);
                    })
                }
                /*if(selection == 5){
                    operations.getStatsForAllPlayers(4, function(stats){
                        console.log(stats);
                    })
                }*/
                if(selection == 7){
                    menu(2);
                    return;
                }
                if(selection == "exit"){
                    return;
                }
                else{
                    menu(3);
                    return;
                }
            }
        });
    }
}