var addBtn = document.querySelector('.add');
	var item = document.querySelector('.item');
	var list = document.querySelector('.list');
	var completed = document.querySelector('#completed');
	var uncompleted = document.querySelector('#uncompleted');
	var data = (localStorage.getItem("to-do-list")) ? JSON.parse(localStorage.getItem("to-do-list")) : {
		completed: [],
		uncompleted: []
	};
	
	var removeSVG = '<svg version="1.1" class="bin" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 19.342 19.342" xml:space="preserve"><g><g><path d="M2.833,4.491c0,0,0.513,0.491,0.513,0.776v12.568c0,0.832,0.736,1.507,1.645,1.507h9.362c0.908,0,1.644-0.675,1.644-1.507V5.268c0-0.286,0.515-0.776,0.515-0.776V2.969H2.833V4.491z M12.36,6.23h1.223v9.705H12.36V6.23z M9.086,6.23h1.22v9.705h-1.22V6.23z M6.137,6.23h1.221v9.705H6.137V6.23z"/><path d="M17.108,1.711h-3.791C13.128,0.74,12.201,0,11.087,0H8.257C7.143,0,6.216,0.74,6.027,1.711H2.235v0.93h14.873V1.711z M7.297,1.711c0.156-0.344,0.528-0.586,0.96-0.586h2.829c0.433,0,0.804,0.243,0.961,0.586H7.297z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
	
	var completeSVG = '<svg version="1.1" class="confirm" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 67.283 67.283" xml:space="preserve"><g><path d="M33.641,0c-18.48,0-33.6,15.139-33.6,33.641s15.12,33.641,33.6,33.641s33.6-15.139,33.6-33.641S52.121,0,33.641,0z M33.641,58.872c-13.86,0-25.2-11.354-25.2-25.231S19.781,8.41,33.641,8.41s25.2,11.354,25.2,25.231S47.501,58.872,33.641,58.872z"/><path d="M43.301,22.287l-13.86,13.877l-5.88-5.887c-1.68-1.682-4.2-1.682-5.88,0s-1.68,4.205,0,5.887l8.82,8.831c0.84,0.841,1.68,1.262,2.94,1.262s2.1-0.421,2.94-1.262l16.8-16.821c1.68-1.682,1.68-4.205,0-5.887C47.501,20.605,44.981,20.605,43.301,22.287z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
	
	render();
	
	function buttonClicked(){
		var value = document.querySelector('.item').value;
		if(value){
			add(value);
		}
	}
	
	item.addEventListener('keydown', function(e){
		var value = document.querySelector('.item').value;
			if (e.code === 'Enter' && value){
			add(value);
			}
		});
		
	function add(value){
			addItemToDo(value);
			document.querySelector('.item').value="";
			data.uncompleted.push(value);
			update();
	}
	
	function render(){
		if(!data.uncompleted.length && !data.completed.length) return;
		
		for(var i=0; i<data.uncompleted.length; i++){
			var value = data.uncompleted[i];
			addItemToDo(value);
		}
		
		for(var j=0; j<data.completed.length; j++){
			var value = data.completed[j];
			addItemToDo(value, true);
		}
	}
	
	function update(){
		localStorage.setItem("to-do-list", JSON.stringify(data));		
	}
	
	function removeItem(){
		var item = this.parentNode.parentNode; //element li listy
		var parent = item.parentNode; //rodzic elementu li listy(item) - ul
		var id = parent.id;
		var value = item.innerText;
		
		if(id === "completed"){
			data.completed.splice(data.completed.indexOf(value), 1);
		}
		else if(id === "uncompleted"){
			data.uncompleted.splice(data.uncompleted.indexOf(value), 1);
		}
		update();
		parent.removeChild(item); //usuwanie elementu z listy
	}
	
	function completeItem(){
		var item = this.parentNode.parentNode;
		var parent = item.parentNode;
		var id = parent.id;
		var target;
		var value = item.innerText;
		
		
		
		if(id === "completed"){
			data.completed.splice(data.completed.indexOf(value), 1);
			data.uncompleted.push(value);
			target = document.querySelector('#uncompleted');
		}
		else if(id === "uncompleted"){
			data.uncompleted.splice(data.uncompleted.indexOf(value), 1);
			data.completed.push(value);
			target = document.querySelector('#completed');
		}
		update();
		parent.removeChild(item);
		target.insertBefore(item, target.childNodes[0]);
	}
	
	function addItemToDo(text, completed){
		var list = (completed) ? document.querySelector('#completed') : document.querySelector('#uncompleted');
		
		var todo = document.createElement('li');
		todo.innerText = text;
		
		var buttons = document.createElement('div');
		buttons.classList.add('buttons');
		
		var remove = document.createElement('button');
		remove.classList.add('remove');
		remove.innerHTML = removeSVG;
		
		remove.onclick = removeItem;
		
		var complete= document.createElement('button');
		complete.classList.add('complete');
		complete.innerHTML = completeSVG;
		
		complete.onclick = completeItem;
		
		list.appendChild(todo);
		todo.appendChild(buttons);
		buttons.appendChild(remove);
		buttons.appendChild(complete);
		
		list.insertBefore(todo, list.childNodes[0]);
	}
	
	addBtn.onclick = buttonClicked;
	