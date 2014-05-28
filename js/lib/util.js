var Util = (function(){
	//converts object array to converter function typed array
	function arraySelect(array, selectorFunction){
		var selectionArray = [];
		for(var i = 0; i < array.length; i++){
			selectionArray.push(selectorFunction(array[i]));
		}
		return selectionArray;
	}
	
	//returns true if any item matches
	function arrayAny(array, anyFunction){
		for(var i = 0; i < array.length; i++){
			if(anyFunction(array[i])){
				return true;
			}
		}
		return false;
	}
	
	function getFilename(path){
		var split = path.split("/");
		return split[split.length - 1];
	}
	
	function stringEndsWith(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
	
	function stringTrimEnd (str, length) {
		return str.substring(0, str.length - length);
	}
	
	function getParentPath(path, trailingSlash){
		var suffix = trailingSlash ? "/" : "";
		if(!path){
			return suffix;
		}
		if(stringEndsWith(path, "/")){
			path = stringTrimEnd(path, 1);
		}
		var split = path.split("/");
		if(split.length > 1){
			return split.slice(0, split.length-1).join("/") + suffix;
		}
		return suffix;
	}
	
	function extend(){
		for(var i=1; i<arguments.length; i++){
			for(var key in arguments[i]){
				if(arguments[i].hasOwnProperty(key)){
					arguments[0][key] = arguments[i][key];
				}
			}
		}
		return arguments[0];
	}
	
	function insertAtCursor(el, value){
		if(el.tagName == "TEXTAREA"){
			var startPos = el.selectionStart;
			var endPos = el.selectionEnd;
			el.value = el.value.substring(0, startPos) + value + el.value.substring(endPos, el.value.length);
			//move cursor
			var newIndex = startPos + value.length;
			el.setSelectionRange(newIndex, newIndex);
		}
	}
	
	function noop(){};

	return {
		arraySelect : arraySelect,
		arrayAny : arrayAny,
		getFilename : getFilename,
		getParentPath : getParentPath,
		stringEndsWith : stringEndsWith,
		extend : extend,
		insertAtCursor : insertAtCursor,
		noop : noop
	};

})();