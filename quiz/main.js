const QUESTION_OUTPUT = document.getElementById('question-output');
const OPTION_A = document.getElementById('option-a');
const OPTION_B = document.getElementById('option-b');
const OPTION_C = document.getElementById('option-c');
const OPTION_D = document.getElementById('option-d');

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
const NEXT_BUTTON = document.getElementById('next-button');

const SCORE_SECTION = document.getElementById('score-section');
const SCORE_OUTPUT = document.getElementById('score-output');

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
document.addEventListener('DOMContentLoaded', function() {
    QUESTION_OUTPUT.innerHTML = `${QUESTIONS[0].id}. ${QUESTIONS[0].question}`;
    OPTION_A.innerHTML = QUESTIONS.optionA;
    OPTION_B.innerHTML = QUESTIONS.optionB;
    OPTION_C.innerHTML = QUESTIONS.optionC;
    OPTION_D.innerHTML = QUESTIONS.optionD;
})
