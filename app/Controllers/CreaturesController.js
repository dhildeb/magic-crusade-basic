import { creaturesService } from '../Services/CreaturesService.js'

export class CreaturesController {
  constructor() {
  }
  selectCreature(id, refresh) {
    creaturesService.selectCreature(id, refresh)
  }
  playCreature() {
    creaturesService.playCreature()
  }
  determineAction(id, player) {
    creaturesService.determineAction(id, player)
  }
  getAllCreatures(creatures) {
    creaturesService.getAllCreatures(creatures)
  }
}
