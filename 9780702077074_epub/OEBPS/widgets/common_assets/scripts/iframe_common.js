var imageZoomElms = document.querySelectorAll("figure.zoompop img");
imageZoomElms.forEach(element => {
	element.addEventListener("click", function(){
		parent.zoom_popup(this)
	});
    element.addEventListener("contextmenu", function(event){
		event.preventDefault();
		return false;
	});
});