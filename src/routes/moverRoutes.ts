import express, { Router } from 'express';
import {addMover,loadMover,startMission,endMission,topMovers} from "../controllers/mover";

const router  = express.Router();


router.post('/add',async (req, res) => {
    try {
      await addMover(req, res);
    } catch (error) {
      res.status(500).json({ message:"server error"});
    }
  });
//load items to mover ( items must be an array)
router.post('/:moverId/load',async (req,res)=>{
    try{
        await loadMover(req,res);
    }
    catch(err){
    res.status(500).json({message:"server error"});
    }
  });
router.post('/:moverId/start-Mission',async (req, res) => {
    try {
      await startMission(req, res);
    } catch (error) {
      res.status(500).json({ message:"server error"});
    }
  });
router.post('/:moverId/end-Mission',async (req, res) => {
    try {
      await endMission(req, res);
    } catch (error) {
      res.status(500).json({ message:"server error"});
    }
  })
router.get("/topMovers",async (req, res) => {
    try {
      await topMovers(req, res);
    } catch (error) {
      res.status(500).json({ message:"server error"});
    }
});
export default router;