import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CreatureSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    toughness: { type: Number, default: 1 },
    power: { type: Number, default: 1 },
    cost: { type: Array, required: true },
    img: { type: String },
    description: { type: String },
    actions: { type: Number, default: 1 }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
