const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");

const currentQuestionEl = document.getElementById("current-question");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const progress = document.getElementById("progress");

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin", "Madrid"],
        correct: 0
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Venus", "Jupiter"],
        correct: 1
    },
    {
        question: "What is 5 + 7?",
        answers: ["10", "11", "12", "13"],
        correct: 2
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: ["Shakespeare", "Dickens", "Hemingway", "Twain"],
        correct: 0
    },
    {
        question: "What is the largest ocean?",
        answers: ["Indian", "Pacific", "Atlantic", "Arctic"],
        correct: 1
    }
];

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    answerContainer.innerHTML = "";

    currentQuestionEl.textContent = currentQuestionIndex + 1;
    scoreEl.textContent = score;

    progress.style.width = ((currentQuestionIndex) / questions.length) * 100 + "%";

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => selectAnswer(index));
        answerContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach((btn, index) => {
        btn.disabled = true;

        if (index === question.correct) {
            btn.classList.add("correct");
        } else if (index === selectedIndex) {
            btn.classList.add("incorrect");
        }
    });

    if (selectedIndex === question.correct) {
        score++;
        scoreEl.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreEl.textContent = score;

    if (score === questions.length) {
        resultMessage.textContent = "Perfect Score! 🎉";
    } else if (score >= 3) {
        resultMessage.textContent = "Great Job! 👏";
    } else {
        resultMessage.textContent = "Keep Practicing! 💪";
    }

    progress.style.width = "100%";
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
}
