// ==============================
// CHATBOT TOGGLE
// ==============================

const toggle = document.getElementById("chatbotToggle");
const box = document.getElementById("chatbotBox");
const chat = document.getElementById("chatMessages");

toggle.onclick = () => {
  box.classList.toggle("active");
};

// ==============================
// SEND MESSAGE
// ==============================

function sendMessage() {

  const input = document.getElementById("userInput");
  const message = input.value.trim();

  if (message === "") return;

  chat.innerHTML += `<div class="user-message">${message}</div>`;

  input.value = "";

  chat.scrollTop = chat.scrollHeight;

  showTyping(message);
}

// ==============================
// TYPING EFFECT
// ==============================

function showTyping(userText) {

  const typing = document.createElement("div");

  typing.className = "bot-message";
  typing.innerText = "Sedang mengetik...";

  chat.appendChild(typing);

  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {

    typing.remove();

    const reply = getBotReply(userText);

    chat.innerHTML += `<div class="bot-message">${reply}</div>`;

    chat.scrollTop = chat.scrollHeight;

  }, 800);
}

// ==============================
// DATABASE PROFIL SAFIRA
// ==============================

const profile = {

  name: "Safira Nur Azkia",

  intro:
  "Safira Nur Azkia adalah mahasiswa Teknik Informatika di Nurul Fikri yang suka teknologi, storytelling, dan membuat pengalaman digital yang kreatif.",

  education:
  "Safira lulus SMA pada tahun 2024 dan saat ini sedang menempuh pendidikan di jurusan Teknik Informatika di Nurul Fikri.",

  whyIT:
  "Awalnya Safira sangat tertarik dengan psikologi. Namun setelah melihat perkembangan teknologi yang sangat cepat, ia menjadi penasaran dengan dunia IT dan memutuskan untuk mempelajarinya.",

  projects:
  "Safira telah membuat beberapa proyek termasuk website portfolio ini dan sebelumnya juga membuat proyek Java menggunakan NetBeans.",

  competitions:
  "Safira pernah mengikuti lomba pembuatan website Generative AI Invitation.",

  organizations:
  "Safira pernah mengikuti beberapa kegiatan kepemudaan dan sosial seperti GenSmart, Youth Ranger Indonesia, kepanitiaan kampus, serta program dari pemerintah seperti Kemenpora.",

  hobbies:
  [
    "membaca",
    "menulis puisi",
    "menulis lagu",
    "belajar teknologi",
    "storytelling kreatif"
  ],

  personality:
  "Safira suka menggabungkan kreativitas dan teknologi untuk membangun pengalaman digital yang bermakna.",

  contact:
  "Kamu bisa menghubungi Safira melalui bagian Contact di website ini."
};
const knowledge = [

{
questions: [
"siapa safira",
"ceritakan tentang safira",
"tentang safira"
],
answer: profile.intro
},

{
questions: [
"safira kuliah dimana",
"dimana safira kuliah",
"pendidikan safira"
],
answer: profile.education
},

{
questions: [
"kenapa safira pilih it",
"kenapa jurusan it",
"alasan pilih it"
],
answer: profile.whyIT
}

];


function similarity(a, b) {

  a = a.toLowerCase();
  b = b.toLowerCase();

  const wordsA = a.split(" ");
  const wordsB = b.split(" ");

  let match = 0;

  for (let w of wordsA) {
    if (wordsB.includes(w)) {
      match++;
    }
  }

  return match / Math.max(wordsA.length, wordsB.length);
}

// ==============================
// OTAK CHATBOT
// ==============================

function getBotReply(text) {

  const t = text.toLowerCase();

  const intents = [

    // SAPAAN

    {
      keywords: ["halo","hai","hello","hi","hey"],
      responses: [
        "Halo! Aku Moonlit Assistant 🌙 Kamu bisa tanya apa saja tentang Safira.",
        "Hai! Mau tahu tentang project atau skill Safira?",
        "Halo! Silakan tanya apa saja tentang Safira ✨"
      ]
    },

    // TENTANG SAFIRA

    {
      keywords: ["siapa safira","tentang safira","siapa kamu ceritakan safira"],
      responses: [
        profile.intro
      ]
    },

    // PENDIDIKAN

    {
      keywords: ["pendidikan","kuliah","belajar","kampus"],
      responses: [
        profile.education
      ]
    },

    // KENAPA IT

    {
      keywords: [
        "kenapa it",
        "kenapa pilih it",
        "kenapa jurusan it",
        "kenapa ambil it"
      ],
      responses: [
        profile.whyIT
      ]
    },

    // SKILL

    {
      keywords: ["skill","keahlian","kemampuan","teknologi"],
      responses: [
        "Safira menggunakan HTML, CSS, dan JavaScript, serta sedang belajar lebih dalam tentang web development.",
        "Beberapa skill Safira adalah HTML, CSS, JavaScript, dan desain UI."
      ]
    },

    // PROJECT

    {
      keywords: ["project","projek","portfolio","karya"],
      responses: [
        profile.projects
      ]
    },

    // JAVA PROJECT

    {
      keywords: ["java","netbeans"],
      responses: [
        "Safira pernah membuat proyek menggunakan Java di NetBeans dalam proses belajarnya."
      ]
    },

    // LOMBA

    {
      keywords: ["lomba","kompetisi","contest"],
      responses: [
        profile.competitions
      ]
    },

    // ORGANISASI

    {
      keywords: ["organisasi","kegiatan","aktivitas"],
      responses: [
        profile.organizations
      ]
    },

    // HOBI

    {
      keywords: ["hobi","suka apa","kegiatan favorit"],
      responses: [
        "Hobi Safira adalah " + profile.hobbies.join(", ") + ".",
        "Safira suka " + profile.hobbies.join(", ") + "."
      ]
    },

    // PERSONALITY

    {
      keywords: ["kepribadian","orangnya seperti apa"],
      responses: [
        profile.personality
      ]
    },

    // WEBSITE

    {
      keywords: ["siapa buat website ini","siapa yang membuat website ini"],
      responses: [
        "Website portfolio ini dibuat langsung oleh Safira sendiri 🌙",
        "Safira membuat website ini untuk menampilkan project dan kreativitasnya."
      ]
    },

    // TENTANG BOT

    {
      keywords: ["siapa kamu","kamu ai"],
      responses: [
        "Aku Moonlit Assistant 🌙 chatbot sederhana yang dibuat untuk membantu pengunjung mengenal portfolio Safira.",
        "Aku chatbot JavaScript kecil yang membantu menjelaskan tentang Safira."
      ]
    },

    // KONTAK

    {
      keywords: ["kontak","hubungi","email"],
      responses: [
        profile.contact
      ]
    }

  ];

  for (let intent of intents) {

    if (intent.keywords.some(k => t.includes(k))) {

      return random(intent.responses);

    }

  }

  // DEFAULT RESPONSE

  return random([
    "Maaf aku belum tahu jawabannya 🌙 Coba tanya tentang skill, project, atau hobi Safira.",
    "Pertanyaan yang menarik! Coba tanya tentang pendidikan atau project Safira.",
    "Aku belum punya jawaban untuk itu 🌙"
  ]);
}

// ==============================
// HELPER
// ==============================

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

document.getElementById("userInput")
.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    sendMessage();
  }
});