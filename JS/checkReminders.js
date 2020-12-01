function getReminders(){
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
    for(let i=3; i>1; i--){
        let e={
            'title': 'dia '+i,
            'initialDate': new Date('December'+i+', 2020 03:24:00'),
            'endDate': null,
            'reminder': 10,
            'description': null,
            'type': null,
        }
        createNewEvent('dia '+i, new Date('December'+i+', 2020 03:24:00'), null, 10, null, null);
    }
}

function f2(){
    for(let i=3; i>0; i--){
        let e={
            'title': 'dia '+i,
            'initialDate': new Date('December'+i+', 2020 03:24:00'),
            'endDate': null,
            'reminder': 10,
            'description': null,
            'type': null,
        }
        deleteEventFromCalendar(e);
    }
}



let checkCheckReminder = function (){
    //check the reminders
    //check the reminder checkbox was selected
    if (reminders[0] !== undefined){
        console.log("There are reminders")
        ///for (let i= 0; i <= reminders.length ;i++){
            // create switch in order to interact for each element given the case
            

            // add the actual time remaining for the event
            let startEventDate = new Date(reminders[0].initialDate);
            console.log(startEventDate);
            console.log(typeof(startEventDate));

            // We convert the date to milliseconds
            let startEventDateMS = startEventDate.getTime();
            console.log(startEventDateMS);
            let actualTime = new Date();
            let actualTimeMS = actualTime.getTime();
            console.log(actualTimeMS);
            let timeRemainingToEvent = (startEventDateMS - actualTimeMS)/(1000*60);
            console.log(timeRemainingToEvent);


            
            // alert made

            let reminderMessageAlert = function(){

                alert(reminders[0].reminder + " minutes before " + reminders[0].title +"\n" + 'You actually have ' + timeRemainingToEvent + ' minutes left'); };
            reminderMessageAlert();
        }
// erase previous reminder 
// alert console
    else {
        console.log("No reminders")
    }
    // check remaining time

}

setInterval(checkCheckReminder(), 10000);



