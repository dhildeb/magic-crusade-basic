import mongoose from 'mongoose'
import { CreatureSchema } from '../models/Creature'

class DbContext {
  Creature = mongoose.model('Creature', CreatureSchema)
}

export const dbContext = new DbContext()
