var mysql = require('mysql');
var co_db = require('./coDB');
var bcrypt = require('bcrypt');

var co = co_db.connection();
const saltRounds = 10;

exports.identification = function (mail, pass, callback) {
    
    var noMail = false;
    var query = "SELECT pass FROM membres WHERE mail = ?";
    var inserts = [mail];
    query = mysql.format(query, inserts);
    
    co.query(query, function (error, results, fields) {
        
        try {
            bcrypt.compare(pass, results[0]['pass'], function (err, res) {
                
                callback(res);
            });
        }
        catch (error) {
            callback(noMail)
        }
        
    });
};

exports.selectByMail = function (mail, callback) {
    
    var query = "SELECT * FROM membres WHERE mail = ?";
    var inserts = [mail];
    query = mysql.format(query, inserts);
    
    co.query(query, function (error, results, fields) {
        if (error) throw error;
        
        callback(results);
    });
    
};

exports.inscription = function (nom, prenom, mail, pass) {
    
    var date = new Date();
    
    bcrypt.hash(pass, saltRounds, function (err, hash) {
        
        var sql = "INSERT INTO membres(nom, prenom, mail, pass, dateInscr) VALUES ?";
        var values = [
            [nom, prenom, mail, hash, date]
        ];
        co.query(sql, [values], function (err) {
            if (err) throw err;
        });
        
    });
};