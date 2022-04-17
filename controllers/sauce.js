// controllers/sauce.js

const Sauce = require('../models/Sauce');
const lang = require('../language/fr');

exports.newSauce = (req, res) => {
    const reqSauce = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...reqSauce,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => { res.status(201).json({ message: lang.SUCCMSG_SAUCE_CREATED })})
        .catch((err) => res.status(400).json({ message: err.message }));
}

exports.getAll = (req, res) => {
    Sauce.find()
        .then( sauces => res.status(200).json(sauces))
        .catch(err => res.status(400).json({ message: err.message }))
}

exports.getOne = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then( sauce => res.status(200).json(sauce))
        .catch( err => res.status(400).json({ message: err.message }))
}

exports.modifiySauce = (req, res) => {
    res.status(200).send("Modify sauce");
}

exports.deleteSauce = (req, res) => {
    res.status(200).send("Sauce deleted");
}

exports.likeSauce = (req, res) => {
    res.status(200).send("Sauce liked");
}