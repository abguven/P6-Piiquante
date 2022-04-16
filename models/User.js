const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

// Language pack
const lang = require('../language/fr');



const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, lang.ERRMSG_ENTER_AN_EMAIL],
        unique: true,
        validate: [isEmail, lang.ERRMSG_ENTER_A_VALID_EMAIL]
    },
    password: {
        type: String,
        required: [true, lang.ERRMSG_ENTER_A_PASSWORD],
        minlength: [6, lang.ERRMSG_ENTER_MIN_6_LENGTH_PASSWORD]
    }
});

// Check for uniqueness
userSchema.plugin(uniqueValidator);

// Hash passwords before saving
userSchema.pre("save", function(next){
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});


module.exports = mongoose.model("User", userSchema);