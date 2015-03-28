function createPage() {
	var area = html.textarea("test");
	var button = html.button("test");
	button.onclick = function() {
		eval(area.value);
	}
	document.body.appendChild(area);
	document.body.appendChild(html.br());
	document.body.appendChild(button);
}

createPage();
