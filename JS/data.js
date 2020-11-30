let calendar={};

function createMonth(days){
    var month=[];
    for(let i=0; i<days; i++){
        month.push([]);
    }
    return  month;
}
function createYear(year){
    const days=[31,year%4==0?29:28,31,30,31,30,31,31,30,31,30,31];
    var y=[];
    days.forEach(numberDays => {
        y.push(createMonth(numberDays));
    });
    return y;
}
function createCalendar(firstYear, numberOfYears){
    let cal={};
    for(let year=firstYear; year<(firstYear+numberOfYears); year++){
        cal[year]=createYear(year);
    }
    return cal;
}
function getCalendar(){
    calendarJson='';
    if(localStorage.getItem('calendar')){
        calendarJson=localStorage.getItem('calendar');
        calendar=JSON.parse(calendarJson);
    }
    else{
        calendar=createCalendar(2020,2);
        calendarJson=JSON.stringify(calendar);
        localStorage.setItem('calendar', calendarJson);
    }
}

function saveCalendar(){
    calendarJson=JSON.stringify(calendar);
    localStorage.setItem('calendar', calendarJson);
}

function createNewEvent(title, initialDate, finalDate, reminder, description, type ){
    let event={
        'title': title,
        'initialDate': initialDate,
        'endDate': finalDate,
        'reminder': reminder,
        'description': description,
        'type': type,
    }
    if(finalDate){
        let isSameDay= initialDate.getFullYear()==finalDate.getFullYear() && initialDate.getMonth()== finalDate.getMonth() && initialDate.getDate() == finalDate.getDate();
        if(isSameDay){
            setEvent(event, initialDate);
        }else{
            let daysDiference= Math.floor(finalDate.getTime()/(1000*60*60*24))-Math.floor(initialDate.getTime()/(1000*60*60*24));
            for(let i=0; i<=daysDiference; i++){
                let d=new Date(initialDate.getTime());
                d.setDate(d.getDate()+i);
                setEvent(event, d);
            }
        }
    }else{
        setEvent(event, initialDate);
    }
}

function setEvent(eventObject, day){
    console.log(day);
        calendar[day.getFullYear()][day.getMonth()][day.getDate()].push(eventObject);
        saveCalendar();
}

function p1(){
    var initialDate = new Date(2020, 10, 17, 3, 24, 0);
    var finalDate=new Date(2020, 10, 18, 3, 24, 0);
    createNewEvent('Dentist', initialDate, finalDate, null, null, null );
}
