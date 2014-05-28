document.ontouchmove = function(e){ e.preventDefault() };
document.onerror = function(error, url, lineNumber){ alert(e, lineNumber); };
document.addEventListener("DOMContentLoaded", function(){
	NotepadApp.create({
		dropboxConnector : DropBoxConnector.create(creds)
	});
});