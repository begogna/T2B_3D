var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    sess = req.session;
    
    if (sess.errCO) {
        res.render('catalogue', {title: 'TBB', errCo: true, co: false, nomMembre: null});
    }
    else if (sess.mail) {
        
        //APPEL DU MODEL - CO BDD / REQS
        var modelMembres = require('../model/modelMembre');
        
        modelMembres.selectByMail(sess.mail, function (datas) {
            res.render('catalogue', {title: 'TBB', errCo: false, co: true, nomMembre: datas[0]['prenom']});
        });
    }
    else {
        res.render('catalogue', {title: 'TBB', errCo: false, co: false, nomMembre: null});
    }
});

module.exports = router;
