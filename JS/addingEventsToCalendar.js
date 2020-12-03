let selectedMonth = calendar[n2][n1];
displayCalendar();

function displayCalendar(){
    selectedMonth = calendar[n2][n1];
    selectedMonth.forEach(eventToDisplay);
}

function eventToDisplay (item){
    let eventDayPlus1 = selectedMonth.indexOf(item) + 1;
    let chosenIdOnCalendar = "day"+eventDayPlus1;
    let selectSpotOnCalendar = document.getElementById(chosenIdOnCalendar);
    selectSpotOnCalendar.innerHTML='';

    item.forEach(eventToAdd);
        function eventToAdd (x){
            if (x){
                let eventTitle = x.title;
                let btnNode = document.createElement("button"); // create a button
                btnNode.classList.add("btnCalendarEvent");
                btnNode.classList.add("clickable"); // add the class to the button
                if(x.reminder && new Date(x.initialDate)<new Date()){
                    btnNode.setAttribute('style', 'background-color: var(--mainBackgroundColor);color: var(--mainFontColor);border: 1px solid var(--mainFontColor);')
                }
                btnNode.innerHTML = eventTitle; //  add the text inside the button
                btnNode.id = eventTitle;
                // day * 100 + array position
                let eventDay = selectedMonth.indexOf(item);
                let eventDayToId = eventDay * 100;
                let eventPosition = item.indexOf(x);
                let eventId = eventDayToId + eventPosition;
                btnNode.value = eventId;
                // append button to Calendar
                // define parent event to append 
                selectSpotOnCalendar.appendChild(btnNode);
            };

    }
    
}
//buttonAdd.addEventListener('click', eventToDisplay());
//mainCalendar.appendChild()