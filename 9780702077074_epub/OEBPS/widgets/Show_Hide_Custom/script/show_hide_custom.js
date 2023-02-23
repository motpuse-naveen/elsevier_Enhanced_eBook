/* Version 19.1, Date:31 MAR 2022 */
$(".show_hide_ans_custom").on('click', function (event) {
    if ($(this).hasClass('show-ans')) {
          $(this).attr('aria-expanded', true);
    } else {
          $(this).attr('aria-expanded', false);
    }
    $(this).toggleClass('show-ans');
    $(this).next(".answer_cust").slideToggle(200);
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
    $("div").children(".answer_cust").hide();
})
