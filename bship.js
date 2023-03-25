/**** Author: Yigit Dincsoy
Desc: Code for Battleship ****/

//***REQUIREMENTS***///
const fs = require(`fs`);
const rls = require(`readline-sync`);

//***FUNCTIONS***///


//crewComments 
function crewComments() {
    let commentID = Math.floor(Math.random() * 10);
    switch(commentID) {
        case 1: console.log(`( O _O) < aye aye sire`); break;
        case 2: console.log(`( O _O) < LETS GET THEM`); break;  
        case 3: console.log(`( O _O) < I should have been a Full Stack Application Developer...`); break;
        case 4: console.log(`(O _O ) < this job sucks`); break;
        case 5: console.log(`( ° ͜ʖ ͡ °) < WE SHALL BE VICTORIOUS`); break;
        case 6: console.log(`(^-^)/ LETS DESTROY THEM`); break;
        case 7: console.log(`(^-^)/ < LOAD THE CANNONS`); break;
        case 8: console.log(`(^-^)/ HERE IS A GIFT FOR YOU!!!!!`); break;
        case 9: console.log(`(͡ ° ͜ʖ ͡ °)< ATTACK!!!!!!!!!!!!!`); break;
      }
sleep(1);
}

//sleep, sleepTime: time to sleep in <<seconds>>
function sleep(sleepTime) {

    let currentTime = Date.now();
    let wakeTime = currentTime+sleepTime*1000;
    while (Date.now() < wakeTime) {};
  }

//pressAnyKey
function pressAnyKey() {
    console.log(`
    PRESS ANY KEY TO CONTINUE`)
    rls.question(``);
}

//getCoordinates
function getCoordinates() {
            
    let col;
    let row;
    
    while (true) {
        let goodLetter = false;
        let goodNumber = false;
        
        const someString = rls.question(`Please enter your coordinates: (Example: A5, C4...) `);
        const inputArray = someString.split(``);
    
        let letterInput =  inputArray[0];
        let numberInput =  parseInt(inputArray[1]);


        switch(letterInput) {
            case `A`: col=0; goodLetter = true; break;
            case `B`: col=1; goodLetter = true; break;
            case `C`: col=2; goodLetter = true; break;
            case `D`: col=3; goodLetter = true; break;
            case `E`: col=4; goodLetter = true; break;
            case `F`: col=5; goodLetter = true; break;
            case `G`: col=6; goodLetter = true; break;
            case `H`: col=7; goodLetter = true; break;
            case `I`: col=8; goodLetter = true; break;
            case `J`: col=9; goodLetter = true; break;
            }

        
        switch(numberInput) {
            case 1: row=0; goodNumber = true; break;
            case 2: row=1; goodNumber = true; break;
            case 3: row=2; goodNumber = true; break;
            case 4: row=3; goodNumber = true; break;
            case 5: row=4; goodNumber = true; break;
            case 6: row=5; goodNumber = true; break;
            case 7: row=6; goodNumber = true; break;
            case 8: row=7; goodNumber = true; break;
            case 9: row=8; goodNumber = true; break;
                }

        if(parseInt(inputArray[1]) == 1 && parseInt(inputArray[2]) ==  0) {
            row = 9;
            goodNumber = true;
    }



    if (goodNumber == true && goodLetter == true) { break;} 
    else {console.log(`(͡ ° ͜ʖ ͡ °) < Invalid input sire.`)}
}

let returnArray = [col, row]
return(returnArray);

}

//displayArray, arrToDisplay: array that you want to display :)
function displayArray(arrToDisplay)
{
    console.log(`       A    B    C    D    E    F    G    H    I    J`);
    let special10 = true;
    for (let row=0; row<arrToDisplay.length; row++) {
        for (let col=0; col<arrToDisplay.length; col++) {
            if (col === 0) {
                let rowToWrite = 1+row;
                process.stdout.write(rowToWrite.toString());
                process.stdout.write(`: `);
            }
      if (row == 9 && special10 == true) {process.stdout.write(`   `); special10 = false;} else {
      process.stdout.write(`    `)}
      process.stdout.write((arrToDisplay[row][col]).toString());
    }
    process.stdout.write(`\n`);
}
}

//***INIT VARIABLES***///
const MAX_TURNS = 30;
const TOTAL_SHIP_SEGMENTS = 17;

let gameStatus = `PLAY`;
let currentTurn = 0;
let numHits = 0;
const gridText = fs.readFileSync(`map.txt`, `utf-8`);
const gridRows = gridText.split(`\r\n`);

let battleGrid = [];
let targetGrid = [];

//***START***//
for (const row of gridRows) {
    battleGrid.push(row.split(`,`));
}
    
//Create an alternative target grid for user to see.
for (let i = 0; i < 10; i++) {
targetGrid[i] = [`~`,`~`,`~`,`~`,`~`,`~`,`~`,`~`,`~`,`~`];}

//Visible Start    
console.log(`
*********************************************
   __|_|__|_|__                             *
 _|____________|__                          *
 |o o o o o o o o /                         *
 ~'~'~'~'~'~'~'~'~'~'~'~'~'~'~'~'~'~'~      *
   SUPER BATTLESHIP 5: RETURN OF THE SHIP   *
        by SCOTIASOFT - 1972                *
*********************************************`)


console.log(`
(͡ ° ͜ʖ ͡ °) < Sir, we have detected an enemy fleet approaching us! 
Because of the fog, we can only confirm if we have successfully hit an enemy ship or not.
You have to use your superior analytical skills to estimate their location.`)
pressAnyKey();

while ((currentTurn <= MAX_TURNS) && (gameStatus = `PLAY`))
{ 
    currentTurn++;
    if (currentTurn == MAX_TURNS+1) {
        gameStatus = `LOST`;
        console.log(`Out of ammo, game lost.`);
        console.log(`You were able to hit`, numHits, `out of`, TOTAL_SHIP_SEGMENTS, `ships. Better luck next time!` )
        break;
    }

    //Print GUI
    console.log(`OUR VIEW:`)
    displayArray(targetGrid);
    console.log(`Ammo Left:`, 1+MAX_TURNS - currentTurn);
    console.log(`
    (͡ ° ͜ʖ ͡ °) < Admiral, where should we shoot next?! (Example: A4, B10)
    `);
    console.log(``);
    
    alreadyShot = true;

    while (alreadyShot == true) {
    let coorArray =  getCoordinates();
        col = coorArray[0];
        row = coorArray[1];

    if ( (targetGrid[row][col] == `H`) || (targetGrid[row][col] == `S`)) { 
        console.log(`(͡ ° ͜ʖ ͡ °) <Admiral, we already shot at that area!`);
    } else {
        alreadyShot = false;
    }
    }

    console.log(`FIRE!!!`)
    crewComments();
    sleep(0.5);
    if (battleGrid[row][col] == `1`) 
    {
       console.log( `
        ʕ·͡ᴥ·ʔ HIT!!!!!!! ʕ·͡ᴥ·ʔ`);
        pressAnyKey();
        targetGrid[row][col] = `H`
        numHits++;
        if(numHits == TOTAL_SHIP_SEGMENTS){
            console.log(`YOU WON!`);
            gameStatus = `WIN`;
            break;
        }

    } else {
        targetGrid[row][col] = `S`
        console.log(`**********
        
        
        splash
        
        
        
        **********`);
        pressAnyKey();
    }

   
}



