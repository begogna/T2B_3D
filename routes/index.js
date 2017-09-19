var express = require('express');
var router = express.Router();

var sess;

router.get('/', function (req, res, next) {
        
        sess = req.session;
<<<<<<< HEAD
        var paramInscr = req.query.inscr;
        var paramCo = req.query.co;
        
        if (paramCo === 'err') {
            res.render('index', {title: 'TBB', errCo: true, co: false, nomMembre: null, inscr: false});
=======
        var text3D;

        if (req.query.text3D){
            text3D = req.query.text3D;
        }
        else {
            text3D = null
        }

       
        if (sess.errCO) {
            res.render('index', {title: 'TBB', errCo: true, co: false, nomMembre: null, t3d: text3D});
>>>>>>> adding 3D on going
        }
        else if (sess.mail) {
            //APPEL DU MODEL - CO BDD / REQS
            var modelMembres = require('../model/modelMembre');
            
            modelMembres.selectByMail(sess.mail, function (datas) {
<<<<<<< HEAD
                res.render('index', {title: 'TBB', errCo: false, co: true, nomMembre: datas[0]['prenom'], inscr: false});
=======
                res.render('index', {title: 'TBB', errCo: false, co: true, nomMembre: datas[0]['prenom'], t3d: text3D});
>>>>>>> adding 3D on going
            });
        }
        else if (paramInscr === 'done') {
            res.render('index', {title: 'TBB', errCo: false, co: false, nomMembre: null, inscr: true});
        }
        else {
<<<<<<< HEAD
            res.render('index', {title: 'TBB', errCo: false, co: false, nomMembre: null, inscr: false});
=======
            console.log('pas rentre dans co');
            res.render('index', {title: 'TBB', errCo: false, co: false, nomMembre: null, t3d: text3D});
>>>>>>> adding 3D on going
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
        res.redirect("/index");
    }
});

module.exports = router;
