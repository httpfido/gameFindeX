const validate = (req, res, next) => {
  try {
    const { name, description, released, genres, rating, platforms } =
      req.body;
    if (!name) throw Error("Missing name");
    if (!description) throw Error("Missing description");

    if (!genres) throw Error("Missing genres");
    if (!platforms) throw Error("Missing platforms");

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = validate;
