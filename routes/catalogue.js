var express = require('express');
var router = express.Router();
var modelProduit = require('../model/modelProduit');


/* GET home page. */
router.get('/', function(req, res, next) {
    sess = req.session;
    
    modelProduit.getAllProducts(function (datas2) {
        console.log(datas2);
        if (sess.errCO) {
            res.render('catalogue', {title: 'TBB', errCo: true, co: false, nomMembre: null, produit: datas2
        });
        }
        else if (sess.mail) {
        
            //APPEL DU MODEL - CO BDD / REQS
            var modelMembres = require('../model/modelMembre');
        
            modelMembres.selectByMail(sess.mail, function (datas) {
                res.render('catalogue', {title: 'TBB', errCo: false, co: true, nomMembre: datas[0]['prenom'], produit: datas2});
            });
        }
        else {
            res.render('catalogue', {title: 'TBB', errCo: false, co: false, nomMembre: null, produit: datas2});
        }
    });
    
 
});

module.exports = router;
