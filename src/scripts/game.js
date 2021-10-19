import Card from './card';
import _status from "./status";

const imageNames = 'ABCDEFGHIJKLMNOP';        

const PAIRS = 4;

class Game {

    constructor(foo){        
        this.gameDOM = foo;
        this.cards = [];
        this.players = [];               
    }

    get game(){        
        return this;
    }

    initGame(){
        //Register Handlers        
        this.gameDOM.addEventListener('card-flipped', (e, game) => this.flipCardHandler(e, this.game));                        
        
        //Generate Card
        for(let ii = 0; ii < PAIRS; ii++){  
            let id =  imageNames.substring(ii,ii+1);                                
            this.cards.push(new Card(id));            
            this.cards.push(new Card(id));            
        }        
        this.startRound(this.game);
    }

    // FisherYates
    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }


    startRound(game) {        
        console.log("Starting Game");
        game.cards.forEach(card => {
            card.setStatus(_status.closed);            
            card.element.remove();
        });

        this.shuffleArray(game.cards);
        
        game.cards.forEach(card => {
            const board = game.gameDOM.querySelector('#board');
            board.appendChild(card.element);            
        });

        game.gameDOM.classList.remove('finished');
    }

    // Split into smaller functions
    flipCardHandler(e, game) {                
        if(!e.detail || !e.detail.card){
            throw Error("Not a card");
        }
        let thisCard = e.detail.card;
        let openCards = game.cards.filter(card => card.status === _status.open);
                
        // cannot open more than 2 cards at a time;
        if(openCards.length === 2 ) return;
        
        // open targetcard
        let target = thisCard.setStatus(_status.open);
        openCards.push(thisCard);

        // Check i pair match
        let isPair = openCards.filter(card => card.id === thisCard.id);                        
        if(isPair.length === 2) {            
            isPair.forEach(card => {
                card.setStatus(_status.finished);
            });
        }
        
        // If open pair of card don´t match close them
        if(openCards.length === 2){
            setTimeout(function() { 
                openCards.forEach(card => {
                    if(card.status === _status.open) card.setStatus(_status.closed);
                });
            }, 2000);
        }               
        
        // Check if finish conditions are met and reset
        let finishedCards = game.cards.filter(card => card.status === _status.finished);
        if(finishedCards.length === PAIRS * 2 ) {
            game.gameDOM.classList.add('finished');
            alert('You did it, game will reset in 5 seconds.');            
            setTimeout(function() { 
                game.startRound(game);    
            }, 5000);
        }            
    }
}

export default Game;