// controllers/sauce.js

const Sauce = require('../models/Sauce');
const lang = require('../language/fr');
const fs = require('fs');

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
    const reqSauce = req.file ? 
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };
    Sauce.findByIdAndUpdate({ _id :req.params.id }, { ...reqSauce, _id: req.body.id })
        .then( (oldSauce) => {
            const oldFileName = oldSauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${oldFileName}`, (err) => {
                console.log("Deleting file : ", oldFileName);
                if (err){
                    // If oldfile can't be deleted return a message on server console
                    console.error(`Can't delete file : ${oldFileName}. Message d'erreur: ${err.message}`);
                }
                res.status(200).json( { message: lang.SUCCMSG_SAUCE_MODIFIED });
            } )            
        })
        .catch(err => res.status(400).json({ message: err.message }))

}

exports.deleteSauce = (req, res) => {
    Sauce.findById(req.params.id)
        .then( sauce => {
            if (!sauce){
                return res.status(404).json({ message: lang.ERRMSG_NO_SUCH_SAUCE})
            }
            if (req.auth.userId !== sauce.userId){
                return res.status(403).json({ message: lang.ERRMSG_NOT_AUTHORISED_FOR })
            }
            const fileName = sauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${fileName}`, () => {
                console.log("Deleting file : ", fileName);
                Sauce.deleteOne({ _id: req.params.id})
                    .then( ()=> res.status(200).json({ message: lang.SUCCMSG_SAUCE_DELETED }))
                    .catch( err => res.status(400).json({ message: err.message }))
            });
        })
        .catch( err => res.status(500).json({ message: err.message }))
}


// Handling likes and dislikes
exports.likeSauce = (req, res) => {
    Sauce.findById(req.params.id)
        .then( sauce => {
                       
            // Check if user has already liked or disliked this sauce
            const indexAlreadyLiked = sauce.usersLiked.findIndex( userId => userId === req.body.userId );
            const indexAlreadyDisliked = sauce.usersDisliked.findIndex( userId => userId === req.body.userId );
        
            const like = req.body.like;
            switch (like) {
                case 1:
                    // User likes the sauce    
                    if ( indexAlreadyLiked < 0 ){
                        sauce.usersLiked.push(req.body.userId);
                        sauce.likes ++;
                    }else{
                        // User already liked this sauce, no need to update
                        console.log(`${req.body.userId} already liked this sauce !!!! `); // DEBUG
                    }
                    break;
                case 0:
                    // User revokes his like or dislike
                    if ( indexAlreadyDisliked >= 0){
                        sauce.usersDisliked.splice(indexAlreadyDisliked, 1);
                        sauce.dislikes --; 
                    }
                    if (indexAlreadyLiked >= 0){
                        sauce.usersLiked.splice(indexAlreadyLiked, 1);
                        sauce.likes --;
                    }                    
                    break;
                case -1:
                    // User dislikes the sauce
                    if ( indexAlreadyDisliked < 0 ){
                        sauce.usersDisliked.push(req.body.userId);
                        sauce.dislikes ++;
                    }else{
                        // User already liked this sauce, no need to update
                        console.log(`${req.body.userId} already disliked this sauce !!!! `); // DEBUG
                    }
                    break;                   
                default:
                    // Argument error
                    return res.status(400).json({ message: lang.ERRMSG_INVALID_LIKE_ARGUMENT});
            } // switch (like)

            Sauce.findByIdAndUpdate(req.params.id, { ...sauce })
                .then( ()=> res.status(200).json(sauce))
                .catch(err => res.status(400).json({ message: err.message }))


        })
        .catch(err => res.status(400).json({ message: err.message }))    
 
}