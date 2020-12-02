let mainCalendar = document.getElementById("mainCalendarFlexBox");

 // adding the class to receive the style
// We define the actual months and the actual year.
let d = new Date();
let n1 = d.getMonth();
let n2 = d.getFullYear();
let getDaysInMonth = function(month,year) {
    return new Date(year, month, 0).getDate();
}
let monthDuration = getDaysInMonth(n1+1, n2); // CAREFULLY MODIFY FOR THE CURRENT MONTH

//FUNCTION TO CREATE THE CALENDAR STRUCTURE
let generateCalendar = function(){
for (let i=1; i <= monthDuration; i++ ){
    let divNode = document.createElement("div"); // create de DIV
    divNode.classList.add("divCalendarItem")
    // An id must be added to each element
    divNode.id = "Day"+ i;
    divNode.innerHTML = i;
    mainCalendar.appendChild(divNode);
    //Add here to add a class to each month.
    console.log(i);
}}
generateCalendar();

// TO REPLACE VARIABLE d for the element 
document.getElementById("currentDay").innerHTML=d;

//let d = new Date();
//let n1 = d.getMonth();
//let n2 = d.getFullYear();
let startOfMonth = function(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
    }

let startingWeekDay = startOfMonth(d);
let d1 = startingWeekDay.getDay();
console.log(d1);
// prepend function in order to add empty cells before the beginning of a month
let addingEmptyDivsBefore = function(){
    if (d1 === 0){
        for (let i = 6; i > 0; i-- ){
            let divNode = document.createElement("div"); // create de DIV
            divNode.classList.add("divCalendarItem")
            // we generate an empty object
            mainCalendar.prepend(divNode); // append at beginning
            console.log(i);
        }} else {
            for (let i = d1-1 ; i > 0 ; i--){
                let divNode = document.createElement("div"); // create de DIV
                divNode.classList.add("divCalendarItem")
                divNode.classList.add("divCalendarEmptyItem")
                // we generate empty object
                mainCalendar.prepend(divNode); // append at beginning
            }
        }
}
// we execute the function
addingEmptyDivsBefore();

//for this function we substracted the remanent to the total numbers of divs on a row.
let parentCalendarChildren = document.getElementById("mainCalendarFlexBox").childElementCount;
console.log(parentCalendarChildren) // we use this one to get the number of elements
let addingEmptyDivAfter = function(){
    let numOfDivToAdd = 7 - (parentCalendarChildren%7);
    console.log(numOfDivToAdd);
    let z = numOfDivToAdd;

    while (z > 0) {
        let divNode = document.createElement("div"); // create de DIV
        divNode.classList.add("divCalendarItem")
        divNode.classList.add("divCalendarEmptyItem")
        // we generate empty object
        mainCalendar.append(divNode); // append at beginning
        z--;
      }
}
addingEmptyDivAfter();


