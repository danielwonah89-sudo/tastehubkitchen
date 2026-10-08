const whatsappNumber = "2348035631977";
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const toast = document.querySelector(".toast");
let toastTimer;

document.querySelector("#year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navLinks.classList.toggle("open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navLinks.classList.remove("open");
  });
});

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.dataset.item;
    const price = Number(button.dataset.price);
    const discountPrice = Math.round(price * 0.8 / 100) * 100;
    const formatNaira = (amount) => `₦${amount.toLocaleString("en-NG")}`;
    const message = `Hi Taste Hub Kitchen! I'd like to order ${item} (${formatNaira(price)}). I’m a first-time customer—please apply the 20% opening offer. My offer price is ${formatNaira(discountPrice)}.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    toast.textContent = `${item} added to your WhatsApp order.`;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2500);
  });
});

const chatToggle = document.querySelector("#chat-toggle");
const chatPanel = document.querySelector("#chat-panel");
const chatClose = document.querySelector("#chat-close");
const chatForm = document.querySelector("#chat-form");
const chatMessage = document.querySelector("#chat-message");
const chatFeedback = document.querySelector("#chat-feedback");

function setChatOpen(isOpen) {
  chatPanel.hidden = !isOpen;
  chatToggle.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) chatMessage.focus();
  else chatToggle.focus();
}

chatToggle.addEventListener("click", () => setChatOpen(chatPanel.hidden));
chatClose.addEventListener("click", () => setChatOpen(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !chatPanel.hidden) setChatOpen(false);
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = chatMessage.value.trim();
  if (!message) return;
  const whatsappText = "Hi Taste Hub Kitchen! " + message;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  chatFeedback.textContent = "Your message is ready in WhatsApp. Tap Send there to reach our team.";
});

