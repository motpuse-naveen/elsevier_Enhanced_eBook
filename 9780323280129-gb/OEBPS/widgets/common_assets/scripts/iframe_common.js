/*** Disable Right click on image ***/
var allImageElmts = document.querySelectorAll("figure img");
allImageElmts.forEach(imgelement => {
    imgelement.addEventListener("contextmenu", function(event){
		event.preventDefault();
		return false;
	});
});
/*** End Disable right click ***/


