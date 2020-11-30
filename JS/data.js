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
    var year=[];
    days.forEach(numberDays => {
        year.push(createMonth(numberDays));
    });
    return year;
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