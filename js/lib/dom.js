var Dom = (function(){
	function empty(element){
		if (element.hasChildNodes() )
		{
			while (element.childNodes.length >= 1 )
			{
				element.removeChild(element.firstChild );       
			} 
		}
	}
	
	return {
		empty : empty
	};
	
})();