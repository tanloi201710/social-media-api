

export const fileUpload = (req,res) => {
    try {
        return res.status(200).json("File uploaded successfully!");
    } catch (error) {
        return res.status(500).json(error);
    }
}