function Car(id, name, fio, number, time){
		this.id = id;
		this.name = name;
		this.fio = fio;
		this.number = number;
		this.time = time;
		this.addition = null;
}

Car.prototype.getId = function(){
	return this.id;
};

Car.prototype.getName = function(){
	return this.name;
};

Car.prototype.getFio = function(){
	return this.fio;
};

Car.prototype.getNumber = function(){
	return this.number;
};

Car.prototype.getTimes = function(){
	return this.time;
};

Car.prototype.setId = function(id){
	this.id = id;
}

Car.prototype.setAddition = function(add){
	if(add !== null)
		this.addition = add.split("@");
}

Car.prototype.getAddition = function(){
	if(this.addition === null)
		return ["", ""];
	else
		return this.addition;
}

Car.prototype.toString = function(){
	var string = "Название авто: " + this.name + "<br>";
	string += "ФИО владельца: " + this.fio + "<br>";
	string += "Номер авто: " + this.number + "<br>";
	string += "Время стоянки: " + this.time + "<br>";
	if(this.addition !== null){
		string += this.addition[0] + ": " + this.addition[1] + "<br>";
	}
	return string;
}