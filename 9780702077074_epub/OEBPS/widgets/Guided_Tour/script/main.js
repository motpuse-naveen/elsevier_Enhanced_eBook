// Handling next prev tooltip click
   function plusSlides(e) {
      var n = parseInt($(e.target).attr('data-nav'));
      var prevToolTip = Utils.getActiveTooltipNumber();
      Utils.setActiveTooltipNumber(n , true);
      var activeToolTipNumber = Utils.getActiveTooltipNumber();
      if (prevToolTip !== activeToolTipNumber) {
         $('#tooltip-'+activeToolTipNumber).parent().trigger('click');
         Utils.ariaAnnounce('Selected, '+$('#tooltip-'+activeToolTipNumber).find('p').text());
         autoDragPagination(activeToolTipNumber);
      }
      if (activeToolTipNumber >= 9) {
         $('.nextContainer a').addClass('disabled');
      } else {
         $('.nextContainer a').removeClass('disabled');
      }

      if (activeToolTipNumber <= 1) {
         $(".prevContainer a").addClass('disabled');
      } else {
         $('.prevContainer a').removeClass('disabled');
      }
   }
   
   function autoDragPagination(selectedStep) {
      setTimeout(() => {
         var $ul = $('ul.thumbnail_slidr_inner');
         $ulWrapper = $ul.parent();
         stepWidth = 34;
         ulWrapperWidth = $ulWrapper.width();
         wrapperCapacity = ulWrapperWidth / stepWidth;
         totalItemsWidth = $ul.find('li').length * stepWidth;
         var stepAtCenter = -1;
         var stepCountAtCenter = Math.floor(wrapperCapacity / 2);
         var oldLeft = parseInt($ul.css('left'))
         var minLeft = 0 - ((totalItemsWidth - ulWrapperWidth) + stepWidth);
         var maxLeft = 0;
         if (oldLeft === 0) {
            stepAtCenter = stepCountAtCenter;
         } else {
            var hiddenToLeft = Math.floor(Math.abs(oldLeft) / stepWidth);
            stepAtCenter = hiddenToLeft + stepCountAtCenter;
         }

         if (selectedStep > stepAtCenter) {
            var newLeft = oldLeft - ((selectedStep - stepAtCenter) * stepWidth);
            if (newLeft < minLeft) {
               newLeft = minLeft;
            }
            $ul.css('left', newLeft);
         } else {
            var newLeft = oldLeft + ((stepAtCenter - selectedStep) * stepWidth);
            if (newLeft > maxLeft) {
               newLeft = maxLeft;
            }
            $ul.css('left', newLeft);
         }
      }, 100);
   }
   $(document).ready(function() {
      var isSliderDown = false;
      $(".rail, #imageSlider1").on('mousedown touchstart', ()=>{
         isSliderDown = true;
      });
      $(window).on('mouseup  touchend', (e)=>{
         if (isSliderDown) {
             if ($(e.target).hasClass('rail')) {
                 setTimeout(() => {
                    Utils.setImageBound();        
                 }, 100);
             } else{
                Utils.setImageBound();
             }
             isSliderDown = false;
         }
     });
      $('.nextContainer a').on('click', plusSlides);
      $('.prevContainer a').on('click', plusSlides);
      $('.prevContainer a').addClass('disabled');
      
         Utils.sliderObjInit();
         $('.btn-range1').click(function() {
            var direction = $(this).data("dir");
            var newZoom = Utils.getNewScaleByDirection(direction);
            Utils.setImageBound();
            Utils.sliderObj.moveSliderTo(newZoom);
            //  Utils.imageScaleChanged(newZoom);
            var msg = "Image Zoomed ";
            msg += direction === "plus" ? "In " : "Out ";
            var rangedZoom = Utils.changeRange(newZoom);
            msg += rangedZoom +"%";
            Utils.ariaAnnounce(msg);
         });
      //  tooltip pagination
      $('.thumbnail_main .column').on('click keyup', (e) => {
         debugger;
         // console.log(e.type, e.keyCode);
         if ((e.type === 'keyup' && e.keyCode === 13) || e.type === 'click') {
            Utils.setActiveTooltipNumber($(e.currentTarget).attr('data-tooltipnumber').split('_')[1]);
            var toolTipId = 'tooltip-' + Utils.getActiveTooltipNumber();
            $('#'+toolTipId).parent().trigger('click');
            Utils.ariaAnnounce('Selected,' + $('#'+toolTipId).find('p').text());

            
            var activeToolTipNumber = Utils.getActiveTooltipNumber();
            if (activeToolTipNumber >= 9) {
               $('.nextContainer a').addClass('disabled');
            } else {
               $('.nextContainer a').removeClass('disabled');
            }

            if (activeToolTipNumber <= 1) {
               $(".prevContainer a").addClass('disabled');
            } else {
               $('.prevContainer a').removeClass('disabled');
            }
         }
      });
   // set the image-map width and height to match the img size
      $('#image-map').css({
         'width':$('#image-map img').width(),
         'height':$('#image-map img').height()
      });
      //tooltip direction
      var tooltipDirection;
      for (i=0; i<$(".pin").length; i++)
      {
         // set tooltip direction type - up or down             
         if ($(".pin").eq(i).hasClass('pin-down')) {
            tooltipDirection = 'tooltip-down';
         } else if ($(".pin").eq(i).hasClass('pin-left')) {
            tooltipDirection = 'tooltip-left';
         }else {
            tooltipDirection = 'tooltip-up';
         }
         var $toolTipAnchorWrapper = $('<div>', {
            'style' : "left:"+$(".pin").eq(i).data('xpos')+"px;top:"+$(".pin").eq(i).data('ypos')+"px",
            'class' : tooltipDirection+' tooltipInner',
            'tabindex': 0
         });
         var $tooltipAnchor = $('<div>', {
            class: 'tooltip',
            id: 'tooltip-'+(i+1),
            'tabindex': 0
         });
         //$toolTipAnchorWrapper.append(i+1);
         $toolTipAnchorWrapper.append("?");
         $tooltipAnchor.html($(".pin").eq(i).html());
         $toolTipAnchorWrapper.append($tooltipAnchor);
         $tooltipAnchor.focusout(()=>{
            Utils.hideToolTip();
         });
         // append the tooltip
         
         $("#image-map").append($toolTipAnchorWrapper);
}    
// show/hide the tooltip
   $('.tooltipInner').click(function(e) {
         if(e.target.closest("div.tooltip.is-visible")!=null
         && e.target.closest("div.tooltip.is-visible") !=undefined 
         && $(e.target.closest("div.tooltip.is-visible")).length>0){
            Utils.hideToolTip();
            Utils.setImageBound();
         }
         else{
         Utils.hideToolTip();
         // $(this).children('.tooltip').fadeIn(100);
         var $toolTip = $(this).children('.tooltip');
         // console.log('sliderStepSize')
         Utils.showToolTip($toolTip);
         }
         e.stopPropagation();
   });
   $('.tooltipInner').keydown(function(e) {
      if ((e.keyCode === 13)) {
         Utils.hideToolTip();
         // $(this).children('.tooltip').fadeIn(100);
         var $toolTip = $(this).children('.tooltip');
         // console.log('sliderStepSize')
         Utils.showToolTip($toolTip);
         e.stopPropagation();
      }
   });
});

