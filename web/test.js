var user = {};
var history = [];
var functions = ["var", "if", "for", "while", "Math.abs", ".split", ".toLowerCase", ".toUpperCase", "true", "false", "Math.max", "Math.min", "new RegExp", ".toString", "JSON.parse", "JSON.stringify"];

function putInTable() {
	
}

var api = {
	url : "http://gityouso.me:3000",
	code : "http://gityouso.me:3000/code",
	getCode : function(user, fn) {
		req = new XMLHttpRequest();
		req.open("POST", api.code, true);
		req.setRequestHeader("Content-Type","application/jsonp");
		req.onreadystatechange = function() {
			if (req.readyState==4 && req.status==200) {
				buildChallenge1(req.responseText);
			}
		}
		console.log(user);
		req.send(user);
	},

	getCode2 : function(user, fn) {
		req = new XMLHttpRequest();
		req.open("POST", api.code, true);
		req.setRequestHeader("Content-Type","application/jsonp");
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
	document.getElementById("code")  .innerText = one;
	document.getElementById("result").innerText = two;
	console.log(eval(one));
	console.log(eval(codes[1]));
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

function addOptions() {
	var i=0;
	var options = [];
	if (Object.keys(user).length > 2) {
		var l = Object.keys(user).length;
		for (var i=0; i<3; i++) {
			options.push()
		}
	}
	else {
		while (i<3) {
			var q = Math.floor(Math.random()*3);
			var word = functions[q];
			if (options.indexOf(q) === -1) {
				options.push();
			}
		}
	}
	var button  = html.button("Check");
	var button2 = html.button("Print");
	var button3 = html.button("Fetch");
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

