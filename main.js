const questionNumber = document.querySelector(".question-number"),
      totalQuestions = document.querySelector(".total-questions"),
      question = document.querySelector(".question"),
      optionOne = document.querySelector(".a1"),
      optionYwo = document.querySelector(".a2"),
      optionThree = document.querySelector(".a3"),
      optionFour = document.querySelector(".a4"),
      answers = document.querySelectorAll(".answers"),
      answerList = document.querySelectorAll(".answer"),
      nextButton = document.querySelector(".next-button"),
      restartButton = document.querySelector(".restart"),
      continueButton = document.querySelector(".continue"),
      modalWindow = document.querySelector(".modal"),
      errorWindow = document.querySelector(".error"),
      modalResult = document.querySelector(".result"),
      circlesContainer = document.querySelector(".progress"),
      circles = document.querySelector(".circle");





let score = 0;
let indexOfPage = 0;
let indexOfQuestion = 0;
const completedAnswers = [];
const answersArray = [
    {
        question: "Nikola Tesla date of birth?",
        options:[
            1856,
            1867,
            1849,
            1851,
        ],
        correctAnswer:1
    },
    {
        question: "Population of Canada?",
        options:[
            "32 million",
            "40 million",
            "38 million",
            "35 million",

        ],
        correctAnswer:3
    },
    {
        question: "Who was the first person on the Moon?",
        options:[
            "Yuri Gagarin",
            "Neil Armstrong",
            "Rakesh Sharma",
            "Chris Hadfield",

        ],
        correctAnswer:2
    },
    {
        question: "Capital of Ukraine?",
        options:[
            "Odesa",
            "Mariupol",
            "Kherson",
            "Kyiv",
        ],
        correctAnswer:4
    },
    {
        question: "Best programming language for Web Development?",
        options:[
            "JavaScript",
            "PHP",
            "Python",
            "GO",
        ],
        correctAnswer:1
    },

];

//totalQuestions
totalQuestions.innerHTML = answersArray.length;


//RandomNumber
function randomNumber(){
    const random = Math.floor(Math.random()* answersArray.length)
    
    //Anchor for repeating
    let isRepeated = false;

    if(indexOfPage === answersArray.length){
        modalWindow.classList.toggle("hidden")
        indexOfQuestion = answersArray.length - 1;
        modalResult.innerHTML = `<h2>Your score: ${score}</h2>`
    }else{
        completedAnswers.forEach((item)=>{
            if(item === random){
                isRepeated = true;
            }
        })
        if(isRepeated){
            randomNumber()
        }else{
            indexOfQuestion = random;
            start(random);
        }
    }

    completedAnswers.push(indexOfQuestion)
    
};



function start(input){
    answersArray.forEach((answer)=>{
        question.innerHTML = answersArray[input].question;

        optionOne.innerHTML = answersArray[input].options[0];
        optionYwo.innerHTML = answersArray[input].options[1];
        optionThree.innerHTML = answersArray[input].options[2];
        optionFour.innerHTML = answersArray[input].options[3];
    })

    questionNumber.innerHTML = indexOfPage + 1;
    indexOfPage ++
    
};

//clearClasses
function clearClasses(){
    answerList.forEach((i)=>{
        i.classList.remove("correct", "disabled", "wrong")
    })    
}

//disabled
function disabled(){
    answerList.forEach((item)=>{
        
        item.classList.add("disabled")
        if(item.dataset.id === answersArray[indexOfQuestion].correctAnswer){
            item.target.classList.add("correct")
        }
    })
}

//checkAnswer
answerList.forEach((ans)=>{
    ans.addEventListener("click", (event)=>{
        const userChoise = event.target.dataset.id;
        console.log(userChoise)
        const rightAnswer = answersArray[indexOfQuestion].correctAnswer;
        if(userChoise == rightAnswer){
            event.target.classList.add("correct");
            document.querySelectorAll(".circle")[indexOfPage - 1].classList.add("correct");
            score ++;
        }else if(userChoise !== undefined) {
            event.target.classList.add("wrong");
            document.querySelectorAll(".circle")[indexOfPage - 1].classList.add("wrong");
        }
        disabled();
    })
    
})

//validation
function validation(){
    if(!answerList[0].classList.contains("disabled")){
       errorWindow.classList.toggle("hidden")
    }else{
        clearClasses()
        randomNumber()
    }
}


nextButton.addEventListener("click", ()=>{
    validation()
});

restartButton.addEventListener("click", ()=>{
    window.location.reload()
})
continueButton.addEventListener("click", ()=>{
    errorWindow.classList.toggle("hidden")
})
window.addEventListener("load", ()=>{
    randomNumber()
    for(i = 0; i < answersArray.length; i++){
        const div = document.createElement("div");
        div.classList.add("circle");
        circlesContainer.appendChild(div)
    }
});