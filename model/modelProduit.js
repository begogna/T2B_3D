var mysql = require('mysql');
var co_db = require('./coDB');

var co = co_db.connection();


exports.getAllProducts = function (callback) {
    
    var query = "SELECT produit.*, fonts.nom_font, finition.nom_finition, materiel.nom_materiel FROM produit INNER JOIN fonts ON produit.font = fonts.id INNER JOIN finition ON produit.finition = finition.id INNER JOIN materiel ON produit.materiel = materiel.id";
    
    co.query(query, function (error, results, fields) {
       
       callback(results);
    });
};