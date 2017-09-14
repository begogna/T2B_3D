var express = require('express');
var router = express.Router();

var sess;

router.get('/', function (req, res, next) {
        
        sess = req.session;
        
        if (sess.errCO) {
            res.render('index', {title: 'TBB', errCo: true, co: false, nomMembre: null});
        }
        else if (sess.mail) {
            
            //APPEL DU MODEL - CO BDD / REQS
            var modelMembres = require('../model/modelMembre');
            
            modelMembres.selectByMail(sess.mail, function (datas) {
                res.render('index', {title: 'TBB', errCo: false, co: true, nomMembre: datas[0]['prenom']});
            });
        }
        else {
            res.render('index', {title: 'TBB', errCo: false, co: false, nomMembre: null});
        }
    }
);

router.post('/', function (req, res) {
    
    sess = req.session;
    
    var mail = req.body.mail;
    var pass = req.body.pass;
    
    //APPEL DU MODEL - CO BDD / REQS
    var modelMembres = require('../model/modelMembre');
    
    modelMembres.identification(mail, pass, function (datas) {
        
        //SI LA REQUETE RENVOIE UN RESULTAT ON CREE LA SESSION
        if (datas.length > 0) {
            
            if (sess.errCO) {
                req.session.destroy()
            }
            
            sess.mail = mail;
            
            res.redirect("/");
        }
        else {
            sess.errCO = true;
            res.redirect("/");
        }
    });
});

module.exports = router;
