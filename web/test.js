var user = {};
var userSend = {};
var history = [];
var functions = ["var", "if", "for", "while", "Math.abs", ".split", ".toLowerCase", ".toUpperCase", "true", "false", "Math.max", "Math.min", "new RegExp", ".toString", "JSON.parse", "JSON.stringify"];

function putInTable() {
	
}

// document.domain = "gityouso.me";

function setMode(mode) {
	var list = ["firstPage", "secondPage", "thirdPage"];
	var type = list[mode] || list[0];
	for (var i=0; i<list.length; i++) {
		var on = (mode === i);
		setVisible(type, on);
	}
}

function setVisible(key, state) {
	var els = document.getElementsByClassName(key);
	for (var i=0; i>els.length; i++) {
		var el = els[i];
		el.hidden = state;
	}
}

var api = {
	url : "http://gityouso.me:3000",
	code : "http://gityouso.me:3000/code",
	getCode : function(user, fn) {
		req = new XMLHttpRequest();
		req.open("POST", api.code, true);
		req.setRequestHeader("Content-Type","application/json");
		req.onreadystatechange = function() {
			if (req.readyState==4 && req.status==200) {
				buildChallenge1(req.responseText);
			}
		}
		console.log(user);
		req.send(JSON.stringify(user));
	},

	getCode2 : function(user, fn) {
		req = new XMLHttpRequest();
		req.open("POST", api.code, true);
		req.setRequestHeader("Content-Type","application/json");
		req.onreadystatechange = function() {
			if (req.readyState==4 && req.status==200) {
				buildChallenge2(req.responseText);
			}
		}
		console.log(user);
		req.send(user);
	},
};

function buildChallenge1(text) {
	var codes = JSON.parse(req.responseText);
	var one = replaceLines(codes[0]);
	var two = replaceLines(codes[1]);
	console.log(JSON.stringify(req.responseText));
	// document.getElementById("code")  .innerText = one;
	// document.getElementById("result").innerText = two;
	// console.log(eval(one));
	// console.log(eval(codes[1]));

	var a1 = html.a("codeLeft");
	a1.innerHTML = one;
	var a2 = html.a("codeRight");
	var a3 = html.a("message");
	a2.innerHTML = two;
	a1.width='50%';
	a2.width='50%';
	var box    = html.textbox("Answer", "answer");
	var submit = html.button("Submit");
	// TODO
	submit.onclick = validateChallenge1;

	html.clear();
	document.body.appendChild(a1);
	document.body.appendChild(a2);
	document.body.appendChild(html.br());
	document.body.appendChild(box);
	document.body.appendChild(submit);
	document.body.appendChild(html.br());
	document.body.appendChild(a3);
}

function validateChallenge1(answer) {
	var text = document.getElementById('answer').value;
	var message = document.getElementById('message');
	if (text === "1") {
		setTimeout(function() {
			drawOptions();
		}, 3000);
		message.innerText = "Correct!";
	}
	else {
		message.innerText = "Wrong :(";
	}
}

function buildChallenge2(text) {
	
}

function replaceLines(text) {
	text = text.replace(/\n/g, "<br>");
	text = text.replace(/\t/g, "&nbsp;&nbsp;");
	return text;
}

function createPage() {
	var area = html.textarea("code", "code");
	var area2 = html.textarea("result", "result");
	var area3 = html.textarea("replace", "replace");
	area.cols=60;
	area.rows=8;
	area.width='50%';
	area2.cols=60;
	area2.rows=8;
	area2.width='50%';
	area3.cols=60;
	area3.rows=8;
	var button  = html.button("Check");
	var button2 = html.button("Print");
	var button3 = html.button("Fetch");
	var div = html.div("div1");
	button.onclick = checkOutputCorrect;
	button2.onclick = function() {
		var code = document.getElementById('code').value;
		runCode(code);
	}
	button3.onclick = function() {
		user[functions[0]] = 1;
		api.getCode(user);
	};
	document.body.appendChild(area);
	document.body.appendChild(area2);
	document.body.appendChild(html.br());
	document.body.appendChild(area3);
	document.body.appendChild(html.br());
	document.body.appendChild(button);
	document.body.appendChild(button2);
	document.body.appendChild(button3);
	document.body.appendChild(div);
}
createPage();

function checkOutputCorrect() {
	var area = document.getElementById('code');
	var area2 = document.getElementById('result');
	if (area2.value == eval(area.value)) {
		alert("Correct!");
		return true; 
	} 
	else {
		alert("Wrong!");
		return false;
	}
}

function drawOptions() {
	var options = getOptions();
	var button1 = html.button(options[0]);
	var button2 = html.button(options[1]);
	var button3 = html.button(options[2]);
	var button4 = html.button("More...");

	button1.onclick = selectOption;
	button2.onclick = selectOption;
	button3.onclick = selectOption;
	button4.onclick = drawOptions;

	html.clear();
	document.body.appendChild(button1);
	document.body.appendChild(button2);
	document.body.appendChild(button3);
	document.body.appendChild(button4);
}

function selectOption() {
	var option = this.value;
	userSend = addFunctionView(option);
	api.getCode(userSend);
}

function getOptions() {
	var options = [];
	if (Object.keys(user).length < 2) {
		var l = Object.keys(user).length;
		for (var i=0; i<3; i++) {
			options.push(functions[i + Object.keys(user).length]);
		}
	}
	else {
		for (var i=0; i<3;) {
			var pos = Math.floor(Math.random()*functions.length);
			var word = functions[pos];
			if (!user[word] && options.indexOf(word) === -1) {
				options.push(word);
				i++;
			}
		}
	}
	return options;
}

function addFunctionView(word) {
	var old = oldItems(user);
	old [word] = 1;
	user[word] = 1;
	return old;
}

function oldItems(user) {
	var old = {};
	for (key in user) {
		old[key] = true;
	}
	return old;
}

function newConsole(val) {
	val = eval(val).toString();
	document.getElementById('result');
	// var fn = "asd = function() {var a = document.getElementById('replace').innerHTML + \"" + val + "\n\"; document.getElementById('replace').innerHTML = a}; asd()";
	var fn = "asd = function() {document.getElementById('replace').value += \"" + val + ", \"; document.getElementById('replace').innerHTML = a}; asd()";
	return fn;
}

function runCode(code) {
	code = replaceConsoleLog(code);
	console.log(code);
	eval(code);
}

function replaceConsoleLog(code) {
	code = code.replace(/console\.log\(([^\)]*)\)/g, function(match, first) {
		var str = newConsole(first);
		console.log(first);
		console.log(str);
		return str;
	});
	return code;
}

