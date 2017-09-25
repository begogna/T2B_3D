var express = require('express');
var router = express.Router();
var modelProduit = require('../model/modelProduit');


/* GET home page. */
router.get('/', function(req, res, next) {
    sess = req.session;
    
    modelProduit.getAllProducts(function (datas) {
        console.log(datas);
        if (sess.errCO) {
            res.render('profil', {title: 'TBB', errCo: true, co: false, nomMembre: null, produit: datas});
        }
        else if (sess.mail) {
        
            //APPEL DU MODEL - CO BDD / REQS
            var modelMembres = require('../model/modelMembre');
        
            modelMembres.selectByMail(sess.mail, function (datas) {
                res.render('profil', {title: 'TBB', errCo: false, co: true, nomMembre: datas[0]['prenom'], produit: datas});
            });
        }
        else {
            res.render('profil', {title: 'TBB', errCo: false, co: false, nomMembre: null, produit: datas});
        }
    });
    
 
});

module.exports = router;