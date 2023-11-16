const questions = [
    {
        question: "Which is larget animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Shri Lanka", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antarctica", correct: true},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ]
    }  
];

//general notes:
//With declarations, think of which HTML elements are being manipulated
//Build intuitively! Start with the easiest functions, ones that you can see the result of
//Ask: What am I building? What is the order that I am building? What features does my app have?
//Define tasks by functions required. Building a function a day that works is plenty


//declarations: questionElement, answerButtons, nextButton, currentQuestionIndex, score = 0
const questionElement =  document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0
let score = 0

//startQuiz function
//currentQuestionIndex
//score
//nextButton.innerHTML
//call showQuestion
function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}

//showQuestion function
//resetState()
//Create current question in this format: 1. Which is the largest animal in the world?
//For each answer, create a button with answer text. Append button with class "btn"
//if answer correct, button.dataset.correct = answer.correct
//add Event Listener, create selectAnswer function
function showQuestion(){
    //fill question space
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question 

    //fill answer buttons
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

//resetState() function
//remove all answers from previousQuestion
function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

//selectAnswer()
//check if answer is correct. if it is, add "correct" class to button and add to score. Otherwise add "incorrect" class
//disable all the buttons
//display the next button
function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++
    }
    else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    })
    nextButton.style.display = "block"
}

//showScore()
//resetState()
//Display score out of number of questions
//display next button with innerHTML "Play Again"
function showScore(){
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

//handleNextButton()
//if question index < questions.length, showQuestion(), otherwise showScore()
//else, startQuiz()
function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        startQuiz()
    }
})

//startQuiz
startQuiz()