var NotepadApp = (function(){
	
	var defaults = {
		dropboxConnector : null
	};
	
	function create(options){
		var notepad = {};
		notepad.options = Util.extend(options);
		notepad.dom = {};
		notepad.model = {};
		notepad.eventHandlers = {};
		bind(notepad);
		
		notepad.setModel();
		notepad.gatherSelectors();
		notepad.attachEvents();
		
		SavedField.init(notepad.dom.text);
		
	}
	
	function bind(notepad){
		notepad.gatherSelectors = gatherSelectors.bind(notepad);
		notepad.attachEvents = attachEvents.bind(notepad);
		notepad.setModel = setModel.bind(notepad);
		notepad.save = save.bind(notepad);
		notepad.load = load.bind(notepad);
		notepad.clear = clear.bind(notepad);
		notepad.keyHandler = keyHandler.bind(notepad);
	}
	
	function gatherSelectors(){
		this.dom.text = document.getElementById("text");
		this.dom.save = document.getElementById("save");
		this.dom.load = document.getElementById("load");
		this.dom.clear = document.getElementById("clear");
		this.dom.auth = document.getElementById("force-auth");
		this.dom.location = document.getElementById("location");
		
		//templates
		this.dom.saveTmpl = document.getElementById("save-tmpl");
		this.dom.openTmpl = document.getElementById("open-tmpl");
		this.dom.fileTmpl = document.getElementById("file-tmpl");
	}
	
	function attachEvents(){
		this.eventHandlers.save = this.dom.save.addEventListener("click", this.save);
		this.eventHandlers.load = this.dom.load.addEventListener("click", this.load);
		this.eventHandlers.clear = this.dom.clear.addEventListener("click", this.clear);
		this.eventHandlers.keyHandler = this.dom.text.addEventListener("keydown", this.keyHandler);
	}
	
	function setModel(){
		this.model.currentLocation = "";
	}
	
	function save(){
		var self = this;
		DropboxUi.SaveDialog.create({
			connector : self.options.dropboxConnector,
			location : self.model.currentLocation,
			content : new Blob([self.dom.text.value]),
			saveTmpl : self.dom.saveTmpl,
			fileTmpl : self.dom.fileTmpl,
			onsave : function(filename, data){
				self.model.currentLocation = Util.getParentPath(filename, true);
				//
				self.dom.location.innerText = self.model.currentLocation;
				//
				alert(JSON.stringify(data));
			}
		});
	}
	
	function load(){
		var self = this;
		DropboxUi.OpenDialog.create({ 
			connector : self.options.dropboxConnector,
			location : self.model.currentLocation,
			openTmpl : self.dom.openTmpl,
			fileTmpl : self.dom.fileTmpl,
			onload : function(filename, data){
				self.model.currentLocation = Util.getParentPath(filename, true);
				//
				self.dom.location.innerText = self.model.currentLocation;
				//
				text.value = data;
			}
		});
	}
	
	function clear(){
		if(confirm("Are you sure you wish to clear?")){
			this.dom.text.value = "";
		}
	}
	
	function keyHandler(e) {
		var TABKEY = 9;
		if(e.keyCode == TABKEY) {
			Util.insertAtCursor(e.target, "\t");
			if(e.preventDefault) {
				e.preventDefault();
			}
			return false;
		}
	}
	
	return {
		create : create
	};
	
})();