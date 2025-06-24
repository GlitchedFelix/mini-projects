const quotes = [
  "You're doing great, keep going!",
  "Every line of code gets you closer.",
  "Debugging is learning.",
  "Build something today, even if it's small.",
  "You're not stuck — you're learning."
];

document.getElementById("quote-btn").addEventListener("click", function() {
  const random = Math.floor(Math.random() * quotes.length);
  document.getElementById("quote").textContent = quotes[random];
});