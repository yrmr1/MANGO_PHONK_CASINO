let robux = 100;
let dep = 100;
let p1 = ["💎", "💎", "💎"];
let p2 = ["💎", "💎", "💎"];
let p3 = ["💎", "💎", "💎"];
const symbols = ["🍒", "🍋", "🍊", "🍇", "⭐", "💎"];
const rouletteSymbols = ['🔴', '💎', '⚫'];
let p4 = ["🔴", "💎", "⚫"];
let isSpinningSlot = false;
let isSpinningRoulette = false;

const blackjackCards = [
`┌─────────┐
│2        │
│    ♠    │
│         │
│        2│
└─────────┘`,

`┌─────────┐
│3        │
│    ♠    │
│    ♠    │
│        3│
└─────────┘`,

`┌─────────┐
│4        │
│  ♠   ♠  │
│         │
│  ♠   ♠  │
│        4│
└─────────┘`,

`┌─────────┐
│5        │
│  ♠   ♠  │
│    ♠    │
│  ♠   ♠  │
│        5│
└─────────┘`,

`┌─────────┐
│6        │
│  ♠   ♠  │
│  ♠     │
│  ♠   ♠  │
│        6│
└─────────┘`,

`┌─────────┐
│7        │
│  ♠   ♠  │
│  ♠  ♠  │
│  ♠   ♠  │
│        7│
└─────────┘`,

`┌─────────┐
│8        │
│  ♠ ♠ ♠  │
│  ♠   ♠  │
│  ♠ ♠ ♠  │
│        8│
└─────────┘`,

`┌─────────┐
│9        │
│  ♠ ♠ ♠  │
│  ♠ ♠ ♠  │
│  ♠ ♠ ♠  │
│        9│
└─────────┘`,


`┌─────────┐
│J        │
│    ♠    │
│  ♠ J ♠  │
│    ♠    │
│        J│
└─────────┘`,


`┌─────────┐
│A        │
│    ♠    │
│   ♠A♠   │
│    ♠    │
│        A│
└─────────┘`
];


getRandomInt(blackjackCards.length);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Выбираем случайную карту
const randomIndex = getRandomInt(blackjackCards.length);
const randomCard = blackjackCards[randomIndex];

console.log(randomCard);
console.log(randomIndex + 2);


let playerCards = [];
let dealerCards = [];

function updateBalance() {
  document.getElementById("depValue").textContent = dep;
  document.getElementById("robux").textContent = robux;
}

function plus() {
  if (dep + 10 <= robux) {
    dep += 10;
    updateBalance();
  }
}

function min() {
  if (dep - 10 >= 10) {
    dep -= 10;
    updateBalance();
  }
}

function showGame(game) {
  document.querySelectorAll(".game").forEach(div => div.classList.add("hidden"));
  document.getElementById("menu").classList.add("hidden");
  document.getElementById(`${game}Game`).classList.remove("hidden");
}

function goToMenu() {
  document.querySelectorAll(".game").forEach(div => div.classList.add("hidden"));
  document.getElementById("menu").classList.remove("hidden");
  updateBalance();
}

/* === СЛОТИ === */
function spin() {
  if (isSpinningSlot) return;
  if (dep > robux) {
    showMessage("Недостатньо робуксів для ставки", "slotResult");
    return;
  }

  isSpinningSlot = true;
  robux -= dep;
  updateBalance();

  let steps = 30;
  let initialDelay = 50;
  let delayIncrement = 20;

  function spinStep(step, delay) {
    if (step <= 0) {
      const top1 = p1[0];
      const top2 = p2[0];
      const top3 = p3[0];
      const result = document.getElementById("slotResult");

      if (top1 === top2 && top2 === top3) {
        let winAmount = dep * 10;
        robux += winAmount;
        result.textContent = `🎉 Виграш! +${winAmount} робуксів`;
      } else {
        result.textContent = "😢 Нічого не випало.";
      }

      updateBalance();
      isSpinningSlot = false;

      setTimeout(() => { result.textContent = ""; }, 3000);
      return;
    }

    // Обновляем символы
    p1.unshift(symbols[Math.floor(Math.random() * symbols.length)]);
    p1.pop();
    p2.unshift(symbols[Math.floor(Math.random() * symbols.length)]);
    p2.pop();
    p3.unshift(symbols[Math.floor(Math.random() * symbols.length)]);
    p3.pop();

    document.getElementById("slot1").textContent = p1.join('\n');
    document.getElementById("slot2").textContent = p2.join('\n');
    document.getElementById("slot3").textContent = p3.join('\n');

    setTimeout(() => spinStep(step - 1, delay + delayIncrement), delay);
  }

  spinStep(steps, initialDelay);
}


