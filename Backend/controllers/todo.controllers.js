const fs = require('fs');
const ini = require('ini');
const mysql = require('mysql');


const config = ini.parse(fs.readFileSync('config.ini', 'utf-8'));

const databaseConfig = JSON.parse(JSON.stringify(config.database));

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

// Find a single record with a id
exports.findOneSession = (req, res) => {
    connection.query('select * from sessions where id_session=?',
        [req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
  };

  exports.findOneExercise = (req, res) => {
    connection.query('select * from exercise where id_exercise=?',
        [req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
  };

  exports.findOneTypeSession = (req, res) => {
    connection.query('select * from type_session where id_session=?',
        [req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
  };

  exports.findOneSet = (req, res) => {
    connection.query('select * from sets where id_set=?',
        [req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
  };


// Create a record into de database
exports.createExercise = (req, res) => {
  // Validate request
    if (!req.body.name) {
      return res.status(400).send({
          message: "Name can not be empty"
      });
  }
    var params = req.body;
 
    connection.query("INSERT INTO exercises SET ? ", params,
      function (error, results, fields) {
        if (error) throw error;
          return res.send({
              data: results,
              message: 'New exercise has been created successfully.'
          });
    });
};

exports.createTypeSession = (req, res) => {
    // Validate request
    if (!req.body.description) {
        return res.status(400).send({
            message: "Description can not be empty"
        });
    }
  
    var params = req.body;
    
  
    connection.query("INSERT INTO type_session SET ? ", params,
        function (error, results, fields) {
            if (error) throw error;
            return res.send({
                data: results,
                message: 'New Type of session has been created successfully.'
            });
        });
  };

  exports.createSession = (req, res) => {
    // Validate request
    if (!req.body.mesociclo) {
        return res.status(400).send({
            message: "Mesociclo can not be empty"
        });
    }
  
    var params = req.body;
    
  
    connection.query("INSERT INTO sessions SET ? ", params,
        function (error, results, fields) {
            if (error) throw error;
            return res.send({
                data: results,
                message: 'New session has been created successfully.'
            });
        });
  };

  exports.createSet = (req, res) => {
    // Validate request
    if (!req.body.serie) {
        return res.status(400).send({
            message: "Serie can not be empty"
        });
    }
    if (!req.body.reps) {
        return res.status(400).send({
            message: "Reps can not be empty"
        });
    }
  
    var params = req.body;
  
    connection.query("INSERT INTO sets SET ? ", params,
        function (error, results, fields) {
            if (error) throw error;
            return res.send({
                data: results,
                message: 'New set has been created successfully.'
            });
        });
  };




// Delete a todo with the specified id in the request
exports.deleteExercise = (req, res) => {
  
  connection.query('DELETE FROM `exercise` WHERE `id_exercise`=?', 
      [req.params.id], function (error, results, fields) {
          if (error) throw error;
          res.end('Record has been deleted!');
  });
};

exports.deleteSession = (req, res) => {
    connection.query('DELETE FROM `sessions` WHERE `id_session`=?', 
        [req.params.id], function (error, results, fields) {
            if (error) throw error;
            res.end('Record has been deleted!');
    });
  };
  exports.deleteSet = (req, res) => {
    connection.query('DELETE FROM `sets` WHERE `id_set`=?', 
        [req.params.id], function (error, results, fields) {
            if (error) throw error;
            res.end('Record has been deleted!');
    });
  };

  exports.deleteTypeSession = (req, res) => {
    connection.query('DELETE FROM `type_session` WHERE `id_session`=?', 
        [req.params.id], function (error, results, fields) {
            if (error) throw error;
            res.end('Record has been deleted!');
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