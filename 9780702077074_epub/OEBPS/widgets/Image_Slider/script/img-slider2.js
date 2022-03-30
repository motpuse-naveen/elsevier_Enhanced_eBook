/* Version 19, Date:30 MAR 2022 */
$(document).ready(function () {
    var isDragging = false;
    var framePadding = 40;
    var getTrackWidth = () => $(".track").width();
    var dragUnit = 40;
    var $draggableDot = $("#draggableDot");
    var getStepLeft = function (stepNumber) {
        return $('.radio-button-'+stepNumber).css('left');
    }
    var phaseDesc = [
        "The cyclin D/Cdk4 complex assembles at the beginning of G1; the cyclin E/Cdk2 complex assembles near the end of G1 as the cell is preparing to cross checkpoint 1 to start DNA synthesis",
        "The cyclin A/Cdk2 complex assembles as DNA synthesis starts.",
        "Completion of G2 is indicated by the assembled cyclin A/Cdk1 complex",
        "A cell crosses checkpoint 2 to initiate mitosis when the cyclin B/Cdk1 complex assembles. The cyclin B/Cdk1 complex is degraded by the 26S proteasome and an assembled cyclin D/Cdk4 marks the start of the G1 phase of a new cell cycle"
    ];
    var selectedStep = 1;
    $('.arrow-left').addClass('disabled');
    $draggableDot.mousedown(function () {
        isDragging = true;
    });
    $("*").mouseup(function () {
        if (isDragging) {
            contents.forEach(content => {
                content.classList.remove("active");
            });
            subcaptionContents.forEach(content => {
            content.classList.remove("active");
        });
            if (dragUnit < (getTrackWidth() / 5)) {
                // step1
                selectStep(1, 'G1');
            }
            if ((dragUnit >= (getTrackWidth() * 0.20) && dragUnit < (getTrackWidth() * 0.50))) {
                // step2
                selectStep(2, 'S');
            }
            if ((dragUnit >= (getTrackWidth() * 0.50) && dragUnit < (getTrackWidth() * 0.84))) {
                // step2
                selectStep(3, 'G2');
            }
            if (dragUnit >= getTrackWidth() * 0.84) {
                // step3
                selectStep(4, 'Mitosis');
            }
            isDragging = false;
        }
    });
    $('.track').mouseup(function (e) {
        handleDotMove(e);
        console.log('hi')
    });
    $draggableDot.mouseup(function (e) {
        handleDotMove(e);
        console.log('hi')
    });
    var trackMouseDown = false;
    $('.track').mousedown(function (e) {
        $draggableDot.css({
            'margin-left': e.pageX - 70
        })
        trackMouseDown = true;
        console.log(e.pageX - 70)
    });
    $(document).mousemove(function (e) {
        if (isDragging) {
            dragUnit = e.clientX - framePadding;
            // console.log(e.pageX - 70)
            if (dragUnit > getTrackWidth()) {
                $draggableDot.css({
                    'margin-left': getStepLeft(4)
                });
            } else if (dragUnit < framePadding) {
                $draggableDot.css({
                    'margin-left': getStepLeft(1)
                });
            } else {
                $draggableDot.css('margin-left', dragUnit);
            }
        }
    });
    const tabs = document.querySelector(".main-image-area");
    const tabButton = document.querySelectorAll(".tab-marker");
    const contents = document.querySelectorAll(".Nervous-system");
    const subcaptionContents = document.querySelectorAll(".subcaption");
      
    wrapper = document.getElementById('inner-image-area'),
        tabs.onclick = e => {
            const id = e.target.dataset.id;
            if (id) {
                tabButton.forEach(btn => {
                    btn.classList.remove("active");
                });
                e.target.classList.add("active");
                jQuery('#selectedPhase').text(jQuery('.buttonWrapper .tab-marker.active .marker').text());
                contents.forEach(content => {
                    content.classList.remove("active");
                });
                subcaptionContents.forEach(content => {
                    content.classList.remove("active");
                });
                const element = document.getElementById(id);
                element.classList.add("active");
                const element2 = document.getElementsByClassName(id);
                $(element2).addClass('active');
                handleDotMove(e);
            }
        }

    function handleDotMove(e) {
        contents.forEach(content => {
            content.classList.remove("active");
        });
        subcaptionContents.forEach(content => {
            content.classList.remove("active");
        });
        dragUnit = e.clientX - framePadding;
        if (dragUnit < (getTrackWidth() / 5)) {
            // step1
            selectStep(1, 'G1');
            // setTimeout(function(){ $draggableDot.animate({'margin-left':step1})}, 3000);
        }
        if ((dragUnit >= (getTrackWidth() * 0.20) && dragUnit < (getTrackWidth() * 0.50))) {
            // step2
            selectStep(2, 'S');
            // setTimeout(function(){  $draggableDot.css({'margin-left':step2}) }, 3000);
        }
        if ((dragUnit >= (getTrackWidth() * 0.50) && dragUnit < (getTrackWidth() * 0.84))) {
            // step2
            selectStep(3, 'G2');
            // setTimeout(function(){  $draggableDot.css({'margin-left':step2}) }, 3000);
        }
        if (dragUnit >= getTrackWidth() * 0.85) {
            // step3
            selectStep(4, 'Mitosis');
            // setTimeout(function(){ $draggableDot.css({'margin-left':step3})}, 3000);
        }
    }
    function onRightArrowMouseUp (e) {
        if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'mouseup') {
            contents.forEach(content => {
                content.classList.remove("active");
            });
            subcaptionContents.forEach(content => {
                content.classList.remove("active");
            });
            if (jQuery('#selectedPhase').text() === 'G1') {
                selectStep(2, 'S');
            } else if (jQuery('#selectedPhase').text() === 'S') {
                selectStep(3, 'G2');
            } else if (jQuery('#selectedPhase').text() === 'G2') {
                selectStep(4, 'Mitosis');
            } else {
                selectStep(1, 'G1');
            }
        }
    }
    function onLeftArrowMouseUp (e) {
        if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'mouseup') {
            contents.forEach(content => {
                content.classList.remove("active");
            });
            subcaptionContents.forEach(content => {
                content.classList.remove("active");
            });
            if (jQuery('#selectedPhase').text() === 'G1') {
                selectStep(4, 'Mitosis');
            } else if (jQuery('#selectedPhase').text() === 'S') {
                selectStep(1, 'G1');
            }else if (jQuery('#selectedPhase').text() === 'G2') {
                selectStep(2, 'S');
            } else {
                selectStep(3, 'G2');
            }
        }
    }
    function removeEvent($ele, event) {
        $ele.off(event);
    }
    function addMouseUpToArrowLeft() {
        $('.arrow-left').unbind('mouseup keydown').bind('mouseup keydown', onLeftArrowMouseUp);
    }
    function addMouseUpToArrowRight() {
        $('.arrow-right').unbind('mouseup keydown').bind('mouseup keydown', onRightArrowMouseUp);
    }
    
    // addMouseUpToArrowLeft();
    addMouseUpToArrowRight();
    $('.tab-marker').keyup(function (e) {
        if (e.keyCode === 9) {
            contents.forEach(content => {
                content.classList.remove("active");
            });
            subcaptionContents.forEach(content => {
            content.classList.remove("active");
        });
            if ($(this).attr('data-id') === 'img-1') {
                selectStep(1, 'G1');
            } else if ($(this).attr('data-id') === 'img-2') {
                selectStep(2, 'S');
            } else if ($(this).attr('data-id') === 'img-3') {
                selectStep(3, 'G2');
            } else if ($(this).attr('data-id') === 'img-4') {
                selectStep(4, 'Mitosis');
            }
        }
    });

    function selectStep(stepNumber, phaseText) {
        console.log(Utils)
        $draggableDot.animate({
            'margin-left': getStepLeft(stepNumber)
        }, 200)
        $('#img-'+stepNumber).addClass('active');
        $('.img-'+stepNumber).addClass('active');
        // jQuery('#selectedPhase').text('G1');
        jQuery('#selectedPhase').text(phaseText);
        selectedStep = stepNumber;
        Utils.ariaAnnounce(phaseDesc[stepNumber-1]);
        // $draggableDot.attr('aria-label', phaseText + phaseDesc[stepNumber-1])
        if (stepNumber === 1){
            $('.arrow-left').addClass('disabled');
            removeEvent($('.arrow-left'), 'mouseup keydown');
        } else {
            $('.arrow-left').removeClass('disabled');
            addMouseUpToArrowLeft();
        }
        if (stepNumber === 4){
            $('.arrow-right').addClass('disabled');
            removeEvent($('.arrow-right'), 'mouseup keydown');
        } else {
            $('.arrow-right').removeClass('disabled');
            addMouseUpToArrowRight();
        }
    }
    window.addEventListener("resize", ()=>{
        $draggableDot.css({
            'margin-left': getStepLeft(selectedStep)
        });
    });
});