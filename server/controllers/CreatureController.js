import { creatureService } from '../services/CreatureService'
import BaseController from '../utils/BaseController'

export class CreatureController extends BaseController {
  constructor() {
    super('api/creature')
    this.router
      .get('', this.getCreatures)
      .post('/create', this.createCreature)
  }

  async getCreatures(req, res, next) {
    try {
      const creatures = await creatureService.getCreatures(req.userInfo)
      res.send(creatures)
    } catch (error) {
      next(error)
    }
  }
  async createCreature(req, res, next) {
    try {
      let creature = creatureService.createCreature(req.query)
      res.send(creature)
    } catch (error) {
      next(error)
    }
  }
}
