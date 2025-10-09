import { cloudinary } from '../config/cloudinary.js';
import User from '../models/userModel.js';

const setProfileImage = async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res.status(400).json({ error: 'User not provided' });
  }
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    const user = await User.findById(userId);
    if (user.profile_image_public_id) {
      await cloudinary.uploader.destroy(user.profile_image_public_id);
    }
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'profileImage',
      resource_type: 'image',
    });

    await User.findByIdAndUpdate(userId, {
      $set: {
        profile_image_url: result.secure_url,
        profile_image_public_id: result.public_id,
      },
    });

    res.status(200).json({
      message: 'File uploaded successfully',
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    return res.status(500).json({ error: `An error encountered ${err.message}` });
  }
};

export { setProfileImage };
