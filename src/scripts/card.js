import _status from "./status";

class Card{

    constructor(id, data = {}){
        this.id = id;        
        this.data = data;
        this.createCard();        
        this.status = _status.closed;        
    }

    createCard(){        
        const template = `<div class="card"><div class="face front"></div><div class="face back"><img src="http://localhost:3002/svg/${this.id}/300"/></div></div>`;
        const el = this.getNodes(template);                        
        el.addEventListener('click', (e, card) => this.flipCard(e, this));
        this.element = el;
        return this;
    }
    
    flipCard(e, card) {        
        e.preventDefault();
        e.stopPropagation();
                
        const flipEvent = new CustomEvent('card-flipped', {            
            bubbles: true,
            detail: {
                card: this,            
            }
        });        
        
        card.element.dispatchEvent(flipEvent);
    }

    setStatus(status) {        
        this.status = status;        
        this.updateUI();
    }

    updateUI(){
        if(this.status === _status.open) {
            this.element.classList.add('open');             
        }
        else{
            this.element.classList.remove('open');         
        }
        if(this.status === _status.finished) {
            this.element.classList.add('finished');             
        }
        else{
            this.element.classList.remove('finished');         
        }
        
    }

    getNodes(str){
        return new DOMParser().parseFromString(str, 'text/html').body.querySelector('.card');    
    }
    

}

export default Card;