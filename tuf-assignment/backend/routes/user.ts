import express from 'express';
import { PrismaClient as client, PrismaClient } from '@prisma/client';
const userrouter = express.Router();
const prisma = new PrismaClient();
userrouter.get('/bulk',async(req,res)=>{
    
    try{
        const topics = await prisma.topic.findMany();
        return res.status(200).json({
            topics
        })
    }
    catch(e){
        return res.status(404).json({
            msg:"Error fetching the topcis"
        })
    }
})
userrouter.get('/flashcard/:topic',async(req,res)=>{
    const { topic } = req.params;
    try{
        const topic_f = await prisma.topic.findUnique({
            where:{
                title : topic
            }
        })
        const flashcards = await prisma.flashcard.findMany({
            where:{
                topicId : topic_f?.id
            }
        })
        return res.status(200).json({
            flashcards
        })
    }
    catch(e){
        return res.status(404).json({
            msg:"error fetching flashcards"
        })
    }
})
export default userrouter;