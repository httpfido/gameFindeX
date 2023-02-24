const validate = (req, res, next) => {
  try {
    const { name, description, released } = req.body;
    if (!name) throw Error("Missing name");
    if (!description) throw Error("Missing description");
    if (!released) throw Error("Missing released");
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};


module.exports = validate;
