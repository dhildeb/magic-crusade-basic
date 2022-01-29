import { ProxyState } from "../AppState.js";
import { gameService } from "../Services/GameService.js";

export class GameController {
  constructor() {
    ProxyState.on('game', _endGame)
  }
  startGame() {
    document.getElementById('startGame').classList.add('d-none')
    document.getElementById('game').classList.remove('d-none')
    gameService.startGame()
  }
  drawCard() {
    gameService.drawCard()
  }
  endTurn() {
    gameService.endTurn()
  }

}
function _endGame() {
  if (!ProxyState.game) {
    document.getElementById('game').innerHTML = `<h1>Player ${ProxyState.turn + 1} is the Victor!</h1>`
  }
}
