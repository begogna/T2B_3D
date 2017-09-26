var express = require('express');
var router = express.Router();

//This is called when clicking the button type "submit" to send the text of the input "text3D"
router.post('/', function (req, res) { // console.log("dans le post de create");

    var sess = req.session;
    var text3D = req.body.text3D;
    var taille = req.body.taille; //recupere le champ
    var materiel = req.body.materiel;
    var finition = req.body.finition;
    var font = parseInt(req.body.fontSel, 10);
    font++;
    
    // Get the "value" of the selected option in the fonts dropdown
    var fontSel = req.body.fontSel;
    var modelProd = require('../../model/modelProduit');
    var modelMembres = require('../../model/modelMembre');

    if (sess.mail) {
        modelMembres.selectByMail(sess.mail, function (datas) {
        modelProd.addProdProfil(text3D, taille, font, materiel, finition, datas[0]['id']);
        });
    }

    res.redirect("../index/#" + text3D + "&" + fontSel);
});

module.exports = router;
