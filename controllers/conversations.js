import Conversation from "../models/Conversation.js"

export const createConv = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.userId, req.body.receiverId],
    });

    try {
        // Check conversation existed
        const get = await Conversation.find({ members: { $in: [req.userId] } });
        const existed = get.find((conv) => { 
            if(conv.members.includes(req.body.receiverId)) 
                return true; 
            return false; 
        });
        if(existed) {
            return res.status(200).json(existed);
        }
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
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