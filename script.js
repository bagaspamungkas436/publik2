const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const questionElement = document.querySelector(".question");
const options = document.querySelectorAll(".option");
const notificationElement = document.getElementById("notification");

let score = 0;
let timeLeft = 30;
let currentQuestionIndex = 0;
let timerInterval; // Variabel untuk menyimpan interval timer

const questions = [
  {
    question: "Apa ibu kota Indonesia?",
    options: ["Jakarta", "Bandung", "Surabaya", "Medan"],
    correctAnswer: 0,
  },
  {
    question: "Berapa jumlah hari dalam seminggu?",
    options: ["6", "7", "8", "9"],
    correctAnswer: 1,
  },
  {
    question: "Siapa presiden pertama Indonesia?",
    options: ["Soekarno", "Suharto", "Megawati", "Jokowi"],
    correctAnswer: 0,
  },
  {
    question: "Planet apa yang terdekat dengan Matahari?",
    options: ["Bumi", "Mars", "Venus", "Merkurius"],
    correctAnswer: 3,
  },
  {
    question: "Berapa jumlah sisi pada segitiga?",
    options: ["4", "3", "5", "6"],
    correctAnswer: 1,
  },
  {
    question: "Apa warna langit saat siang hari?",
    options: ["Hitam", "Biru", "Merah", "Hijau"],
    correctAnswer: 1,
  },
  {
    question: "Hewan apa yang dikenal sebagai raja hutan?",
    options: ["Gajah", "Singa", "Harimau", "Beruang"],
    correctAnswer: 1,
  },
  {
    question: "Buah apa yang biasanya berwarna kuning?",
    options: ["Anggur", "Apel", "Pisang", "Jeruk"],
    correctAnswer: 2,
  },
  {
    question: "Bulan apa yang memiliki jumlah hari paling sedikit?",
    options: ["Februari", "April", "Juni", "Agustus"],
    correctAnswer: 0,
  },
  {
    question: "Negara apa yang terkenal dengan menara Eiffel?",
    options: ["Italia", "Inggris", "Prancis", "Jerman"],
    correctAnswer: 2,
  },
];

function showQuestion() {
  if (currentQuestionIndex < questions.length) {
    questionElement.textContent = questions[currentQuestionIndex].question;
    options.forEach((option, index) => {
      option.textContent = questions[currentQuestionIndex].options[index];
    });
    startTimer();
  } else {
    // Akhiri permainan
    alert(`Permainan selesai! Skor Anda: ${score}`);
    resetGame(); // Opsional: Reset permainan
  }
}

function startTimer() {
  clearInterval(timerInterval); // Pastikan timer sebelumnya dihentikan
  timeLeft = 30; // Reset waktu
  timerElement.textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showNotification("Terlambat!");
      nextQuestion();
    }
  }, 1000);
}

function checkAnswer(answerIndex) {
  clearInterval(timerInterval); // Hentikan timer saat pemain menjawab
  if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
    score++;
    scoreElement.textContent = score;
    showNotification("Benar!");
  } else {
    showNotification("Salah!");
  }
  nextQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  showQuestion();
}

function showNotification(message) {
  notificationElement.textContent = message;
  notificationElement.style.display = "block";
  setTimeout(() => {
    notificationElement.style.display = "none";
  }, 2000);
}

function resetGame() {
  score = 0;
  timeLeft = 30;
  currentQuestionIndex = 0;
  scoreElement.textContent = score;
  timerElement.textContent = timeLeft;
  showQuestion();
}

options.forEach((option, index) => {
  option.addEventListener("click", () => {
    checkAnswer(index);
  });
});

// Mulai permainan
showQuestion();
