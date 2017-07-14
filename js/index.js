/**
 * index.js
 * This is script for a calculator web application. Includes calculation of a simple mathematical expression involving addition, subtraction, multiplication, division of integers and decimal values.
 * @author  Jacqueline Soon (Jiacomina)
 * @updated --
 * @link
 *
 *
 */
var dayMode = true;
var answer = "";
$(document).ready(function(){

	// disable keyboard on small screens
	var mq = window.matchMedia( "(max-width: 450.999px)" );
	if (mq.matches) {
	    document.getElementById('display-top').readOnly = true;
	}
}

	// change style of display - night/day
	$(".toggle-display-mode").on("click", function(){
		toggleDisplayMode();
	});
	// change font size
	$("#small-font").on("click", function(){
		var smallerFont = parseInt($('.line').css("font-size")) - 1;
		$('.line').css('font-size', smallerFont + "px");
		$('.line').css('min-height', smallerFont + "px");
	});
	$("#large-font").on("click", function(){
		var largerFont = parseInt($('.line').css("font-size")) + 1;
		$('.line').css('font-size', largerFont + "px");
		$('.line').css('min-height', largerFont + "px");
	});

	$("#clear-all").on("click", function(){
		$(".input-div, .output-div").remove();
		$('textarea').val("");
	});

	//when keys pressed, focus on input box
	$(document).on('keyup', function(e)
	{
    $("#display-top").focus()
	});
	// allow only numbers and operators as input into calculator
	$('textarea').on('keypress', function (event) {
	    var regex = new RegExp("^[0-9.]+$");
	    var spregex = new RegExp("^[0-9. ]+$");
	    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	    if (!regex.test(key)) { // not a valid character
	    	event.preventDefault();
	    	if(key == "*")
	    		$('textarea').val($('textarea').val() + " " + String.fromCharCode(215) + " ");
	    	else if(key == "/")
	    		$('textarea').val($('textarea').val() + " " + String.fromCharCode(247) + " ");
	    	else if(key == "-")
	    		$('textarea').val($('textarea').val() + " - ");
	    	else if(key == "+")
	    		$('textarea').val($('textarea').val() + " + ");
	    	else if(key == "="  || event.keyCode == 13){
	    		getResult();
	    	}
	    }
	    else{ // check if space has been removed after operator, add if it has.
	    	if(!spregex.test($('textarea').val()[$('textarea').val().length-1])){
	    		event.preventDefault();
	    		$('textarea').val($('textarea').val() + " " + key);
	    	}
	    }
	});

	var txt = $('.display-top'),
	hiddenDiv = $(document.createElement('div')),
	content = null;

	hiddenDiv.addClass('hidden-div line');

	$('.screen').append(hiddenDiv);

	txt.bind('keyup', function() {

    content = txt.val();
    content = content.replace(/\n/g, '<br>');
    hiddenDiv.html(content);
    $(this).css('height', hiddenDiv.height());

    // clear screen


});

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
	});
	$("#delete").on("click", function(){
		var inputVal = document.getElementById("display-top").value;
		if(inputVal[inputVal.length - 1] == " ") document.getElementById("display-top").value = inputVal.slice(0, -3);
		else document.getElementById("display-top").value = inputVal.slice(0, -1);
	});

	$("#multiply").on("click", function(){
		document.getElementById("display-top").value += " " + String.fromCharCode(215) + " ";
	});
	$("#plus").on("click", function(){
		document.getElementById("display-top").value += " + " ;
	});
	$("#divide").on("click", function(){
		document.getElementById("display-top").value += " " + String.fromCharCode(247) + " ";
	});
	$("#minus").on("click", function(){
		document.getElementById("display-top").value += " - ";
	});
	$("#equals").on("click", function(){
		getResult();
	});
	$("#answer").on("click", function(){
		if((answer == '' || isNaN(answer)) && answer != 0) return;
		var input = document.getElementById("display-top").value;
		if(input[input.length - 1] != ' '){
			if(Math.sign(answer) == -1){
				document.getElementById("display-top").value += " - " + Math.abs(answer);
				return;
			}
			else{
				document.getElementById("display-top").value += " + " + answer;
				return;
			}
		}
		document.getElementById("display-top").value += answer;
	});
});


