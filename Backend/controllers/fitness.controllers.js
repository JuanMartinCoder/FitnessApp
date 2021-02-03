
/*
-------------
    SELECT w.name, s.id_serie, e.exercise_name, s.reps,s.weight, s.rpe, s.nro_serie, s.date_serie FROM series s INNER JOIN exercises e ON s.id_exercise = e.id_exercises AND date_serie = '2021-01-31' INNER JOIN type_workout w ON s.type_workout = w.id_type_workout;

    SELECT s.id_serie,s.date_serie , e.exercise_name, GROUP_CONCAT(CONCAT('{"nro_serie": ',s.nro_serie,' , "reps":',s.reps,' , "weight": ',s.weight,' , "rpe": ',s.rpe,'}')) serie FROM series s INNER JOIN exercises e ON s.id_exercise = e.id_exercises AND date_serie = '2021-01-31';

    SELECT s.id_serie,s.date_serie , e.exercise_name, CONCAT('[',GROUP_CONCAT(JSON_OBJECT('nro_serie',s.nro_serie,'reps',s.reps, 'weight',s.weight,'rpe',s.rpe)),']') AS series FROM series s INNER JOIN exercises e ON s.id_exercise = e.id_exercises AND date_serie = '2021-01-31'


    SELECT w.name, s.id_serie, e.exercise_name, CONCAT('[',GROUP_CONCAT(JSON_OBJECT('nro_serie',s.nro_serie,'reps',s.reps, 'weight',s.weight,'rpe',s.rpe)),']') AS series 
    FROM series s INNER JOIN exercises e ON s.id_exercise = e.id_exercises AND date_serie = '2021-01-31' 
    INNER JOIN type_workout w ON s.type_workout = w.id_type_workout GROUP BY e.exercise_name;



    result:
+----------+---------------+------+--------+-----+-----------+------------+
| id_serie | exercise_name | reps | weight | rpe | nro_serie | date_serie |
+----------+---------------+------+--------+-----+-----------+------------+
|        3 | Bench Press   |    8 |     55 |   9 |         1 | 2021-01-31 |
+----------+---------------+------+--------+-----+-----------+------------+

------------

*/


const fs = require('fs');
const ini = require('ini');
const mysql = require('mysql');
const d3 = require('d3-collection');


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
          
          res.json(JSON.parse(JSON.stringify(results)));
      });
};

exports.findAllSets = (req, res) => {
  connection.query('select * from series',
      function (error, results, fields) {
          if (error) throw error;
          res.end(JSON.stringify(results));
      });
};



exports.findAllSetsByDate = (req, res) => {
    connection.query("    SELECT w.name, s.id_serie, e.exercise_name, CONCAT('[',GROUP_CONCAT(JSON_OBJECT('nro_serie',s.nro_serie,'reps',s.reps, 'weight',s.weight,'rpe',s.rpe)),']') AS series FROM series s INNER JOIN exercises e ON s.id_exercise = e.id_exercises AND date_serie = ? INNER JOIN type_workout w ON s.type_workout = w.id_type_workout GROUP BY e.exercise_name;",[req.params.date],
        function (error, results, fields) {
            if (error) throw error;

            
                 
            news = JSON.stringify(results);

            
            original = JSON.parse(news, function (key,value){
                if(key == 'series') {
                    return JSON.parse(value);    
                }
                    return value;
            });

            
            
        
            

            console.log(original);
           
            
            
            

            res.json(original);
            //res.end(result);

            
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
    if (!req.body.exercise_name) {
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


  exports.createSet = (req, res) => {
    // Validate request
    if (!req.body.id_exercise) {
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