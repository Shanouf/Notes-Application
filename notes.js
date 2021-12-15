console.log('codes checking for project-1');
//to show the notes on loading the page
showNotes();
//when a user writes a note, save it to the local storage
let saveButton=document.getElementById('buton');
saveButton.addEventListener('click', ()=>{
    let text=document.getElementById('textarea');
    let collection=localStorage.getItem('noteObjects');
    let title=document.getElementById('textarea1');
    if(collection==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(collection);
    }
    let myObj={
        title: title.value,
        text: text.value
    }
    if(text.value==''||title.value==''){
        alert('Please add some text in notes and/or title before saving the note');
    }
    else{
        notesObj.push(myObj);
    }
    localStorage.setItem('noteObjects',JSON.stringify(notesObj));
    text.value='';
    title.value='';
    showNotes();
});
//function to make the notes appear in the 'your notes' section
function showNotes(){
    let collection=localStorage.getItem('noteObjects');
    if(collection==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(collection);
    }
    let html='';
    notesObj.forEach(function(element, index){
        html += `<div id="shan${index}" class="card mls mts mbs manageCard cards">
        <div class="card-body">
            <h5 class="card-title"><b>${element.title}</b></h5>
            <pre class="card-text">${element.text}</pre>
            <button id="${index}" onclick="deleteNote(${index})" class="btn btn-primary">Delete Note</button>
        </div>
        </div> `;
        let notesContainer=document.getElementById('notescont');
        if(notesObj.length!=0){
            notesContainer.innerHTML=html;
        }
    });
}
//function to delete a note
function deleteNote(index){
    let yesno=confirm('Do you really want to delete this note');
    if(yesno){
        let collection=localStorage.getItem('noteObjects');
        let cards=document.getElementById(`shan${index}`);
        let notescontainer=document.getElementById('notescont');
        if(collection==null){
            notesObj=[];
        }
        else{
            notesObj=JSON.parse(collection);
        }
        notesObj.splice(index, 1);
        cards.style.display='none';
        notescontainer.innerHTML=`<b>You don't have any notes. Write a note to view it here</b>`;
        localStorage.setItem('noteObjects',JSON.stringify(notesObj));
        showNotes();
    }
    else{
        alert('The note was not deleted');
    }
}
//function to display certain notes on certain search keywords
let search=document.getElementById('inp1');
search.addEventListener('input', searchResult);
function searchResult(){
    let inputVal=search.value.toLowerCase();
    let noteCards=document.getElementsByClassName('cards');
    Array.from(noteCards).forEach(function(element){
        let noteparas=element.getElementsByClassName('card-text')[0].innerText;
        let notetitles=element.getElementsByClassName('card-title')[0].innerText;
        if(noteparas.includes(inputVal)||notetitles.includes(inputVal)){
            element.style.display='block';
        }
        else{
            element.style.display='none';
        }
    });
}

