import Message from "../models/Message.js"

export const createMessage = async (req, res) => {
    const newMessage = new Message({
        conversationId: req.body.conversationId,
        sender: req.userId,
        text: req.body.text,
    });

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.id,
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
}