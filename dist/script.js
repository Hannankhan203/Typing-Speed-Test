"use strict";
const quoteDis = document.getElementById("quote");
const input = document.getElementById("input");
const timeDis = document.getElementById("time");
const wpmDis = document.getElementById("wpm");
const accuracyDis = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart");
let quote = "";
let time = 0;
let interval = null;
const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect.",
    "TypeScript brings type safety to JavaScript.",
    "FrontEnd development is fun!",
    "Keep calm and keep coding.",
];
function loadQuote() {
    quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDis.textContent = quote;
    input.value = "";
    resetStats();
}
function resetStats() {
    time = 0;
    timeDis.textContent = "0";
    wpmDis.textContent = "0";
    accuracyDis.textContent = "0";
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}
function startTimer() {
    if (!interval) {
        interval = window.setInterval(() => {
            time++;
            timeDis.textContent = time.toString();
        }, 1000);
    }
}
function calculateStats() {
    const typed = input.value.trim();
    const words = typed.split(/\s+/).length;
    const correctChars = typed
        .split("")
        .filter((char, i) => char === quote[i]).length;
    const accuracy = Math.round((correctChars / quote.length) * 100);
    const wpm = Math.round((words / time) * 60) || 0;
    accuracyDis.textContent = isNaN(accuracy) ? "0" : accuracy.toString();
    wpmDis.textContent = isNaN(wpm) ? "0" : wpm.toString();
}
input.addEventListener("input", () => {
    startTimer();
    calculateStats();
    if (input.value === quote) {
        if (interval) {
            clearInterval(interval);
        }
    }
});
restartBtn.addEventListener("click", loadQuote);
loadQuote();
