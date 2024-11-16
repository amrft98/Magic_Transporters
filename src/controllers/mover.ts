import { Request, Response } from 'express';
import MagicMover,{MagicMoverInterface} from '../models/MagicMover'; 
import MagicItem from '../models/MagicItem';
import MissionLogger from '../models/MissionLogger';

export const addMover = async (req: Request, res: Response): Promise<Response>=> {
  try {
    const { name, weightLimit }: { name: string; weightLimit: number } = req.body;
    if (!name || !weightLimit) {
      return res.status(400).json({ message: 'Name and weightLimit are required.' });
    }
    const newMover = await MagicMover.create({
      name,
      weightLimit,
      questState: 'resting', 
    });
    return res.status(201).json({
      message: 'Magic mover added successfully.',
      mover: newMover,
    });
  } catch (err) {
    return res.status(500).json({ message: 'error while adding mover.', err });
  }
};

export const loadMover = async (req:Request,res:Response): Promise<Response>=>{
  try{
    const {moverId}=req.params;
    const {itemIds}:{itemIds:string[]}=req.body; //must be an array
    if(itemIds.length === 0|| !Array.isArray(itemIds)){
      return res.status(400).json({message:"itemIds must be existing. "})
    }
    const mover: MagicMoverInterface|null = await MagicMover.findById(moverId).populate('loadedItems') ;
    if(!mover){
      return res.status(404).json({message:"mover not found !."});
    }
    if(mover.questState==="on-mission"){
      return res.status(400).json({message:`cannot load items while mover status is ${mover.questState}`})
    }
    const items = await MagicItem.find({ _id: { $in: itemIds } });
    if  (items.length !==itemIds.length){
      return res.status(404).json({ message:"One or more Magic Items not found."});
    }
    const currentWeight: number = mover.loadedItems && mover.loadedItems.length > 0 
    ? mover.loadedItems.reduce((total, item) => total + Number((item as any).weight!), 0)
    : 0; 
    const newItemsWeight:number = items.reduce((total, item) => total + Number(item.weight), 0); 
    if (currentWeight + newItemsWeight > mover.weightLimit) {
      return res.status(400).json({ message: 'Loading these items would exceed the mover\'s weight limit.' });
    }
    if(mover.questState==="resting"){
      await MagicMover.updateOne(
        { _id: mover._id },
        { $set: { questState: "loading" } }
    );
    }
    const mission=  await MissionLogger.create({
      moverId: mover._id,
      action: "loading",
     });
    const updateMover= await MagicMover.findOneAndUpdate (
     { _id: mover._id },
     { $push: { loadedItems: { $each: items.map(item => item._id) } } },
     { new: true });
    return res.status(200).json({ message: "Items loaded successfully.",updateMover });
  }
  catch(err){
    return res.status(500).json({ message: "Server error while loading mover."});
  }
}

export const startMission= async (req: Request, res: Response): Promise<Response>=> {
 try{
  const {moverId}=req.params;
  const mover: MagicMoverInterface|null = await MagicMover.findById(moverId);
  if (!mover){
    return res.status(404).json({message:"mover not found !."});
  } 
  if (mover.questState !== 'loading') {
    return res.status(400).json({ message:`Cannot start mission while mover is in ${mover.questState} state.`});
  }
  const updateMover = await MagicMover.findOneAndUpdate (
    { _id: mover._id },
    { $set: { questState: "on-mission" } },
    { new: true}
  )
  await MissionLogger.create({
    moverId: mover._id,
    action: "on-mission",
   });
 return res.status(200).json({ message: 'Mission started successfully.',updateMover});
}
 catch(err){
  return res.status(500).json({ message: "Server error while start the misssion.", err });
 }
}

export const endMission = async(req:Request,res:Response): Promise<Response>=> {
  try{
    const {moverId}=req.params;
    const mover: MagicMoverInterface| null = await MagicMover.findById(moverId);
    if (!mover){
      return res.status(404).json({message:"mover not found !."});
    } 
    if (mover.questState !== 'on-mission') {
      return res.status(400).json({ message: `Cannot end mission while mover is in ${mover.questState} state.` });
    }
    const moveritems=mover.loadedItems.map((e)=>(e as any)._id);
    const updateMover= await MagicMover.findOneAndUpdate(
      { _id:  mover._id },
      {
       $pull: { loadedItems: { $in: moveritems } } ,
       $set: { 
        questState: "resting",
        missionsCompleted:mover.missionsCompleted+1
      } 
       
      },
      {new :true}
    );
    await MissionLogger.create({
      moverId: mover._id,
      action: "resting",
     });
    return res.status(200).json({ message: 'Mission ended successfully.',updateMover});;
  }
  catch(err){
    return res.status(500).json({ message: "Server error while end the mission.", err });
  }

}
export const topMovers= async(req:Request,res:Response): Promise<Response>=> {
   try{
    const topMovers : MagicMoverInterface[]| null = await MagicMover.find().sort({ missionsCompleted: -1 })
    .select("_id name missionsCompleted weightLimit")
    .exec();
   return res.status(200).json({ topMovers });
   }
   catch(err){
    return res.status(500);
   }

}