var modalContainer=document.getElementById('modalContainer');
var addEvent= document.getElementById('addCalendarEvent');
addEvent.addEventListener('click', createModal);
document.addEventListener("keydown", closeModal);


function createModal(event){
    var modal=document.createElement('div');
    modal.classList.add('modal');
    modal.setAttribute('id', 'modal');

    var modalMain=createModalMain(event);

   
    modal.appendChild(modalMain);
    modalContainer.appendChild(modal);

    modal.addEventListener('click', closeModal);
}

function closeModal(event){
    if(event.target.classList.contains('modal') || event.target.classList.contains('modal__closeIcon')||event.key === "Escape"){
        deleteModal();
        document.getElementById('modal').removeEventListener('click', closeModal);
    }
}

function deleteModal(){
    modalContainer.innerHTML='';
}


function createModalMain(event){
    var closeIcon=document.createElement('i');
    closeIcon.setAttribute('class', 'far fa-times-circle clickable');
    closeIcon.classList.add('modal__closeIcon');

    var modalMain=document.createElement('div');
    modalMain.classList.add('modal__main');
    modalMain.appendChild(closeIcon);

    if(event.target.id=='addCalendarEvent'){
        modalMain.innerHTML+=formContent;
        var buttonCancel=document.createElement('button');
        buttonCancel.setAttribute('class', 'modal__button modal__button__cancel clickable');
        buttonCancel.innerHTML='Cancel';

        var buttonAdd=document.createElement('button');
        buttonAdd.setAttribute('class', 'modal__button modal__button__add clickable');
        buttonAdd.innerHTML='Add';

        var buttonsContainer=document.createElement('div');
        buttonsContainer.setAttribute('class', 'modal__buttonsContainer');

        buttonsContainer.appendChild(buttonCancel);
        buttonsContainer.appendChild(buttonAdd);
        modalMain.appendChild(buttonsContainer);
    }

    return modalMain;
}

var formContent='<h2>New Event</h2><form><label for="formTitle">Title:</label><br><input type="text" id="formTitle" name="formTitle"><br><label for="formInitialDate">Initial date:</label><br><input type="date" id="formInitialDate" name="formInitialDate"><br><input type="checkbox" id="formHasEndDate" name="formHasEndDate" value="formHasEndDate"><label for="formHasEndDate"> End date</label><br><div id="endDateContainer"><label for="formEndDate">End date:</label><br><input type="date" id="formEndDate" name="formEndDate"><br></div><input type="checkbox" id="formHasReminder" name="formHasReminder" value="formHasReminder"><label for="formHasEndDate"> Reminde me when this event expires</label><br><div id="reminderContainer"><label for="formReminderTime">Time: </label><br><select id="formReminderTime" name="formReminderTime"><option value=5>5 min.</option><option value=10>10 min.</option><option value=15>15 min.</option><option value=30>30 min.</option><option value=60>1 h.</option></select></div><label for="formDescription"> Description: </label><br><textarea name="formDescription" rows="10" cols="30"></textarea><br><label for="formEventType">Event type: </label><br><select id="formEventType" name="formEventType"><option value="meeting">Meeting</option><option value="personal">Personal</option><option value="study">Study</option><option value="birthday">Birthday</option></select></form>'