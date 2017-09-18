var express = require('express');
var router = express.Router();


router.post('/', function (req, res) {

    var text3D = req.body.text3D;

    console.log(text3D);

    res.redirect("../index/?text3D="+text3D);
});

module.exports = router;
