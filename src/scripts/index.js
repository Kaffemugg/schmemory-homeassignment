import '../styles/index.scss';
import Game from './game';

const app = document.querySelector('#app');
const game = new Game(app);
game.initGame();

