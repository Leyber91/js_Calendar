
//let btnBefore = document.getElementById("buttonMonthBefore");
//btnAfter.addEventListener("click", addNextMonth);
//btnBefore.addEventListener("click",addMonthBefore);

let addNextMonth = function () {
  let canChange = true;
  // this function will display the month After
  // get the current date that we have
  // get the current date we are
  // change the one we have
  // INFO: n2 get the year and n1 get the month

  let currentMonth = d.getMonth();
  let currentYear = d.getFullYear();
  currentMonth++;

  if ((currentMonth === 12) & (currentYear < 2021)) {
    currentMonth = 0;
    currentYear++;
  } else if ((currentMonth === 12) & (currentYear === 2021)) {
    // This condition is placed in order to stopCurrent
    canChange = false;
    showMessage("Cannot go to 2022");
    currentMonth = 11;
    currentYear = 2021;
  }

  d.setMonth(currentMonth);
  d.setFullYear(currentYear);
  n1 = currentMonth;
  n2 = currentYear;
  if (
    canChange &&
    !mainCalendar.classList.contains("animate") &&
    !mainCalendar.classList.contains("animateReverse")
  ) {
    mainCalendar.className = "animate";
    setTimeout(() => {
      generateCalendar();
      startingWeekDay = startOfMonth(d);
      d1 = startingWeekDay.getDay();
      addingEmptyDivsBefore();
      parentCalendarChildren = mainCalendar.childElementCount;
      addingEmptyDivAfter();
      displayCalendar();
    }, 500);
    setTimeout(() => {
      mainCalendar.className = "";
    }, 1001);
  }
};

let addMonthBefore = function () {
  // this function will display the month Before

  // this function will display the month After
  // get the current date that we have
  // get the current date we are
  // change the one we have
  // INFO: n2 get the year and n1 get the month
  let canChange = true;

  let currentMonth = d.getMonth();
  let currentYear = d.getFullYear();
  currentMonth--;

  if (currentMonth === -1 && currentYear > 2020) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth === -1 && currentYear === 2020) {
    // This condition is placed in order to stopCurrent
    canChange = false;
    showMessage("Cannot go before 2020");
    currentMonth = 0;
    currentYear = 2020;
  }

  d.setMonth(currentMonth);
  d.setFullYear(currentYear);
  n1 = currentMonth;
  n2 = currentYear;
  if (
    canChange &&
    !mainCalendar.classList.contains("animateReverse") &&
    !mainCalendar.classList.contains("animate")
  ) {
    mainCalendar.className = "animateReverse";
    setTimeout(() => {
      generateCalendar();
      startingWeekDay = startOfMonth(d);
      d1 = startingWeekDay.getDay();
      addingEmptyDivsBefore();
      parentCalendarChildren = document.getElementById("mainCalendarFlexBox")
        .childElementCount;
      addingEmptyDivAfter();
      displayCalendar();
    }, 500);
    setTimeout(() => {
      mainCalendar.className = "";
    }, 1001);
  }
};

//d.setMonth(0);
//d.setFullYear(252525);
