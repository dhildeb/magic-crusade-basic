import { convertMagicToIcon } from "../Utils/magicIconConverter.js"
import { generateId } from "../Utils/generateId.js"
import { ProxyState } from "../AppState.js"

export class Creature {
  constructor(creature) {
    this.name = creature.name
    this.toughness = creature.toughness
    this.power = creature.power
    this.cost = creature.cost
    this.img = creature.img
    this.description = creature.description
    this.actions = creature.actions ?? 1
    this.id = generateId()
    this.inPlay = false
  }

  get Template() {
    return `
    <div class="col-2 card creature-img my-5 ${ProxyState.selected == this.id && this.actions ? 'selected' : ''}${this.actions < 1 ? 'exhausted' : ''}" style="background-image: url('${this.img}')" title="${this.description}" draggable="true" id="${this.id}" ondblclick="app.creaturesController.selectCreature('${this.id}', true)" onclick="app.creaturesController.determineAction('${this.id}')">
      <div class="card-body">
        <span class="position-absolute creature-title">${this.name}</span>
        <div class="creature-cost">${convertMagicToIcon(this.cost)}</div>
        <span class="creature-stats"><i class="fas fa-khanda"></i> ${this.power} / <i class="fas fa-heart"></i> ${this.toughness}</span>
      </div>
    </div>
    `
  }
}
