let mainCalendar = document.getElementById("mainCalendarFlexBox"); // select the element with the id

 // adding the class to receive the style
//let numNode = document.createTextNode("Day#"); // the text inside the div

//let dayItem = divNode.appendChild(numNode); // append the content of text to the individual div
// We define the actual months and the actual year.
let d = new Date();
let n1 = d.getMonth();
let n2 = d.getFullYear();
let getDaysInMonth = function(month,year) {
    return new Date(year, month, 0).getDate();
}
let monthDuration = getDaysInMonth(n1+1, n2); // CAREFULLY MODIFY FOR THE CURRENT MONTH

//FUNCTION TO CREATE THE CALENDAR STRUCTURE 
let createCalendar = function(){
for (let i=1; i <= monthDuration; i++ ){
    let divNode = document.createElement("div"); // create de DIV
    divNode.classList.add("divCalendarItem")
    divNode.innerHTML = i;
    mainCalendar.appendChild(divNode);
    console.log(i);

}
}
createCalendar();
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
let addingEmptyDivs = function(){
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
                // we generate empty object
                mainCalendar.prepend(divNode); // append at beginning
            }
        }
}
// we execute the function
addingEmptyDivs();

