$(".show_hide_ans").on('click', function (event) {
    $(this).toggleClass('show-ans');
    if ($.trim($(this).text()) == "Hide Answer") {
          $(this).text("Show Answer");
          $(this).attr('title', "Show Answer");
          $(this).attr('aria-expanded', false);
    } else {
          $(this).text("Hide Answer");
          $(this).attr('title', "Hide Answer");
          $(this).attr('aria-expanded', true);
    }
    $(this).next(".answer").slideToggle(200);

    event.preventDefault();
    event.stopPropagation();
});

$(document).ready(function () {
    $("div").children(".answer").hide();
})

cubeData.howMany === 1 ?(smallCubeHolder = (Const.config.SmallCubeFlag === true)? ' small' : ''):(smallCubeHolder = (cubeData.size[0] === 'small') ? ' small' : '');

cubeData.howMany === 1 ? (smallCubeHolder = Const.config.SmallCubeFlag === true ? ' small' : '') : (smallCubeHolder = cubeData.size[0] === 'small' ? ' small' : '');

if(cubeData.howMany === 1){
    smallCubeHolder = ' small';
    if(Const.config.SmallCubeFlag === true){
        smallCubeHolder = ' small';
    }
    else{
        smallCubeHolder ='';
    }

}
else{
    smallCubeHolder = ' small';
    if(cubeData.size[0] === 'small'){
        smallCubeHolder = ' small';
    }
    else{
        smallCubeHolder ='';
    }
}