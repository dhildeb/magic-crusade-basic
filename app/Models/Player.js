import { convertMagicToIcon } from "../Utils/magicIconConverter.js"

export class Player {
  constructor(id) {
    this.hp = 10
    this.id = id
    this.creatures = []
    this.magic = []
    this.draw = Math.round(Math.random() * 5) + 1
  }

  takeDamage(damage) {
    this.hp -= damage
  }

  playCreature(creature) {
    this.creatures.push(creature)
  }

  addMagic(magic) {
    this.magic.push(magic)
  }
  drawCard() {
    this.draw--
  }
  get ControllerTemplate() {
    return `<p class="text-center mb-5">Player ${this.id + 1}</p>
    <p>${this.draw > 0 ? 'Draw ' + this.draw + ' Card(s)' : ""}</p>
    <button class="btn btn-primary mt-5" onclick="app.gameController.drawCard()" ${this.draw > 0 ? '' : 'disabled'}>Draw Card</button>
    <button class="btn btn-danger mt-5" onclick="app.gameController.endTurn()">End Turn</button>
    `
  }

  get MagicTemplate() {
    return convertMagicToIcon(this.magic)
  }
}