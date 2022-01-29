import { ProxyState } from "../AppState.js"
import { creaturesService } from "./CreaturesService.js"
import { playersService } from "./PlayersService.js"

class GameService {

  startGame() {
    playersService.createPlayers()
    ProxyState.turn = 0
  }

  determineCardDrawn() {
    let card = ''
    let place = 0
    let chance = Math.floor(Math.random() * 100) + 1
    if (chance > 50) {
      place = Math.floor(Math.random() * ProxyState.creatures.length)
      card = ProxyState.creatures[place]
    } else if (chance > 25) {
      place = Math.floor(Math.random() * ProxyState.magic.length)
      card = ProxyState.magic[place]
    } else {
      place = Math.floor(Math.random() * ProxyState.traps.length)
      card = ProxyState.traps[place]
    }
    return card
  }
  drawCard() {
    playersService.drawCard(this.determineCardDrawn())
    ProxyState.turn = ProxyState.turn
  }

  endTurn() {
    ProxyState.selected = null
    ProxyState.players = ProxyState.players
    let turn = ProxyState.turn
    playersService.resetDraw()
    creaturesService.resetAllActions()
    ProxyState.turn = turn >= ProxyState.players.length - 1 ? 0 : turn + 1
    this.bringOutYourDead()
  }
  bringOutYourDead() {
    ProxyState.players[ProxyState.turn].creatures.forEach(function (c, index) {
      if (c.name == 'Dead') {
        ProxyState.players[ProxyState.turn].creatures.splice(index, 1)
        ProxyState.players = ProxyState.players
      }
    });
  }
  endGame() {
    ProxyState.game = false
  }
}

export const gameService = new GameService()