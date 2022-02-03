import { ProxyState } from '../AppState.js'
import { gameService } from "./GameService.js";
import { playersService } from './PlayersService.js';

class CreaturesService {
  selectCreature(id, refresh = false) {
    if (refresh) {
      ProxyState.selected = ProxyState.selected == id ? null : id
      ProxyState.players = ProxyState.players
    } else {
      ProxyState.selected = id
    }
  }
  playCreature() {
    let creature = ProxyState.players[ProxyState.turn].creatures.filter(c => c.id == ProxyState.selected)
    if (playersService.verifyMagic(creature[0].cost)) {
      playersService.reducePlayerMagic(creature[0].cost)
      creature[0].inPlay = true
    }
    ProxyState.players = ProxyState.players
  }
  determineAction(id, player = false) {
    let target = this.getCreatureById(id)
    let inPlay = target?.inPlay ?? true
    let attacking = false
    let enemy = id
    let action = false
    let attacker = null
    ProxyState.players[ProxyState.turn].creatures.forEach(c => {
      if (c.id == ProxyState.selected) {
        attacker = c
        attacking = true
        if (!c.inPlay) {
          inPlay = false
        }
        if (c.actions > 0) {
          action = true
        }
      }
      if (c.id == id) {
        enemy = false
      }
    });

    if (attacking && enemy && action && inPlay) {
      // TODO make own function
      attacker.actions--
      target.toughness -= attacker.power
      // determine death
      if (target.toughness < 1) {
        this.deleteCreatureById(target.id)
      }
      ProxyState.players = ProxyState.players
    }
    if (player !== false && action && inPlay && player != ProxyState.turn) {
      // TODO make own function
      attacker.actions--
      ProxyState.players[player].hp -= attacker.power
      if (ProxyState.players[player].hp < 1) {
        gameService.endGame()
      }
      ProxyState.players = ProxyState.players
    }
  }
  getCreatureById(id) {
    if (!id) {
      return
    }
    let creature = null
    ProxyState.players.forEach(p => {
      p.creatures.forEach(c => {
        if (c.id == id) {
          creature = c
          return
        }
      })
      if (creature) {
        return
      }
    })
    return creature
  }
  deleteCreatureById(id) {
    if (!id) {
      window.alert('creature does not exist')
      return
    }
    let index = null
    ProxyState.players.forEach(p => {
      for (let i = 0; i < p.creatures.length; i++) {
        if (p.creatures[i].id == id) {
          index = i
        }
        if (index != null) {
          p.creatures[index].img = 'https://m.media-amazon.com/images/I/518Zk3mCtZL._AC_.jpg'
          p.creatures[index].name = 'Dead'
          index = null
          return
        }
      }
      if (index) {
        return
      }
    })
    return
  }
  resetAllActions() {
    ProxyState.players[ProxyState.turn].creatures.forEach(c => c.actions = 1)
  }
  getAllCreatures(creatures) {
    ProxyState.creatures = creatures
  }
}

export const creaturesService = new CreaturesService()
