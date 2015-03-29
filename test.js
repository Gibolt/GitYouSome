function createPage() {

	var area = html.textarea("code", "code");
	var area2 = html.textarea("result", "result");
	var area3 = html.textarea("replace", "replace");
	var button = html.button("test");
	  button.onclick = function() {
		 eval(document.getElementById('code'));
		 }  
	
button.onclick = checkOutputCorrect;
button.onclick = newConsole;
	
	document.body.appendChild(area);
	document.body.appendChild(area2);
	document.body.appendChild(area3);
	document.body.appendChild(html.br());
	document.body.appendChild(button);
}

function checkOutputCorrect() {
	var area = document.getElementById('code');
	var area2 = document.getElementById('result');
	
	if (area2.value == area.value){
		
		alert("Correct!");
		return true; 
	} 
	else{
		
		alert("Wrong!");
		return false;
	}
}
                                                                 
 function newConsole(val) {
	val = val + " ";
	var fn = "function() {document.getElementById('code').value = " + val + "};";
	return fn;
} 

createPage();
