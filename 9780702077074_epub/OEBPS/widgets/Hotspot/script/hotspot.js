/* Version 19, Date:30 MAR 2022 */
// Utility Functions
(function (app) {
    var maxSliderRange = 150;
    var minSliderRange = 0;
    var currentScale = 1;
    var totalSteps = 6;
    var sliderStepSize = maxSliderRange / totalSteps;
    var $imageWrapper = $('#inner-image-area');
    var $img = $(".zoomimg");
    var currentSliderVal = 0;
    app.announcementRange = { min: 0, max: 100 };
    app.sliderRange = { min: minSliderRange, max: maxSliderRange };
    var sliders = document.getElementById('imageSlider1');
    app.sliderObj = new SliderA11y(sliders);
    var isSliderInit = false;
    app.sliderObjInit = function () {
        if (!isSliderInit) {
            app.sliderObj.init();
        }
    }
    app.isOpenedOnMobile = function () {
        let details = navigator.userAgent;
        let regexp = /android|iphone|kindle|ipad/i;
        return regexp.test(details);
    }
    function scaleImage(scaleSliderVal) {
        currentScale = parseFloat(1) + ((parseInt(scaleSliderVal) * 0.01) * 4);
        $imageWrapper.css('transform', 'scale(' + currentScale + ')');
        $('#imageSlider1').attr('aria-label', 'Image scale is ' + parseInt(app.changeRange(currentSliderVal)) + '%');
    }
    app.getImageWrapper = function () {
        return $imageWrapper;
    }
    app.$imageSlider = $("#imageSlider1");
    app.getSliderMaxRange = function () {
        return maxSliderRange;
    }
    app.getSliderMinRange = function () {
        return minSliderRange;
    }
    app.isZoomed = function () {
        return currentSliderVal > 0;
    }
    app.getCurrentScale = function () {
        return currentScale;
    }
    app.imageScaleChanged = function (scaleSliderValue) {
        if (scaleSliderValue <= 0) {
            $('.zoomimg').css({
                'height': '100% ',
                'width': '90% ',
            });
        } else {
            $('.zoomimg').css({
                'height': 'auto',
                'width': 'auto',
            });
        }
        currentSliderVal = parseInt(scaleSliderValue);
        scaleImage(scaleSliderValue);
        Utils.unableDisableZoomButtons();
    }
    app.getNewScaleByDirection = function (direction) {
        var newZoom = currentSliderVal;
        if (direction == "plus") {
            if ((newZoom + sliderStepSize) <= maxSliderRange) {
                newZoom += sliderStepSize;
            } else {
                newZoom = maxSliderRange;
            }
        } else {
            if ((newZoom - sliderStepSize) > minSliderRange) {
                newZoom -= sliderStepSize;
            } else {
                newZoom = minSliderRange;
            }
        }
        return newZoom;
    }
    app.unableDisableZoomButtons = function () {
        var $zoomInButton = $('.btn-plus');
        var $zoomOutButton = $('.btn-minus');
        if (currentSliderVal === maxSliderRange) {
            $zoomInButton.addClass('disabled');
            $zoomOutButton.removeClass('disabled');
        } else if (currentSliderVal === minSliderRange) {
            $zoomInButton.removeClass('disabled');
            $zoomOutButton.addClass('disabled');
        } else {
            $zoomInButton.removeClass('disabled');
            $zoomOutButton.removeClass('disabled');
        }
    }

    app.setImageBound = function () {
        var $imgParPos = { left: parseInt($imageWrapper.css('left')), top: parseInt($imageWrapper.css('top')) };
        // var $imgBoundingBox = $img[0].getBoundingClientRect();
        var $imgBoundingBox = $('.zoomimg')[0].getBoundingClientRect();
        var $windowWidth = $(window).width();
        var $windowHeight = $(window).height();
        var newTop = $imgParPos.top;
        var newLeft = $imgParPos.left
        if ($imgParPos.left > ($imgBoundingBox.width / 2) - ($windowWidth / 2)) {
            newLeft = ($imgBoundingBox.width / 2) - ($windowWidth / 2);
        }
        if ($imgParPos.left < 0 && Math.abs($imgParPos.left) > ($imgBoundingBox.width / 2) - ($windowWidth / 2)) {
            newLeft = 0 - (($imgBoundingBox.width / 2) - ($windowWidth / 2));
        }
        if ($imgParPos.top > ($imgBoundingBox.height / 2) - ($windowHeight / 2)) {
            newTop = ($imgBoundingBox.height / 2) - ($windowHeight / 2);
        }
        if ($imgParPos.top < 0 && Math.abs($imgParPos.top) > ($imgBoundingBox.height / 2) - ($windowHeight / 2)) {
            newTop = 0 - (($imgBoundingBox.height / 2) - ($windowHeight / 2));
        }
        if ($imgBoundingBox.width < $(window).width()) {
            newLeft = 0
        }
        if ($imgBoundingBox.height < $(window).height()) {
            newTop = 0;
        }
        $imageWrapper.stop().animate({ 'top': newTop, 'left': newLeft }, 400);
    }
    app.ariaAnnounce = function (msg) {
        console.log(msg);
        if (msg) {
            $('#ariaMessages').html(msg);
        }
        setTimeout(function () {
            $('#ariaMessages').html("");
        }, 5000);
    };
    app.changeRange = function (OldValue) {
        OldMax = maxSliderRange;
        OldMin = minSliderRange;
        NewMax = 100;
        NewMin = minSliderRange;
        OldRange = (OldMax - OldMin)
        NewRange = (NewMax - NewMin)
        NewValue = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin;
        NewValue = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin;
        return Math.round(NewValue);
    }
})(Utils = Utils || {});
var Utils;
// Utility Functions End
$(document).ready(function () {
    $('.zoomimg').css({
        height: '100%',
        width: '90%'
    });
    $('[data-hotspot]').on('click keydown tourchstart', currentSlide);
    Utils.sliderObjInit();
    $('.btn-range1').on('click keydown', function (e) {
        if ((e.type === 'keydown' && (e.keyCode === '32' || e.keyCode === '13')) || e.type === 'click') {
            var direction = $(this).data("dir");
            var newZoom = Utils.getNewScaleByDirection(direction);
            Utils.setImageBound();
            Utils.sliderObj.moveSliderTo(newZoom);
            //  Utils.imageScaleChanged(newZoom);
            var msg = "Image Zoomed ";
            msg += direction === "plus" ? "In " : "Out ";
            var rangedZoom = Utils.changeRange(newZoom);
            msg += rangedZoom + "%";
            Utils.ariaAnnounce(msg);
        }
    });
    var isSliderDown = false;
    $(".rail, #imageSlider1").mousedown(() => {
        isSliderDown = true;
    });
    $(window).on('mouseup', (e) => {
        if (isSliderDown) {
            if ($(e.target).hasClass('rail')) {
                setTimeout(() => {
                    Utils.setImageBound();
                }, 100);
            } else {
                Utils.setImageBound();
            }
            isSliderDown = false;
        }
    });
    SetHotSpotPositions();
});
function manageBreadcrumbs(activeId) {
    var showbreadcrumbsIds = [];
    switch (activeId) {
        case 1:
            showbreadcrumbsIds = [1, 2];
            break;
        case 2:
            showbreadcrumbsIds = [0];
            break;
        case 3:
            showbreadcrumbsIds = [1, 2, 3];
            break;
        case 4:
            showbreadcrumbsIds = [1, 2, 4];
            break;
    }
    [1, 2, 3, 4].forEach((ele, i) => {
        if (showbreadcrumbsIds.indexOf(ele) === -1) {
            $(".hotspot_thumbnail_main ").find("#" + ele).hide();
        } else {
            $(".hotspot_thumbnail_main ").find("#" + ele).show();
        }
    })
}
var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(e) {
    var n = parseInt($(e.currentTarget).attr('data-hotspot'));
    if (e) {
        if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') {
            showSlides(slideIndex = n, e);
            manageBreadcrumbs(n);
        }
    }
    else {
        showSlides(slideIndex = n);
        manageBreadcrumbs(n);
    }
    setTimeout(() => {
        Utils.setImageBound();
    }, 500);
}
function showSlides(n, byEvent) {
    var i;
    var slides = document.getElementsByClassName("slides");
    var dots = document.getElementsByClassName("column");
    var captionText = document.getElementById("caption");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].className = slides[i].className.replace(" zoomimg", "");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "flex";
    slides[slideIndex - 1].classList.add("zoomimg");
    var element = document.getElementById(slideIndex.toString());
    element.classList.add("active");
    captionText.innerHTML = dots[slideIndex - 1].title;
    if (byEvent) {
        // console.log(byEvent.pageX, byEvent.pageY);
        var imgBox = $(slides[slideIndex - 1])[0].getBoundingClientRect();
        var imgLeft = imgBox.left;
        var imgTop = imgBox.top;
        var newLeft = byEvent.pageX - (parseInt($("#inner-image-area").width()) / 2);
        var newTop = byEvent.pageY - (parseInt($("#inner-image-area").height()) / 2);
        // console.log(byEvent.currentTarget)
        if (!$(byEvent.currentTarget).hasClass('column')) {
            $("#inner-image-area").css({
                'left': newLeft,
                'top': newTop,
                'opacity': 0,
                'transform': 'scale(0)'
            });
            $("#inner-image-area").animate({
                left: 0,
                top: 0,
                'opacity': 1,
                'transform': 'scale(1)'
            }, 400, 'easeOutCubic');
        }
        if (n === 2) {
            $(".hotspot_slide_wrap1").find('span:first').focus();
        }
        if (n === 1) {
            $(".hotspot_slide_wrap2").find('span:first').focus();
        }
    }
    if (captionText.innerHTML) {
        $(".caption-container").show();
    } else {
        $(".caption-container").hide();
    }
    Utils.sliderObj.moveSliderTo(0);
}


