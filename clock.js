var btime = 1;
var time = 5;
var interval;
var session = true;
var totalheight = 240;

function convertToDisplay(seconds) {
	var minutes = Math.floor(seconds / 60);
	var seconds = seconds % 60;
	if (seconds.toString().length == 1) {
		return "" + minutes + ":" + "0" + seconds;
	} else {
		return "" + minutes + ":" + seconds;
	}
}

function convertToSeconds(display) {
	var minutes = display.slice(0, display.indexOf(":"))
	var seconds = display.slice(display.indexOf(":") + 1)
	return parseInt(minutes) * 60 + parseInt(seconds);
}

function switchToBreak() {
	document.getElementById("type").innerHTML = "Break";
	document.getElementById("timer").innerHTML = convertToDisplay(btime * 60);
	session = false;
	$(".timer-bg").css("height", "0px");
	$(".timer-bg").css("background-color", "red");
}

function switchToSession() {
	document.getElementById("type").innerHTML = "Session";
	document.getElementById("timer").innerHTML = convertToDisplay(btime * 60);
	session = true;
	$(".timer-bg").css("height", "0px");
	$(".timer-bg").css("background-color", "#7CFC00")
}

function updateBGFill(display) {
	var percentage = session == true ? display / (time * 60) : display / (btime * 60);
	console.log(percentage);
	$(".timer-bg").css("height", (totalheight * (1 - percentage)) + "px");
}

function countdown() {
	var seconds = convertToSeconds($("#timer").text());
	session = true;

	interval = setInterval(function() {
			if (seconds > 0) {
				seconds--;
				document.getElementById("timer").innerHTML = convertToDisplay(seconds);
				updateBGFill(seconds);
			} else if (session) {
				switchToBreak();
				seconds = convertToSeconds($("#timer").text());
			} else {
				switchToSession();
				seconds = convertToSeconds($("#timer").text());
			}
		},1000);
}

function setTimer() {
	if (session) {
		document.getElementById("timer").innerHTML = convertToDisplay(time * 60);
	} else {
		document.getElementById("timer").innerHTML = convertToDisplay(btime * 60);
	}
}

$(document).ready(function() {

	document.getElementById("break-clock").innerHTML = btime;
	document.getElementById("session-clock").innerHTML = time;
	document.getElementById("timer").innerHTML = convertToDisplay(time * 60);
	document.getElementById("type").innerHTML = "Session";

	$('#bless').on("click", function() {
		if (interval == undefined) {
			if (btime > 0) btime--;
			document.getElementById("break-clock").innerHTML = btime;
			setTimer()
		}
	});

	$('#bmore').on("click", function() {
		if (interval == undefined) {
			btime++;
			document.getElementById("break-clock").innerHTML = btime;
			setTimer();
		}
	});

	$('#less').on("click", function() {
		if (interval == undefined) {
			if (time > 0) time--;
			document.getElementById("session-clock").innerHTML = time;
			setTimer();
		}
	});

	$('#more').on("click", function() {
		if (interval == undefined) {
			time++;
			document.getElementById("session-clock").innerHTML = time;
			setTimer();
		}
	});

	$("#power").on("click", function() {
		if (interval == undefined) {
			countdown();
			$("#power").text("Stop");
		} else {
			clearInterval(interval);
			interval = undefined;
			$("#power").text("Start");
		};
	});


});

