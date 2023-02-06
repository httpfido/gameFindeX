const validate = (req, res, next) => {
  try {
    const { name, description, genres, platforms } =
      req.body;
    if (!name) throw Error("Missing name");
    if (!description) throw Error("Missing description");

    if (!platforms.length) {
      console.log("missing platforms");
      throw Error("Missing platforms")};

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = validate;
