const validate = (req, res, next) => {
  try {
    const { name, description, platforms } = req.body;
    if (!name) throw Error("Missing name");
    if (!description) throw Error("Missing description");
    // if (!platforms.length) throw Error("Missing platforms");
    // if (!genres.length) throw Error("Missing genres");

    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = validate;
