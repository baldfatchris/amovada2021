// Do stuff with Venues

var {getPool} = require("../utils");
var pool = getPool();


function getVenues(requestRawBody) {

  return new Promise((resolve, reject) => {

      pool.getConnection(function(err, connection) {
  
          console.log('hello database', err, connection);
        
          if (err) throw err; // not connected!
      
          // Use the connection
          var sql = 'SELECT Venue.*, Venue.* FROM Venue WHERE CONCAT(Venue_Name, " ", Venue_Description) LIKE ?';
          var params = ['%'+requestRawBody.search+'%'];

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

function getVenue(id) {
    
    return new Promise((resolve, reject) => {

      pool.getConnection(function(err, connection) {
  
          console.log('hello database', err, connection);
        
          if (err) throw err; // not connected!
      
          // Use the connection
          var sql = 'SELECT * FROM Venue WHERE Venue_Id=?';
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

  function deleteVenue(id) {

    return new Promise((resolve, reject) => {

        pool.getConnection(function(err, connection) {
    
            // console.log('Database connection: ', err, connection);
          
            if (err) throw err; // not connected!
        
            // Use the connection
            var sql = 'DELETE FROM Venue WHERE Venue_Id=?';
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


  function createVenue(requestRawBody) {

    return new Promise((resolve, reject) => {

        pool.getConnection(function(err, connection) {
    
            console.log('hello database', err, connection);
          
            if (err) throw err; // not connected!
        
            // Use the connection
            var sql = 'INSERT INTO Venue (Venue_Name, Venue_Description, Venue_Latitude, Venue_Longitude, Venue_AddressLine1, Venue_AddressLine2, Venue_AddressLine3, Venue_TownCity, Venue_PostalCode, Venue_Country) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            var params = [requestRawBody.name, requestRawBody.description, requestRawBody.latitude, requestRawBody.longitude, requestRawBody.address1, requestRawBody.address2, requestRawBody.address3, requestRawBody.city, requestRawBody.postcode, requestRawBody.country];
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

  function updateVenue(requestRawBody) {

    return new Promise((resolve, reject) => {

        pool.getConnection(function(err, connection) {
    
            // console.log('Database connection: ', err, connection);
          
            if (err) throw err; // not connected!
        
            // Use the connection
            var sql = 'UPDATE Venue SET Venue_Name=?, Venue_Description=?, Venue_Latitude=?, Venue_Longitude=?, Venue_AddressLine1=?, Venue_AddressLine2=?, Venue_AddressLine3=?, Venue_TownCity=?, Venue_PostalCode=?, Venue_Country=?  WHERE Venue_Id=?';
            var params = [requestRawBody.name, requestRawBody.description, requestRawBody.latitude, requestRawBody.longitude, requestRawBody.address1, requestRawBody.address2, requestRawBody.address3, requestRawBody.city, requestRawBody.postcode, requestRawBody.country, requestRawBody.id];
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

  module.exports = {getVenues, getVenue, createVenue, updateVenue, deleteVenue};
