
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCvaKe4LrjwTV569QoKGpXplAj1A4LYl5c",
    authDomain: "highestbidder-5c7f4.firebaseapp.com",
    databaseURL: "https://highestbidder-5c7f4.firebaseio.com",
    projectId: "highestbidder-5c7f4",
    storageBucket: "highestbidder-5c7f4.appspot.com",
    messagingSenderId: "45555377745"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addtrain").on("click", function(event) {
    event.preventDefault();

  // Grabs user input
  var trainName = $("#trainName").val().trim();
  var trainDest = $("#destination").val().trim();
  var trainTime = moment($("#time").val().trim(), "HH:mm").format("X");
  var trainFreq = $("#frequency").val().trim();

    // Creates local "temporary" object for holding TRAIN data
    var newTrain = {
        name: trainName,
        role: trainDest,
        start: trainTime,
        rate: trainFreq
      };


      // Uploads TRAIN data to the database
  database.ref().push(newTrain);

    // Logs everything to console
    console.log(trainName.name);
    console.log(trainDest.role);
    console.log(trainTime.start);
    console.log(trainFreq.rate);

     // Alert
  alert("Train successfully added");

    // Clears all of the text-boxes

    $("#trainName").val("").trim();
    $("#destination").val("").trim();
    $("#time").val("").trim();
    $("#frequency").val("").trim();

  });


  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

     // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().role;
  var trainTime = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().rate;

    // Employee Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);

    // Prettify the TRAIN start
  var trainStartPretty = moment.unix(empStart).format("HH:mm");

  

});