var messageContainer=document.getElementById('messageContainer');

function showMessage(m){
    var messageBackground=document.createElement('div');
    messageBackground.classList.add('messageBackground');
    messageBackground.setAttribute('id', 'messageBackground');

    var message=document.createElement('div');
    message.classList.add('message');
    message.innerHTML=m+'<br>';

    var button=document.createElement('button');
    button.setAttribute('class', 'message__button clickable');
    button.innerHTML='Ok';
    button.setAttribute('id', 'messageButton');

    message.appendChild(button);
    messageBackground.appendChild(message);
    messageContainer.appendChild(messageBackground);

    button.addEventListener('click', closeMessage);
    messageBackground.addEventListener('click', closeMessage);
}

function closeMessage(event){
    if(event.target.id=='messageBackground' || event.target.id=='messageButton'){
        document.getElementById('messageBackground').removeEventListener('click', closeMessage);
        document.getElementById('messageButton').removeEventListener('click', closeMessage);
        messageContainer.innerHTML='';
    }
}