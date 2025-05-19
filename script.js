let robux = 100;
let dep = 100;
const symbols = ["🍒", "🍋", "🍊", "🍇", "⭐", "💎"];
const roll = ['⚫', '💎', '🔴', '⚫', '🔴', '⚫', '🔴'];
let count = 0;
let sroll = ['💎','💎','💎'];

function plus(){
if(robux > dep)
  
  dep += 10
  updateBalance()
}

function min(){
  if (dep > 10){
  dep -= 10
  }
  updateBalance()
  
}
function updateBalance() {
  if (dep > robux){
    dep = robux;
  }
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
  if (dep <10) return;
  if (robux < 10) return;
  count = 0;

  robux -= dep;
  updateBalance();

updateSlots();
setTimeout(res, 3200);
count = 0;

if  (dep > robux){
  dep = robux
}
}


function playRoulette(choice) {
  count = 0;
  if (dep <10) return;
  if (robux < 10) return;
  robux -= dep;
  rollF(choice);
  setTimeout(resr, 5000);

}

function buyRobux(amount) {
  robux += amount;
  updateBalance();
  
}

let playerCards = [], dealerCards = [];

function drawCard() {
  return Math.floor(Math.random() * 10) + 2;
}

function startBlackjack() {
  if (dep <10) return;
  if (robux < 10) return;
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



function updateSlots() {
    if (count >= 15) return;

    const s1 = symbols[Math.floor(Math.random() * symbols.length)];
    const s2 = symbols[Math.floor(Math.random() * symbols.length)];
    const s3 = symbols[Math.floor(Math.random() * symbols.length)];

    document.getElementById("slot1").textContent = s1;
    document.getElementById("slot2").textContent = s2;
    document.getElementById("slot3").textContent = s3;

    count++;

  
    setTimeout(updateSlots, count * 15 + 50);
}

function res (){
    
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
    setTimeout(() => {tim(result)}, 1000); 
  } else {
    result.textContent = "😢 Нічого не випало.";
    setTimeout(() => {tim(result)}, 1000); 
  }

  updateBalance();
}

function tim(text){
  text.textContent = " "
}





function rollF() {
  if (count >= 30) return;
  
  const s11 = roll[Math.floor(Math.random() * roll.length)];
  if (sroll.length > 2) {
    sroll.shift()
  }
  sroll.push(s11)
  console.log(sroll )
  
  console.log(s11 )

  
  document.getElementById("roll").textContent = sroll[0] + " <" +sroll[1] + "> " +sroll[2] 

  count++;


  setTimeout(rollF, count * 5 + 50);
}



function resr(choice){
    // const result = Math.random() < 0.5 ? 'червоне' : 'чорне';
    // const fim = Math.random()
    // const diamondChance = Math.random() * 0.10; //from 0 to 0.05
    if (sroll[1] == '🔴'){
      result = 'червоне'
      rest = '🔴'
    } else
    if (sroll[1] == '⚫'){
      result = 'чорне'
      rest = '⚫'
    } else {
      result = 'zero'
      rest = '💎'
    }
    document.getElementById("roll").textContent = rest;
  console.log(result)
  
    const msg = result === choice && choice != "zero" ?
     "🎉 Ви виграли " +  dep * 2 + " робуксів!" :
      result == choice && choice == "zero" ?
       "🎉 Ви виграли " +  dep * 10 + " робуксів!" :
        "❌ Ви програли " +  dep  + " робуксів!" ;
    
  
    if (result === choice && choice != "zero") robux += +  dep * 2;
    if (result === choice && choice == "zero") robux += +  dep * 10;
    const res = document.getElementById("rouletteResult");
    res.textContent = `Випало: ${result}. ${msg}`;
    res.style.animation = "flashWin 1s ease";
    setTimeout(() => {tim(res)}, 3000); 
    // setTimeout(() => res.style.animation = "", 1000);
    updateBalance();
}
