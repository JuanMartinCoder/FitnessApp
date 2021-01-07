const fs = require('fs');
const ini = require('ini');
const mysql = require('mysql');


const config = ini.parse(fs.readFileSync('config.ini', 'utf-8'));

const databaseConfig = JSON.parse(JSON.stringify(config.database));

console.log(databaseConfig);


const connection = mysql.createConnection(databaseConfig);


connection.connect(function (err) {
  if(err){
    throw err;
  }else{
    console.log("You are connected succesfully");
  }
})

// Retrieve and return all GET ALL from the database.
exports.findAllExercises = (req, res) => {
  connection.query('select * from exercises',
      function (error, results, fields) {
          if (error) throw error;
          res.end(JSON.stringify(results));
      });
};
exports.findAllSessions = (req, res) => {
  connection.query('select * from sessions',
      function (error, results, fields) {
          if (error) throw error;
          res.end(JSON.stringify(results));
      });
};

exports.findAllSets = (req, res) => {
  connection.query('select * from sets',
      function (error, results, fields) {
          if (error) throw error;
          res.end(JSON.stringify(results));
      });
};

exports.findAllTypeSessions = (req, res) => {
  connection.query('select * from type_session',
      function (error, results, fields) {
          if (error) throw error;
          res.end(JSON.stringify(results));
      });
};













exports.create = (req, res) => {
  // Validate request
  if (!req.body.description) {
      return res.status(400).send({
          message: "Todo description can not be empty"
      });
  }

  var params = req.body;
  console.log(params);

  connection.query("INSERT INTO todos SET ? ", params,
      function (error, results, fields) {
          if (error) throw error;
          return res.send({
              data: results,
              message: 'New todo has been created successfully.'
          });
      });
};


// Find a single todo with a id
exports.findOne = (req, res) => {

  connection.query('select * from todos where Id=?',
      [req.params.id],
      function (error, results, fields) {
          if (error) throw error;
          res.end(JSON.stringify(results));
      });
};

// Update a todo identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.description) {
      return res.status(400).send({
          message: "Todo description can not be empty"
      });
  }

  connection.query('UPDATE `todos` SET `name`=?,`description`=?, `done`=? where `id`=?',
      [req.body.name, req.body.description, req.body.done, req.params.id],
      function (error, results, fields) {
          if (error) throw error;
          res.end(JSON.stringify(results));
      });
};

// Delete a todo with the specified id in the request
exports.delete = (req, res) => {
  console.log(req.params);
  connection.query('DELETE FROM `todos` WHERE `Id`=?', 
      [req.params.id], function (error, results, fields) {
          if (error) throw error;
          res.end('Record has been deleted!');
  });
};