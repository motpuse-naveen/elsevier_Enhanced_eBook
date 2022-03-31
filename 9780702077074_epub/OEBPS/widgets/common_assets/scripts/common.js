/* Version 19.1, Date:31 MAR 2022 */
/*** Disable Right click on image ***/
var allImageElmts = document.querySelectorAll("img");
allImageElmts.forEach(imgelement => {
	imgelement.addEventListener("contextmenu", function (event) {
		event.preventDefault();
		return false;
	});
});
document.addEventListener("contextmenu", function (e) {
	e.preventDefault();
}, false);
/*** End Disable right click ***/

/*** Annotation from Question to top ***/
function annotate_from_frame(elementId) {
	if(elementId.startsWith("#")){
        elementId = elementId.substring(1,elementId.length);
    }
	const element = document.getElementById(elementId);
	if(element!=null){
		document.location.hash = "#"
		document.location.hash = "#" + elementId;
	}
}
/*** End from_frame Annotation ***/

/*** Annotate within iframe ***/
window.addEventListener("load", function(event) {
    var frameid = getParameterByName("frameid", window.location.href)
	var questionnumber = getParameterByName("questionnumber", window.location.href)
	if(frameid!=undefined && frameid!=null && frameid!=""){
		const element = document.getElementById(frameid);
		if(element!=null){
			document.location.hash = "#"
			document.location.hash = "#" + frameid;
			if(questionnumber!=undefined && questionnumber!=null && questionnumber!=""){
				element.contentDocument.querySelector(".nav-link.step[data-id='q-" + questionnumber + "']").click()
			}
		}
	}
});

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var allhrefs = document.querySelectorAll("a[itemid][itemref][href]");
allhrefs.forEach(hrefelm => {
	if (typeof window.addEventListener != "undefined") {
		hrefelm.addEventListener("click",handle_frame_target_click,false);
	} else {
		hrefelm.attachEvent("onclick",handle_frame_target_click);
	}
});
function handle_frame_target_click(event){
	//debugger
	event.preventDefault();
	var frameid = event.target.getAttribute("itemid");
	var questionnumber = event.target.getAttribute("itemref");
	var hreflink = event.target.getAttribute("href");
	if(hreflink.startsWith("#")){
		const element = document.getElementById(frameid);
		if(element!=null){
			document.location.hash = "#"
			document.location.hash = "#" + frameid;
			if(questionnumber!=undefined && questionnumber!=null && questionnumber!=""){
				element.contentDocument.querySelector(".nav-link.step[data-id='q-" + questionnumber + "']").click()
			}
		}
	}
	else{
		var url = window.location.pathname;
		var filename = url.substring(url.lastIndexOf('/')+1);
		if(filename!=""){
			url = url.replace(filename,hreflink);
			url = url + "?frameid=" + frameid + "&questionnumber=" + questionnumber;
			window.location.href = url;
		}
	}
}
/*** End within iframe Annotation ***/


