import Conversation from "../models/Conversation"

export const createConv = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.userId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getConv = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.id] },
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
}