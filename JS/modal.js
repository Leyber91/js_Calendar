var modalContainer = document.getElementById("modalContainer");
var addEvent = document.getElementById("addCalendarEvent");
var btnsCalendarEvent=document.querySelector('.btnCalendarEvent')
addEvent.addEventListener("click", createModal);
document.addEventListener("keydown", closeModal);
var isFormEvent=false;

/*false event*/

var falseEvent=document.getElementById('falseEvent');
falseEvent.addEventListener('click', createModal);


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
    (event.target.id == "formButtonAdd" && canCloseModal)
  ) {
    document.getElementById("modal").removeEventListener("click", closeModal);
    if(isFormEvent){
      document
        .getElementById("formButtonAdd")
        .removeEventListener("click", checkImputs);
      document
        .getElementById("formButtonCancel")
        .removeEventListener("click", closeModal);
    }
    
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
  console.log(event);
  if (event.target.id == "addCalendarEvent") {
    isFormEvent=true;
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
  }else{
    isFormEvent=false;
    let position=event.target.value%100;
    let day=(event.target.value-position)/100;
    let thisEvent=calendar[n2][n1][day][position];
    let mess=document.createElement('div');
    mess.setAttribute('class', 'modal__eventMessage');

    mess.innerHTML+='<h2>'+thisEvent.title+'</h2>';
    if(thisEvent.endDate){
      if(areSameDate(new Date(thisEvent.initialDate), new Date(thisEvent.endDate))){
        mess.innerHTML+='<p><strong>Date:</strong> '+convertDate(thisEvent.initialDate)+' from '+convertTime(thisEvent.initialDate)+' to '+convertTime(thisEvent.endDate);
      }else{
        mess.innerHTML+='<p><strong>Date:</strong> From'+convertDate(thisEvent.initialDate)+' at '+convertTime(thisEvent.initialDate)+' to '+convertDate(thisEvent.endDate)+' at '+convertTime(thisEvent.endDate)+'</p>';
      }
    }
    else{
      mess.innerHTML+='<p><strong>Date:</strong> '+convertDate(thisEvent.initialDate)+' at '+convertTime(thisEvent.initialDate)+'</p>';
    }
    if(thisEvent.reminder){
      mess.innerHTML+='<p>Remind me this <strong>'+thisEvent.reminder+' minutes</strong> before it starts </p>';
    }
    if(thisEvent.description){
      mess.innerHTML+='<hr><p><strong>Description:</strong> </p>';
      mess.innerHTML+='<p>'+thisEvent.description+'</p><hr>';
    }
    if(thisEvent.type!="null"){
      mess.innerHTML+='<p><strong>Type:</strong> '+thisEvent.type+'</p>';
    }
    

    var buttonDelete = document.createElement("button");
    buttonDelete.setAttribute(
      "class",
      "modal__button modal__button__delete clickable"
    );
    buttonDelete.innerHTML = "Delete event";
    buttonDelete.setAttribute("id", "formButtonDelete");
    
    mess.appendChild(buttonDelete);
    modalMain.appendChild(mess);

  }
  
  return modalMain;
}

function checkImputs(event) {
  canCloseModal=false;

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

  let check=0;
  if ((title.length<0)) {
    showMessage("Title is required");
    check++;
  }else if(title.length>60){
    showMessage("Title is too long");
  }else if(initialDate=="Invalid Date"){
    showMessage("Initial date is required.");
    check++;
  } else if (
    initialDate.getFullYear() < 2020 ||
    initialDate.getFullYear() > 2021
  ) {
    showMessage("This year is not suported.");
    check++;
  }else if(finalDate=="Invalid Date"){
    showMessage("Final date is required.");
    check++;
  }else if (finalDate &&finalDate.getTime() - initialDate.getTime() <= 0) {
    showMessage("End date should be after initial date.");
    check++;
  }else if((initialDate-new Date())<0 && reminder){
    showMessage("You can't put a reminder to an event that has expired.");
    check++;
  }else {
      createNewEvent(title, initialDate, finalDate, reminder, description, type);
      canCloseModal=true;
      closeModal(event);
    }
  }

  function convertDate(dateString){
    let date=new Date(dateString);
    let text='';
    const days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    text+=days[date.getDay()]+' '+months[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear();
    return text;
  }

  function convertTime(dateString){
    let date=new Date(dateString);
    let text='';
    text+=date.getHours()+':'+date.getMinutes();
    return text;
  }

var formContent =
'<h2>New Event</h2><form><label for="formTitle">Title:</label><br><input type="text" id="formTitle" name="formTitle"><br><label for="formInitialDate">Initial date:</label><br><input type="datetime-local" id="formInitialDate" name="formInitialDate"><br><input type="checkbox" id="formHasEndDate" name="formHasEndDate" value="endDateContainer"><label for="formHasEndDate"> End date</label><br><div id="endDateContainer" class="displayNone"><label for="formEndDate">End date:</label><br><input type="datetime-local" id="formEndDate" name="formEndDate"><br></div><input type="checkbox" id="formHasReminder" name="formHasReminder" value="reminderContainer"><label for="formHasReminder"> Reminde me when this event expires</label><br><div id="reminderContainer" class="displayNone"><label for="formReminderTime">Time: </label><br><select id="formReminderTime" name="formReminderTime"><option value=5>5 min.</option><option value=10>10 min.</option><option value=15>15 min.</option><option value=30>30 min.</option><option value=60>1 h.</option></select></div><label for="formDescription"> Description: </label><br><textarea id="formDescription" name="formDescription" rows="10" cols="30"></textarea><br><label for="formEventType">Event type: </label><br><select id="formEventType" name="formEventType"><option value=null></option><option value="meeting">Meeting</option><option value="personal">Personal</option><option value="study">Study</option><option value="birthday">Birthday</option></select></form>';
