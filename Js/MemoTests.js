let UncoveredCards = 0;
let Card1 = null;
let Card2 = null;
let FirstResult = null;
let SecondResult = null;
let Movements = 0;
let Successes = 0;
let Timer = false;
let Tim = 30;
let InitialTime = 30;
let RegressiveTime = null;

let ShowsMovement = document.getElementById("Movements");
let ShowHits = document.getElementById("Successes");
let ShowTime = document.getElementById("RemainingTime");

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8,];
numbers = numbers.sort(() => {return Math.random() - 0.5});
console.log(numbers);

function CountingTime(){
    RegressiveTime = setInterval(() => {
        Tim --;
        ShowTime.innerHTML = `Tiempo ${Tim} Seg`;
        if(Tim == 0){
            clearInterval(RegressiveTime);
            BlockCard();
            Timer = false;
            UncoveredCards = 0;
        }
    }, 1000)
}

function BlockCard(){
    for(let i = 0; i < numbers.length; i++){
        let CardBlock = document.getElementById(i);
        CardBlock.innerHTML = numbers[i];
        CardBlock.disabled = true;
    }
}

function uncover(id){
    if(Timer == false){
        CountingTime();
        Timer = true;
    }

    UncoveredCards ++;
    console.log(UncoveredCards);

    if(UncoveredCards == 1){
        Card1 = document.getElementById(id);
        FirstResult = numbers[id];
        Card1.innerHTML = FirstResult;

    Card1.disabled = true;
    }
    
    else if (UncoveredCards == 2){
        Card2 = document.getElementById(id);
        SecondResult = numbers[id];
        Card2.innerHTML = SecondResult;

        Card2.disabled = true;

        Movements ++;
        
        ShowsMovement.innerHTML = `Movimientos: ${Movements}`;

        if(FirstResult == SecondResult){
            UncoveredCards = 0;

            Successes ++;
            ShowHits.innerHTML = `Aciertos ${Successes}`;

        if (Successes == 8){
            clearInterval(RegressiveTime);
            ShowHits.innerHTML = `Aciertos: ${Successes} `;
            ShowTime.innerHTML = `Felicidades Solo Demoraste ${InitialTime - Tim} Seg`;
            if(Movements <= 10){
                ShowsMovement.innerHTML = `Eres muy rapido`;
            }else if(Movements >= 11 && Movements <= 20){
                ShowsMovement.innerHTML = `Estas en lo Promedio`;
            }else if(Movements > 20){
                ShowsMovement.innerHTML = `Tenes que practicar Más`;
            }
        }

        }else{
            setTimeout(() => {
                Card2.innerHTML = '';
                Card1.innerHTML = '';
                Card1.disabled = false;
                Card2.disabled = false;
                UncoveredCards = 0;
            }, 800)
        }

    }
}