let element = document.getElementById('inner-image-area');
$(document).ready(function () {
    manageBreadcrumbs(1);
    resize();
    createDraggable();
    if (Utils.isOpenedOnMobile()) {
        $(".hotspot_slide_wrap1").parent().attr('tabindex', 0);
    } else {
        $(".hotspot_slide_wrap1").parent().removeAttr('tabindex');
    }
});
window.addEventListener("resize", resize);
function resize() {
    if (!Utils.isZoomed()) {
        if ($(window).width() <= 640) {
            Utils.getImageWrapper().find('.zoomimg').addClass('resp');
        } else {
            Utils.getImageWrapper().find('.zoomimg').removeClass('resp');
        }
    } else {
        Utils.getImageWrapper().find('.zoomimg').removeClass('resp');
    }
    // Utils.setImageBound();
    createDraggable()
}
Utils.getImageWrapper().dblclick(function () {
    if (!$('.btn-plus').hasClass('disabled')) {
        $('.btn-plus').trigger('click');
    }
});

function createDraggable() {
    $('#main-image-area').droppable({
        tolerance: 'fit'
    });
    Utils.getImageWrapper().draggable({
        start: function (event, ui) {
        },
        stop: function (event, ui) {
            Utils.setImageBound();
        },
        drag: function (event, ui) {
        }
    });
}

