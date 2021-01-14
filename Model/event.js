// Do stuff with Events

var {getPool} = require("../utils");
var pool = getPool();


function getEvents(requestRawBody) {

  return new Promise((resolve, reject) => {

      pool.getConnection(function(err, connection) {
  
          console.log('hello database', err, connection);
        
          if (err) throw err; // not connected!
      
          // Use the connection
          var sql = 'SELECT Event.*, Venue.* FROM Event INNER JOIN Venue ON Event_VenueId=Venue_Id WHERE CONCAT(Event_Name, " ", Event_Description) LIKE ?';
          var params = ['%'+requestRawBody.search+'%'];

          if (requestRawBody.before != null)
          {
            sql = sql+' AND Event_Start <=?';
            params.push(requestRawBody.before);
          }

          if (requestRawBody.after != null)
          {
            sql = sql+' AND Event_End >=?';
            params.push(requestRawBody.after);
          }

          if (requestRawBody.latitude != null && requestRawBody.longitude != null && requestRawBody.distance != null)
          {
            sql = sql+' AND ST_Distance_Sphere(POINT(?, ?), POINT(Venue_Latitude, Venue_Longitude)) <?';
            params.push(requestRawBody.latitude);
            params.push(requestRawBody.longitude);
            params.push(requestRawBody.distance);
          }

          console.log("sql: ", sql, "params: ", params);

          connection.query(sql,params, function (error, results, fields) {
          //   console.log('SQL Executed');
            
            // When done with the connection, release it.
            connection.release();
      
            // Handle error after the release.
            if (error) reject(error);
            else resolve(results);
      
          }); 
        });   
    
  })   
}

function getEvent(id) {
    
    return new Promise((resolve, reject) => {

      pool.getConnection(function(err, connection) {
  
          console.log('hello database', err, connection);
        
          if (err) throw err; // not connected!
      
          // Use the connection
          var sql = 'SELECT * FROM Event WHERE Event_Id=?';
          var params = [id];
          console.log(sql, params);
          
          connection.query(sql,params, function (error, results, fields) {
            console.log('SQL Executed');
            
            // When done with the connection, release it.
            connection.release();
      
            // Handle error after the release.
            if (error) reject(error);
            else {
              console.log(results);
              resolve(results);
            } 
      
          });
        });   
    
    })
  }

  function deleteEvent(id) {

    return new Promise((resolve, reject) => {

        pool.getConnection(function(err, connection) {
    
            // console.log('Database connection: ', err, connection);
          
            if (err) throw err; // not connected!
        
            // Use the connection
            var sql = 'DELETE FROM Event WHERE Event_Id=?';
            var params = [id];
            connection.query(sql,params, function (error, results, fields) {
            //   console.log('SQL Executed');
              
              // When done with the connection, release it.
              connection.release();
        
              // Handle error after the release.
              if (error) reject(error);
              else resolve(results);
        
            });
          });   
      
    })
  }


  function createEvent(requestRawBody) {

    return new Promise((resolve, reject) => {

        pool.getConnection(function(err, connection) {
    
            console.log('hello database', err, connection);
          
            if (err) throw err; // not connected!
        
            // Use the connection
            var sql = 'INSERT INTO Event (Event_Name, Event_Description, Event_Start, Event_End, Event_VenueId) VALUES(?, ?, ?, ?, ?)';
            var params = [requestRawBody.name, requestRawBody.description, requestRawBody.start, requestRawBody.end, requestRawBody.venueId];
            connection.query(sql,params, function (error, results, fields) {
            //   console.log('SQL Executed');
              
              // When done with the connection, release it.
              connection.release();
        
              // Handle error after the release.
              if (error) reject(error);
              else resolve(results);
        
            });
          });   
      
    })   
  }

  function updateEvent(requestRawBody) {

    return new Promise((resolve, reject) => {

        pool.getConnection(function(err, connection) {
    
            // console.log('Database connection: ', err, connection);
          
            if (err) throw err; // not connected!
        
            // Use the connection
            var sql = 'UPDATE Event SET Event_Name=?, Event_Description=?, Event_Start=?, Event_End=?, Event_VenueId=? WHERE Event_Id=?';
            var params = [requestRawBody.name, requestRawBody.description, requestRawBody.start, requestRawBody.end, requestRawBody.venueId, requestRawBody.id];
            connection.query(sql,params, function (error, results, fields) {
            //   console.log('SQL Executed');
              
              // When done with the connection, release it.
              connection.release();
        
              // Handle error after the release.
              if (error) reject(error);
              else resolve(results);
        
            });
          });   
      
    })    
  }

  module.exports = {getEvents, getEvent, createEvent, updateEvent, deleteEvent};
