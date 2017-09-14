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