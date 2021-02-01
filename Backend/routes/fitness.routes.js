

module.exports = (app) => {
  
  const fitnessApp = require('../controllers/fitness.controllers.js');

  // Create a new todo
  app.post('/exercise', fitnessApp.createExercise);
  app.post('/set', fitnessApp.createSet);
  app.post('/typesession', fitnessApp.createTypeSession);

  // Retrieve all
  app.get('/exercises', fitnessApp.findAllExercises);
  app.get('/sets', fitnessApp.findAllSets);
  app.get('/typesessions', fitnessApp.findAllTypeSessions);


  // Retrieve a single todo by id
  app.get('/exercise/:id', fitnessApp.findOneExercise);
  app.get('/setsbydate/:date', fitnessApp.findAllSetsByDate);
  app.get('/sets/:id', fitnessApp.findOneSet);
  app.get('/typesessions/:id', fitnessApp.findOneTypeSession);


  // Delete a Todo by id
  app.delete('/exercise/:id', fitnessApp.deleteExercise);
  app.delete('/set/:id', fitnessApp.deleteSet);
  app.delete('/typesession/:id', fitnessApp.deleteTypeSession);  

  // Update a Todo with id
  app.put('/exercise/:id', fitnessApp.updateExercise);
  app.put('/set/:id', fitnessApp.updateSet);
  app.put('/typesession/:id', fitnessApp.updateTypeSession);


}