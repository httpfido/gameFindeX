const validate = (req, res, next) => {
  try {
    const { name, description, released, genres, rating, platforms } =
      req.body;
    if (!name) throw Error("Missing name");
    if (!description) throw Error("Missing description");
    // if (!released) throw Error("Missing release date")
    // if (!rating) throw Error("Missin rating")
    if (!genres) throw Error("Missing genres");
    if (!platforms) throw Error("Missing platforms");

    arr = [
      "PlayStation",
      "PlayStation 2",
      "PlayStation 3",
      "PlayStation 4",
      "PlayStation 5",
      "PC",
      "Xbox One",
      "Nintendo Switch",
      "Android",
      "Nintendo DS",
      "macOS",
      "Linux",
      "Game Boy Advance",
      "Game Boy",
    ];
    let filtrado = platforms.filter((element) => arr.includes(element));
    if (filtrado.length !== platforms.length)
      throw Error("Invalidated plarform");
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = validate;
