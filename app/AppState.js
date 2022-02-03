import { Creature } from "./Models/Creature.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Creature').Creature[]} */
  creatures = [{ name: 'Goblin', toughness: 2, power: 1, cost: ['mountain', 'fire'], img: 'https://whfb.lexicanum.com/mediawiki/images/thumb/c/c6/Goblin_TGP.jpg/425px-Goblin_TGP.jpg', description: 'Ugly' }, { name: 'Knight', toughness: 2, power: 2, cost: ['water', 'air'], img: 'https://cdnb.artstation.com/p/assets/images/images/017/277/143/large/ahmed-akib-knight-1.jpg?1590162594', description: 'Honor and Glory' }
  ]
  traps = [{ trap: 'dungeon', actions: -1 }]
  magic = ['mountain', 'fire', 'water', 'air']
  players = []
  turn = 0
  selected = null
  game = true
  creationPage = false
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
