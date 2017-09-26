var express = require('express');
var router = express.Router();
var modelProduit = require('../model/modelProduit');
var modelMembres = require('../model/modelMembre');


/* GET home page. */
router.get('/', function (req, res, next) {
    sess = req.session;
    
    modelMembres.selectByMail(sess.mail, function (datas) {
        
        modelProduit.getAllProducts2(datas[0]['id'], function (datas2) { //datas param entrant et datas 2 callback
            //console.log(datas);
            if (sess.errCO) {
                res.render('profil', {title: 'TBB', errCo: true, co: false, nomMembre: null, produit: datas2});
            }
            else if (sess.mail) {
                
                //APPEL DU MODEL - CO BDD / REQS
                
                    res.render('profil', {
                        title: 'TBB',
                        errCo: false,
                        co: true,
                        nomMembre: datas[0]['prenom'],
                        produit: datas2
                    });
                console.log(datas2);
            }
            else {
                res.render('profil', {title: 'TBB', errCo: false, co: false, nomMembre: null, produit: datas2});
            }
        });
    });
    
});

module.exports = router;
