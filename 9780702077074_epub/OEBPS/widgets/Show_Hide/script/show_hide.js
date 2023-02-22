/* Version 19.1, Date:31 MAR 2022 */
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
    var img1 = new Image();
    img1.src = "../images/Expand_Hover_N.svg"
    var img2 = new Image();
    img2.src = "../images/Collapse_N.svg"
    var img3 = new Image();
    img3.src = "../images/Collapse_hover_N.svg"
    $("div").children(".answer").hide();
})
