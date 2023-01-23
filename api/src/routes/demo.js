const validate = (req, res, next) => {
    const { platforms } = req.body
    arr2 = ["PlayStation 2", "PlayStation 3", "PlayStation 4", "PlayStation 5", "PC"]
    let commonElements = platforms.filter(element => arr2.includes(element));
    console.log("hla")
}
validate()