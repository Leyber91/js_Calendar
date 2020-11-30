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
let monthDuration = getDaysInMonth(n1, n2); // CAREFULLY MODIFY FOR THE CURRENT MONTH


let createCalendar = function(){
for (let i=1; i <= monthDuration; i++ ){
    let divNode = document.createElement("div"); // create de DIV
    divNode.classList.add("divCalendarItem")
    divNode.innerHTML = "Day" + i;

    mainCalendar.appendChild(divNode);
    console.log(i);
    
}
}
createCalendar();