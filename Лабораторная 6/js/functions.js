function minmax(){
	var maxtime = document.getElementById("max-time");
	var mintime = document.getElementById("min-time");
	if(mintime.innerHTML !== ""){
		mintime.innerHTML = "";
		return;
	}
	if(window.data.size === 0){
		mintime.innerHTML = "В базе данных еще нет записей";
	} else{
		var min = null;
		var max = null;
		for(let car of window.data){
			if(min === null || min.getTimes() > car.getTimes()){
				min = car;
			}
		}
		for(let car of window.data){
			if(max === null || max.getTimes() < car.getTimes()){
				max = car;
			}
		}
		maxtime.innerHTML = "Авто с максимальным временем стоянки:" + "<br>" + max.toString();
		mintime.innerHTML = "Авто с минимальным временем стоянки:" + "<br>" + min.toString() + "<br>";
	}
}

function show(button){
	var tableDiv = document.getElementById("table");
	var table = document.getElementsByTagName("tbody")[0];
	if(tableDiv.style.display === "none"){
		tableDiv.style.display = "initial";
		button.innerHTML = "Скрыть таблицу";
		readData();		
		window.data.forEach(car => table.appendChild(createRow(car)));
	} else{
		let rows = table.getElementsByTagName("tr");
		while(rows.length !== 1)
			table.removeChild(rows[1]);
		tableDiv.style.display = "none";
		button.innerHTML = "Показать все записи";		
	}
}

function createRow(car){
	let row = document.createElement("tr");
	
	let cell = document.createElement("td");
	let text = document.createTextNode(car.getId());
	cell.appendChild(text);
	row.appendChild(cell);
	
	cell = document.createElement("td");
	text = document.createTextNode(car.getName());
	cell.appendChild(text);
	row.appendChild(cell);
	
	cell = document.createElement("td");
	text = document.createTextNode(car.getFio());
	cell.appendChild(text);
	row.appendChild(cell);
	
	cell = document.createElement("td");
	text = document.createTextNode(car.getNumber());
	cell.appendChild(text);
	row.appendChild(cell);
	
	cell = document.createElement("td");
	text = document.createTextNode(car.getTimes());
	cell.appendChild(text);
	row.appendChild(cell);
	
	let table = document.createElement("table");
	let row2 = document.createElement("tr");
	cell = document.createElement("th");
	text = document.createTextNode(car.getAddition()[0]);
	cell.appendChild(text);
	row2.appendChild(cell);
	table.appendChild(row2);
	row2 = document.createElement("tr");
	cell = document.createElement("td");
	text = document.createTextNode(car.getAddition()[1]);
	cell.appendChild(text);
	row2.appendChild(cell);
	table.appendChild(row2);
	row.appendChild(table);
	
	return row;
}

function options(){
	var select = document.getElementsByTagName("select")[0];
	window.data.forEach(car => {
		let opt = document.createElement("option");
		opt.value = car.getId();
		let optText = document.createTextNode(car.getId());
		opt.appendChild(optText);
		select.appendChild(opt);
	});
};

readData();

function add(){
	let inputs = document.getElementsByTagName("input");
	var name, fio, number, time;
	for(i = 0; i < inputs.length; i ++){
		switch(inputs[i].name){
			case "name":
				name = inputs[i].value;
				break;
			case "fio":
				fio = inputs[i].value;
				break;
			case "number":
				number = inputs[i].value;
				break;
			case "time":
				time = inputs[i].value;
				break;
		}
	}
	let newCar = new Car(null, name, fio, number, time);
	addCar(newCar);
	getLastId();
}

function addOption(id){
	var select = document.getElementsByTagName("select")[0];
	let opt = document.createElement("option");
	opt.value = id;
	let optText = document.createTextNode(id);
	opt.appendChild(optText);
	select.appendChild(opt);
}

function addProp(){
	var prop = document.getElementsByTagName("textarea")[0];
	if(prop.value.search(/.+@.+/) === -1){
		document.getElementById("min-weight").innerHTML = "Введите [название нового свойства]@[значение нового свойства]";
		return;
	}
	let select = document.getElementsByTagName("select")[0];
	let selected = select.options[select.selectedIndex].value;
	
	updateAddition(selected, prop.value);
	prop.value = "";
}

function remove(){
	let select = document.getElementsByTagName("select")[0];
	let selected = select.options[select.selectedIndex];
	
	deleteCar(selected.value);
	
	select.removeChild(selected);
}