import mongoose ,{Schema,Document} from "mongoose";
export interface MagicItemInterface extends Document{
 name:string,
 weight:number
 }
 const MagicItemSchema :Schema =new Schema({
 name:{type: String, required:true},
 weight:{type: String, required:true}
 });

export default mongoose.model<MagicItemInterface>("MagicItem",MagicItemSchema)