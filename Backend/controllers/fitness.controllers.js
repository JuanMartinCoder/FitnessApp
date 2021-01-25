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
    console.log("You are connected succesfully to the MYSQL DB");
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
  connection.query('select * from series',
      function (error, results, fields) {
          if (error) throw error;
          res.end(JSON.stringify(results));
      });
};

exports.findAllTypeSessions = (req, res) => {
  connection.query('select * from type_workout',
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
    connection.query('select * from exercise where id_exercises=?',
        [req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
  };

  exports.findOneTypeSession = (req, res) => {
    connection.query('select * from type_workout where id_type_workout=?',
        [req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
  };

  exports.findOneSet = (req, res) => {
    connection.query('select * from series where id_serie=?',
        [req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
  };


// Create a record into de database
exports.createExercise = (req, res) => {
  // Validate request
    if (!req.body.exercise) {
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
    
  
    connection.query("INSERT INTO type_workout SET ? ", params,
        function (error, results, fields) {
            if (error) throw error;
            return res.send({
                data: results,
                message: 'New Type of workout has been created successfully.'
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
  
    connection.query("INSERT INTO series SET ? ", params,
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
  
  connection.query('DELETE FROM `exercises` WHERE `id_exercises`=?', 
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
    connection.query('DELETE FROM `series` WHERE `id_serie`=?', 
        [req.params.id], function (error, results, fields) {
            if (error) throw error;
            res.end('Record has been deleted!');
    });
  };

  exports.deleteTypeSession = (req, res) => {
    connection.query('DELETE FROM `type_workout` WHERE `id_type_workout`=?', 
        [req.params.id], function (error, results, fields) {
            if (error) throw error;
            res.end('Record has been deleted!');
    });
  };



// Update a todo identified by the id in the request
exports.updateExercise = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Name can not be empty"
        });
    }
  
    connection.query('UPDATE `exercises` SET `exercise_name`=?,`exercise_description`=? where `id_exercises`=?',
        [req.body.name, req.body.description, req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
  };

  exports.updateTypeSession = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Name can not be empty"
        });
    }
  
    connection.query('UPDATE `type_workout` SET `name`=?,`description`=? where `id_type_session`=?',
        [req.body.name, req.body.description ,req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
  };

  exports.updateSession = (req, res) => {
    // Validate Request
    if (!req.body.mesociclo) {
        return res.status(400).send({
            message: "Mesociclo can not be empty"
        });
    }
  
    connection.query('UPDATE `sessions` SET `nro_session`=?,`type_workout`=?,`id_serie`=?,`mesociclo`=? ,`date_session`=?,where `id_session`=?',
        [req.body.nroSession, req.body.typeWOUT, req.body.iserie, req.body.mesociclo ,req.body.date  ,req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
  };
  exports.updateSet = (req, res) => {
    // Validate Request
    if (!req.body.serie) {
        return res.status(400).send({
            message: "Set can not be empty"
        });
    }
  
    connection.query('UPDATE `sets` SET `id_exercise`=?,`reps`=?,`weight`=?,`rpe`=? where `id_set`=?',
        [req.body.exercise, req.body.reps, req.body.weight,req.body.rpe,req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
  };