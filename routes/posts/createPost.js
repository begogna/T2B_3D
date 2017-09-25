var express = require('express');
var router = express.Router();



//This is called when clicking the button type "submit" to send the text of the input "text3D"
router.post('/', function (req, res) {
    console.log("dans le post de create");
    
    var sess = req.session;
    
    var text3D = req.body.text3D;
    var taille = req.body.taille;
    var font = parseInt(req.body.fontSel, 10);
    font++;
    
    
    // Get the "value" of the selected option in the fonts dropdown
    var fontSel = req.body.fontSel;

    // console.log("le req body ", req.body);
    // console.log("le text ", text3D);
    // console.log("la font ", font);
    
    var modelProd = require('../../model/modelProduit');
    var modelMembres = require('../../model/modelMembre');
    
    if (sess.mail){
        modelMembres.selectByMail(sess.mail, function (datas) {
        
            // console.log(datas[0]['id']);
            modelProd.addProdProfil(text3D, taille, font, datas[0]['id']);
        });
    }
    
    res.redirect("../index/#"+text3D+"&"+fontSel);
});

module.exports = router;
