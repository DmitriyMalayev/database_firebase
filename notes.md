# Databases (Firebase)
Websites work with Data
  Blog Posts
  Todos
  Comments
  User Info
  Scores 
  etc. 
Data is Stored in a Database
  Firebase which is made by Google is one of them.
Database Types
  SQL Databases => Popular with PHP
    Tables
    Rows
    Columns 
  NoSQL Databases =  
    Collections
    Documents
    Properties 
  Firestore
    Firestore provided by a service called Firebase which is made by Google
    Firebase is known as BackEnd As a Service
    Documents look like JavaScript Objects
    Firestore 



reference to collection. 
get() is an asynchronous task which returns a promise
snapshot is how a collection looks like at that moment in time. 
  docs is an array with information
onSnapshot 
  fires a callback function and takes in the snapshot of when it occurs. 
  Any time there is a change in the collection, fireStore takes a snapshot of the collection and fires the callback function. 
  In the snapshot, we can see all of the data changes.  docChanges method shows all the changes that occured in the database.
Properties
  We don't have to specify all of the properties.
created_at: firebase.firestore.Timestamp.fromDate(now),   
  creating a Timestamp Object based on the new Date()
add
  Used to add a new document object to the collection
  It's asynchronous 
db.collection("recipes")   => Getting a reference to the collection
  .doc(id)    => reference to a single document, pass in the id we want a reference to
  .delete()   => async method to delete a document from the collection
  .then(() => { 
    console.log("recipe deleted");
  })
  .catch(err);

Get Documents    Removed because we want to use real time listeners. This is a single request. 
db.collection("recipes")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      addRecipe(doc.data(), doc.id); //add recipe
    });
  })
  .catch((err) => {
    console.log(err);
  });