
  // Initialize Firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCqQ3PFnQ1SexB4H2r10u0WAXhwVsZswPk",
    authDomain: "trainschedule-4a088.firebaseapp.com",
    databaseURL: "https://trainschedule-4a088.firebaseio.com",
    projectId: "trainschedule-4a088",
    storageBucket: "trainschedule-4a088.appspot.com",
    messagingSenderId: "504195879951"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  var trainData = database.ref("/Trains")


  $("#addtrain").on("click", function(event) {
    event.preventDefault();

  // Grabs user input
  var trainName = $("#trainName").val();
  console.log(trainName);
  var trainDest = $("#destination").val();
  console.log(trainDest);
  var trainTime = moment($("#time").val(), "HH:mm").format("X");
  console.log(trainTime);
  var trainFreq = $("#frequency").val();
  console.log(trainFreq);

    // Creates local "temporary" object for holding TRAIN data
    // var newTrain = {
    //     name: trainName,
    //     role: trainDest,
    //     start: trainTime,
    //     rate: trainFreq
    //   };


      // Uploads TRAIN data to the database
  
    trainData.push().set({
   
         name: trainName,
        role: trainDest,
        start: trainTime,
        rate: trainFreq 
      });

    // Logs everything to console
    // console.log(trainName.name);
    // console.log(trainDest.role);
    // console.log(trainTime.start);
    // console.log(trainFreq.rate);  THESE DONT WORK

     // Alert
  alert("Train successfully added");

    // Clears all of the text-boxes

    $("#trainName").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");

  });


  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref("/Trains").on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
console.log("In the child handler")
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

    


     // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

 // Time apart (remainder)
 var tRemainder = diffTime % trainFreq;
 console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain =trainFreq - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

 // Next Train
 var nextTrain = moment().add(tMinutesTillTrain, "minutes");
 console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


    $(".table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainFreq + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });

    // Prettify the TRAIN start
//   var trainStartPretty = moment.unix(empStart).format("HH:mm");



