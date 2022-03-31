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
    $("div").children(".answer").hide();
})