function SetHotSpotPositions(){
    try{
        if(typeof main_hotspot_positions != 'undefined' && main_hotspot_positions!=null){
            if(main_hotspot_positions.length>0){
                var main_hs_elmnts = $(".hotspot_slide_wrap2 .hotspot")
                for(var i=0;i<main_hs_elmnts.length;i++){
                    var l_pos = main_hotspot_positions[i];
                    if(l_pos["left"]!=undefined && l_pos["left"]!=null){
                        $(main_hs_elmnts[i]).css({"left":l_pos["left"]});
                    }
                    if(l_pos["right"]!=undefined && l_pos["right"]!=null){
                        $(main_hs_elmnts[i]).css({"right":l_pos["right"]});
                    }
                    if(l_pos["top"]!=undefined && l_pos["top"]!=null){
                        $(main_hs_elmnts[i]).css({"top":l_pos["top"]});
                    }
                    if(l_pos["bottom"]!=undefined && l_pos["bottom"]!=null){
                        $(main_hs_elmnts[i]).css({"bottom":l_pos["bottom"]});
                    }
                    if(l_pos["width"]!=undefined && l_pos["width"]!=null){
                        $(main_hs_elmnts[i]).css({"width":l_pos["width"]});
                    }
                    if(l_pos["height"]!=undefined && l_pos["height"]!=null){
                        $(main_hs_elmnts[i]).css({"height":l_pos["height"]});
                    }
                }
            }
        }

        if(typeof tree_hotspot_positions != 'undefined' && tree_hotspot_positions!=null){
            if(tree_hotspot_positions.length>0){
                var tree_hs_elmnts = $(".hotspot_slide_wrap1 .hotspot")
                for(var i=0;i<tree_hs_elmnts.length;i++){
                    var l_pos = tree_hotspot_positions[i];
                    if(l_pos["left"]!=undefined && l_pos["left"]!=null){
                        $(tree_hs_elmnts[i]).css({"left":l_pos["left"]});
                    }
                    if(l_pos["right"]!=undefined && l_pos["right"]!=null){
                        $(tree_hs_elmnts[i]).css({"right":l_pos["right"]});
                    }
                    if(l_pos["top"]!=undefined && l_pos["top"]!=null){
                        $(tree_hs_elmnts[i]).css({"top":l_pos["top"]});
                    }
                    if(l_pos["bottom"]!=undefined && l_pos["bottom"]!=null){
                        $(tree_hs_elmnts[i]).css({"bottom":l_pos["bottom"]});
                    }
                    if(l_pos["width"]!=undefined && l_pos["width"]!=null){
                        $(tree_hs_elmnts[i]).css({"width":l_pos["width"]});
                    }
                    if(l_pos["height"]!=undefined && l_pos["height"]!=null){
                        $(tree_hs_elmnts[i]).css({"height":l_pos["height"]});
                    }
                }
            }
        }
    }
    catch(err){

    }
}