function toggleDisplayMode(){
	if(dayMode == true){ // change display mode to night
		$("#toggle-display-button").addClass("night-mode-button");
		$(".button").addClass("night-button");
		$(".orange-button").addClass("dark-orange-button");
		$(".green-button").addClass("blue-button");
		$(".screen").addClass("night-screen");
		$(".app-container").addClass("night-app-container");
		$(".grey-button").addClass("black-button");
		dayMode = false;
	}
	else{
		//displayMode == "night" change to day
		$("#toggle-display-button").removeClass("night-mode-button");
		$(".button").removeClass("night-button");
		$(".orange-button").removeClass("dark-orange-button");
		$(".green-button").removeClass("blue-button");
		$(".screen").removeClass("night-screen");
		$(".app-container").removeClass("night-app-container");
		$(".grey-button").removeClass("black-button");
		dayMode = true;
	}
}
function getResult(){
	var equation = $('textarea').val();
	if(equation == "") return;

	// turn input into read-only div
	inputDiv = $(document.createElement('div'));
	inputDiv.html(equation);
	inputDiv.addClass('input-div line');
	$('.screen').append(inputDiv);

	// calculate result
	answer = calResult(equation);

	// create output div to display answer
	outputDiv = $(document.createElement('div'));
	outputDiv.html(answer);
	outputDiv.addClass('output-div line');
	if(!isDigit(answer)){
		outputDiv.addClass('error-text');
	}
	$('.screen').append(outputDiv);

	input = $(document.getElementById("display-top"));
	$('.screen').append(input);
	document.getElementById("display-top").value = "";

	var objDiv = document.getElementById("screen");
	objDiv.scrollTop = objDiv.scrollHeight;
}

function calResult(equation){
	equation = equation.replace(/  /g, " "); //remove double spaces
	equation = equation.split(" "); // split equation by single spaces

	//remove inital and ending empty element caused by equation that begins with sign.
	if(equation[0] == "")
		equation = equation.slice(1);
	if(equation[equation.length-1] == "")
		equation = equation.slice(0, -1);

	var eqLength = equation.length;
	var resultArray = [];

	console.log("combining + and -");
	// COMBINE + and - SIGNS
	var i = 0;
	if(isSign(equation[equation.length-1])){
				return 'Error: cannot end expression with operator.'; //invalid syntax, sign/s not valid because it is not succeeded by a number.
			}
	while( i < eqLength){
		if(!(/^[0-9\u00F7\u00D7\.\+\-]+$/.test(equation[i]))){
			console.log("Invalid Syntax: " + equation + ".");
			return 'Invalid Syntax at: ' + i + "in " + equation[i] + ".";
		}
		if(isSign(equation[i])){
			var sign = equation[i];
			var j;
			for(j = i + 1; j < eqLength; j++){
				if(isSign(equation[j])){
					if(sign == equation[j]) sign = '+';
					else sign = '-';
				}
				else{
					resultArray.push(sign);
					console.log("Index: " + i + " " + resultArray);
					i = j;
					break;
				}
			}
		}
		else{
			resultArray.push(equation[i]);
			i++;
		}
	}
	var signedArrLen = resultArray.length;

	// Combine x and ÷
	console.log("combining x and /");
	if(isMultOrDiv(resultArray[0]) || isMultOrDiv(resultArray[signedArrLen-1])) // cannot begin or end with multiplication or division operator
		return 'Error: begins or ends with invalid operator.';

	for(var k = 0; k < signedArrLen; k++){
		console.log("k: " + k + "  " + resultArray);
		if(isMultOrDiv(resultArray[k+1])){
			var result = 1;
			var offset = 0;
			if(isSign(resultArray[k+2])){
				if(resultArray[k+2] == '-') result = -1;
				offset = 1;
			}
			if(!(isNum(resultArray[k+2+offset]))){
				return 'Error: duplicate operator.';
			}
			else{
				if(resultArray[k+1] == '\u00D7'){//multiply
					result *= parseFloat(resultArray[k])*parseFloat(resultArray[k+2+offset]);
				}
				else if(resultArray[k+1] == '\u00F7'){//divide
					result *= parseFloat(resultArray[k])/parseFloat(resultArray[k+2+offset]);
				}
				else{
					return 'Error: Invalid Operator ' + resultArray[k+1] + ".";
				}
				resultArray = resultArray.slice(0,k).concat([result]).concat(resultArray.slice(k+3+offset));
				k--;
			}
		}
	}

	// complete addition and subtraction
	{
		resArrLen = resultArray.length;
		var result = resultArray;
		if(resArrLen !== 1){
			result = 0;
			var add = true;
			for(var l = 0; l < resArrLen; l++){
				console.log("l: " + l + "   " + result);
				if(resultArray[l] == '+'){
					//do nothing
					continue;
				}
				if(resultArray[l] == '-'){
					add = !add;
					continue;
				}
				if(isDigit(resultArray[l])){
					if(add){
						result += parseFloat(resultArray[l]);
					}
					else{
						result -= parseFloat(resultArray[l]);
					}
					add = true;
					continue;
				}
				else{
					return 'Error: Invalid character ' + resultArray[l] + ".";
				}
			}
		}

	}
	return result;
}

function isSign(letter){
	return (letter == '+' || letter == '-');
}
function isNum(letter){
	return /^[0-9\.]+$/.test(letter);
}
function isDigit(letter){
	return /^[0-9\.\+\-]+$/.test(letter);
}
function isMultOrDiv(letter){
	return (letter == '\u00D7' /*multiply*/|| letter == '\u00F7'/*divide*/);
}
