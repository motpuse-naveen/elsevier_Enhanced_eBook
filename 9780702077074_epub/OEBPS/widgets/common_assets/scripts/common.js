/*** Zoomable Image - START ***/
const ZOOM_MAX = 8;
var ZOOM_STEP = 0;
function check_and_Add_zoomhtml(){
	var zoomhtml = document.querySelector(".zoom_image_popup")
	if(zoomhtml==null){
		var zoomhtml = '<section class="zoom_image_popup">' +
		'<div class="zoom_overlay"></div>' +
		'<div class="zoom_image_wrapper">' +
		   '<div class="zoom_image_head">' +
			  '<button id="btnzoomin" class="zoominbutton" title="Zoom-In"></button>' +
			  '<button id="btnzoomout" class="zoomoutbutton" title="Zoom-Out"></button>' +
			  '<button id="btnclosezoom" class="zoomclosebutton" title="Close"></button>' +
		   '</div>' +
		   '<div id="zoom_image_container" class="zoom_image_container dragscroll">' +
			  '<img class="zoom_image" src=""/>' +
		   '</div>' +
		'</div>' +
	 '</section>' ;
	 var zoomelement = htmlToElement(zoomhtml);
	 document.body.appendChild(zoomelement);
	}
}

/*
'<div class="zoomnavwrapperright"><button id="btnleftmovezoom" class="zoomleftmovebutton" title="Move Left"></button>' +
'<button id="btnrightmovezoom" class="zoomrightmovebutton" title="Move Right"></button>' +
'<button id="btnupmovezoom" class="zoomupmovebutton" title="Move Up"></button>' +
'<button id="btndownmovezoom" class="zoomdownmovebutton" title="Move Down"></button></div>' +
document.getElementById("btnleftmovezoom").addEventListener("click", function(){
	document.getElementById('zoom_image_container').scrollLeft = document.getElementById('zoom_image_container').scrollLeft - 50;
});
document.getElementById("btnrightmovezoom").addEventListener("click", function(){
	document.getElementById('zoom_image_container').scrollLeft = document.getElementById('zoom_image_container').scrollLeft + 50;
});
document.getElementById("btnupmovezoom").addEventListener("click", function(){
	document.getElementById('zoom_image_container').scrollTop = document.getElementById('zoom_image_container').scrollTop - 50;
});
document.getElementById("btndownmovezoom").addEventListener("click", function(){
	document.getElementById('zoom_image_container').scrollTop = document.getElementById('zoom_image_container').scrollTop + 50;
});
*/

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function zoom_popup(img){
	disableScroll();
	ZOOM_STEP = 0;
	var imgWdt = img.clientWidth;
	var imgsrc = img.src;
	document.querySelector(".zoom_image_popup .zoom_image").src = imgsrc;
	document.querySelector(".zoom_image_popup .zoom_image").style.width = imgWdt + "px";
	document.querySelector(".zoom_image_popup .zoom_image").setAttribute("orgwdt", imgWdt);
	document.querySelector(".zoom_image_popup").style.display = 'block';
}

function zoom_pulse_on(img){
    var imgWdt = img.clientWidth;
    img.style.width = (imgWdt - (imgWdt*5/100))+ "px";
    img.setAttribute("orgwdt", imgWdt);
}
function zoom_pulse_off(img){
    var orgwdt = img.getAttribute("orgwdt");
    img.style.width = orgwdt + "px";
}

//Add zoomhtml if not exist in dom
check_and_Add_zoomhtml();

