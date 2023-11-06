// ! DOM elements
const QUESTION_OUTPUT = document.getElementById('question-output');
const OPTION_A = document.getElementById('optionA');
const OPTION_B = document.getElementById('optionB');
const OPTION_C = document.getElementById('optionC');
const OPTION_D = document.getElementById('optionD');

const QUESTION_LINE_1 = document.getElementById('question-line-1');
const QUESTION_LINE_2 = document.querySelectorAll('.question-line-2');
const QUESTION_LINE_3 = document.querySelectorAll('.question-line-3');
const QUESTION_LINE_4 = document.querySelectorAll('.question-line-4');
const QUESTION_LINE_5 = document.getElementById('question-line-5');

const QUESTION_CIRCLE_1 = document.getElementById('question-1');
const QUESTION_CIRCLE_2 = document.getElementById('question-2');
const QUESTION_CIRCLE_3 = document.getElementById('question-3');
const QUESTION_CIRCLE_4 = document.getElementById('question-4');
const QUESTION_CIRCLE_5 = document.getElementById('question-5');

const PREVIOUS_BUTTON = document.getElementById('previous-button');
const TIME_LEFT = document.getElementById('timeleft');
const SECONDS_LEFT = document.getElementById('secondsLeft')
const NEXT_BUTTON = document.getElementById('next-button');
const COMPLETE_BUTTON = document.getElementById('complete-button');

const SCORE_SECTION = document.getElementById('score-section');
const SCORE_OUTPUT = document.getElementById('score-output');

const RADIO_BUTTONS = document.querySelectorAll('input[type="radio"]');

// ! Resources and variables

const QUESTIONS = [
    {
        id: 1,
        question: `console.log(typeof NaN); <br> Consolega nima chiqadi?`,
        optionA: "number",
        optionB: "NaN",
        optionC: "undefined",
        optionD: 'string',
        answer: "A"
    },
    {
        id: 2,
        question: `"Node list" qaysi ma'lumot turiga kiradi?`,
        optionA: "Array(massiv)",
        optionB: "Symbol",
        optionC: "Object",
        optionD: "To'g'ri javob yo'q",
        answer: 'C'
    }, 
    {
        id: 3,
        question: `Qaysi metod massivda ma'lum bir element bor yo'qligini true/false shaklida qaytaradi?`,
        optionA: "find()",
        optionB: "indexOf()",
        optionC: "filter()",
        optionD: "includes()",
        answer: "D"
    },
    {
        id: 4,
        question: `Massivdagi ma'lumotlarni ASCII jadvali bo'yicha saralaydigan metodni tanlang`,
        optionA: "sort()",
        optionB: "map()",
        optionC: "filter()",
        optionD: "forEach()",
        answer: "A"
    },
    {
        id: 5,
        question: `Number tipi bo'yicha eng katta (MAX_SAFE_INTEGER) xavfsiz bo'lgan son qaysi?`,
        optionA: "2^52 - 1",
        optionB: "2^52",
        optionC: "2^53 - 1",
        optionD: "2^53",
        answer: "C"
    }
];

let questionIndex = 0;
let score = 0;

let result = JSON.parse(localStorage.getItem('result')) || [];

// ! Initial function calls

disableOrEnablePreviousButton(questionIndex);

document.addEventListener('DOMContentLoaded', function() {
    addQuestion(questionIndex, handleCheckedResponse);
    startTimer();
});

// ! Listeners

NEXT_BUTTON.addEventListener('click', function() {
    increaseScore(questionIndex, saveToLocalStorage);
    console.log(questionIndex);
    if (questionIndex == 4) {
        submit();
        return;
    }
    questionIndex++;
    removeChecked();
    addQuestion(questionIndex, handleCheckedResponse);
    if (questionIndex === 1) {
        disableOrEnablePreviousButton(questionIndex);
    }
    if (questionIndex === 4) {
        addSubmitButton();
    };
})



PREVIOUS_BUTTON.addEventListener('click', function() {
    questionIndex--;
    addQuestion(questionIndex, handleCheckedResponse);
    if (questionIndex === 3) {
        removeSubmitButton();
    }
    if (questionIndex === 0) {
        disableOrEnablePreviousButton(questionIndex);
    }
})

