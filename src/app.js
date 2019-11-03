let modal = document.getElementById('createModal');
let createButton = document.getElementById('create');
let saveButton = document.getElementById('save');
let cancelButton = document.getElementById('cancel');
let newTitle = document.getElementById('new-title');
let tasksList = document.getElementById('tasks');
let newDescription = document.getElementById('new-description');
let priorityTask = document.getElementById('priority');
let selectStatus = document.getElementById('select-status');
let selectPriority = document.getElementById('select-priority');
let searchTitle = document.getElementById('search');


//Open modal window with form for create new task
createButton.onclick = function () {
   modal.style.display = "block";
}
//Close modal window and clear inputs after click on button "Cancel"
function closeModal(){
   modal.style.display = "none";
   document.getElementById('new-title').value = '';
   document.getElementById('new-description').value = '';
}
cancelButton.onclick = closeModal;

//
function createNewElement(title, description, priority){
   let listItem = document.createElement('li');
   listItem.className = 'task' + ' ' + 'item' + ' ' + priority;
   listItem.style.display = 'block';
   let titleTask = document.createElement('title');
   titleTask.innerText = title;
   let descriptionTask = document.createElement('description');
   descriptionTask.innerText = description;
   let priorityTask = document.createElement('priority');
   priorityTask.innerText = priority;
   let multiButton = document.createElement('button');
   multiButton.innerText = '...';
   let listContainer = document.createElement('ul');
   listContainer.className = 'list-container';
   let doneButton = document.createElement('li');
   doneButton.innerText = 'Done';
   doneButton.className = 'done';
   let editButton = document.createElement('li');
   editButton.innerText = 'Edit';
   editButton.className = 'edit';
   let deleteButton = document.createElement('li');
   deleteButton.innerText = 'Delete';
   deleteButton.className = 'delete';
   listItem.appendChild(titleTask);
   listItem.appendChild(descriptionTask);
   listItem.appendChild(priorityTask);
   listItem.appendChild(multiButton);
   listItem.appendChild(listContainer);
   listContainer.appendChild(doneButton);
   listContainer.appendChild(editButton);
   listContainer.appendChild(deleteButton);
   multiButton.onclick = openList;
   return listItem;
}

//
function addTask(){
       let listItem = createNewElement(newTitle.value, newDescription.value, priorityTask.value);
       tasksList.appendChild(listItem);
       bindTaskEvent(listItem, doneTask);
       closeModal();
}

//
saveButton.onclick = addTask;

//Click button for open list with edit buttons
function openList(){
   let container = this.parentNode;
   let list = container.querySelector('ul.list-container');
   list.style.display = (list.style.display == 'block') ? 'none' : 'block'
}

//Button done
function doneTask(){
   let listItem = this.parentNode;
   let taskBody = listItem.parentNode;
   let doneButton = listItem.querySelector('li.done');
   let checkBox = document.createElement('input');
   checkBox.setAttribute('type', 'checkbox');
   checkBox.checked = true;
   taskBody.appendChild(checkBox);
   taskBody.className = 'task-done' + ' ' + 'item' + ' ' + 'priority';    
   checkBox.onclick = unDoneTask;
}
//Mark task as not completed
function unDoneTask(){
   let li = this.parentNode;
   li.className = 'task' + ' ' + 'item' + ' ' + 'priority';
   let checked = li.querySelector('input');
   li.removeChild(checked);
}
function editTask(){
  let list = this.parentNode;
  let ul = list.parentNode;
  let task = ul.parentNode;
  modal.style.display = 'block';
  let changeTitle = task.querySelector('title').textContent;
  let changeDescription = task.querySelector('description').textContent;
  newTitle.value = changeTitle;
  newDescription.value = changeDescription;
  task.removeChild(ul);
}
//Button delete task
function deleteTask(){
  let list = this.parentNode;
  let ul = list.parentNode;
  let task = ul.parentNode;
  task.removeChild(ul);
}
function bindTaskEvent(listItem, statusEvent){
  let doneButton = listItem.querySelector('li.done');
  let editButton = listItem.querySelector('li.edit');
  let deleteButton = listItem.querySelector('li.delete');

  doneButton.onclick = doneTask;
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
}

//Filter by status
let filterStatus = document.getElementById('select-status');
let itemsElementsStatus = document.getElementById('tasks');
filterStatus.onchange = function(){
  let itemsSt = itemsElementsStatus.getElementsByClassName('item');
  for (let i = 0; i < itemsSt.length; i++) {
    if (itemsSt[i].classList.contains(this.value)) {
      itemsSt[i].style.display = 'block';
  } 
  else {
      itemsSt[i].style.display = 'none';
  }
}
}

//Filter by priority
let filterPriority = document.getElementById('select-priority');
let itemsElementsPriority = document.getElementById('tasks');
filterPriority.onchange = function(){
  let items = itemsElementsPriority.getElementsByClassName('item');
  for (let i = 0; i < items.length; i++) {
    if (items[i].classList.contains(this.value)) {
      items[i].style.display = 'block';
  } 
  else {
      items[i].style.display = 'none';
  }
}
}


//Filter for title
function myFunction() {
  let inputSearch = document.getElementById('search');
  let filter = inputSearch.value.toUpperCase();
  let ul = document.getElementById('tasks');
  let li = ul.getElementsByTagName('li');
  for (let i = 0; i < li.length; i++) {
      let title = li[i].getElementsByTagName('title')[0];
      let txtValue = title.textContent || title.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = 'block';
      } 
      else {
         li[i].style.display = 'none';
     }
 }
}