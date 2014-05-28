var Lightbox = (function(){

	function create(options){
		var lightbox = {
			options : options || {}
		};
		lightbox.handlers = {};
		bind(lightbox);
		
		lightbox.render();
		lightbox.attachEvents();
		
		return lightbox;
	}
	
	function bind(lightbox){
		lightbox.render = render.bind(lightbox);
		lightbox.attachEvents = attachEvents.bind(lightbox);
		lightbox.close = close.bind(lightbox);
		lightbox.stop = stop.bind(lightbox);
	}
	
	function attachEvents(){
		this.handlers.clickOff = this.fade.addEventListener("click", this.close, false);
		this.handlers.lightboxStop = this.lightbox.addEventListener("click", this.stop, false);
	}
	
	function render(){
		this.lightbox = document.createElement("div");
		this.fade = document.createElement("div");
		this.fade.style.width = "100%";
		this.fade.style.height = "100%";
		this.fade.classList.add(this.options.fadeClass || "fade")
		this.lightbox.classList.add(this.options.lightboxClass || "lightbox");
		if(this.options.content){
			this.lightbox.appendChild(this.options.content);
		}
		this.fade.appendChild(this.lightbox);
		
		document.body.appendChild(this.fade);
	}
	
	function close(){
		this.fade.parentNode.removeChild(this.fade);
	}
	
	function stop(e){
		e.stopPropagation();
		e.preventDefault();
	}

	return {
		create : create
	};
	
})();