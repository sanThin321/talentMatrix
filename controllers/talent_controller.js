const User = require("../model/user_model");

exports.update_talent = async (req, res) => {
  try {
    console.log("here");
    const email = req.params.email;
    const updateData = req.body;

    console.log(updateData, email);

    const updatedUser = await User.updateOne({ email: email }, { $set: updateData });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
