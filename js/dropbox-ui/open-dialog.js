window.DropboxUi = window.DropboxUi || {};

DropboxUi.OpenDialog = (function(){

	var defaults = {
		connector : null,
		onload : Util.noop,
		content : null,
		location : "",
		openTmpl : null
	};

	function create(options){
		var dialog = {};
		dialog.options = Util.extend(defaults, options);
		dialog.dom = {};
		dialog.model = {
			files : [],
			location : dialog.options.location
		};
		bind(dialog);
		
		dialog.init();
	}
	
	function init(){
		this.lightbox = Lightbox.create({
			content : this.render()
		});
		this.gatherSelectors();
		this.attachEvents();
		this.browse();
	}
	
	function browse(){
		var self = this;
		self.options.connector.metadata(self.model.location, function(content){
			self.model.files = content.contents;
			Dom.empty(self.dom.fileList);
			self.dom.fileList.appendChild(self.constructItems());
		});
	}
	
	function gatherSelectors(){
		this.dom.el = this.lightbox.lightbox;
		this.dom.openButton = this.dom.el.querySelector("#open-file");
		this.dom.upButton = this.dom.el.querySelector("#up-directory");
		this.dom.textbox = this.dom.el.querySelector("#open-file-name");
		this.dom.fileList = this.dom.el.querySelector(".file-list");
	}
	
	function bind(dialog){
		dialog.init = init.bind(dialog);
		dialog.constructItems = constructItems.bind(dialog);
		dialog.openFile = openFile.bind(dialog);
		dialog.gatherSelectors = gatherSelectors.bind(dialog);
		dialog.setFile = setFile.bind(dialog);
		dialog.attachEvents = attachEvents.bind(dialog);
		dialog.browse = browse.bind(dialog);
		dialog.gotoChildDirectory = gotoChildDirectory.bind(dialog);
		dialog.gotoParentDirectory = gotoParentDirectory.bind(dialog);
		dialog.render = render.bind(dialog);
	}
	
	function render(){
		return document.importNode(this.options.openTmpl.content, true);
	}
	
	function constructItems(files){
		var self = this;
		var itemFrag = document.createDocumentFragment();
		self.model.files.forEach(function(file){
			var fileFrag = document.importNode(self.options.fileTmpl.content, true);
			var fileName = Util.getFilename(file.path);
			fileFrag.querySelector(".name").innerText = fileName;
			fileFrag.querySelector(".size").innerText = "(" + file.size + ")";
			fileFrag.querySelector("li").addEventListener("click", setFile.bind(self, fileName));
			if(file.is_dir){
				fileFrag.querySelector("li").classList.add("folder");
				fileFrag.querySelector("li").addEventListener("dblclick", self.gotoChildDirectory.bind(this, fileName));
			}else{
				fileFrag.querySelector("li").addEventListener("dblclick", self.openFile);
			}
			itemFrag.appendChild(fileFrag);
		});
		return itemFrag;
	}
	
	function attachEvents(){
		this.dom.upButton.addEventListener("click", this.gotoParentDirectory);
	}
	
	function setFile(path){
		var filename = Util.getFilename(path);
		this.dom.textbox.value = filename;
	}
	
	function gotoParentDirectory(){
		this.model.location = Util.getParentPath(this.model.location, "");
		this.browse();
	}
	
	function gotoChildDirectory(name){
		this.model.location += name + "/";
		this.browse();
	}
	
	function openFile(){
		var filename = this.model.location + this.dom.textbox.value;
		this.options.connector.load(filename, this.options.onload.bind(this, filename));
		this.lightbox.close();
	}
	
	return {
		create : create
	};
	
})();