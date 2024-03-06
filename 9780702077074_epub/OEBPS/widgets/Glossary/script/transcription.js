/* Version 19, Date:30 MAR 2022 */
$(document).ready(function (){
    bind_glossary_events();
    $(window).click((e)=>{
        if (
            !$(e.target).hasClass('def-img') && 
            !$(e.target).hasClass('dropdown-content') && 
            $(e.target).parents('.dropdown-content').length <= 0
        ) { 
            setTimeout(function(){
                $('.dropdown-content').hide();
                //NM: 09-June-2023 - The code is added to fix issue 
                //Related to the annotation links in poptip is not working on ipad
                $('.dropdown-content').each(function(){
                    if($(this).closest(".dropdown[temp-data-dfn]").length>0){
                        var tempdataDefElm =$(this).closest(".dropdown[temp-data-dfn]")
                        var tempdataDefVal =  tempdataDefElm.attr("temp-data-dfn");
                        tempdataDefElm.removeAttr("temp-data-dfn");
                        tempdataDefElm.attr("data-dfn", tempdataDefVal);
                    }
                });
            },200);
        }
    });
    $('.dropdown').on('keydown', '.dropdown-content', (e)=> {
        console.log($(e.target))
        if (e.type === 'keydown' && e.keyCode === 27) { 
            $(e.target).parent().focus();   
            $(e.target).hide();
            //NM: 09-June-2023 - The code is added to fix issue 
            //Related to the annotation links in poptip is not working on ipad
            $(e.target).each(function(){
                if($(this).closest(".dropdown[temp-data-dfn]").length>0){
                    var tempdataDefElm =$(this).closest(".dropdown[temp-data-dfn]")
                    var tempdataDefVal =  tempdataDefElm.attr("temp-data-dfn");
                    tempdataDefElm.removeAttr("temp-data-dfn");
                    tempdataDefElm.attr("data-dfn", tempdataDefVal);
                }
            });
        }
    });
});

function bind_glossary_events(){
    //var $bubbleTips = $('[data-dfn]');
    //$('[data-dfn]').on('click keydown', function (e) {
    $(document).on('click keydown', '[data-dfn]', function (e) {
        console.log(e.target)
        var dfnCode = $(e.target).closest("[data-dfn]").attr('data-dfn');
        if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') {
            if (!$('.dropdown-content').is(':visible')) {
                Utils.getTooltip(dfnCode, $(e.target).closest("[data-dfn]"));
            } else {
                var closestdropdwn = $('.dropdown-content:visible').closest(".dropdown");
                var openanotherpoptip = false;
                if(closestdropdwn!=undefined){
                    var in_openDef = closestdropdwn.attr("data-dfn")
                    if(in_openDef!=undefined){
                        if(in_openDef != dfnCode){
                            openanotherpoptip = true;
                        }
                    }
                }
                setTimeout(function(){
                    $('.dropdown-content').hide();
                    //NM: 09-June-2023 - The code is added to fix issue 
                    //Related to the annotation links in poptip is not working on ipad
                    $('.dropdown-content').each(function(){
                        if($(this).closest(".dropdown[temp-data-dfn]").length>0){
                            var tempdataDefElm =$(this).closest(".dropdown[temp-data-dfn]")
                            var tempdataDefVal =  tempdataDefElm.attr("temp-data-dfn");
                            tempdataDefElm.removeAttr("temp-data-dfn");
                            tempdataDefElm.attr("data-dfn", tempdataDefVal);
                        }
                    });
                },200)
                if(openanotherpoptip){
                    Utils.getTooltip(dfnCode, $(e.target).closest("[data-dfn]"));
                }
            }
        }
        //e.stopPropagation();
    });
}

$(document).on('click keydown', '.dropdown-content a[href]', function (e) {
    $('.dropdown-content').each(function(){
        if($(this).closest(".dropdown[temp-data-dfn]").length>0){
            var tempdataDefElm =$(this).closest(".dropdown[temp-data-dfn]")
            var tempdataDefVal =  tempdataDefElm.attr("temp-data-dfn");
            tempdataDefElm.removeAttr("temp-data-dfn");
            tempdataDefElm.attr("data-dfn", tempdataDefVal);
        }
    });
    $('.dropdown-content').hide();
    e.stopPropagation();
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
                //if (!$ele.children().length) {
                if (!$ele.find(".dropdown-content").length) {
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
                    //NM: 09-June-2023 - The code is added to fix issue 
                    //Related to the annotation links in poptip is not working on ipad
                    if($element.find('a[href^="#"]').length>0){
                        if($element.closest(".dropdown[data-dfn]").length>0){
                            var dataDefElm = $element.closest(".dropdown[data-dfn]");
                            var dataDefVal =  dataDefElm.attr("data-dfn");
                            dataDefElm.removeAttr("data-dfn");
                            dataDefElm.attr("temp-data-dfn", dataDefVal);
                        }
                    }
                    if (typeof MathJax != 'undefined' && typeof MathJax != 'null'){
                        MathJax.typeset();
                        //MathJax.typesetPromise()
                    }
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