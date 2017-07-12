$(document).ready(function(){
	$("#zero").on("click", function(){
		document.getElementById("display-top").value += "0";
	});
	$("#one").on("click", function(){
		document.getElementById("display-top").value += "1";
	});
	$("#two").on("click", function(){
		document.getElementById("display-top").value += "2";
	});
	$("#three").on("click", function(){
		document.getElementById("display-top").value += "3";
	});
	$("#four").on("click", function(){
		document.getElementById("display-top").value += "4";
	});
	$("#five").on("click", function(){
		document.getElementById("display-top").value += "5";
	});
	$("#six").on("click", function(){
		document.getElementById("display-top").value += "6";
	});
	$("#seven").on("click", function(){
		document.getElementById("display-top").value += "7";
	});
	$("#eight").on("click", function(){
		document.getElementById("display-top").value += "8";
	});
	$("#nine").on("click", function(){
		document.getElementById("display-top").value += "9";
	});
	$("#decimal").on("click", function(){
		document.getElementById("display-top").value += ".";
	});
	$("#clearAll").on("click", function(){
		document.getElementById("display-top").value = "";
		document.getElementById("display-bottom").value = "";
	});
	$("#delete").on("click", function(){
		var inputVal = document.getElementById("display-top").value;
		if(inputVal[inputVal.length - 1] == " ") document.getElementById("display-top").value = inputVal.slice(0, -3);
		else document.getElementById("display-top").value = inputVal.slice(0, -1);
	});

	$("#multiply").on("click", function(){
		document.getElementById("display-top").value += " x ";
	});
	$("#plus").on("click", function(){
		document.getElementById("display-top").value += " + ";
	});
	$("#divide").on("click", function(){
		document.getElementById("display-top").value += " " + "\u00F7" + " ";
	});
	$("#minus").on("click", function(){
		document.getElementById("display-top").value += " - ";
	});
	$("#equals").on("click", function(){
		var equation = document.getElementById("display-top").value;
		document.getElementById("display-top").value = "";
		document.getElementById("display-bottom").value = getResult(equation);
	});
});

function getResult(equation){
	var nextIsDigit = true;
 	var equationArray = equation.split(" ");
 	var sum = 0;
 	var length = equationArray.length;
 	//process first digit
 	if(equationArray[0])
};
