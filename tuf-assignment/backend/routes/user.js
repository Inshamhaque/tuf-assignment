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
const client_1 = require("@prisma/client");
const userrouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
userrouter.get('/bulk', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield prisma.topic.findMany();
        return res.status(200).json({
            topics
        });
    }
    catch (e) {
        return res.status(404).json({
            msg: "Error fetching the topcis"
        });
    }
}));
userrouter.get('/flashcard/:topic', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { topic } = req.params;
    try {
        const topic_f = yield prisma.topic.findUnique({
            where: {
                title: topic
            }
        });
        const flashcards = yield prisma.flashcard.findMany({
            where: {
                topicId: topic_f === null || topic_f === void 0 ? void 0 : topic_f.id
            }
        });
        return res.status(200).json({
            flashcards
        });
    }
    catch (e) {
        return res.status(404).json({
            msg: "error fetching flashcards"
        });
    }
}));
exports.default = userrouter;