COMPLETE_BUTTON.addEventListener('click', function() {
    window.location.href = '../index.html'
})

// ! Functions

function startTimer() {
    let timeLeft = 60 * 2;
    let timerInterval;
    timerInterval = setInterval(function() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        if (minutes >= 1) {
            TIME_LEFT.innerHTML = minutes + ' :';
            SECONDS_LEFT.innerHTML = seconds;
        } else {
            TIME_LEFT.innerHTML = seconds;
            SECONDS_LEFT.innerHTML = '';
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submit();
        }

        timeLeft--;
    }, 1000); // Update every 1 second
}


function submit() {
    let result = JSON.parse(localStorage.getItem('result')) || [];
    console.log(result);
    let score = 0; 
    result.forEach(element => {
        if (element.isCorrect == true) {
            score++;
        }
    })
    SCORE_SECTION.style.display = "block";
    SCORE_OUTPUT.innerHTML = score;
}

function removeChecked() {
    RADIO_BUTTONS.forEach(element => {
        element.checked = false;
    })
}

function addSubmitButton() {
    NEXT_BUTTON.classList.add('submit-button');
    NEXT_BUTTON.textContent = 'Submit';
}
function increaseScore(questionIndex, saveToLocalStorage) {
    RADIO_BUTTONS.forEach((element, optionIndex) => {
        let option;
        let isCorrect = false;
        if (!element.checked) {
            return;
        }
        switch (optionIndex) {
            case 0:
                option = 'A';
                break;
            case 1:
                option = 'B';
                break;
            case 2:
                option = 'C';
                break;
                case 3:
                    option = 'D';
                break;
                default:
                    break;
        }
        if (option === QUESTIONS[questionIndex].answer) {
            score++;
            isCorrect = true;
        };
        saveToLocalStorage(isCorrect, optionIndex, questionIndex);
    });
}

function saveToLocalStorage(isCorrect, optionIndex, questionIndex) {
    if (result[questionIndex]) {
        result[questionIndex].isCorrect = isCorrect;
        result[questionIndex].optionIndex = optionIndex;
        console.log('Updated your response');
        localStorage.setItem('result', JSON.stringify(result));
        return;
    }
    let response = {};
    response.isCorrect = isCorrect;
    response.optionIndex = optionIndex;
    result.push(response);
    console.log('Added new response');
    localStorage.setItem('result', JSON.stringify(result));
}   

function removeSubmitButton() {
    NEXT_BUTTON.classList.remove('submit-button');
    NEXT_BUTTON.textContent = 'Next';
}

function disableOrEnableNextButton(questionIndex) {
    if (questionIndex === 4) {
        NEXT_BUTTON.setAttribute('disabled', '');
        NEXT_BUTTON.style.opacity = '0.4';
    } else {
        NEXT_BUTTON.removeAttribute('disabled');
        NEXT_BUTTON.style.opacity = '1';
    }
}
function addQuestion(questionIndex, handleCheckedResponseCallback) {
    QUESTION_OUTPUT.innerHTML = `${QUESTIONS[questionIndex].id}. ${QUESTIONS[questionIndex].question}`;
    OPTION_A.innerHTML = QUESTIONS[questionIndex].optionA;
    OPTION_B.innerHTML = QUESTIONS[questionIndex].optionB;
    OPTION_C.innerHTML = QUESTIONS[questionIndex].optionC;
    OPTION_D.innerHTML = QUESTIONS[questionIndex].optionD;
    handleCheckedResponseCallback(questionIndex);
}

function handleCheckedResponse(questionIndex) {
    let result = JSON.parse(localStorage.getItem('result')) || [];
    let optionIndex;
    if (result[questionIndex]) {
        optionIndex = result[questionIndex].optionIndex;
        RADIO_BUTTONS.forEach((element, index) => {
            if (optionIndex == index) {
                element.checked = true;
            }
        })
    }
}

function disableOrEnablePreviousButton(questionIndex) {
    if (questionIndex === 0) {
        PREVIOUS_BUTTON.setAttribute('disabled', '');
        PREVIOUS_BUTTON.style.opacity = '0.4';
    } else {
        PREVIOUS_BUTTON.removeAttribute('disabled');
        PREVIOUS_BUTTON.style.opacity = '1';
    }
}

