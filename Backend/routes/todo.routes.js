

module.exports = (app) => {
  
  const fitnessApp = require('../controllers/todo.controllers.js');

  // Create a new todo
  app.post('/exercise', fitnessApp.createExercise);
  app.post('/session', fitnessApp.createSession);
  app.post('/set', fitnessApp.createSet);
  app.post('/typesession', fitnessApp.createTypeSession);

  // Retrieve all
  app.get('/exercises', fitnessApp.findAllExercises);
  app.get('/sessions', fitnessApp.findAllSessions);
  app.get('/sets', fitnessApp.findAllSets);
  app.get('/typesessions', fitnessApp.findAllTypeSessions);

  // Retrieve a single todo by id
  app.get('/exercise/:id', fitnessApp.findOneExercise);
  app.get('/sessions/:id', fitnessApp.findOneSession);
  app.get('/sets/:id', fitnessApp.findOneSet);
  app.get('/typesessions/:id', fitnessApp.findOneTypeSession);


  // Delete a Todo by id
  app.delete('/exercise/:id', fitnessApp.deleteExercise);
  app.delete('/session/:id', fitnessApp.deleteSession);
  app.delete('/set/:id', fitnessApp.deleteSet);
  app.delete('/typesession/:id', fitnessApp.deleteTypeSession);  

  // Update a Todo with id
  app.put('fitnessApp/:id', fitnessApp.update);


}