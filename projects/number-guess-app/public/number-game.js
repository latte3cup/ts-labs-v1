"use strict";
const form = document.getElementById("guess-form");
const input = document.getElementById("guess-input");
const trialCount = document.getElementById("trial-count");
const resultMsg = document.getElementById("result-msg");
const historyList = document.getElementById("history-list");
const resetBtn = document.getElementById("reset-btn");
let answer;
let attempts;
let guessHistory = [];
function initGame() {
    answer = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessHistory = [];
    trialCount.textContent = "시도: 0회";
    resultMsg.textContent = "";
    historyList.innerHTML = "";
    resetBtn.style.display = "none";
    input.disabled = false;
    input.value = "";
    input.focus();
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const guess = Number(input.value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        resultMsg.textContent = "⚠️ 1부터 100 사이의 숫자를 입력해주세요.";
        resultMsg.style.color = "red";
        return;
    }
    attempts++;
    trialCount.textContent = `시도: ${attempts}회`;
    guessHistory.push(guess);
    const li = document.createElement("li");
    li.textContent = `${guess} → ${guess === answer ? "🎯 정답!" : guess > answer ? "🔽 Down" : "🔼 Up"}`;
    historyList.appendChild(li);
    if (guess === answer) {
        resultMsg.textContent = `🎉 정답입니다! ${attempts}회 만에 성공!`;
        resultMsg.style.color = "green";
        input.disabled = true;
        resetBtn.style.display = "inline-block";
    }
    else if (guess > answer) {
        resultMsg.textContent = "너무 커요!";
        resultMsg.style.color = "blue";
    }
    else {
        resultMsg.textContent = "너무 작아요!";
        resultMsg.style.color = "blue";
    }
    input.value = "";
    input.focus();
});
resetBtn.addEventListener("click", () => {
    initGame();
});
initGame(); // 게임 최초 실행
