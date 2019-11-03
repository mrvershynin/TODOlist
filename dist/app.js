'use strict';

var modal = document.getElementById('createModal');
var createButton = document.getElementById('create');
var saveButton = document.getElementById('save');
var cancelButton = document.getElementById('cancel');
var newTitle = document.getElementById('new-title');
var tasksList = document.getElementById('tasks');
var newDescription = document.getElementById('new-description');
var priorityTask = document.getElementById('priority');
var selectStatus = document.getElementById('select-status');
var selectPriority = document.getElementById('select-priority');
var searchTitle = document.getElementById('search');

//Open modal window with form for create new task
createButton.onclick = function () {
	modal.style.display = "block";
};
//Close modal window and clear inputs after click on button "Cancel"
function closeModal() {
	modal.style.display = "none";
	document.getElementById('new-title').value = '';
	document.getElementById('new-description').value = '';
}
cancelButton.onclick = closeModal;

//
function createNewElement(title, description, priority) {
	var listItem = document.createElement('li');
	listItem.className = 'task';
	listItem.style.display = 'block';
	var titleTask = document.createElement('title');
	titleTask.innerText = title;
	var descriptionTask = document.createElement('description');
	descriptionTask.innerText = description;
	var priorityTask = document.createElement('priority');
	priorityTask.innerText = priority;
	var multiButton = document.createElement('button');
	multiButton.innerText = '...';
	var listContainer = document.createElement('ul');
	listContainer.className = 'list-container';
	var doneButton = document.createElement('li');
	doneButton.innerText = 'Done';
	doneButton.className = 'done';
	var editButton = document.createElement('li');
	editButton.innerText = 'Edit';
	editButton.className = 'edit';
	var deleteButton = document.createElement('li');
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
function addTask() {
	var listItem = createNewElement(newTitle.value, newDescription.value, priorityTask.value);
	tasksList.appendChild(listItem);
	bindTaskEvent(listItem, doneTask);
	closeModal();
}

//
saveButton.onclick = addTask;

//Click button for open list with edit buttons
function openList() {
	var container = this.parentNode;
	var list = container.querySelector('ul.list-container');
	list.style.display = list.style.display == 'block' ? 'none' : 'block';
}

//Button done
function doneTask() {
	var listItem = this.parentNode;
	var taskBody = listItem.parentNode;
	var doneButton = listItem.querySelector('li.done');
	var checkBox = document.createElement('input');
	checkBox.setAttribute('type', 'checkbox');
	checkBox.checked = true;
	taskBody.appendChild(checkBox);
	taskBody.id = 'task-done';
	checkBox.onclick = unDoneTask;
}
//Mark task as not completed
function unDoneTask() {
	var li = this.parentNode;
	li.id = 'task';
	var checked = li.querySelector('input');
	li.removeChild(checked);
}
function editTask() {
	var list = this.parentNode;
	var ul = list.parentNode;
	var task = ul.parentNode;
	modal.style.display = 'block';
	var changeTitle = task.querySelector('title').textContent;
	var changeDescription = task.querySelector('description').textContent;
	newTitle.value = changeTitle;
	newDescription.value = changeDescription;
	task.removeChild(ul);
}
//Button delete task
function deleteTask() {
	var list = this.parentNode;
	var ul = list.parentNode;
	var task = ul.parentNode;
	task.removeChild(ul);
}
function bindTaskEvent(listItem, statusEvent) {
	var doneButton = listItem.querySelector('li.done');
	var editButton = listItem.querySelector('li.edit');
	var deleteButton = listItem.querySelector('li.delete');

	doneButton.onclick = doneTask;
	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
}

//Filter by status
function myStat() {
	var selectStatus = document.getElementById('select-status').value;
	console.log(selectStatus);
	if (selectStatus == 'open') {
		document.getElementById('task').style.display = 'block';
		document.getElementById('task-done').style.display = 'none';
	} else if (selectStatus == 'done') {
		document.getElementById('task').style.display = 'none';
		document.getElementById('task-done').style.display = 'block';
	} else {
		document.getElementById('task-done').style.display = 'block';
		document.getElementById('task').style.display = 'block';
	}
}

//Filter by status
function myPrior() {
	var selectPrior = document.getElementsByTagName('priority').textContent;
	console.log(selectPrior);
}