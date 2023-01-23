module.exports = (req, res, next)=>{
    const {name, description, releaseDate, rating, platforms} = req.body;
    if(!name) res.status(400).send({ error: "Missing name"})
    if(!description) res.status(400).send({ error: "Missing description"})
    if(!releaseDate) res.status(400).send({ error: "Missing releaseDate"})
    if(!rating) res.status(400).send({ error: "Missing rating"})
    if(!platforms) res.status(400).send({ error: "Missing platforms"})
    next()
};