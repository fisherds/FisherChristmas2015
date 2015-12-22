// Loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// From: https://developers.google.com/youtube/iframe_api_reference?hl=en

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height : '100%',
    width : '100%',
    videoId : 'cRFtuLTN4Uk',
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

var playingVideoInfo = {"imageUrl": "images/intro.png",
    "firebasePath": "extras",
    "firebaseKey": "intro"};

function playSnippet(startTime, endTime) {
  player.loadVideoById({videoId:'cRFtuLTN4Uk',
    startSeconds: startTime, endSeconds: endTime});
}

var playing = false;
function onPlayerStateChange(event) {
  console.log("State change to " + event.data);
  if (event.data == YT.PlayerState.PLAYING) {
    $("#player").show();
    $("img").hide();
    ref.child(playingVideoInfo.firebasePath).child(playingVideoInfo.firebaseKey).set("PLAYING");
    playing = true; // HACK: Trying to avoid showing the image briefly when the video starts.
  } else if (event.data == YT.PlayerState.ENDED && playing) {
      $("#player").hide();
      $("img").attr("src", playingVideoInfo.imageUrl).show();
      ref.child(playingVideoInfo.firebasePath).child(playingVideoInfo.firebaseKey).set("PLAYED");
      playing = false;
    }
}

function stopVideo() {
  player.stopVideo();
}

var ref = new Firebase('https://fisherchristmas2015.firebaseio.com/');
function registerFirebaseListeners() {
  ref.child("extras").on("child_changed",
      function(snapshot) {
        console.log("An extra changed " + snapshot.key() + " value is now " + snapshot.val());
        if (snapshot.val() == "NEEDS_TO_PLAY") {
          switch (snapshot.key()) {
          case "intro":
            console.log("Set the startTime for intro video");
            playingVideoInfo = {"imageUrl": "images/intro.png",
                "firebasePath": "extras",
                "firebaseKey": "intro"};
            playSnippet(0, 73);
            break;
          case "exit":
            console.log("Set the startTime for exit video 2");
            playingVideoInfo = {"imageUrl": "images/cover.png",
                "firebasePath": "extras",
                "firebaseKey": "exit"};
            playSnippet(420, 437);
            break;
          }
        }
      }, function(errorObject) {
        console.log("Extras read failed: " + errorObject.code);
      });
  ref.child("mckinley").on("child_changed",
      function(snapshot) {
        console.log("McKinley " + snapshot.key() + " value is now " + snapshot.val());
        if (snapshot.val() == "NEEDS_TO_PLAY") {
          playingVideoInfo = {"imageUrl": "images/m" + snapshot.key() + ".png",
              "firebasePath": "mckinley",
              "firebaseKey": snapshot.key()};
          switch (snapshot.key()) {
          case "1":
            console.log("Set the startTime for video 1");
            playSnippet(90, 118);
            break;
          case "2":
            console.log("Set the startTime for video 2");
            playSnippet(150, 171);
            break;
          case "3":
            console.log("Set the startTime for video 3");
            playSnippet(210, 230);
            break;
          case "4":
            console.log("Set the startTime for video 4");
            playSnippet(270, 294);
            break;
          case "5":
            console.log("Set the startTime for video 5");
            playSnippet(330, 353);
            break;
          case "6":
            console.log("Set the startTime for video 6");
            playSnippet(390, 418);
            break;
          }
        }
      }, function(errorObject) {
        console.log("McKinley video read failed: " + errorObject.code);
      });
  ref.child("keegan").on("child_changed",
      function(snapshot) {
        console.log("Keegan " + snapshot.key() + " value is now " + snapshot.val());
        if (snapshot.val() == "NEEDS_TO_PLAY") {
          playingVideoInfo = {"imageUrl": "images/k" + snapshot.key() + ".png",
              "firebasePath": "keegan",
              "firebaseKey": snapshot.key()};
          switch (snapshot.key()) {
          case "1":
            console.log("Set the startTime for Keegan video 1");
            playSnippet(120, 144);
            break;
          case "2":
            console.log("Set the startTime for Keegan video 2");
            playSnippet(180, 199);
            break;
          case "3":
            console.log("Set the startTime for Keegan video 3");
            playSnippet(240, 261);
            break;
          case "4":
            console.log("Set the startTime for Keegan video 4");
            playSnippet(300, 323);
            break;
          case "5":
            console.log("Set the startTime for Keegan video 5");
            playSnippet(360, 383);
            break;
          case "6":
            console.log("Set the startTime for Keegan video 6");
            playSnippet(390, 418);
            break;
          }
        }
      }, function(errorObject) {
        console.log("Keegan video read failed: " + errorObject.code);
      });
  console.log("Loaded Firebase listeners!");
}

$(document).ready(function() {
  $("#player").hide();  // Will be replaced by an iframe.
  registerFirebaseListeners();
});
