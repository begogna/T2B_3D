var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {title: 'TBB'});
});

router.post('/', function (req, res) {
    
    var mail = req.body.mail;
    var pass = req.body.pass;
    
    //APPEL DU MODEL - CO BDD / REQS
    var modelMembres = require('../model/modelMembre');
    
    modelMembres.identification(mail, pass, function (datas) {
        
        //SI LA REQUETE RENVOIE UN RESULTAT ON CREE LA SESSION
        if (datas.length > 0) {
            console.log("Connecté ! => "+datas);
        }
    });
});

module.exports = router;
