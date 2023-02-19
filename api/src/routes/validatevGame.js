const validate = (req, res, next) => {
  try {
    const { name, description, platforms } = req.body;
    if (!name) throw Error("Missing name");
    if (!description) throw Error("Missing description");
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = validate;
