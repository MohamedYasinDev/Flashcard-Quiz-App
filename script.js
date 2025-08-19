let flashcards = [
  {
    question: "What is the capital of France?",
    choices: ["London", "Paris", "Berlin", "Rome"],
    correct: "Paris"
  },
  {
    question: "What is 5 + 3?",
    choices: ["5", "8", "10", "7"],
    correct: "8"
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Venus", "Jupiter"],
    correct: "Mars"
  }
];

let currentIndex = 0;
let score = 0;
let selectedAnswers = {};

function renderCard() {
  const card = flashcards[currentIndex];
  document.getElementById("question").textContent = card.question;

  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";

  card.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.className = "choice-btn";
    btn.onclick = () => selectAnswer(choice);
    choicesContainer.appendChild(btn);
  });

  // Update score display
  document.getElementById("score").textContent = score;
}

function selectAnswer(choice) {
  const correctAnswer = flashcards[currentIndex].correct;

  // Avoid double scoring if question was already answered
  if (selectedAnswers[currentIndex] === undefined) {
    if (choice === correctAnswer) {
      score++;
    }
    selectedAnswers[currentIndex] = choice;
    document.getElementById("score").textContent = score;
  }

  // Highlight selected
  const buttons = document.querySelectorAll(".choice-btn");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.style.backgroundColor = "green";
      btn.style.color = "white";
    } else if (btn.textContent === choice) {
      btn.style.backgroundColor = "red";
      btn.style.color = "white";
    }
  });
}

function nextCard() {
  if (currentIndex === flashcards.length - 1) {
    Swal.fire({
      title: "Quiz Finished!",
      text: `Your score is ${score} out of ${flashcards.length}`,
      icon: "success",
      confirmButtonText: "OK"
    });
  } else {
    currentIndex++;
    renderCard();
  }
}

function prevCard() {
  if (currentIndex > 0) {
    currentIndex--;
    renderCard();
  }
}

function addOrEditCard() {
  const question = document.getElementById("newQuestion").value.trim();
  const choicesInput = document.getElementById("newChoices").value.trim();
  const correct = document.getElementById("newCorrect").value.trim();

  if (!question || !choicesInput || !correct) {
    alert("Please fill all fields");
    return;
  }

  const choices = choicesInput.split(",").map(c => c.trim());
  if (!choices.includes(correct)) {
    alert("Correct answer must be one of the choices.");
    return;
  }

  flashcards.push({ question, choices, correct });
  document.getElementById("newQuestion").value = "";
  document.getElementById("newChoices").value = "";
  document.getElementById("newCorrect").value = "";
  renderCardList();
}

function renderCardList() {
  const list = document.getElementById("cardList");
  list.innerHTML = "";
  flashcards.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "flashcard";
    div.textContent = `${index + 1}. ${card.question}`;
    list.appendChild(div);
  });
}

function cancelEdit() {
  document.getElementById("newQuestion").value = "";
  document.getElementById("newChoices").value = "";
  document.getElementById("newCorrect").value = "";
  document.getElementById("cancelBtn").style.display = "none";
  document.getElementById("saveBtn").textContent = "Add Card";
}

// Initial load
renderCard();
renderCardList();
