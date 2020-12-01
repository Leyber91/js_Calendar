var modalContainer=document.getElementById('modalContainer');
var addEvent= document.getElementById('addCalendarEvent');
addEvent.addEventListener('click', createModal);
document.addEventListener("keydown", closeModal);


function createModal(){
    var modal=document.createElement('div');
    modal.classList.add('modal');
    modal.setAttribute('id', 'modal');

    var closeIcon=document.createElement('i');
    closeIcon.setAttribute('class', 'far fa-times-circle');
    closeIcon.classList.add('modal__closeIcon');

    var modalMain=document.createElement('div');
    modalMain.classList.add('modal__main');

    modalMain.appendChild(closeIcon);
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