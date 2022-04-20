
// ERROR MESSAGES 
module.exports = Object.freeze({
    // User Model
    ERRMSG_ENTER_AN_EMAIL: 'Veuillez saisir une adresse email',
    ERRMSG_ENTER_A_VALID_EMAIL: "Veuillez saisir une adresse email valide",
    ERRMSG_ENTER_A_PASSWORD: "Veuillez saisir un mot de passe",
    ERRMSG_ENTER_A_VALID_PASSWORD: "Veuillez saisir un mot de passe valide",
    ERRMSG_ENTER_MIN_6_LENGTH_PASSWORD: "Veuillez saisir un mot de passe d'au moins 6 charactères",

    // Sauce Model
    ERRMSG_ENTER_A_USER_ID: 'UserId manquant',
    ERRMSG_ENTER_A_SAUCE_NAME: 'Veuillez saisir un nom pour la sauce',
    ERRMSG_ENTER_A_SAUCE_HEAT_BETWEEN_1_AND_10: 'Veuillez saisir une force(heat) de piment entre 1 et 10',
    ERRMSG_INVALID_LIKE_ARGUMENT : "Argument non valable pour 'like' ",

    // Sauce Controller
    ERRMSG_NO_SUCH_SAUCE : "Cette sauce n'existe pas",
    

    // Authorization
    ERRMSG_TOKEN_ABSENT: "Token d'authorisation manquant",
    ERRMSG_INVALID_USER_ID: "ID d'utilisateur non valable",
    ERRMSG_AUTH_ERROR_GENERAL: "Erreur d'authentification",
    ERRMSG_NOT_AUTHORISED_FOR : "Vous n'êtes pas autorisé à effectuer cette opération",

    
    // Success messages
    SUCCMSG_AUTH_SUCCEEDED: "Authentification réussie",
    SUCCMSG_SAUCE_CREATED: "Sauce sauvegardé avec succes",
    SUCCMSG_SAUCE_DELETED: "Sauce supprimée avec succes",
    SUCCMSG_SAUCE_MODIFIED: "Mise à jour de la sauce avec succes",
    SUCCMSG_LIKE_UPDATE: "Mise à jour des likes et dislikes avec succes",

});