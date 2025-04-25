import User from "./User.js";

export const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Ensure the image is uploaded
    if (!req.files || !req.files.image || !req.files.video) {
      return res.status(400).json({ message: "Please upload both an image and a video" });
    }

    const imagePath = req.files.image[0].filename; // Extract image filename
    const videoPath = req.files.video[0].filename; // Extract video filename
    const newUser = new User({ name, email, password, image: imagePath,video: videoPath });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const fetch = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const del = async (req, res) => {
  try {
    const { email } = req.body;
    const { id } = req.params;
    const result = await User.findByIdAndDelete(req.params.id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
