"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminrouter = express_1.default.Router();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Route to create a topic
adminrouter.post('/topics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const topic = yield prisma.topic.create({
            data: {
                title: body.title,
            }
        });
        console.log(topic);
        return res.status(200).json({
            msg: "Topic created successfully"
        });
    }
    catch (e) {
        res.status(404).json({
            msg: "Some error occurred"
        });
    }
}));
// Route to create a flashcard
adminrouter.post('/flashcard/:topic', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { topic } = req.params;
    if (!topic) {
        return res.status(404).json({
            msg: "Topic not found"
        });
    }
    try {
        const existing_topic = yield prisma.topic.findUnique({
            where: {
                title: topic || ""
            }
        });
        if (existing_topic) {
            let flashcard = yield prisma.flashcard.create({
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
        }
        else {
            const flashcard = yield prisma.flashcard.create({
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
    }
    catch (e) {
        return res.status(404).json({
            msg: "Error creating flashcard"
        });
    }
}));
// Route to get server health
adminrouter.get('/healthy', (req, res) => {
    res.json({
        msg: "Healthy server"
    });
});
// Route to update a flashcard's question and answer
adminrouter.put('/flashcards/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { question, answer } = req.body;
    try {
        const flashcard = yield prisma.flashcard.update({
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
    }
    catch (e) {
        return res.status(404).json({
            msg: "Error updating flashcard"
        });
    }
}));
// Route to delete a flashcard by ID
adminrouter.delete('/flashcards/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.flashcard.delete({
            where: { id: parseInt(id) }
        });
        return res.status(200).json({
            msg: "Flashcard deleted successfully"
        });
    }
    catch (e) {
        return res.status(404).json({
            msg: "Error deleting flashcard"
        });
    }
}));
exports.default = adminrouter;
