var mysql = require('mysql');
var co_db = require('./coDB');

var co = co_db.connection();

exports.identification = function(mail, pass, callback) {
    
    var query = "SELECT * FROM membres WHERE mail = ? AND pass = ?";
    var inserts = [mail, pass];
    query = mysql.format(query, inserts);
    
    co.query(query, function (error, results, fields) {
        if (error) throw error;
        
        callback(results);
    });
    
};

exports.selectByMail = function(mail, callback) {
    
    var query = "SELECT * FROM membres WHERE mail = ?";
    var inserts = [mail];
    query = mysql.format(query, inserts);
    
    co.query(query, function (error, results, fields) {
        if (error) throw error;
        
        callback(results);
    });
    
};

exports.inscription = function(nom, prenom, mail, pass) {
    
    var date = new Date();
    
    var sql = "INSERT INTO membres(nom, prenom, mail, pass, dateInscr) VALUES ?";
    var values = [
        [nom, prenom, mail, pass, date]
    ];
    co.query(sql, [values], function(err) {
        if (err) throw err;
    });
    
};