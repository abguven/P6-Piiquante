const mongoose = require('mongoose');
// Language pack
const lang = require('../language/fr');

const uniqueValidator = require('mongoose-unique-validator');

function isHeat(val){
    return (val>=1 && val<=10) ? true : false;
}

const sauceSchema = mongoose.Schema({
    userId: {
        type: String,
        required: [true, lang.ERRMSG_ENTER_A_USER_ID]
    },
    name: {
        type: String,
        required: [true, lang.ERRMSG_ENTER_A_SAUCE_NAME]
    },
    manufacturer: {
        type: String
    },
    description: {
        type: String
    },
    mainPepper: {
        type: String
    },
    imageUrl: {
        type: String
    },
    heat: {
        type: Number,
        validate: [isHeat, lang.ERRMSG_ENTER_A_SAUCE_HEAT_BETWEEN_1_AND_10]
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    usersLiked: {
        type: [String],
        default: []
    },
    usersDisliked: {
        type: [String],
        default: []
    },

});

// Check for uniqueness
sauceSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Sauce", sauceSchema);
