let robux = 100;
let dep = 100;

const symbols = ["🍒", "🍋", "🍊", "🍇", "⭐", "💎"];
// const symbols = ["🍒"];
const roll = ['⚫', '💎', '🔴', '⚫', '🔴', '⚫', '🔴'];
let count = 0;
let sroll = ['💎','💎','💎'];
let srin1 = ['💎','💎','💎'];
let srin2 = ['💎','💎','💎'];
let srin3 = ['💎','💎','💎'];
let sp1in = 1;
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
  // if (dep > robux){
  //   dep = robux;
  // }
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
  // if  (dep > robux){
//   dep = robux
// }
//   if (sp1in == 1){
robux -= dep;
  
 
//   if (dep < 10) return;
//   if (robux < 10) return;
  count = 0;

  
  updateBalance();

  updateSlots();
  setTimeout(res, 3200);
  count = 0;
  sp1in = 0;
  }

//}


function playRoulette(choice) {
  count = 0;
  alert(choice);
  // if (dep <10) return;
  // if (robux < 10) return;
  robux -= dep;
  rollF();
  setTimeout(resr(choice), 5000);

}

function buyRobux(amount) {
  robux += amount;
  updateBalance();
  window.location.href='index.html'
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

const s21 = symbols[Math.floor(Math.random() * symbols.length)];



   if (sroll.length > 2) {
    srin1.shift()
  }
  srin1.push(s21)
  console.log(srin1)
  
  console.log(s21)

  
  document.getElementById("slot1").textContent = srin1[0] + " <" +srin1[1] + "> " +srin1[2]   



  const s22 = symbols[Math.floor(Math.random() * symbols.length)];



   if (sroll.length > 2) {
    srin2.shift()
  }
  srin2.push(s21)
  console.log(srin2)
  
  console.log(s22)

  
  document.getElementById("slot2").textContent = srin2[0] + " <" +srin2[1] + "> " +srin2[2]
  
  const s12 = symbols[Math.floor(Math.random() * symbols.length)];



   if (sroll.length > 2) {
    srin3.shift()
  }
  srin3.push(s12)
  console.log(srin3)
  
  console.log(s12)

  
  document.getElementById("slot3").textContent = srin3[0] + " <" +srin3[1] + "> " +srin3[2] 





    count++;

  
    setTimeout(updateSlots, count * 15 + 50);
}

function res (){

if (robux < 10){
return;
}
if (dep < 10){
  dep = 10
  if (robux < 10){
    return;
    }  
}

const s21 = symbols[Math.floor(Math.random() * symbols.length)];







    
  
  const result = document.getElementById("slotResult");

  if (srin1[1] === srin2[1] && srin2[1] === srin3[1]) {
    robux += dep * 11;
    result.textContent = "🎉 Виграш + " + dep * 10 + " робуксів!";
    setTimeout(() => {tim(result)}, 1000); 
    result.style.animation = "flashWin 1s ease";
    
    // alert("sadasdasdasd")
  } else {
    result.textContent = "😢 Нічого не випало.";
    setTimeout(() => {tim(result)}, 1000); 
  }

  updateBalance();
  
  sp1in = 1;
  if (robux < dep){
    dep = robux;
    updateBalance();
  }
    
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
    // if (sroll[1] == '🔴'){
    // //   result = 'червоне'
    // //   rest = '🔴'
    // // } else
    // // if (sroll[1] == '⚫'){
    // //   result = 'чорне'
    // //   rest = '⚫'
    // // } else {
    // //   result = 'zero'
    // //   rest = '💎'
    // // }
    console.log(choice)
    document.getElementById("roll").textContent = rest;
  console.log(result)


  document.getElementById("rouletteResult");
  
    const msg = roll[1] === choice && choice != "zero" ?
     "🎉 Ви виграли " +  dep * 2 + " робуксів!" :
     roll[1] == choice && choice == "zero" ?
       "🎉 Ви виграли " +  dep * 10 + " робуксів!" :
        "❌ Ви програли " +  dep  + " робуксів!" ;
    
  
    if (roll[1] == choice && choice != "zero") robux += dep * 2;
    if (roll[1] == choice && choice == "zero") robux += dep * 10;
    const res = document.getElementById("rouletteResult");
    res.textContent = `Випало: ${result}. ${msg}`;
    res.style.animation = "flashWin 1s ease";
    setTimeout(() => {tim(res)}, 3000); 
    // setTimeout(() => res.style.animation = "", 1000);
    updateBalance();
}
