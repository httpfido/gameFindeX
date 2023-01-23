const validate = (req, res, next) => {
  try {
    const { name, description, releaseDate, rating, platforms } = req.body;
    if (!name) throw Error("Missing name")
    if (!description) throw Error("Missing description")
    if (!releaseDate) throw Error("Missing release date")
    if (!rating) throw Error("Missin rating")
    if (!platforms) throw Error("Missing platforms")
    
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = validate ;

//    arr2 = ["PlayStation 2", "PlayStation 3", "PlayStation 4", "PlayStation 5", "PC"]
//   let commonElements = platforms.filter(element => arr2.includes(element));
//   console.log("hla")