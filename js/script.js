// 🌊 NAVBAR SCROLL EFFECT
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// 🌊 HERO BUTTON SCROLL
const heroBtn = document.querySelector(".hero-btn");
if (heroBtn) {
  heroBtn.addEventListener("click", function () {
    document.querySelector("#projects").scrollIntoView({
      behavior: "smooth"
    });
  });
}
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("https://formspree.io/f/maqqnwrp", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        showNotification("Your message has been sent 🌙");
        form.reset();
      } else {
        showNotification("Oops! Something went wrong.");
      }
    })
    .catch(() => {
      showNotification("Network error. Try again.");
    });
  });
}
function showNotification(message) {
  const notif = document.createElement("div");
  notif.className = "form-notification";
  notif.innerText = message;

  document.body.appendChild(notif);

  setTimeout(() => {
    notif.classList.add("show");
  }, 100);

  setTimeout(() => {
    notif.classList.remove("show");
    setTimeout(() => notif.remove(), 400);
  }, 3000);
}

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});