// Utility Functions
   (function (app){
   var maxSliderRange = 150;
   var minSliderRange = 0;
   var currentScale = 1;
   var totalSteps = 6;
   var sliderStepSize = maxSliderRange / totalSteps;
   var $imageWrapper = $('#inner-image-area');
   var $img = $("#img");
   var currentSliderVal = 0;
   var activeTooltipNumber = 0;
   var sliders = document.getElementById('imageSlider1');
   app.sliderObj = new SliderA11y(sliders);
   var isSliderInit = false;
   app.sliderObjInit = function() {
      if (!isSliderInit) {
         app.sliderObj.init();
      }
   }
   app.setActiveTooltipNumber = function(n, nextPrevState) {
      n = parseFloat(n);
      if (nextPrevState) {
         activeTooltipNumber += n;
      } else {
         activeTooltipNumber = n;
      }
      if (activeTooltipNumber > 9) {
         activeTooltipNumber = 9;
     }
     if (activeTooltipNumber < 1) {
        activeTooltipNumber = 1;
     }
   }
   app.getActiveTooltipNumber = function () {
      return activeTooltipNumber;
   }
   app.announcementRange = {min: 0, max: 100};
   app.sliderRange = {min: minSliderRange, max: maxSliderRange};
   function scaleImage(scaleSliderVal) {
      currentScale = parseFloat(1) + ((parseInt(scaleSliderVal) * 0.01)*1);
      $imageWrapper.css('transform', 'scale(' + currentScale + ')');
      console.log()
      $('#imageSlider1').attr('aria-label', 'Image scale is ' + parseInt(app.changeRange(currentSliderVal)));
   }
   app.hideToolTip = function () {
      var $visibleToolbar = $('.is-visible');
      if ($visibleToolbar.length) {
         $visibleToolbar.fadeOut(30);
         $visibleToolbar.removeClass('is-visible');
      }
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
      //scaleImage(scaleSliderValue);
      Utils.unableDisableZoomButtons();
   }
   app.reset = function (e) {
      if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') {
         app.hideToolTip();
         app.imageScaleChanged(0);
         app.setImageBound(); 
         $('.column').removeClass('selected');
         app.ariaAnnounce('Image has been reset.');
         $(".refresh_btn").addClass("disabled")
         $(".prevContainer a").addClass('disabled');
      }
   }
    app.showToolTip = function ($tooltip) {
      app.sliderObj.moveSliderTo(10);
      app.setActiveTooltipNumber($tooltip.attr('id').split('-')[1]);
      $(".column").removeClass('selected');
      $(".column[data-tooltipnumber='col_"+Utils.getActiveTooltipNumber()+"']").addClass('selected');
      $(".refresh_btn").removeClass("disabled")
	  //;//.addClass('selected');
	  console.log($(".column[data-tooltipnumber]"), Utils.getActiveTooltipNumber())
      // console.log(Utils.getActiveTooltipNumber());
      $imageWrapper.css({'left' : 0, 'top' : 0});
      setTimeout(() => {
         var isLeftUpdated = false;
         var isTopUpdated = false;
         var winHeight = $(window).height();
         var winWidth = $(window).width();
         $tooltip.show();
         var toolTipoffset = $tooltip[0].getBoundingClientRect();
         $tooltip.hide();
         var newLeft = toolTipoffset.left;
         var newTop = toolTipoffset.top;
         $imageOffset = $imageWrapper.offset();
         if (toolTipoffset.right > winWidth) {
            newLeft = $imageOffset.left - ((toolTipoffset.right - winWidth) - 50);
            isLeftUpdated = true;
         }
         if (toolTipoffset.left < 50) {
            newLeft = Math.abs(toolTipoffset.left) + 50;
            isLeftUpdated = true;
         }
         if (toolTipoffset.top < 50) {
            newTop = Math.abs(toolTipoffset.top) + 50;
            isTopUpdated = true;
         }
         if (toolTipoffset.bottom > winHeight) {
            newTop = $imageOffset.top - ((toolTipoffset.bottom - winHeight) - 50);
            isTopUpdated = true;
         }
         if (isTopUpdated && isLeftUpdated) {
            $imageWrapper.animate({'left': newLeft+'px', 'top': newTop+'px'}, 20);
         } else if (isTopUpdated) {
            $imageWrapper.animate({'top': newTop+'px'}, 100);
         } else if (isLeftUpdated) {
            $imageWrapper.animate({'left': newLeft+'px'}, 100);
         }
         $tooltip.fadeIn(500);
         $tooltip.find('p').focus();
         $tooltip.addClass('is-visible');
      }, 200);
   }
  app.getNewScaleByDirection = function (direction) {
      var newZoom = currentSliderVal;
      if (direction == "plus")  {
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
      if(currentSliderVal === maxSliderRange) {
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
           var $imgParPos = {left: parseInt($imageWrapper.css('left')), top: parseInt($imageWrapper.css('top'))};
           var $imgBoundingBox = $img[0].getBoundingClientRect();
           var $windowWidth = $(window).width();
           var $windowHeight = $(window).height();
           var newTop = $imgParPos.top;
           var newLeft = $imgParPos.left

           if ($imgParPos.left > ($imgBoundingBox.width / 2) - ($windowWidth/2)) {
               newLeft = ($imgBoundingBox.width / 2) - ($windowWidth/2) + 140;
           }

           if ($imgParPos.left < 0 && Math.abs($imgParPos.left) > ($imgBoundingBox.width / 2) - ($windowWidth/2)) {
               newLeft = 0 - (($imgBoundingBox.width / 2) - ($windowWidth/2)) -100;
           }

           if ($imgParPos.top > ($imgBoundingBox.height / 2) - ($windowHeight/2)) {
               newTop = (($imgBoundingBox.height / 2) - ($windowHeight/2)) + 150;
           }

           if ($imgParPos.top < 0 && Math.abs($imgParPos.top) > ($imgBoundingBox.height / 2) - ($windowHeight/2)) {
               newTop = 0 - (($imgBoundingBox.height / 2) - ($windowHeight/2)) - 100;
           }
           if($imgBoundingBox.width < $(window).width()) {
               newLeft = 0
           } 
           if($imgBoundingBox.height < $(window).height()) {
               newTop = 0;
           }
           $imageWrapper.animate({'top': newTop, 'left': newLeft}, 400);
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
   
   let element = document.getElementById('inner-image-area');
   $(document).ready(function () {
      //  manageBreadcrumbs(1);
    resize();
       createDraggable();
       $('#imageSlider .ui-slider-handle').attr({
          'aria-label': 'Image scale is 0',
          'aria-valuenow': 0,
          'aria-valuemin': 0,
          'aria-valuemax': 100,
          'role': 'slider',
          });
   });
   window.addEventListener("resize", resize);
   function resize() {
       if (!Utils.isZoomed()) {
           if ($(window).width() <= 640) {
               Utils.getImageWrapper().find('#img').addClass('resp');
           } else {
               Utils.getImageWrapper().find('#img').removeClass('resp');
           }
       } else {
           Utils.getImageWrapper().find('#img').removeClass('resp');
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
         handle: $('#img'),
         start: function (event, ui) {
            //Utils.hideToolTip();
         },
         stop: function (event, ui) {
            Utils.hideToolTip();
            Utils.setImageBound();
         },
         drag: function (event, ui) {
         }
      });
   }