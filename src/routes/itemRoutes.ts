import express,{ Router }  from "express";
import { addItem } from "../controllers/items";

const router=express.Router();
router.post('/add', async (req, res) => {
    try {
      await addItem(req, res);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

export default router;