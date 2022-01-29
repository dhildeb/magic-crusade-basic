import { ProxyState } from "../AppState.js"
import { Player } from "../Models/Player.js"
import { Creature } from "../Models/Creature.js"

class PlayersService {
  createPlayers(players = 1) {
    for (let i = 0; i <= players; i++) {
      ProxyState.players.push(new Player(i))
    }
  }
  drawCard(card) {
    if (typeof (card) == 'object' && card?.name !== undefined) {
      ProxyState.players[ProxyState.turn].creatures.push(new Creature(card))
    } else if (card?.trap !== undefined) {
      if (card.trap == 'dungeon') {
        let triggered = false
        ProxyState.players[ProxyState.turn].creatures.forEach(c => {
          if (c.inPlay && c.actions > 0 && !triggered) {
            c.actions += card.actions
            triggered = true
            window.alert(c.name + ' got ' + card.trap)
            ProxyState.players = ProxyState.players
            return
          }
        })
      }
    } else {
      ProxyState.players[ProxyState.turn].magic.push(card)
    }
    ProxyState.players[ProxyState.turn].drawCard()
    ProxyState.players = ProxyState.players
  }
  resetDraw() {
    ProxyState.players[ProxyState.turn].draw = Math.round(Math.random() * 6) + 1
  }
  verifyMagic(cost) {
    let canPlay = true
    cost.forEach(e => {
      if (!ProxyState.players[ProxyState.turn].magic.includes(e)) {
        canPlay = false
      }
    })
    if (!canPlay) {
      window.alert('Insufficient Magic')
    }
    return canPlay
  }
  reducePlayerMagic(cost) {
    cost.forEach(c => {
      let index = ProxyState.players[ProxyState.turn].magic.indexOf(c)
      ProxyState.players[ProxyState.turn].magic.splice(index, 1)
    })
  }
}

export const playersService = new PlayersService()