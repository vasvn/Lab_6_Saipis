data = new Set();
lastId = 0;
db = openDatabase("Cars", "1.0", "List of cars", 2 * 1024 * 1024);
first = true;

if(!db)
	alert("Не получилось соединиться с базой данных");

function readData(){
	db.transaction(function(tx){
		tx.executeSql("SELECT * FROM Car;", [],
						getResults,
						function(tx, error){
							tx.executeSql("CREATE TABLE Car (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT, fio TEXT, number TEXT, time REAL, addition TEXT);", [], null, null);
						}
					);
	});
}

function getResults(tx, result){
	if(result.rows == undefined){
		return;
	}
	window.data.clear();
	for(var i = 0; i < result.rows.length; i ++){
		let car = new Car(result.rows.item(i)['id'], result.rows.item(i)['name'], result.rows.item(i)['fio'],
							result.rows.item(i)['number'], result.rows.item(i)['time']);
		car.setAddition(result.rows.item(i)['addition']);
		window.data.add(car);
	}
	if(first){
		options();
		first = false;
	}
}

function getLastId(){
	db.transaction(function(tx){
		tx.executeSql("SELECT id FROM Car", [],
						countLastId,
						function(tx, error){
							tx.executeSql("CREATE TABLE Car (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT, fio TEXT, number TEXT, time REAL, addition TEXT);", [], null, null);
						}
					);
	});
}

function countLastId(tx, result){
	if(result.rows.length === 0 || result.rows == undefined){
		return;
	}
	window.lastId = result.rows.item(result.rows.length - 1)['id'];
	addOption(window.lastId);
}
	

function addCar(newCar){
	db.transaction(function(tx){
		tx.executeSql("INSERT INTO Car(name, fio, number, time) VALUES(?, ?, ?, ?);",
						[newCar.getName(), newCar.getFio(), newCar.getNumber(), newCar.getTimes()], 
						null, null);
	});
}

function updateAddition(id, text){
	db.transaction(function(tx){
		tx.executeSql("UPDATE Car SET addition = ? WHERE id = ?;",
						[text, id], 
						null, null);
	});
}

function deleteCar(carId){
	db.transaction(function(tx){
		tx.executeSql("DELETE FROM Car WHERE id = ?;",
						[carId], null, null);
	});
}