var express = require('express');
var router = express.Router();


//This is called when clicking the button type "submit" to send the text of the input "text3D"
router.post('/', function (req, res) {

    var text3D = req.body.text3D;

    console.log(text3D);

    res.redirect("../index/?text3D="+text3D);
});

module.exports = router;
