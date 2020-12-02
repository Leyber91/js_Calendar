setInterval(checkCheckReminder, 10000);

function checkCheckReminder(){
    if (reminders[0]){
        let startEventDate = new Date(reminders[0].initialDate);
        let startEventDateMS = startEventDate.getTime();
        let actualTime = new Date();
        let actualTimeMS = actualTime.getTime();
        let timeRemainingToEvent = (startEventDateMS - actualTimeMS)/(1000*60);
        let timeRemainingToReminder = timeRemainingToEvent - reminders[0].reminder;
        let x = timeRemainingToReminder;
        let y = timeRemainingToEvent;
            // create switch in order to interact for each element given the case
            if (x < 0 ){
                if (y > 0){
                    showMessage(reminders[0].reminder + " minutes left to " + reminders[0].title);
                    deleteReminder(reminders[0]);
                    checkCheckReminder();
                } else if (y < 0) {
                    
                    let messageTotal='<h2>You missed this events:</h2>';
                    do{
                        let time = timeRemainingToEvent * -1;
                        time = time.toFixed();
                        messageTotal+="<p>"+reminders[0].title+' by '+time+'min. </p>'
                        deleteReminder(reminders[0]);
                        if(reminders[0]){
                            startEventDate = new Date(reminders[0].initialDate);
                            startEventDateMS = startEventDate.getTime();
                            timeRemainingToEvent = (startEventDateMS - actualTimeMS)/(1000*60);
                            timeRemainingToReminder = timeRemainingToEvent - reminders[0].reminder; 
                        }
                        
                    }while(reminders[0]&&timeRemainingToEvent<0 && timeRemainingToReminder<0)
                    showMessage(messageTotal);
                    
                }
            }
                //alert(reminders[0].reminder + " minutes before " + reminders[0].title +"\n\n" + 'You actually have ' + timeRemainingToEvent + ' minutes left' +"\n\n" + 'You will be reminded for this event in ' + timeRemainingToReminder+' minutes');
        // erase previous reminder
        // alert console
    } 
    // check remaining time
};




