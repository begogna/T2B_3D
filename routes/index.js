var express = require('express');
var router = express.Router();

var sess;

router.get('/', function (req, res, next) {
        
        sess = req.session;
        var paramInscr = req.query.inscr;
        var paramCo = req.query.co;
        
        if (paramCo === 'err') {
            res.render('index', {title: 'TBB', errCo: true, co: false, nomMembre: null, inscr: false});
        }
        else if (sess.mail) {
            //APPEL DU MODEL - CO BDD / REQS
            var modelMembres = require('../model/modelMembre');
            
            modelMembres.selectByMail(sess.mail, function (datas) {
                res.render('index', {title: 'TBB', errCo: false, co: true, nomMembre: datas[0]['prenom'], inscr: false});
            });
        }
        else if (paramInscr === 'done') {
            res.render('index', {title: 'TBB', errCo: false, co: false, nomMembre: null, inscr: true});
        }
        else {
            res.render('index', {title: 'TBB', errCo: false, co: false, nomMembre: null, inscr: false});
        }
    }
);

router.post('/', function (req, res) {
    
    sess = req.session;
    
    var mail = req.body.mail;
    var pass = req.body.pass;
    var deco = req.body.deco;
    
    var prenom = req.body.prenom;
    var nom = req.body.nom;
    var mailInscr = req.body.mailInscr;
    var passInscr = req.body.passInscr;
    
    
    if (mail || mail === "") {
        
        //APPEL DU MODEL - CO BDD / REQS
        var modelMembres = require('../model/modelMembre');
        
        modelMembres.identification(mail, pass, function (datas) {
            
            //SI datas RENVOIE TRUE CONNEXION OK
            if (datas) {
                
                sess.mail = mail;
                res.redirect("/index");
            }
            else {
                res.redirect("index/?co=err");
            }
        });
    }
    else if(prenom || prenom === ""){
    
        //APPEL DU MODEL - CO BDD / REQS
        var modelMembres = require('../model/modelMembre');
    
        modelMembres.inscription(nom, prenom, mailInscr, passInscr);
        res.redirect("/index/?inscr=done");
    }
    else if (deco) {
        req.session.destroy();
        res.redirect("back");
    }
});

module.exports = router;