/* === БЛЕКДЖЕК === */
function drawCard() {
  getRandomInt(1, 11);
}




function sum(cards) {
  return cards.reduce((a, b) => a + b, 0);
}

function startBlackjack() {
  if (robux < 20) {
    alert("Недостатньо робуксів для ставки (20)");
    return;
  }
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

function hit() {
  if (playerCards.length === 0) return;
  playerCards.push(drawCard());
  renderBlackjack();
  if (sum(playerCards) > 21) {
    document.getElementById("blackjackResult").textContent = "❌ Перебір! Ви програли.";
    playerCards = [];
    dealerCards = [];
  }
}
function playRoulette(choice) {
  if (isSpinningRoulette) return;
  if (dep > robux) {
    alert("Недостатньо робуксів для ставки");
    return;
  }

  isSpinningRoulette = true;
  robux -= dep;
  updateBalance();

  const steps = 30;
  let delay = 50;
  let delayInc = 20;



  
  const resultIndex = Math.floor(Math.random() * rouletteSymbols.length);
  const resultSymbol = rouletteSymbols[resultIndex];

  function spinStep(step) {
    if (step <= 0) {
      let resultText = "";
      if (
        (choice === 'червоне' && resultSymbol === '🔴') ||
        (choice === 'чорне' && resultSymbol === '⚫') ||
        (choice === 'zero' && resultSymbol === '💎')
      ) {
        let winAmount = choice === "zero" ? dep * 10 : dep * 2;
        robux += winAmount;
        resultText = `🎉 Ви виграли ${winAmount} робуксів!`;
      } else {
        resultText = `❌ Ви програли ${dep} робуксів.`;
      }

      document.getElementById("rouletteResult").textContent = resultText;
      updateBalance();
      isSpinningRoulette = false;
      return;
    }

    // Плавная анимация
    p4.unshift(rouletteSymbols[Math.floor(Math.random() * rouletteSymbols.length)]);
    p4.pop();

    document.getElementById("roll").textContent = p4.join('\n');

    setTimeout(() => spinStep(step - 1), delay);
    delay += delayInc;
  }

  spinStep(steps);
}

function startBlackjack() {
  if (robux < dep) {
    alert(`Недостатньо робуксів для ставки (${dep})`);
    return;
  }
  robux -= dep;
  playerCards = [drawCard(), drawCard()];
  dealerCards = [drawCard(), drawCard()];
  document.getElementById("blackjackResult").textContent = "";
  renderBlackjack();
  updateBalance();
}

function stand() {
  if (playerCards.length === 0) return;
  while (sum(dealerCards) < 17) {
    dealerCards.push(drawCard());
  }
  const pSum = sum(playerCards);
  const dSum = sum(dealerCards);
  let result = "";

  if (dSum > 21 || pSum > dSum) {
    let winAmount = dep * 3; 
    robux += winAmount;
    result = `🎉 Ви виграли! +${winAmount} робуксів`;
  } else if (pSum < dSum) {
    result = `❌ Ви програли ${dep} робуксів.`;
  } else {
    robux += dep;
    result = `🤝 Нічия. Повернено ставку ${dep} робуксів.`;
  }

  document.getElementById("blackjackResult").textContent = result;
  updateBalance();
  playerCards = [];
  dealerCards = [];
  renderBlackjack();
}
function buyRobux(amount) {
  robux += amount;
  updateBalance();
  alert(`Ви купили ${amount} робуксів!`);
}

updateBalance();
