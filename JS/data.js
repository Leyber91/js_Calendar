let calendar = {};
let reminders = [];
getCalendar();
getReminders();

function createMonth(days) {
  var month = [];
  for (let i = 0; i < days; i++) {
    month.push([]);
  }
  return month;
}
function createYear(year) {
  const days = [
    31,
    year % 4 == 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  var y = [];
  days.forEach((numberDays) => {
    y.push(createMonth(numberDays));
  });
  return y;
}
function createCalendar(firstYear, numberOfYears) {
  let cal = {};
  for (let year = firstYear; year < firstYear + numberOfYears; year++) {
    cal[year] = createYear(year);
  }
  return cal;
}
function getCalendar() {
  calendarJson = "";
  if (localStorage.getItem("calendar")) {
    calendarJson = localStorage.getItem("calendar");
    calendar = JSON.parse(calendarJson);
  } else {
    calendar = createCalendar(2020, 2);
    calendarJson = JSON.stringify(calendar);
    localStorage.setItem("calendar", calendarJson);
  }
}

function saveCalendar() {
  calendarJson = JSON.stringify(calendar);
  localStorage.setItem("calendar", calendarJson);
}

function resetCalendar(){
  calendar=createCalendar(2020,2);
  saveCalendar();
}
function createNewEvent(
  title,
  initialDate,
  finalDate,
  reminder,
  description,
  type
) {
  let event = {
    title: title,
    initialDate: initialDate.toString(),
    endDate: finalDate?finalDate.toString():null,
    reminder: reminder,
    description: description,
    type: type,
  };
  if (finalDate) {
    let isSameDay =
      initialDate.getFullYear() == finalDate.getFullYear() &&
      initialDate.getMonth() == finalDate.getMonth() &&
      initialDate.getDate() == finalDate.getDate();
    if (isSameDay) {
      setEvent(event, initialDate);
    } else {
      let diference = daysDiference(initialDate, finalDate);
      for (let i = 0; i <= diference; i++) {
        let d = new Date(initialDate.getTime());
        d.setDate(d.getDate() + i);
        setEvent(event, d);
      }
    }
  } else {
    setEvent(event, initialDate);
  }
}

function setEvent(eventObject, day) {
  calendar[day.getFullYear()][day.getMonth()][day.getDate() - 1].push(
    eventObject
  );
  saveCalendar();
  displayCalendar();
  if (eventObject.reminder) {
    addReminder(eventObject);
  }
}

function deleteEvent(element, day) {
  const d = calendar[day.getFullYear()][day.getMonth()][day.getDate() - 1];
  const index = d.indexOf(element);
  d.splice(index, 1);
  
  if (element.reminder) {
    deleteReminder(element);
  }
}

function deleteEventFromCalendar(element) {
  
  if (element.endDate) {
    
    let isSameDay = areSameDate(new Date(element.initialDate), new Date(element.endDate));
    if (isSameDay) {
      deleteEvent(element, new Date(element.initialDate));
    } else {
      let diference = daysDiference(new Date(element.initialDate), new Date(element.endDate));
      for (let i = 0; i <= diference; i++) {
        let d = new Date(element.initialDate);
        d.setDate(d.getDate() + i);
        deleteEvent(element, d);
      }
    }
  } else {
    deleteEvent(element, new Date(element.initialDate));
  }
  saveCalendar();
  saveReminders();
  displayCalendar();
}

function areSameDate(initialDate, finalDate) {
  initialDate=new Date(initialDate);
  finalDate=new Date(finalDate);
  return (
    initialDate.getFullYear() == finalDate.getFullYear() &&
    initialDate.getMonth() == finalDate.getMonth() &&
    initialDate.getDate() == finalDate.getDate()
  );
}

function daysDiference(initialDate, finalDate) {
  let initialDays = Math.floor(initialDate.getTime() / (1000 * 60 * 60 * 24));
  let finalDays = Math.floor(finalDate.getTime() / (1000 * 60 * 60 * 24));
  let daysDiference = finalDays - initialDays;
  return daysDiference;
}

/*-----------------Reminders------------*/

function getReminders() {
  remindersJson = "";
  if (localStorage.getItem("reminders")) {
    remindersJson = localStorage.getItem("reminders");
    reminders = JSON.parse(remindersJson);
  } else {
    reminders = [];
    remindersJson = JSON.stringify(reminders);
    localStorage.setItem("reminders", remindersJson);
  }
}

function saveReminders() {
  remindersJson = JSON.stringify(reminders);
  localStorage.setItem("reminders", remindersJson);
}

function addReminder(element) {
  reminders.push(element);
  reminders.sort((a, b) => {
    dateA = new Date(a.initialDate);
    dateB = new Date(b.initialDate);
    return (dateA.getTime() - a.reminder * 60 * 1000) - (dateB.getTime() - b.reminder * 60 * 1000);
  });
  saveReminders();
}

function deleteReminder(reminder) {
  const index = reminders.indexOf(reminder);
  reminders.splice(index, 1);
  saveReminders();
}

function f1() {
  for (let i = 3; i > 0; i--) {
    let e = {
      title: "dia " + i,
      initialDate: new Date("December" + i + ", 2020 03:24:00"),
      endDate: null,
      reminder: 10,
      description: null,
      type: null,
    };
    createNewEvent(
      "dia " + i,
      new Date("December" + i + ", 2020 03:24:00"),
      null,
      10,
      null,
      null
    );
  }
}

function f2() {
  for (let i = 3; i > 0; i--) {
    let e = {
      title: "dia " + i,
      initialDate: new Date("December" + i + ", 2020 03:24:00"),
      endDate: null,
      reminder: 10,
      description: null,
      type: null,
    };
    deleteEventFromCalendar(e);
  }
}
