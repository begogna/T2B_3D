var mysql = require('mysql');
var co_db = require('./coDB');

var co = co_db.connection();


exports.getAllProducts = function (callback) {
    
    var query = "SELECT produit.*, fonts.nom_font, finition.nom_finition, materiel.nom_materiel FROM produit INNER JOIN fonts ON produit.font = fonts.id INNER JOIN finition ON produit.finition = finition.id INNER JOIN materiel ON produit.materiel = materiel.id";
    
    co.query(query, function (error, results, fields) {
       
       callback(results);
    });
};

exports.getAllProducts2 = function (idMembre, callback) { // produit du membre en question
    
    var query = "SELECT produit.*, fonts.nom_font FROM produit INNER JOIN fonts ON produit.font = fonts.id WHERE membre = "+idMembre;
    
    co.query(query, function (error, results, fields) {
        
        callback(results);
    });
};

exports.addProdProfil = function (texte, taille, font, materiel, finition, idMembre) {
 
        var sql = "INSERT INTO produit(texte, taille, font, materiel, finition, membre) VALUES ?"; //insert mongodB
        var values = [
            [texte, taille, font, materiel, finition, idMembre]
        ];
        co.query(sql, [values], function (err) {
            if (err) throw err;
        });
    
};