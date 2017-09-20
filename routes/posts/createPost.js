var express = require('express');
var router = express.Router();


//This is called when clicking the button type "submit" to send the text of the input "text3D"
router.post('/', function (req, res) {
    console.log("dans le post de create");

    var text3D = req.body.text3D;

    // Get the "value" of the selected option in the fonts dropdown
    var fontSel = req.body.fontSel;

    console.log("le req body ", req.body);
    console.log("le text ", text3D);
    console.log("la font ", fontSel);


    res.redirect("../index/#"+text3D+"&"+fontSel);
});

module.exports = router;
