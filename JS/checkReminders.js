/*function getReminders(){
    remindersJson='';
    if(localStorage.getItem('reminders')){
        remindersJson=localStorage.getItem('reminders');
        reminders=JSON.parse(remindersJson);
    }
    else{
        reminders=[];
        remindersJson=JSON.stringify(reminders);
        localStorage.setItem('reminders', remindersJson);
    }
}

function saveReminders(){
    remindersJson=JSON.stringify(reminders);
    localStorage.setItem('reminders', remindersJson);
}

function addReminder(element){
    reminders.push(element);
    reminders.sort((a,b)=>a.initialDate.getTime()-b.initialDate.getTime());
    saveReminders();
}

function deleteReminder(reminder){
    console.log(reminder);
    const index=reminders.indexOf(reminder);
    reminders.splice(index, 1);
}

function f1(){
    for(let i=3; i>0; i--){
        let e={
            'title': 'dia '+i,
            'initialDate': new Date('December'+i+', 2020 16:00:00'),
            'endDate': null,
            'reminder': 5,
            'description': null,
            'type': null,
        }
        createNewEvent('dia '+i, new Date('December'+i+', 2020 16:00:00'), null, 10, null, null);
    }
}

function f2(){
    for(let i=3; i>0; i--){
        let e={
            'title': 'dia '+i,
            'initialDate': new Date('December'+i+', 2020 16:00:00'),
            'endDate': null,
            'reminder': 5,
            'description': null,
            'type': null,
        }
        deleteEventFromCalendar(e);
    }
}
*/
// add the actual time remaining for the event
let startEventDate = new Date(reminders[0].initialDate);

// We convert the date to milliseconds
let startEventDateMS = startEventDate.getTime();
let actualTime = new Date();
let actualTimeMS = actualTime.getTime();
let timeRemainingToEvent = (startEventDateMS - actualTimeMS)/(1000*60);
// Time remaining to the reminder.
let timeRemainingToReminder = timeRemainingToEvent - reminders[0].reminder;
let x = timeRemainingToReminder;
let y = timeRemainingToEvent;

let checkCheckReminder = function (){
    //check the reminders
    //check the reminder checkbox was selected
    if (reminders[0] !== undefined){
        console.log("There are reminders")
            // create switch in order to interact for each element given the case
            console.log(timeRemainingToEvent);
            console.log(timeRemainingToReminder);
            if (x < 0 ){
                if (y > 0){
                    alert(reminders[0].reminder + " minutes left to " + reminders[0].title);
                    deleteReminder(reminders[0]);
                } else if (y < 0) {
                    y = y * -1;
                    y = y.toFixed();
                    alert("You missed this event by " + y + " minutes");
                    deleteReminder(reminders[0]);
                }
            } else {}
                //alert(reminders[0].reminder + " minutes before " + reminders[0].title +"\n\n" + 'You actually have ' + timeRemainingToEvent + ' minutes left' +"\n\n" + 'You will be reminded for this event in ' + timeRemainingToReminder+' minutes');
        // erase previous reminder
        // alert console
    } else {
        console.log("No reminders")
    }
    // check remaining time
}
setInterval(checkCheckReminder(), 10000);



