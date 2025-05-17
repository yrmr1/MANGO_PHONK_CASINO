let robux = 100;
let dep = 100;
const symbols = ["🍒", "🍋", "🍊", "🍇", "⭐", "💎"];

function plus(){

  
  dep += 10
  updateBalance()
}

function min(){
  
  dep -= 10
  updateBalance()
}
function updateBalance() {
  document.getElementById("depValue").textContent = dep;
  document.getElementById("robux").textContent = robux;
}

function showGame(game) {
  document.querySelectorAll(".game").forEach(div => div.classList.add("hidden"));
  document.getElementById("menu").classList.add("hidden");
  document.getElementById(`${game}Game`).classList.remove("hidden");
}

function goToMenu() {
  document.querySelectorAll(".game").forEach(div => div.classList.add("hidden"));
  document.getElementById("menu").classList.remove("hidden");
}

function spin() {
  
  if (robux < dep) return alert("Недостатньо робуксів!");
  robux -= dep;
  updateBalance();

  const s1 = symbols[Math.floor(Math.random() * symbols.length)];
  const s2 = symbols[Math.floor(Math.random() * symbols.length)];
  const s3 = symbols[Math.floor(Math.random() * symbols.length)];

  document.getElementById("slot1").textContent = s1;
  document.getElementById("slot2").textContent = s2;
  document.getElementById("slot3").textContent = s3;

  const result = document.getElementById("slotResult");

  if (s1 === s2 && s2 === s3) {
    robux += dep * 11;
    result.textContent = "🎉 Виграш + " + dep * 10 + " робуксів!";
    result.style.animation = "flashWin 1s ease";
    setTimeout(() => result.style.animation = "", 1000);
  } else {
    result.textContent = "😢 Нічого не випало.";
  }

  updateBalance();
}

function playRoulette(choice) {
  if (robux < 20) return alert("Недостатньо робуксів!");
  robux -= 20;

  const result = Math.random() < 0.5 ? 'червоне' : 'чорне';
  const msg = result === choice ? "🎉 Ви виграли 80 робуксів!" : "❌ Ви програли.";

  if (result === choice) robux += 80;

  const res = document.getElementById("rouletteResult");
  res.textContent = `Випало: ${result}. ${msg}`;
  res.style.animation = "flashWin 1s ease";
  setTimeout(() => res.style.animation = "", 1000);
  updateBalance();
}

function buyRobux(amount) {
  robux += amount;
  updateBalance();
  alert(`+${amount} робуксів отримано!`);
}

let playerCards = [], dealerCards = [];

function drawCard() {
  return Math.floor(Math.random() * 10) + 2;
}

function startBlackjack() {
  if (robux < 20) return alert("Недостатньо робуксів!");
  robux -= 20;
  playerCards = [drawCard(), drawCard()];
  dealerCards = [drawCard(), drawCard()];
  document.getElementById("blackjackResult").textContent = "";
  renderBlackjack();
  updateBalance();
}

function renderBlackjack() {
  document.getElementById("blackjackPlayer").textContent = `Ваші карти: ${playerCards.join(", ")} (Сума: ${sum(playerCards)})`;
  document.getElementById("blackjackDealer").textContent = `Карти дилера: ${dealerCards.join(", ")} (Сума: ${sum(dealerCards)})`;
}

function sum(cards) {
  return cards.reduce((a, b) => a + b, 0);
}

function hit() {
  if (!playerCards.length) return;
  playerCards.push(drawCard());
  renderBlackjack();
  if (sum(playerCards) > 21) {
    document.getElementById("blackjackResult").textContent = "❌ Перебір! Ви програли.";
    playerCards = [];
    dealerCards = [];
  }
}

function stand() {
  if (!playerCards.length) return;
  while (sum(dealerCards) < 17) dealerCards.push(drawCard());

  const pSum = sum(playerCards), dSum = sum(dealerCards);
  let result = "";

  if (dSum > 21 || pSum > dSum) {
    robux += 60;
    result = "🎉 Ви виграли! +60 робуксів";
  } else if (pSum < dSum) {
    result = "❌ Ви програли.";
  } else {
    robux += 20;
    result = "🤝 Нічия. Повернено ставку.";
  }

  document.getElementById("blackjackResult").textContent = result;
  updateBalance();
  playerCards = [];
  dealerCards = [];
  renderBlackjack();
}
