$(document).ready(function () {
    // Utils.sliderObjInit();
    $('.btn-range1').click(function () {
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
    });
});
// Utility Functions
(function (app) {
    var maxSliderRange = 150;
    var minSliderRange = 0;
    var currentScale = 1;
    var totalSteps = 6;
    var sliderStepSize = maxSliderRange / totalSteps;
    var $imageWrapper = $('#inner-image-area');
    app.$img = $("#img1");
    app.activeImg = "img1";
    var currentSliderVal = 0;
    app.announcementRange = { min: 0, max: 100 };
    app.sliderRange = { min: minSliderRange, max: maxSliderRange };
    // var sliders = document.getElementById('imageSlider1');
    // app.sliderObj = new SliderA11y(sliders);
    var isSliderInit = false;
    app.sliderObjInit = function () {
        if (!isSliderInit) {
            app.sliderObj.init();
        }
    }
    function scaleImage(scaleSliderVal) {
        currentScale = parseFloat(1) + ((parseInt(scaleSliderVal) * 0.01) * 4);
        $imageWrapper.css('transform', 'scale(' + currentScale + ')');
        $('#imageSlider1').attr('aria-label', 'Image scale is ' + parseInt(app.changeRange(currentSliderVal)) + '%');
    }
    app.getImageWrapper = function () {
        return $imageWrapper;
    }
    app.$imageSlider = $("#imageSlider");
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
        var $imgBoundingBox = $("#" + Utils.activeImg)[0].getBoundingClientRect();
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
        $imageWrapper.animate({ 'top': newTop, 'left': newLeft }, 400);
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
var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
    Utils.activeImg = 'img' + n;
}
function showSlides(n) {
    //   Utils.ariaAnnounce('Image ' + n + ' Selected')
    var i;
    var slides = document.getElementsByClassName("slides");
    var dots = document.getElementsByClassName("column");
    var captionText = document.getElementById("caption");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "flex";
    var element = document.getElementById(slideIndex.toString());
    element.classList.add("active");
    captionText.innerHTML = '<b>' + dots[slideIndex - 1].title.substr(0, 2) + '</b>' + dots[slideIndex - 1].title.substr(2);
    Utils.ariaAnnounce('Image ' + slideIndex + ' Selected')
}

let element = document.getElementById('inner-image-area');
$(document).ready(function () {
    resize();
    createDraggable();

    $('.column').mouseover((e) => {
        $(e.currentTarget).find('.column_inner').css('opacity', 1)
    }).mouseleave((e) => {
        $(e.currentTarget).find('.column_inner').css('opacity', 0)
    });
});
window.addEventListener("resize", resize);
function resize() {
    if (!Utils.isZoomed()) {
        if ($(window).width() <= 640) {
            Utils.getImageWrapper().find('#' + Utils.activeImg).addClass('resp');
            console.log(Utils.isZoomed())
        } else {
            Utils.getImageWrapper().find('#' + Utils.activeImg).removeClass('resp');
        }
    } else {
        Utils.getImageWrapper().find('#' + Utils.activeImg).removeClass('resp');
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
// New Slider JS Code Start
Utils.$imageSlider.slider({
    range: "max",
    min: Utils.getSliderMinRange(),
    max: Utils.getSliderMaxRange(),
    step: 1,
    value: 0,
    slide: function (event, ui) {
        $("#sliderInputBox").val(ui.value);
        var value1 = $("#sliderInputBox").val();
        Utils.imageScaleChanged(value1)
    },
    start: function () {
    },
    stop: function (event, ui) {
        Utils.setImageBound();
        var rangedZoom = Utils.changeRange(parseInt(ui.value));
        var msg = `Image zoomed ${rangedZoom}%`;
        Utils.ariaAnnounce(msg);
    }
});
$('.btn-range').click(function () {
    var direction = $(this).data("dir");
    var newZoom = Utils.getNewScaleByDirection(direction);
    Utils.setImageBound();
    Utils.imageScaleChanged(newZoom);
    var msg = "Image Zoomed ";
    msg += direction === "plus" ? "In " : "Out ";
    var rangedZoom = Utils.changeRange(newZoom);
    msg += rangedZoom + "%";
    Utils.ariaAnnounce(msg);
});
$(".column").focusout((e) => {
    $(e.target).removeClass('active');
})
$(".column").focus((e) => {
    $(e.target).addClass('active');
    $(e.target).trigger('click')
});