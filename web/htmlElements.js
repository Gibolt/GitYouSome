var html = {
	empty : function(){},

	frag : document.createDocumentFragment(),

	url : function(file) {
		return chrome.extension.getURL(file);
	},

	a : function(id) {
		var a = document.createElement('a');
		if (id) {
			a.id = id;
		}
		return a;
	},

	label : function(text, id) {
		var label = document.createElement('label');
		label.innerHTML = text;
		if (id) {
			label.id = id;
		}
		return label;
	},

	text : function(text) {
		return document.createTextNode(text);
	},

	obj : function(id) {
		var obj = document.createElement('object');
		if (id) {
			obj.id = id;
		}
		return obj;
	},

	image : function(url) {
		var img = document.createElement("img");
		img.setAttribute('src', url);
		return img;
	},

	textbox : function(placeholder, id, value) {
		var box   = document.createElement('input');
		box.type  = "text";
		box.value = value || "";
		if (placeholder) {
			box.placeholder = placeholder;
		}
		if (id) {
			box.id = id;
		}
		return box;
	},

	textarea : function(placeholder, id) {
		var area = document.createElement('textarea');
		if (placeholder) {
			area.placeholder = placeholder;
		}
		if (id) {
			area.id = id;
		}
		return area;
	},

	editTextLabel : function(text) {
		var label = html.label(text);
		label.id = "editTextLabel";
		label.activate = function(){
			html.editTextToBox(label);
		};
		this.value = text;
		return label;
	},

	editTextToBox : function(el) {
		var box   = html.textbox("", "editTextBox", el.textContent);
		box.cell  = el.cell;
		box.deactivate = function(){
			html.editTextToText(box);
		};
		el.parentNode.replaceChild(box, el);
	},

	editTextToText : function(el) {
		var label = html.label(el.value);
		label.id = "editTextLabel";
		label.cell = el.cell;
		label.activate = function(){
			html.editTextToBox(label);
		};
		// label.onclick = label.activate;
		el.parentNode.replaceChild(label,el);
	},

	button : function(text, id) {
		var button = document.createElement("input");
		button.type = "button";
		button.value = text;
		if (id) {
			button.id = id;
		}
		return button;
	},

	checkbox : function(id, checked) {
		var check = document.createElement('input');
		check.type = "checkbox";
		if (id) {
			check.id = id;
		}
		if (checked) {
			check.checked = checked;
		}
		return check;
	},

	br : function() {
		var br = document.createElement('br');
		return br;
	},

	l : function() {
		var l = html.label("|");
		return l;
	},

	table : function(id) {
		var table = document.createElement("table");
		if (id) {
			table.id = id;
		}
		return table;
	},

	row : function(id) {
		var row = document.createElement("tr");
		if (id) {
			row.id = id;
		}
		return row;
	},

	cell : function(text, id) {
		var cell = document.createElement("td");
		if (text) {
			cell.innerHTML = text;
		}
		if (id) {
			cell.id = id;
		}
		return cell;
	},

	// html.tableBuild(["t", "f", ""], words, "table", ["", "", "check"]);
	tableBuild : function(keys, list, id, types) {
		types = types || [];
		var table = html.table(id);
		html.rowsBuild(table, keys, list, types);
		return table;
	},

	rowsBuild : function(table, keys, list, types) {
		for (var i=0; i < list.length; i++) {
			var obj = list[i];
			html.rowBuild(table, i, obj, keys, types);
		}
	},

	rowBuild : function(table, line, obj, keys, types) {
		var row = table.insertRow(line);
		for (var j=0; j < keys.length; j++) {
			var key  = keys[j];
			var type = types[j];
			var fill = obj[key];
			var cell = row.insertCell(j);
			if (fill === undefined && (type === undefined || type === '')) {
				continue;
			}
			else if (!type || type == "text") {
				cell.innerHTML = fill;
			}
			else if (type == "check") {
				var check = html.checkbox();
				cell.appendChild(check);
			}
			else if (typeof fill == 'function') {
				cell.appendChild(fill());
			}
		}
		return row;
	},

	div : function(id) {
		var div = document.createElement("div");
		if (id) {
			div.id = id;
		}
		return div;
	},

	sep : function(id) {
		var sep = html.div(id);
		sep.class = "separator";
		return sep;
	},

	range : function() {
		return document.createRange();
	},

	addHotKey : function(el, key, fn) {
		if (key >= 0 && key <= 9) {
			key = key + 48;
			// Allowing numpad
			html.addHotKey(el, key + 96, fn);
		}
		else if (key.length == 1) {
			key = key.toLowerCase();
			key = key.charCodeAt();
		}
		else if (key.length) {
			key = key.toLowerCase();
			var keys = {
				"bsp"   : 8,
				"tab"   : 9,
				"enter" : 13,
				"shift" : 16,
				"ctrl"  : 17,
				"alt"   : 18,
				"left"  : 37,
				"up"    : 38,
				"right" : 39,
				"down"  : 40,
			};
			key = keys[key];
		}
		else {
			return false;
		}
	},

	activateHotKey : function(el, fn) {
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'target':document,
		};
		fn = function() {
			fn();
			if (!opt.propagate) {
				e.stopPropogation();
				e.preventDefault();
				return false;
			}
		}
		el.addEventListener(opt.type, fn, false);
	},

	// TODO: Convert to using hotkey instead of onchange
	addEnterKey : function(el, fn) {
		el.onchange = function(e) {
			if (this == document.activeElement) {
				fn();
			}
		};
	},

	removeHotKey : function(el) {

	},

	highlightOn  : function() {
		this.style.background = "linear-gradient(to right, rgb(241,250,246), rgb(204,233,220))";
	},

	highlightOff : function() {
		this.style.background = this.parentNode.style.background;
	},

	addHoverHighlight : function(node) {
		node.onmouseover = html.highlightOn;
		node.onmouseout  = html.highlightOff;
	},

	addHideHighlight : function(node) {
		node.onmouseover = html.highlightOff;
		node.onmouseout  = html.highlightOn;
	},

	fragNew : function() {
		html.frag = document.createDocumentFragment();
	},

	fragAdd : function(node) {
		html.frag.appendChild(node);
	},

	fragAppend : function(parent) {
		parent = parent || document.body;
		parent.appendChild(html.frag);
		html.fragNew();
	},

	deactivateActiveTable : function() {
		if (table = document.getElementById('activeTable')) {
			table.table.deactivate();
		}
	},

	clearAllButton : function() {
		var button = html.button("Reset FlipWord");
		button.onclick = function() {
			var text = "Are you sure you want to delete all your data? You will be able to select a new language, but all previous usage will be lost.";
			html.confirm(text, button, function() {
				chrome.storage.local.clear();
			});
		};
		return button;
	},

	confirm : function(text, original, action) {
		var obj = html.obj();
		var yes = html.button("Yes");
		var no  = html.button("Cancel");
		obj.style.background = 'rgb(255, 204, 153)';
		yes.style.background = 'rgb(153, 255, 51)';
		no .style.background = 'rgb(255, 153, 153)';
		obj.appendChild(html.label(text));
		obj.appendChild(html.br());
		obj.appendChild(yes);
		obj.appendChild(html.l());
		obj.appendChild(no);
		obj.appendChild(html.br());
		yes.onclick = function() {
			obj.parentNode.replaceChild(original, obj);
			action();
		};
		no.onclick = function() {
			obj.parentNode.replaceChild(original, obj);
		};
		original.parentNode.replaceChild(obj, original);
	},

	confirmButton : function(title, confirmText, action) {
		var button = html.button(title);
		button.onclick = function() {
			html.confirm(confirmText, button, action);
		};
		return button;
	},
}
