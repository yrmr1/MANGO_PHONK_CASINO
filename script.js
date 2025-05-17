let robux = parseInt(localStorage.getItem('robux')) || 100;

function updateBalance() {
  document.getElementById("robux").textContent = robux;
  localStorage.setItem('robux', robux);
}

function showGame(id) {
  document.querySelectorAll('.game, .menu').forEach(el => el.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function showRobuxSplash(amount) {
  const splash = document.getElementById("robuxSplash");
  splash.textContent = `+${amount}💸`;
  splash.style.opacity = 1;
  splash.style.transform = "translate(-50%, -50%) scale(1.5)";
  splash.style.transition = "none";
  setTimeout(() => {
    splash.style.transition = "all 1s ease";
    splash.style.opacity = 0;
    splash.style.transform = "translate(-50%, -70%) scale(0.8)";
  }, 50);
}

function buyRobux(amount) {
  robux += amount;
  updateBalance();
  showRobuxSplash(amount);
}

function playSlot() {
  if (robux < 20) {
    document.getElementById('slotResult').textContent = "Недостатньо робуксів!";
    return;
  }
  robux -= 20;

  const symbols = ['🍒', '🍋', '🍊', '⭐', '7️⃣'];
  const reels = ['reel1', 'reel2', 'reel3'];
  const resultSymbols = [];

  reels.forEach((reelId, index) => {
    const reel = document.getElementById(reelId);
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    resultSymbols.push(symbol);
    reel.textContent = symbol;
    reel.style.animation = 'none';
    void reel.offsetWidth;
    reel.style.animation = 'spin 1s ease-in-out';
  });

  let msg = `${resultSymbols.join(' ')} — `;
  if (resultSymbols.every(s => s === resultSymbols[0])) {
    robux += 150;
    msg += '🎉 Джекпот! +150 робуксів!';
    showRobuxSplash(150);
  } else {
    msg += 'Спробуй ще!';
  }

  document.getElementById('slotResult').textContent = msg;
  updateBalance();
}

function playRoulette(choice) {
  if (robux < 20) {
    document.getElementById('rouletteResult').textContent = "Недостатньо робуксів!";
    return;
  }
  robux -= 20;
  const result = Math.floor(Math.random() * 37);
  const isRed = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(result);
  const color = result === 0 ? 'zero' : (isRed ? 'червоне' : 'чорне');

  let win = false;
  if (choice === color) {
    win = true;
    robux += 40;
  }

  document.getElementById('rouletteResult').textContent = `Випало: ${result} (${color}) ${win ? "Виграш +40 робуксів!" : "Програш :("}`;
  if (win) showRobuxSplash(40);
  updateBalance();
}

function betOnNumber() {
  if (robux < 20) {
    document.getElementById('rouletteResult').textContent = "Недостатньо робуксів!";
    return;
  }

  const guess = parseInt(document.getElementById('numberInput').value);
  if (isNaN(guess) || guess < 0 || guess > 36) {
    document.getElementById('rouletteResult').textContent = "Невірне число!";
    return;
  }

  robux -= 20;
  const result = Math.floor(Math.random() * 37);
  let msg = `Випало: ${result}. `;

  if (result === guess) {
    robux += 400;
    msg += "🎯 Влучив! +400 робуксів!";
    showRobuxSplash(400);
  } else {
    msg += "Програш.";
  }

  document.getElementById('rouletteResult').textContent = msg;
  updateBalance();
}

function playBlackjack() {
  if (robux < 20) {
    document.getElementById('blackjackResult').textContent = "Недостатньо робуксів!";
    return;
  }
  robux -= 20;

  const player = Math.floor(Math.random() * 11) + 16;
  const dealer = Math.floor(Math.random() * 11) + 16;
  let msg = `Твої очки: ${player} | Дилер: ${dealer}. `;

  if ((player > dealer && player <= 21) || dealer > 21) {
    robux += 40;
    msg += "Перемога! +40 робуксів!";
    showRobuxSplash(40);
  } else {
    msg += "Програш.";
  }

  document.getElementById('blackjackResult').textContent = msg;
  updateBalance();
}

updateBalance();
