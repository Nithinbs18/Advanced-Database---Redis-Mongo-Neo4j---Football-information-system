const operations = require('./operations');
var prompt = require('prompt');
var promise = require('promise');

operations.getMatchInfo(4, function(matchInfo){
    console.log(matchInfo);
})
menu(1);

function menu(option){
    if(option == 1){
        console.log("MAIN MENU")
        console.log("1. Live Games")
        // This json object is used to configure what data will be retrieved from command line.
        var prompt_attributes = [
            {
        // The fist input text is assigned to username variable.
            name: 'selection'
            }
        ];

        // Start the prompt to read user input.
        prompt.start();

        // Prompt and get user input then display those data in console.
        prompt.get(prompt_attributes, function (err, result) {
            if (err) {
                console.log(err);
                return 1;
            }else {
                console.log('Command-line received data:');

                // Get user input from result object.
                var selection = result.selection;
                var message = "  selection : " + selection;

                // Display user input in console log.
                console.log(message);
                menu(2);
                return;
            }
        });
    }
    if(option == 2){
        console.log("MATCH MENU")
        console.log("1. See match events")
        console.log("2. See match comments")
        console.log("3. See home team players")
        console.log("4. See away team players")
        console.log("5. Go back to main menu")
        
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
                    operations.getMatchComments(4,function(comments){
                        console.log(comments);
                    })
                }
                if(selection == 3){
                    operations.getTeamPlayers(3,function(players){
                        console.log(players)
                    })
                }
                if(selection == 4){
                    operations.getTeamPlayers(2,function(players){
                        console.log(players)
                    })
                }
                if(selection == 5){
                    menu(1);
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
        console.log("1. See player stats in current match")
        console.log("2. See player events in current match")
        console.log("3. Go back to match menu")

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
                    menu(2);
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