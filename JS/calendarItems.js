let mainCalendar = document.getElementById("mainCalendarFlexBox");

// adding the class to receive the style
// We define the actual months and the actual year.
let todayIs = new Date();
let d = new Date(); /// this is the key variable to modify each month
/// set the month with the set month function
/// IMPORTANT: Set month

let n1 = d.getMonth();
//n1 = n1 - 10;
let n2 = d.getFullYear();

let getDaysInMonth = function (month, year) {
  return new Date(year, month, 0).getDate();
};
let monthDuration = getDaysInMonth(n1 + 1, n2); // CAREFULLY MODIFY FOR THE CURRENT MONTH

//FUNCTION TO CREATE THE CALENDAR STRUCTURE
let generateCalendar = function () {
  monthDuration = getDaysInMonth(n1 + 1, n2);
  mainCalendar.innerHTML = "";
  for (let i = 1; i <= monthDuration; i++) {
    let divNode = document.createElement("div"); // create de DIV
    divNode.classList.add("divCalendarItem");
    let numberContainer = document.createElement("div");
    let eventContainer = document.createElement("div");
    let addevent = document.createElement("button");
    let number = document.createElement("div");
    addevent.value = n2 * 10000 + (n1 + 1) * 100 + i;
    addevent.classList.add("addButton");
    addevent.classList.add("clickable");
    addevent.innerHTML = "+";
    // An id must be added to each element
    eventContainer.id = "day" + i;
    number.innerHTML = i;
    numberContainer.appendChild(number);
    numberContainer.appendChild(addevent);
    divNode.appendChild(numberContainer);

    divNode.appendChild(eventContainer);

    //is today?
    if (
      n1 == todayIs.getMonth() &&
      n2 == todayIs.getFullYear() &&
      todayIs.getDate() == i
    ) {
      divNode.classList.add("today");
    }
    mainCalendar.appendChild(divNode);

    // define where to take the title

    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let dateMonthYear = month[n1] + " " + n2;
    document.getElementById("curentMonthplusYear").innerHTML = dateMonthYear;
    //Add here to add a class to each month.
  }
};
generateCalendar();

//let d = new Date();
//let n1 = d.getMonth();
//let n2 = d.getFullYear();
let startOfMonth = function (date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

let startingWeekDay = startOfMonth(d);
let d1 = startingWeekDay.getDay();
// prepend function in order to add empty cells before the beginning of a month
let addingEmptyDivsBefore = function () {
  if (d1 === 0) {
    for (let i = 6; i > 0; i--) {
      let divNode = document.createElement("div"); // create de DIV
      divNode.classList.add("divCalendarItem");
      divNode.classList.add("divCalendarEmptyItem");
      // we generate an empty object
      mainCalendar.prepend(divNode); // append at beginning
    }
  } else {
    for (let i = d1 - 1; i > 0; i--) {
      let divNode = document.createElement("div"); // create de DIV
      divNode.classList.add("divCalendarItem");
      divNode.classList.add("divCalendarEmptyItem");
      // we generate empty object
      mainCalendar.prepend(divNode); // append at beginning
    }
  }
};
// we execute the function
addingEmptyDivsBefore();

//for this function we substracted the remanent to the total numbers of divs on a row.
let parentCalendarChildren = document.getElementById("mainCalendarFlexBox")
  .childElementCount;
// we use this one to get the number of elements
let addingEmptyDivAfter = function () {
  let numOfDivToAdd = 7 - (parentCalendarChildren % 7);
  if (parentCalendarChildren % 7 == 0) {
    numOfDivToAdd = 0;
  }
  let z = numOfDivToAdd;

  while (z > 0) {
    let divNode = document.createElement("div"); // create de DIV
    divNode.classList.add("divCalendarItem");
    divNode.classList.add("divCalendarEmptyItem");
    // we generate empty object
    mainCalendar.append(divNode); // append at beginning
    z--;
  }
};
addingEmptyDivAfter();

// define where to take the title

let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let dateMonthYear = month[n1] + " " + n2;

document.getElementById("curentMonthplusYear").innerHTML = dateMonthYear;
