import express from 'express';
const adminrouter = express.Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Route to create a topic
adminrouter.post('/topics', async (req, res) => {
    const body = req.body;
    try {
        const topic = await prisma.topic.create({
            data: {
                title: body.title,
            }
        });
        console.log(topic);
        return res.status(200).json({
            msg: "Topic created successfully"
        });
    } catch (e) {
        res.status(404).json({
            msg: "Some error occurred"
        });
    }
});

// Route to create a flashcard
adminrouter.post('/flashcard/:topic', async (req, res) => {
    const body = req.body;
    const { topic } = req.params;
    if (!topic) {
        return res.status(404).json({
            msg: "Topic not found"
        });
    }
    try {
        const existing_topic = await prisma.topic.findUnique({
            where: {
                title: topic || ""
            }
        });
        if (existing_topic) {
            let flashcard = await prisma.flashcard.create({
                data: {
                    question: body.question,
                    answer: body.answer,
                    topic: {
                        connect: {
                            id: existing_topic.id
                        }
                    }
                }
            });
            console.log(flashcard);
        } else {
            const flashcard = await prisma.flashcard.create({
                data: {
                    question: body.question,
                    answer: body.answer,
                    topic: {
                        create: {
                            title: topic
                        }
                    }
                }
            });
            console.log(flashcard);
        }
        return res.status(200).json({
            msg: "Flashcard created successfully"
        });
    } catch (e) {
        return res.status(404).json({
            msg: "Error creating flashcard"
        });
    }
});

// Route to get server health
adminrouter.get('/healthy', (req, res) => {
    res.json({
        msg: "Healthy server"
    });
});

// Route to update a flashcard's question and answer
adminrouter.put('/flashcards/:id', async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    try {
        const flashcard = await prisma.flashcard.update({
            where: { id: parseInt(id) },
            data: {
                question,
                answer
            }
        });
        return res.status(200).json({
            msg: "Flashcard updated successfully",
            flashcard
        });
    } catch (e) {
        return res.status(404).json({
            msg: "Error updating flashcard"
        });
    }
});

// Route to delete a flashcard by ID
adminrouter.delete('/flashcards/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.flashcard.delete({
            where: { id: parseInt(id) }
        });
        return res.status(200).json({
            msg: "Flashcard deleted successfully"
        });
    } catch (e) {
        return res.status(404).json({
            msg: "Error deleting flashcard"
        });
    }
});

export default adminrouter;
