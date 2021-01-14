var {getEvents, getEvent, createEvent, updateEvent, deleteEvent} = require("./Model/event");
var {getVenues, getVenue, createVenue, updateVenue, deleteVenue} = require("./Model/venue");

var ApiBuilder = require('claudia-api-builder'),
  api = new ApiBuilder();

module.exports = api;

var {getPool} = require("./utils");
var pool = getPool();

// EVENTS
// ---------------------------------------------------------------------------------

// Get Events - Search Events  
api.post('/events', async function (request) {

  request.lambdaContext.callbackWaitsForEmptyEventLoop = false;
    
  var requestRawBody = JSON.parse(request.rawBody);
  return getEvents(requestRawBody);

});


// Get Event - Retrieve an Event  
api.get('/event/{id}', async function (request) {

  console.log('get event: ',request.pathParams.id);

  //const queryParams = request.proxyRequest.queryStringParamneters;

  request.lambdaContext.callbackWaitsForEmptyEventLoop = false;
  
  return getEvent(request.pathParams.id);

});

// Put Event - Create a new Event  
api.put('/event', async function (request) {
     
  request.lambdaContext.callbackWaitsForEmptyEventLoop = false;
  
  var requestRawBody = JSON.parse(request.rawBody);
  return createEvent(requestRawBody);
  
});

// Post Event - Update an existing Event  
api.post('/event', async function (request) {

    request.lambdaContext.callbackWaitsForEmptyEventLoop = false;
      
    var requestRawBody = JSON.parse(request.rawBody);
    return updateEvent(requestRawBody);

});

// Delete Event - Delete an existing Event  
api.delete('/event', async function (request) {

  var requestRawBody = JSON.parse(request.rawBody);
  
  request.lambdaContext.callbackWaitsForEmptyEventLoop = false;
   
  return deleteEvent(requestRawBody.id);

});

// VENUES
// ---------------------------------------------------------------------------------


// Get Venues - Search Venues  
api.post('/venues', async function (request) {

  request.lambdaContext.callbackWaitsForEmptyVenueLoop = false;
    
  var requestRawBody = JSON.parse(request.rawBody);
  return getVenues(requestRawBody);

});


// Get Venue - Retrieve an Venue  
api.get('/venue/{id}', async function (request) {

  console.log('get venue: ',request.pathParams.id);

  //const queryParams = request.proxyRequest.queryStringParamneters;

  request.lambdaContext.callbackWaitsForEmptyVenueLoop = false;
  
  return getVenue(request.pathParams.id);

});

// Put Venue - Create a new Venue  
api.put('/venue', async function (request) {
     
  request.lambdaContext.callbackWaitsForEmptyVenueLoop = false;
  
  var requestRawBody = JSON.parse(request.rawBody);
  return createVenue(requestRawBody);
  
});

// Post Venue - Update an existing Venue  
api.post('/venue', async function (request) {

    request.lambdaContext.callbackWaitsForEmptyVenueLoop = false;
      
    var requestRawBody = JSON.parse(request.rawBody);
    return updateVenue(requestRawBody);

});

// Delete Venue - Delete an existing Venue  
api.delete('/venue', async function (request) {

  var requestRawBody = JSON.parse(request.rawBody);
  
  request.lambdaContext.callbackWaitsForEmptyVenueLoop = false;
   
  return deleteVenue(requestRawBody.id);

});