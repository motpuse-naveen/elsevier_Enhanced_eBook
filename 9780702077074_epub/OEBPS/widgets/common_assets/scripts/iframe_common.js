function zoom_pulse_on(img){
    img.classList.add("pulse-effect");
}
function zoom_pulse_off(img){
    img.classList.remove("pulse-effect");
}


var imageZoomElms = document.querySelectorAll("figure.zoompop img");
imageZoomElms.forEach(element => {
	element.addEventListener("click", function(){
		parent.zoom_popup(this)
	});
	element.addEventListener("mouseover", function(event){
		zoom_pulse_on(this)
	});
    element.addEventListener("mouseout", function(event){
		zoom_pulse_off(this)
	});
    element.addEventListener("contextmenu", function(event){
		event.preventDefault();
		return false;
	});
});