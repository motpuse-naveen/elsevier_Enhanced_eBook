$(document).ready(function (){
    var $bubbleTips = $('[data-dfn]');
    $bubbleTips.on('click keydown', function (e) {
        // console.log(e.type, e.keyCode)
        if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') {
            if (!$('.dropdown-content').is(':visible')) {
                var dfnCode = $(e.target).attr('data-dfn');
                Utils.getTooltip(dfnCode, $(e.target));
            } else {
                $('.dropdown-content').hide();
            }
        }
    });
    $(window).click((e)=>{
        if (
            !$(e.target).hasClass('def-img') && 
            !$(e.target).hasClass('dropdown-content') && 
            $(e.target).parents('.dropdown-content').length <= 0
        ) {
            $('.dropdown-content').hide();
        }
    });
    $('.dropdown').on ('keydown', '.dropdown-content', (e)=> {
        console.log($(e.target))
        if (e.type === 'keydown' && e.keyCode === 27) { 
            $(e.target).parent().focus();   
            $(e.target).hide();
        }
    })
});

(function (app) {
    var dfnLinks = glossaries;
    app.ariaAnnounce = function (msg) {
        if (msg) {
            $('#ariaMessages').html(msg);
        }
        setTimeout(function () {
            $('#ariaMessages').html("");
        }, 5000);
    };
    app.getTooltip = function(dfnCode, $ele) {
        if (dfnLinks.hasOwnProperty(dfnCode)) {
            var $content = $('<div>', {
                'class': 'dropdown-content',
                'tabindex': 0,
                'aria-live':'assertive'
            });
            var isLoaded = new Promise((resolve, reject) =>{
                if (!$ele.children().length) {
                    $content.append($(dfnLinks[dfnCode]));
                        $ele.append($content)
                        resolve({data: $content, status: true});
                    // });
                } else {
                    resolve({data: null, status: false});
                }
            });
            isLoaded.then((res)=>{
                var $element = $ele.find('.dropdown-content');
                if (!res.status) {
                    $element.toggle();
                }
                if ($element.is(':visible')) {
                    var dimens = {
                        windowWidth: $(window).width(),
                        eleBox:  $element[0].getBoundingClientRect()
                    }
                    if (dimens.eleBox.right > dimens.windowWidth) {
                        var extraleft = dimens.eleBox.right - dimens.windowWidth;
                        $element.css('left', parseInt($element.css('left')) - (extraleft + 20));
                    }
                    if (dimens.eleBox.top<0) {
                        var scrollTop = $(window).scrollTop();
                        $(window).scrollTop(scrollTop + (dimens.eleBox.top - 20 ));
                    }
                    MathJax.typeset();
                    //MathJax.typesetPromise()
                }
                var data = null;
                if (res.data) {
                    data = res.data;
                } else {
                    data = $element;
                }
                app.ariaAnnounce($(data).text());
            })
        }
    };
})(Utils = Utils || {});
var Utils;