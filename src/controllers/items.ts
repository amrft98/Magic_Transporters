import { Request, Response } from 'express';
import MagicItem from '../models/MagicItem';

export const addItem = async (req: Request, res: Response) : Promise<Response>=> {
  try {
    const { name, weight } = req.body;

    if (!name || !weight) {
      return res.status(400).json({ message: 'Name and weight are required.' });
    }

    const newItem = await  MagicItem.create({
      name,
      weight,
    });
    return res.status(201).json({
      message: 'Magic Item added successfully.', item: newItem });
  } catch (error) {
    console.error('Error adding item:', error);
    return res.status(500).json({ message: 'error while adding item.', error });
  }
};
