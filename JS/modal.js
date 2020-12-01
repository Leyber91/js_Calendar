var modalContainer = document.getElementById("modalContainer");
var addEvent = document.getElementById("addCalendarEvent");
addEvent.addEventListener("click", createModal);
document.addEventListener("keydown", closeModal);

function createModal(event) {
  var modal = document.createElement("div");
  modal.classList.add("modal");
  modal.setAttribute("id", "modal");

  var modalMain = createModalMain(event);

  modal.appendChild(modalMain);
  modalContainer.appendChild(modal);

  modal.addEventListener("click", closeModal);
}

function closeModal(event) {
    console.log('suuu');
  if (
    event.target.classList.contains("modal") ||
    event.target.classList.contains("modal__closeIcon") ||
    event.key === "Escape" ||
    event.target.id == "formButtonCancel"||
    event.target.id == "formButtonAdd"
  ) {
    document.getElementById("modal").removeEventListener("click", closeModal);
    document
      .getElementById("formButtonAdd")
      .removeEventListener("click", checkImputs);
    document
      .getElementById("formButtonCancel")
      .removeEventListener("click", closeModal);
    deleteModal();
  }
}

function deleteModal() {
  modalContainer.innerHTML = "";
}

function createModalMain(event) {
  var closeIcon = document.createElement("i");
  closeIcon.setAttribute("class", "far fa-times-circle clickable");
  closeIcon.classList.add("modal__closeIcon");

  var modalMain = document.createElement("div");
  modalMain.classList.add("modal__main");
  modalMain.appendChild(closeIcon);

  if (event.target.id == "addCalendarEvent") {
    modalMain.innerHTML += formContent;
    var buttonCancel = document.createElement("button");
    buttonCancel.setAttribute(
      "class",
      "modal__button modal__button__cancel clickable"
    );
    buttonCancel.innerHTML = "Cancel";
    buttonCancel.setAttribute("id", "formButtonCancel");

    var buttonAdd = document.createElement("button");
    buttonAdd.setAttribute(
      "class",
      "modal__button modal__button__add clickable"
    );
    buttonAdd.innerHTML = "Add";
    buttonAdd.setAttribute("id", "formButtonAdd");

    var buttonsContainer = document.createElement("div");
    buttonsContainer.setAttribute("class", "modal__buttonsContainer");

    buttonsContainer.appendChild(buttonCancel);
    buttonsContainer.appendChild(buttonAdd);
    modalMain.appendChild(buttonsContainer);

    buttonAdd.addEventListener("click", checkImputs);
    buttonCancel.addEventListener("click", closeModal);

    //checkbox hiden/show
    setTimeout(function () {
      var formHasEndDate = document.getElementById("formHasEndDate");

      formHasEndDate.addEventListener("change", toggleVisibility);

      var formHasReminder = document.getElementById("formHasReminder");

      formHasReminder.addEventListener("change", toggleVisibility);

      function toggleVisibility(event) {
        object = document.getElementById(event.target.value);
        if (event.target.checked) {
          object.classList.remove("displayNone");
        } else {
          object.classList.add("displayNone");
        }
      }
    }, 500);
  }

  return modalMain;
}

function checkImputs(event) {
  const titleRegex = /^\S{1,60}$/;

  title = document.getElementById("formTitle").value;
  
  initialDate = new Date(document.getElementById("formInitialDate").value);
  let finalDate=null;
  if (document.getElementById("formHasEndDate").checked) {
    finalDate = new Date(document.getElementById("formEndDate").value);
    
  }
  let reminder=null;
  if (document.getElementById("formHasReminder").checked) {
    reminder = document.getElementById("formReminderTime").value;
  }
  description = document.getElementById("formDescription").value;
  type = document.getElementById("formEventType").value;

  if (!titleRegex.test(title)) {
    showMessage("Title is required");
  }else if(initialDate=="Invalid Date"){
    showMessage("Initial date is required.");
  } else if (
    initialDate.getFullYear() < 2020 ||
    initialDate.getFullYear() > 2021
  ) {
    showMessage("This year is not suported.");
  }else if(finalDate=="Invalid Date"){
    showMessage("Final date is required.");
  }else if (finalDate &&finalDate.getTime() - initialDate.getTime() <= 0) {
    showMessage("End date should be after initial date.");
} else {
    createNewEvent(title, initialDate, finalDate, reminder, description, type);
    closeModal(event);
  }
}

var formContent =
  '<h2>New Event</h2><form><label for="formTitle">Title:</label><br><input type="text" id="formTitle" name="formTitle"><br><label for="formInitialDate">Initial date:</label><br><input type="datetime-local" id="formInitialDate" name="formInitialDate"><br><input type="checkbox" id="formHasEndDate" name="formHasEndDate" value="endDateContainer"><label for="formHasEndDate"> End date</label><br><div id="endDateContainer" class="displayNone"><label for="formEndDate">End date:</label><br><input type="datetime-local" id="formEndDate" name="formEndDate"><br></div><input type="checkbox" id="formHasReminder" name="formHasReminder" value="reminderContainer"><label for="formHasReminder"> Reminde me when this event expires</label><br><div id="reminderContainer" class="displayNone"><label for="formReminderTime">Time: </label><br><select id="formReminderTime" name="formReminderTime"><option value=5>5 min.</option><option value=10>10 min.</option><option value=15>15 min.</option><option value=30>30 min.</option><option value=60>1 h.</option></select></div><label for="formDescription"> Description: </label><br><textarea id="formDescription" name="formDescription" rows="10" cols="30"></textarea><br><label for="formEventType">Event type: </label><br><select id="formEventType" name="formEventType"><option value=null></option><option value="meeting">Meeting</option><option value="personal">Personal</option><option value="study">Study</option><option value="birthday">Birthday</option></select></form>';
