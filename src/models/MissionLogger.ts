import mongoose ,{Schema,Document} from "mongoose";
export interface MissionLoggerInterface extends Document{
    moverId:Schema.Types.ObjectId;
    action: 'resting' | 'on-mission'| 'loading';
    timestamp:Date;
}
 const MissionLogggerSchema :Schema= new Schema({
    moverId: { type: Schema.Types.ObjectId, ref: 'MagicMover', required: true },
    action: { type: String, enum: ['loading', 'on-mission', 'resting'], required: true },
    timestamp: { type: Date, default: Date.now },
 });
export default mongoose.model<MissionLoggerInterface>("MissionLogger",MissionLogggerSchema);