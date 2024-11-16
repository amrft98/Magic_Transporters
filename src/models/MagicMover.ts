import mongoose,{Schema,Document} from 'mongoose';
export interface MagicMoverInterface extends Document {
 name: string;
 weightLimit: number;
 questState: 'resting' | 'loading' | 'on-mission';
 missionsCompleted: number;
 loadedItems: Schema.Types.ObjectId[];
  }
 const MagicMoverSchema: Schema = new Schema({
 name: { type: String, required: true},
 weightLimit: { type: Number, required: true},
 questState: { type: String, enum: ['resting', 'loading', 'on-mission'], default: 'resting'},
 missionsCompleted: { type: Number, default: 0},
 loadedItems: [{ type: Schema.Types.ObjectId, ref: 'MagicItem' }],
  });

  export default mongoose.model<MagicMoverInterface>("MagicMover", MagicMoverSchema);