const quesElement = document.querySelector("h3");
const ansCard = document.querySelector(".ans-btn");
const ansButtons = document.querySelector(".ans");
const nextButton = document.querySelector("#next");
const sampleBtn = document.querySelector("#b1");

let data;
let numCorrect = 0;
let numQues = 0;
let ansCheck = "";


async function quizQues() {
    const response = await fetch("https://quizapi.io/api/v1/questions?apiKey=lviMFvTcZmTzR3Yj6VPiDgdwVPFwvCkzSeGhAENX&category=sql&limit=10");
    data = await response.json();
    console.log(data);
    numQues = 0;
    numCorrect = 0;
    Play();
}

quizQues();

const Play = () => {
    if (numQues < 10) {
        setQuesAns();
    }
    else {
        Result();
    }
}

const setQuesAns = () => {
    quesElement.innerHTML = data[numQues].question;
    let notNull = 0;

    ansCheck = ""
    for (const key in data[numQues].correct_answers) {

        notNull += 1;
        if (data[numQues].correct_answers[key] == "true") break;

    }

    for (const key in data[numQues].answers) {
        if (data[numQues].answers[key] != null) {

            notNull -= 1;

            const btn = document.createElement("button");
            btn.classList.add("ans");
            btn.innerText = data[numQues].answers[key];
            if (notNull === 0) {
                ansCheck = data[numQues].answers[key];
                //console.log(ansCheck);
            }

            ansCard.append(btn);

            btn.addEventListener("click", checkAnswer)
        }
        else break;
    }

    numQues += 1;

}

const Result = () => {
    numQues++;
    quesElement.innerText = " ";
    ansCard.append(`You got ${numCorrect} out of 10`);
    nextButton.innerHTML = "Play Again";

}

nextButton.addEventListener("click", () => {
    if (numQues > 10) {
        nextButton.innerHTML = "Next";
        while (ansCard.firstChild) {
            ansCard.removeChild(ansCard.firstChild);
        }
        quizQues();
    }
    else {

        while (ansCard.firstChild) {
            ansCard.removeChild(ansCard.firstChild);
        }
        Play();
    }
})

const checkAnswer = (e) => {
    console.log(e);
    let yourKey = e.target.innerText;
    // console.log(typeof yourKey);
    console.log(typeof ansCheck);
    if (yourKey == ansCheck) {
        numCorrect++;
        e.target.classList.add("correct")
        // console.log(numCorrect);
        // console.log(ansCheck);
    }
    else{
        e.target.classList.add("incorrect")
    }
    
}