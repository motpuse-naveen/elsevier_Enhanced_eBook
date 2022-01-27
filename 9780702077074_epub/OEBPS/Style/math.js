function mathmlImg() {
	var ps = document.getElementsByTagName('p');
	var divs = document.getElementsByTagName('div');
	for(var i =0; i < ps.length; i++) {
		var p1 = ps[i];
		if(p1.className === 'hiddenClass') {
			p1.className = 'showClass';	            
		}
	}
		for(var i=0; i < divs.length; i++) {
		var s1 = divs[i];
		if(s1.className === 'showClass') {
				s1.className = 'hiddenClass';            
		}
	}
}

function zoom_image(img){
    var imgWdt = img.clientWidth;
    var parentWdt = img.parentElement.clientWidth;
    var percWidth = imgWdt/parentWdt*100;
	percWidth = Number(percWidth.toFixed(2));
	var zlevel = img.getAttribute("zlevel")
	var orgperc = img.getAttribute("orgperc")
	var newWidth = getNewWidth(percWidth)
	if(orgperc==null || orgperc == undefined){
		orgperc = percWidth;
	}
	
	if(zlevel == null || zlevel == undefined || zlevel=="0"){
		img.setAttribute("orgperc", percWidth);
		img.style.transition = "width 0.5s ease";
		img.style.width = newWidth + "%";
		img.setAttribute("zlevel", "1");
	}
	else if(zlevel=="1"){
		img.style.transition = "width 0.5s ease";
		img.style.width = orgperc + "%";
		img.setAttribute("zlevel", "0");
	}
}

function zoom_popup(img){
	var imgWdt = img.clientWidth;
	var imgsrc = img.src;
	document.querySelector(".zoom_image_popup .zoom_image").src = imgsrc;
	document.querySelector(".zoom_image_popup .zoom_image").style.width = imgWdt + "px";
	document.querySelector(".zoom_image_popup .zoom_image").setAttribute("orgwdt", imgWdt);
	document.querySelector(".zoom_image_popup").style.display = 'block';
}

function getNewWidth(imgWdt){
	return imgWdt * 2;
}
function getDoubbledWidth(percWidth, oriWdt){
	if(oriWdt == null || oriWdt == undefined){
		oriWdt = percWidth;
	}
	var newWidth = Number((Number(percWidth) + Number(oriWdt)).toFixed(0))
	if(newWidth>100){
		newWidth = 100;
	}
	return newWidth;
}
var imageElms = document.querySelectorAll("figure.fig img");
imageElms.forEach(element => {
	element.addEventListener("click", function(){
		zoom_image(this)
	});
});

setTimeout(function(){
	imageElms.forEach(element => {
		var imgWdt = element.clientWidth;
		var parentWdt = element.parentElement.clientWidth;
		var percWidth = imgWdt/parentWdt*100;
		if(percWidth>0){
			element.style.width = percWidth + "%";
			element.style.transition = "width 0.5s ease";
		}
	});
},500)

var imageElms = document.querySelectorAll("figure.zoompop img");
imageElms.forEach(element => {
	element.addEventListener("click", function(){
		zoom_popup(this)
	});
});

document.getElementById("btnzoomin").addEventListener("click", function(){
	var imgcurrwdt = document.querySelector(".zoom_image_popup .zoom_image").clientWidth;
	var orgwdt = Number(document.querySelector(".zoom_image_popup .zoom_image").getAttribute("orgwdt"))
	document.querySelector(".zoom_image_popup .zoom_image").style.width = imgcurrwdt + (orgwdt/2) + "px";
});
document.getElementById("btnzoomout").addEventListener("click", function(){
	var imgcurrwdt = document.querySelector(".zoom_image_popup .zoom_image").clientWidth;
	var orgwdt = Number(document.querySelector(".zoom_image_popup .zoom_image").getAttribute("orgwdt"))
	var newwdt = imgcurrwdt - (orgwdt/2);
	if(newwdt>0){
		document.querySelector(".zoom_image_popup .zoom_image").style.width = imgcurrwdt - (orgwdt/2) + "px";
	}
});
document.getElementById("btnclosezoom").addEventListener("click", function(){
	document.querySelector(".zoom_image_popup .zoom_image").src = "";
	document.querySelector(".zoom_image_popup").style.display = 'none';
});

$(document).ready(function(){
	window.addEventListener("contextmenu", e => e.preventDefault());
});	