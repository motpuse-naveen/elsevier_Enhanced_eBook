const correctFBText = "Correct."
const incorrectFBText = "Incorrect. Please try again."
var paginationTabindex = 10001;
var optionsIndex = 1;
const tabs = document.querySelector(".tab-content");
const tabButton = document.querySelectorAll(".step");
const contents = document.querySelectorAll(".tab-pane");
function getQuestionByEvent(e) {
    var id;
    if ($(e.target).is('span')) {
        id = $(e.target).parent().attr('data-id');
    } else if ($(e.target).is('a')) {
        id = $(e.target).attr('data-id');
    }
    if (id) {
        getNewQuestion(parseInt(id.split('-')[1]));
        $('.nav-link').removeClass('active');
        if ($(e.target).is('span')) {
            $(e.target).parent().addClass("active");
        } else {
            $(e.target).addClass("active");
        }

        $('#questionNumber').focus();
        if (parseInt(id.split('-')[1]) === quiz.length) {
            $('.arrow-right').addClass('disabled');
            $('.arrow-left').removeClass('disabled');
        } else if (parseInt(id.split('-')[1]) === 1) {
            $('.arrow-left').addClass('disabled');
            $('.arrow-right').removeClass('disabled');
        } else {
            $('.arrow-right').removeClass('disabled');
            $('.arrow-left').removeClass('disabled');
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
        if ($selectedStep.is('span')) {
            selectedStep = $selectedStep.parent().attr('data-id').split('-')[1];
        } else if ($selectedStep.is('a')) {
            selectedStep = $selectedStep.attr('data-id').split('-')[1];
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
var selectOption = [];
// add quiz question to new array;
function setAvailableQuestion() {
    var totalQuestion = quiz.length;
    for (var i = 0; i < totalQuestion; i++) {
        availableQuestion.push(quiz[i]);
    }
}
// goto question and new question of array
function getNewQuestion(question) {
    selectOption = [];
    QuestionNumber.innerText = "Question " + (question);
    //  &lt;!-- QuestionNumber.innerText = "Question " + (question) + " of " + (quiz.length); 
    QuestionNumber.setAttribute('aria-label', "Question " + (question));
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
    }
    $('.focus-input').on('keydown click', addActiveClass);
    $('.tab-pane ').attr('data-state', currentQuestion.state);
    $('.tab-pane ').attr('id', question);
    if (currentQuestion.state === 'wrong') {
        $('#mcq_button').html('Try Again');
        $('#mcq_button').removeClass('disabled');
        $('#mcq_button').attr('title', 'Try Again');
        $('#mcq_button').attr('tabindex', '0');
        $('#answer_label').show();
        $('#Add_solution').hide();
        $('#need_help').show();
        $('#answer_label').html(incorrectFBText);
        $('#answer_label').removeClass().addClass('not-quite');
    } else if (currentQuestion.state === 'correct') {
        if (question == quiz.length) {
            $('#mcq_button').html('Done');
            $('#mcq_button').attr('title', 'Done');
        } else {
            $('#mcq_button').html('Next Question');
            $('#mcq_button').attr('title', 'Next Question');
        }
        $('#mcq_button').removeClass('disabled');
        $('#mcq_button').attr('tabindex', '0');
        $('#answer_label').show();
        $('#Add_solution').show();
        $('#need_help').hide();
        $('#answer_label').html(correctFBText);
        $('#answer_label').removeClass().addClass('correct');
        unclickableOptions();
    } else {
        $('.focus-input').removeClass().addClass('focus-input');
        $('#mcq_button').html('Check Answer');
        $('#mcq_button').addClass('disabled');
        // $('#questionNumber').focus();
        $('#mcq_button').attr('title', 'Check Answer');
        // $('#mcq_button').removeAttr('tabindex');
        $('#mcq_button').attr('tabindex', '-1');
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
    currentQuestion.userAnswered.forEach(userAns => {
        let index = currentQuestion.answer.findIndex(currentQuest => currentQuest === userAns);
        if (index !== -1) {
            $("ul").find(`[data-id='${userAns}']`).removeClass().addClass("focus-input last-child");
        } else {
            $("ul").find(`[data-id='${userAns}']`).removeClass().addClass('focus-input wrong');
        }
    });
    questionCounter++;
}
function addActiveClass(el) {
    el.preventDefault();
    el.stopPropagation();

    if ((el.type === 'keydown' && el.keyCode == 13) || el.type === 'click') {
        if (currentQuestion.state !== 'wrong' && !$(el.target).hasClass('wrong') && !$(el.target).hasClass('last-child')) {
            $(el.target).removeClass().addClass('focus-input');
            selectOption = [];
            $(el.target).removeClass().addClass('focus-input active');
            $('#mcq_button').html('Check Answer');
            $('#mcq_button').removeAttr('aria-disabled');
            $('#Add_solution').hide();
            $('#answer_label').hide();
            $('.tab-pane ').attr('data-state', 'answered');
            $('#mcq_button').removeClass('disabled');
            $('#mcq_button').attr('title', 'Check Answer');
            $('#mcq_button').attr('tabindex', '0');
            ariaAnnounce('Selected option is ' + $(el.target).text());
        } else {
            if (!$(el.target).hasClass('wrong') && !$(el.target).hasClass('last-child')) {
                $(el.target).removeClass().addClass('focus-input active');
            } else {
                $(el.target).removeClass('wrong');
            }
        }
    }
    return false;
}
// check the current option is true or not .
function check(answer, selectOption) {
    for (var i = 0; i < answer.length; i++) {
        if (answer[i] == selectOption[i]) {
        }
        else {
            return false;
            break;
        }
    }
    return true;
}
function getResult(element) {
    var wrongAns = 0;
    var id = parseInt($(element[0]).attr('data-id'));
    for (var i = 0; i < element.length; i++) {
        selectOption.push(parseInt($(element[i]).attr('data-id')));
    }
    selectOption.sort();
    let dataId = 'q-' + parseInt($('.tab-pane').attr('id'));
    selectOption.forEach(option => {
        let index = currentQuestion.answer.findIndex(ans => ans === option);
        if (index !== -1) {
            $("ul").find(`[data-id='${option}']`).removeClass().addClass("focus-input last-child");
        } else {
            $("ul").find(`[data-id='${option}']`).removeClass().addClass('focus-input wrong');
            wrongAns++;
        }
    });
    if (wrongAns === 0 && check(currentQuestion.answer, selectOption) !== false) {
        correctMsg.innerHTML = correctFBText;
        $(element).parent().attr("data-correct", "true");
        $(element).attr("role", "img");
        updateAnswerIndicator("correct");
        if (parseInt($('.tab-pane').attr('id')) == quiz.length) {
            $('#mcq_button').html('Done');
            $('#mcq_button').attr('title', 'Done');
        } else {
            $('#mcq_button').html('Next Question');
            $('#mcq_button').attr('title', 'Next Question');
        }
        $('#mcq_button').attr('tabindex', '0');
        unclickableOptions();
        $('#answer_label').show();
        $('#need_help').hide();
        $('#Add_solution').show();
        $('.tab-pane ').attr('data-state', 'correct');
        currentQuestion.state = 'correct';
        $('.nav-link').each(function () {
            if ($(this).attr('data-id') == dataId) {
                $(this).attr('data-correct', true);
            }
        });
        ariaAnnounce('Selected answer' + $(element).text() + ' is correct.');
    }
    else {
        if (currentQuestion.answer.length !== selectOption.length) {
            correctMsg.classList.add("not-quite");
            correctMsg.innerHTML = "Incorrect. Please select any " + currentQuestion.answer.length + " Option.";
        }
        else {
            correctMsg.classList.add("not-quite");
            correctMsg.innerHTML = incorrectFBText;
        }
        updateAnswerIndicator("wrong");
        $('#mcq_button').html('Try Again');
        $('#mcq_button').attr('title', 'Try Again');
        $('#mcq_button').attr('tabindex', '0');
        $('#answer_label').show();
        $('#need_help').show();
        $('.tab-pane ').attr('data-state', 'wrong');
        $('.nav-link').each(function () {
            if ($(this).attr('data-id') == dataId) {
                $(this).attr('data-correct', false);
            }
        });
        currentQuestion.state = 'wrong';
        ariaAnnounce('Sected answer' + $(element).text() + ' is incorrect.');
    }
    currentQuestion.userAnswered = selectOption;
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
        var footerLi = document.createElement("li");
        indicator.appendChild(footerLi);
        footerLi.classList.add("nav-item");
        footerLi.setAttribute('role', 'option');
        var footerAnchor = document.createElement("a");
        footerLi.appendChild(footerAnchor);
        footerAnchor.classList.add("nav-link");
        footerAnchor.classList.add("step");
        footerAnchor.setAttribute("data-id", 'q-' + (parseInt(i) + 1));
        var footerSpan = document.createElement("span");
        footerAnchor.appendChild(footerSpan);
        if (parseInt(i) === 0) {
            footerAnchor.classList.add("active");
        }
        footerAnchor.setAttribute("title", 'page ' + (parseInt(i) + 1));
        footerAnchor.setAttribute('tabindex', '0');
        paginationTabindex++;
        footerSpan.innerHTML = (parseInt(i) + 1);
    }
}
function updateAnswerIndicator(markType) {
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
            selectOption = [];
            getNewQuestion(parseInt($('.tab-pane').attr('id')) + 1);
            $('#answer_label').hide();
            $('#Add_solution').hide();
            $('#need_help').show();
        } else if (buttonText === 'try') {
            selectOption = [];
            $('.focus-input').removeClass().addClass('focus-input');
            $('#answer_label').hide();
            $('#Add_solution').hide();
            $('.nav-link').each(function () {
                let dataId = 'q-' + parseInt($('.tab-pane').attr('id'));
                if ($(this).attr('data-id') == dataId) {
                    $(this).removeAttr('data-correct');
                }
            });
            $('#mcq_button').addClass('disabled');
            $('#questionNumber').focus();
            $('#mcq_button').html('Check Answer');
            $('#mcq_button').attr('title', 'Check Answer');
            // $('#mcq_button').removeAttr('tabindex');
            $('#mcq_button').attr('tabindex', '-1');
            let currentQuestionIndex = parseInt($('.tab-pane').attr('id')) - 1;
            let question = quiz[currentQuestionIndex]
            question.userAnswered = [];
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
        $('#Add_solution').show();
        $("#show_ans").attr('aria-expanded', true);
        let currentQuestion = parseInt($('.tab-pane').attr('id')) - 1;
        $('#mcq_button').html('Try Again');
        $('#mcq_button').removeClass('disabled');
        $('#mcq_button').attr('title', 'Try Again');
        // $('#mcq_button').removeAttr('tabindex');
        $('#mcq_button').attr('tabindex', '0');
        $('.focus-input').removeClass('wrong');
        quiz[currentQuestion].answer.forEach(option => {
            $("ul").find(`[data-id='${option}']`).removeClass().addClass("focus-input last-child");
            // ariaAnnounce('Correct answer is' + $(this).text());
        });
        let correctAnswer = quiz[currentQuestion].answer.map(el => el = el + 1);
        correctAnswer = correctAnswer.join(',');
        setTimeout(() => {
            ariaAnnounce('Correct answer is ' + correctAnswer);
        }, 200);
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
                $('.arrow-left').addClass('disabled');
            } else {
                $('.arrow-left').removeClass('disabled');
            }
            $('.arrow-right').removeClass('disabled');
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
                $('.arrow-right').addClass('disabled');
            } else {
                $('.arrow-right').removeClass('disabled');
            }
            $('.arrow-left').removeClass('disabled');
            getNewQuestion(currentQuestion + 1);
            autoDragPagination(currentQuestion + 1);
        }
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