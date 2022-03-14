const correctFBText = "Correct."
const incorrectFBText = "Incorrect. Please try again."
var paginationTabindex = 10001;
var optionsIndex = 1;
const tabs = document.querySelector(".tab-content");
const tabButton = document.querySelectorAll(".step");
const contents = document.querySelectorAll(".tab-pane");
function disablenextPrevButtons(selector) {
    if (selector === '.arrow-right') {
        $('.arrow-right').addClass('disabled');
        // $('.arrow-right').removeAttr('tabindex');
        $('.arrow-right').attr('aria-disabled', true);
        $('.arrow-left').removeAttr('aria-disabled');
        $('.arrow-left').removeClass('disabled');
        // $('.arrow-left').attr('tabindex', 0);
        // $('.mcq_toolbar_main').find('li.nav-item').last().focus();
    } else {
        $('.arrow-left').addClass('disabled');
        $('.arrow-left').attr('aria-disabled', true);
        // $('.arrow-left').removeAttr('tabindex');
        $('.arrow-right').removeAttr('aria-disabled');
        $('.arrow-right').removeClass('disabled');
        // $('.arrow-right').attr('tabindex', 0);
        // $('.mcq_toolbar_main').find('li.nav-item').first().focus();
    }
}
function getQuestionByEvent(e) {
    var id;
    if (e.type === "keydown") {
        id = $(e.target).find('a').attr('data-id');
    } else {
        if ($(e.target).is('span')) {
            id = $(e.target).parent().attr('data-id');
        } else if ($(e.target).is('a')) {
            id = $(e.target).attr('data-id');
        }
        if (e.type === "click" && $(e.target).find('a').length) {
            id = $(e.target).find('a').attr('data-id');
        }
    }
    if (id) {
        getNewQuestion(parseInt(id.split('-')[1]));
        $('.nav-link').removeClass('active');
        if (e.type === "keydown") {
            $(e.target).find('a').addClass("active");
        } else {
            if ($(e.target).is('span')) {
                $(e.target).parent().addClass("active");
            } else {
                $(e.target).addClass("active");
            }
            if (e.type === "click" && $(e.target).find('a').length) {
                $(e.target).find('a').addClass("active");
            }
        }
        $('#questionNumber').focus();
        if (parseInt(id.split('-')[1]) === quiz.length) {
            disablenextPrevButtons('.arrow-right')
        } else if (parseInt(id.split('-')[1]) === 1) {
            disablenextPrevButtons('.arrow-left')
        } else {
            $('.arrow-right').removeClass('disabled');
            $('.arrow-right').removeAttr('aria-disabled');
            $('.arrow-right').attr('tabindex', 0);
            $('.arrow-left').removeClass('disabled');
            $('.arrow-left').removeAttr('aria-disabled');
            $('.arrow-left').attr('tabindex', 0);
        }
    }
}
$(".steps").on('click keydown', function (e) {
    if ((e.type === 'keydown' && e.keyCode == 13) || e.type === 'click') {
        getQuestionByEvent(e);
        $ul = $('.steps ul');
        $ulWrapper = $ul.parent();
        stepWidth = 38;
        ulWrapperWidth = $ulWrapper.width();
        wrapperCapacity = ulWrapperWidth / stepWidth;
        totalItemsWidth = $('.steps ul li').length * stepWidth;
        var stepAtCenter = -1;
        var $selectedStep = $(e.target);
        var selectedStep;
        if (e.type === "keydown") {
            selectedStep = $selectedStep.find('a').attr('data-id').split('-')[1];
        } else {
            if ($selectedStep.is('span')) {
                selectedStep = $selectedStep.parent().attr('data-id').split('-')[1];
            } else if ($selectedStep.is('a')) {
                selectedStep = $selectedStep.attr('data-id').split('-')[1];
            }
            if (e.type === "click" && $selectedStep.find('a').length) {
                selectedStep = $selectedStep.find('a').attr('data-id').split('-')[1];
            }
        }
        autoDragPagination(selectedStep);
        // get central item by removing css.left
    }
});
function autoDragPagination(selectedStep) {
    $ul = $('.steps ul');
    $ulWrapper = $ul.parent();
    stepWidth = 38;
    ulWrapperWidth = $ulWrapper.width();
    wrapperCapacity = ulWrapperWidth / stepWidth;
    totalItemsWidth = $('.steps ul li').length * stepWidth;
    var stepAtCenter = -1;
    var stepCountAtCenter = Math.floor(wrapperCapacity / 2);
    var oldLeft = parseInt($ul.css('left'))
    var minLeft = 0 - ((totalItemsWidth - ulWrapperWidth) + stepWidth);
    var maxLeft = 0;
    // evaluating Center
    if (oldLeft === 0) {
        stepAtCenter = stepCountAtCenter;
    } else {
        var hiddenToLeft = Math.floor(Math.abs(oldLeft) / stepWidth);
        stepAtCenter = hiddenToLeft + stepCountAtCenter;
    }
    // Applying left
    if (selectedStep > stepAtCenter) {
        var newLeft = oldLeft - ((selectedStep - stepAtCenter) * stepWidth);
        if (newLeft < minLeft) {
            newLeft = minLeft;
        }
        // // (totalItemsWidth - ulWrapperWidth)
        // for(let i = 0; i&lt;=hiddenUnderLeft;i++) {
        //    // console.log()
        //    $($('.steps ul li')[i]).find('a').removeAttr('tabindex');
        // }
        $ul.css('left', newLeft);
    } else {
        var newLeft = oldLeft + ((stepAtCenter - selectedStep) * stepWidth);
        if (newLeft > maxLeft) {
            newLeft = maxLeft;
        }
        $ul.css('left', newLeft);
    }
    // $('.steps ul li a').removeAttr('tabindex');
    // var hiddenUnderLeft = (Math.abs(newLeft)/stepWidth);
    // for (let i = hiddenUnderLeft+1; i&lt; hiddenUnderLeft + Math.floor(wrapperCapacity); i++) {
    //    $($('.steps ul li')[i]).find('a').attr('tabindex', 0);
    // }
}
var QuestionNumber = document.querySelector("#questionNumber");
var QuestionName = document.querySelector("#questionName");
var optionContainer = document.querySelector(".Multiple-choice");
var correctMsg = document.querySelector(".correct");
var indicator = document.querySelector(".nav-tabs");
var subHeadingContainer = document.querySelector(".content-heading");
var questionCounter = 0;
var currentQuestion;
var availableQuestion = [];
var availableOption = [];
// add quiz question to new array;
function setAvailableQuestion() {
    var totalQuestion = quiz.length;
    for (var i = 0; i < totalQuestion; i++) {
        availableQuestion.push(quiz[i]);
    }
}
// goto question and new question of array
function getNewQuestion(question) {
    QuestionNumber.innerText = "Question " + (question);
    QuestionNumber.setAttribute('role', "heading");
    QuestionNumber.setAttribute('tabindex', '0');
    optionsIndex++;
    // get random question
    var questionIndex = quiz[question - 1];
    currentQuestion = questionIndex;
    QuestionName.innerHTML = currentQuestion.q;
    QuestionName.setAttribute('tabindex', '0');
    optionsIndex++
    if (currentQuestion.q2) {
        $('#subheading2').html(currentQuestion.q2);
        $('#subheading2').attr('tabindex', '0');
        $('#subheading2').show();
        optionsIndex++
    } else {
        $('#subheading2').removeAttr('aria-label');
        $('#subheading2').removeAttr('tabindex');
        $('#subheading2').hide();
        optionsIndex++
    }
    if (currentQuestion.q3.length) {
        $('#subheading3').html(currentQuestion.q3[0]);
        $('#subheading3').attr('tabindex', '0');
        $('#subheading3').show();
        optionsIndex++
    } else {
        $('#subheading3').removeAttr('aria-label');
        $('#subheading3').removeAttr('tabindex');
        $('#subheading3').hide();
        optionsIndex++
    }
    if(currentQuestion.optionStyleType!=undefined && currentQuestion.optionStyleType!=null && currentQuestion.optionStyleType!=""){
        optionContainer.setAttribute("styletype",currentQuestion.optionStyleType);
    }
    else{
        optionContainer.removeAttribute("styletype");
    }
    //get the position of questionIndex from the availableQuestion
    // var index1 = quiz.indexOf(questionIndex);
    // //remove the questionIndex from the availableQuestion;
    // quiz.splice(index1, 1);
    // options of the given question.
    var optionlen = currentQuestion.option.length;
    for (var i = 0; i < optionlen; i++) {
        availableOption.push(i);
    }
    optionContainer.innerHTML = '';
    for (var j = 0; j < optionlen; j++) {
        var option = document.createElement("li");
        option.innerHTML = currentQuestion.option[j];
        option.setAttribute('data-id', j);
        option.setAttribute('tabindex', '0');
        option.setAttribute('role', 'option');
        optionsIndex++;
        option.className = "focus-input";
        optionContainer.appendChild(option);
        // option.setAttribute("onclick","checkResult(this)");
        // option.setAttribute("onclick", "addActiveClass(this)");
    }
    $('.focus-input').on('keydown click', addActiveClass);
    $('.tab-pane ').attr('data-state', currentQuestion.state);
    $('.tab-pane ').attr('id', question);
    if (currentQuestion.state === 'wrong') {
        $('.focus-input').each(function () {
            if ($(this).attr('data-id') == currentQuestion.userAnswered) {
                $(this).addClass('wrong');
            }
        });
        $('#mcq_button').html('Try Again');
        $('#mcq_button').removeClass('disabled');
        $('#mcq_button').removeAttr('aria-disabled');
        $('#mcq_button').attr('tabindex', '0');
        $('#answer_label').show();
        $('#Add_solution').hide();
        $('#need_help').show();
        $('#answer_label').html(incorrectFBText);
        $('#answer_label').removeClass().addClass('not-quite');
    } else if (currentQuestion.state === 'correct') {
        $('.focus-input').each(function () {
            $(this).addClass('already-answered');
            if ($(this).attr('data-id') == currentQuestion.userAnswered) {
                $(this).addClass('last-child');
            }
        });
        if (question == quiz.length) {
            $('#mcq_button').html('Done');
        } else {
            $('#mcq_button').html('Next Question');
        }
        $('#mcq_button').removeClass('disabled');
        $('#mcq_button').removeAttr('aria-disabled');
        $('#mcq_button').attr('tabindex', '0');
        $('#answer_label').show();
        $('#Add_solution').children().html(currentQuestion.ansText);
        $('#Add_solution').show();
        $('#need_help').hide();
        $('#answer_label').html(correctFBText);
        $('#answer_label').removeClass().addClass('correct');
    } else {
        $('.focus-input').removeClass().addClass('focus-input');
        $('#mcq_button').html('Check Answer');
        $('#mcq_button').addClass('disabled');
        $('#mcq_button').attr('aria-disabled', true);
        // $('#questionNumber').focus();
        $('#mcq_button').attr('tabindex', '-1');
        // $('#mcq_button').removeAttr('tabindex');
        $('#answer_label').hide();
        $('#Add_solution').hide();
        $('#need_help').show();
    }
    $('.nav-link').removeClass('active');
    $('.nav-link').each(function () {
        if ($(this).attr('data-id') == 'q-' + question) {
            $(this).addClass('active');
        }
    });
    MathJax.typesetClear()
    MathJax.typeset();
    questionCounter++;
}
function addActiveClass(el) {
    if ((el.type === 'keydown' && el.keyCode == 13) || el.type === 'click') {
        $(el.target).prevAll().removeClass().addClass('focus-input');
        $(el.target).nextAll().removeClass().addClass('focus-input');
        $(el.target).removeClass().addClass('focus-input active');
        $('#mcq_button').html('Check Answer');
        $('#Add_solution').hide();
        $('#answer_label').hide();
        $('.tab-pane ').attr('data-state', 'answered');
        $('#mcq_button').removeClass('disabled');
        $('#mcq_button').removeAttr('aria-disabled');
        $('#mcq_button').attr('tabindex', '0');
        ariaAnnounce('Selected option is ' + $(el.target).text());
    }
}
// check the current option is true or not .
function getResult(element) {
    var id = parseInt($(element).attr('data-id'));
    let dataId = 'q-' + parseInt($('.tab-pane').attr('id'));
    if (id === currentQuestion.answer) {
        $(element).removeClass().addClass("focus-input last-child");
        correctMsg.innerHTML = correctFBText;
        $(element).parent().attr("data-correct", "true");
        $(element).attr("role", "img");
        updateAnswerIndicator("correct");
        if (parseInt($('.tab-pane').attr('id')) == quiz.length) {
            $('#mcq_button').html('Done');
        } else {
            $('#mcq_button').html('Next Question');
        }
        $('#mcq_button').attr('tabindex', '0');
        unclickableOptions();
        $('#answer_label').show();
        $('#need_help').hide();
        $('#Add_solution').children().html(currentQuestion.ansText);
        $('#Add_solution').show();
        $('.tab-pane ').attr('data-state', 'correct');
        currentQuestion.state = 'correct';
        $('.nav-link').each(function () {
            if ($(this).attr('data-id') == dataId) {
                $(this).attr({
                    'data-correct': true,
                    'aria-label': 'Correct'
                });
            }
        });
        ariaAnnounce('Sected answer' + $(element).text() + ' is correct.');
    } else {
        $(element).removeClass().addClass("focus-input wrong");
        correctMsg.classList.add("not-quite");
        correctMsg.innerHTML = incorrectFBText;
        updateAnswerIndicator("wrong");
        $('#mcq_button').html('Try Again');
        $('#mcq_button').attr('tabindex', '0');
        $('#answer_label').show();
        $('#need_help').show();
        $('.tab-pane ').attr('data-state', 'wrong');
        $('.nav-link').each(function () {
            if ($(this).attr('data-id') == dataId) {
                $(this).attr({
                    'data-correct': false,
                    'aria-label': 'Incorrect'
                });
            }
        });
        currentQuestion.state = 'wrong';
        ariaAnnounce('Sected answer' + $(element).text() + ' is incorrect.');
    }
    currentQuestion.userAnswered = id;
}
function unclickableOptions() {
    var optionLen = optionContainer.children.length;
    for (var i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered")
    }
}
function answerIndicatot() {
    var totalQuestion = quiz.length;
    for (var i = 0; i < totalQuestion; i++) {
        // var optionIndi = document.createElement("span");
        // indicator.appendChild(optionIndi);
        // optionIndi.classList.add("step-active");
        // // optionIndi.setAttribute("data-correct", "true");
        // optionIndi.setAttribute("arial-label", i + 1);
        // optionIndi.innerHTML = i;
        var footerLi = document.createElement("li");
        indicator.appendChild(footerLi);
        footerLi.classList.add("nav-item");
        var footerAnchor = document.createElement("a");
        footerLi.appendChild(footerAnchor);
        footerAnchor.classList.add("nav-link");
        footerAnchor.classList.add("step");
        footerAnchor.setAttribute("data-id", 'q-' + (parseInt(i) + 1));
        footerLi.setAttribute('role', 'option');
        var footerSpan = document.createElement("span");
        footerAnchor.appendChild(footerSpan);
        if (parseInt(i) === 0) {
            // footerSpan.classList.add("step");
            footerAnchor.classList.add("active");
        } else {
            // footerSpan.classList.add("step");
        }
        // optionIndi.setAttribute("data-correct", "true");
        footerLi.setAttribute("title", 'page ' + (parseInt(i) + 1));
        footerLi.setAttribute('tabindex', '0');
        paginationTabindex++;
        footerSpan.innerHTML = (parseInt(i) + 1);
    }
}
function updateAnswerIndicator(markType) {
    //    indicator.children[questionCounter-1].classList.add(step-active);
    let currentQuestion = parseInt($('.tab-pane').attr('id')) - 1;
    if (markType === 'correct') {
        $('#answer_label').removeClass().addClass('correct');
        $('#Add_solution').children().html(quiz[currentQuestion].ansText);
    } else if (markType === 'wrong') {
        $('#answer_label').removeClass().addClass('not-quite');
        $('#Add_solution').children().html(quiz[currentQuestion].ansText);
    }
}
$('#mcq_button').on('mousedown click', function (e) {
    if ((e.type === 'keydown' && e.keyCode == 13) || e.type === 'click') {
        let buttonText = $('#mcq_button').text().split(' ')[0].trim().toLocaleLowerCase();
        if (buttonText === 'check') {
            let answered = $('.Multiple-choice').find('.active');
            getResult(answered);
        } else if (buttonText === 'next') {
            getNewQuestion(parseInt($('.tab-pane').attr('id')) + 1);
            $('#answer_label').hide();
            $('#Add_solution').hide();
            $('#need_help').show();
        } else if (buttonText === 'try') {
            $('.focus-input').removeClass().addClass('focus-input');
            $('#answer_label').hide();
            $('#Add_solution').hide();
            $('.nav-link').each(function () {
                let dataId = 'q-' + parseInt($('.tab-pane').attr('id'));
                if ($(this).attr('data-id') == dataId) {
                    $(this).removeAttr('data-correct');
                    $(this).removeAttr('aria-label');
                }
            });
            $('#mcq_button').addClass('disabled');
            $('#mcq_button').attr('aria-disabled', true);
            $('#questionNumber').focus();
            $('#mcq_button').html('Check Answer');
            // $('#mcq_button').removeAttr('tabindex');
            $('#mcq_button').attr('tabindex', '-1');
            let currentQuestionIndex = parseInt($('.tab-pane').attr('id')) - 1;
            let question = quiz[currentQuestionIndex]
            question.userAnswered = '';
            question.state = 'notAnswered';
        }
    }
})
window.onload = function () {
    setAvailableQuestion();
    getNewQuestion(1);
    answerIndicatot();
    $('#Add_solution').hide();
    $('#Add_solution').children().html(quiz[0].ansText);
    $('.arrow-left').addClass('disabled')
    
};
$('#show_ans').on('click keydown', (function (e) {
    if ((e.type === 'keydown' && e.keyCode == 13) || e.type === 'click') {
        let currentQuestion = parseInt($('.tab-pane').attr('id')) - 1;
        $('#Add_solution').children().html(quiz[currentQuestion].ansText);
        $('#Add_solution').show();
        $('#mcq_button').html('Try Again');
        $('#mcq_button').removeClass('disabled');
        $('#mcq_button').removeAttr('aria-disabled');
        // $('#mcq_button').removeAttr('tabindex');
        $('#mcq_button').attr('tabindex', '0');
        $('.focus-input').each(function () {
            if ($(this).attr('data-id') == quiz[currentQuestion].answer) {
                $(this).addClass('last-child');
                ariaAnnounce('Correct answer is' + $(this).text());
            }
        })
        $('.focus-input').removeClass('wrong');
        $('#answer_label').hide();
    }
}));
$('.arrow-left').on('click keydown', function (e) {
    if ((e.type === 'keydown' && e.keyCode == 13) || e.type === 'click') {
        let currentQuestion = parseInt($('.tab-pane').attr('id'));
        if (currentQuestion === 1) {
            // getNewQuestion(quiz.length);
            // autoDragPagination(quiz.length);
        } else {
            if (currentQuestion - 1 === 1) {
                disablenextPrevButtons('.arrow-left');
            } else {
                $('.arrow-left').removeClass('disabled');
                $('.arrow-left').removeAttr('aria-disabled');
                $('.arrow-left').attr('tabindex', 0);
            }
            $('.arrow-right').removeClass('disabled');
            $('.arrow-right').removeAttr('aria-disabled');
            $('.arrow-right').attr('tabindex', 0);
            getNewQuestion(currentQuestion - 1);
            autoDragPagination(currentQuestion - 1);
        }
    }
});
$('.arrow-right').on('click keydown', function (e) {
    if ((e.type === 'keydown' && e.keyCode == 13) || e.type === 'click') {
        let currentQuestion = parseInt($('.tab-pane').attr('id'));
        if (currentQuestion === quiz.length) {
            // getNewQuestion(1);
            // autoDragPagination(1);
        } else {
            if (currentQuestion + 1 === quiz.length) {
                disablenextPrevButtons('.arrow-right');
            } else {
                $('.arrow-right').removeClass('disabled');
                $('.arrow-right').removeAttr('aria-disabled');
                $('.arrow-right').attr('tabindex', 0);
            }
            $('.arrow-left').removeClass('disabled');
            $('.arrow-left').removeAttr('aria-disabled');
            $('.arrow-left').attr('tabindex', 0);
            getNewQuestion(currentQuestion + 1);
            autoDragPagination(currentQuestion + 1);
        }
    }
});
$('#show_ans').on('focusin click keyup', function (e) {
    if ($('#Add_solution').is(':visible')) {
        $(e.target).attr('aria-expanded', true);
    } else {
        $(e.target).attr('aria-expanded', false);
    }
});
function ariaAnnounce(msg) {
    console.log(msg);
    if (msg) {
        $('#ariaMessages').html(msg);
    }
    setTimeout(function () {
        $('#ariaMessages').html("");
    }, 5000);
};