import { dbContext } from '../db/DbContext'

class CreatureService {
  async getCreatures(query = {}) {
    let creatures = await dbContext.Creature.find(query)
    return creatures
  }

  async createCreature(data) {
    let creature = await dbContext.Creature.create(data)
    return creature
  }
}
export const creatureService = new CreatureService()