//Attach zoom and disable right click on images in document
/*var imageElms = document.querySelectorAll("figure img");
imageElms.forEach(element => {
	element.addEventListener("click", function(){
		zoom_popup(this)
	});
    element.addEventListener("contextmenu", function(event){
		event.preventDefault();
		return false;
	});
});*/
var imageZoomElms = document.querySelectorAll("figure.zoompop img");
imageZoomElms.forEach(element => {
	element.addEventListener("click", function(event){
		zoom_popup(this)
        event.stopPropagation();
        event.preventDefault();
		return false;
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
/*
imageElms.forEach(element => {
    img = new Image();
    img.onload = function () {
        alert(this.width + " : " + this.height)
    };
    img.src = element.src;
});
*/

//Update all images to add default height and width
setTimeout(function(){
	imageElms.forEach(element => {
		var imgWdt = element.clientWidth;
        var imgHgt = element.clientHeight;
        element.setAttribute("orgwdt",imgWdt)
        element.setAttribute("orghgt",imgHgt)
	});
},500)


//Zoom In button click event
document.getElementById("btnzoomin").addEventListener("click", function(){
	if(ZOOM_STEP<8){
		ZOOM_STEP++;
		var imgcurrwdt = document.querySelector(".zoom_image_popup .zoom_image").clientWidth;
		var orgwdt = Number(document.querySelector(".zoom_image_popup .zoom_image").getAttribute("orgwdt"))
		document.querySelector(".zoom_image_popup .zoom_image").style.width = imgcurrwdt + (orgwdt/2) + "px";
	}
});
//Zoom Out button click event
document.getElementById("btnzoomout").addEventListener("click", function(){
	var imgcurrwdt = document.querySelector(".zoom_image_popup .zoom_image").clientWidth;
	var orgwdt = Number(document.querySelector(".zoom_image_popup .zoom_image").getAttribute("orgwdt"))
	var newwdt = imgcurrwdt - (orgwdt/2);
    if(imgcurrwdt>orgwdt){
        var newwdt = imgcurrwdt - (orgwdt/2);
        if(newwdt>orgwdt){
            ZOOM_STEP--;
            document.querySelector(".zoom_image_popup .zoom_image").style.width = newwdt + "px";
        }
        else{
            ZOOM_STEP=0;
            document.querySelector(".zoom_image_popup .zoom_image").style.width = orgwdt + "px";
        }
    }
    else{
        ZOOM_STEP=0;
        document.querySelector(".zoom_image_popup .zoom_image").style.width = orgwdt + "px";
    }
});
//Close zoom popup button click event
document.getElementById("btnclosezoom").addEventListener("click", function(){
	enableScroll();
	document.querySelector(".zoom_image_popup .zoom_image").src = "";
	document.querySelector(".zoom_image_popup").style.display = 'none';
});
/*** Zoomable Image - END ***/

/*** Disable Body Scroll - START***/
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}
function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}
// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
// call this to Disable
function disableScroll() {
	var bodyelm = document.querySelector("body")
	bodyelm.classList.add("stop-scrolling");
}
// call this to Enable
function enableScroll() {
	var bodyelm = document.querySelector("body")
	bodyelm.classList.remove("stop-scrolling");
}
/*** Disable Body Scroll - END***/


/*** Scroll Pan - START ***/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
}(this, function (exports) {
    var _window = window;
    var _document = document;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mousedown = 'mousedown';
    var EventListener = 'EventListener';
    var addEventListener = 'add'+EventListener;
    var removeEventListener = 'remove'+EventListener;
    var newScrollX, newScrollY;

    var dragged = [];
    var reset = function(i, el) {
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el = el.container || el;
            el[removeEventListener](mousedown, el.md, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
        }

        // cloning into array since HTMLCollection is updated dynamically
        dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
        for (i = 0; i < dragged.length;) {
            (function(el, lastClientX, lastClientY, pushed, scroller, cont){
                (cont = el.container || el)[addEventListener](
                    mousedown,
                    cont.md = function(e) {
                        if (!el.hasAttribute('nochilddrag') ||
                            _document.elementFromPoint(
                                e.pageX, e.pageY
                            ) == cont
                        ) {
                            pushed = 1;
                            lastClientX = e.clientX;
                            lastClientY = e.clientY;

                            e.preventDefault();
                        }
                    }, 0
                );

                _window[addEventListener](
                    mouseup, cont.mu = function() {pushed = 0;}, 0
                );

                _window[addEventListener](
                    mousemove,
                    cont.mm = function(e) {
                        if (pushed) {
                            (scroller = el.scroller||el).scrollLeft -=
                                newScrollX = (- lastClientX + (lastClientX=e.clientX));
                            scroller.scrollTop -=
                                newScrollY = (- lastClientY + (lastClientY=e.clientY));
                            if (el == _document.body) {
                                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                scroller.scrollTop -= newScrollY;
                            }
                        }
                    }, 0
                );
             })(dragged[i++]);
        }
    }

      
    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window[addEventListener]('load', reset, 0);
    }

    exports.reset = reset;
}));

/*** Scroll Pan - END ***/