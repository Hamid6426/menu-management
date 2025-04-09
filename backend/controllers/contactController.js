const Contact = require("../models/Contact");

exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ success: true, message: "Message submitted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
