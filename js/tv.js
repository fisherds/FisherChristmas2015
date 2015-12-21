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
    videoId : 'ZbtkDencIyE',
    events : {
      'onReady' : onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  playSnippet(0);
}

var SNIPPET_DURATION_S = 6;
function playSnippet(startTime) {
  player.loadVideoById({videoId:'ZbtkDencIyE', startSeconds: startTime, endSeconds: startTime + SNIPPET_DURATION_S});
}

var ref = new Firebase('https://fisherchristmas2015.firebaseio.com/');
ref.child("mckinley").on("child_changed",
    function(snapshot) {
      console.log("McKinley " + snapshot.key() + " value is now " + snapshot.val());
      if (snapshot.val() == "NEEDS_TO_PLAY") {

        switch (snapshot.key()) {
        case "1":
          console.log("Set the startTime for video 1");
          playSnippet(10);
          break;
        case "2":
          console.log("Set the startTime for video 2");
          playSnippet(20);
          break;
        case "3":
          console.log("Set the startTime for video 3");
          playSnippet(30);
          break;
        case "4":
          console.log("Set the startTime for video 4");
          playSnippet(40);
          break;
        case "5":
          console.log("Set the startTime for video 5");
          playSnippet(50);
          break;
        case "6":
          console.log("Set the startTime for video 6");
          playSnippet(60);
          break;
        }
        setTimeout(function() {
          ref.child("mckinley").child(snapshot.key()).set("PLAYED");
        }, SNIPPET_DURATION_S * 1000);
      }
    }, function(errorObject) {
      console.log("The McKinley read failed: " + errorObject.code);
    });
ref.child("keegan").on("child_changed",
    function(snapshot) {
      console.log("Keegan " + snapshot.key() + " value is now " + snapshot.val());
      if (snapshot.val() == "NEEDS_TO_PLAY") {
        switch (snapshot.key()) {
        case "1":
          console.log("Set the startTime for Keegan video 1");
          playSnippet(70);
          break;
        case "2":
          console.log("Set the startTime for Keegan video 2");
          playSnippet(80);
          break;
        case "3":
          console.log("Set the startTime for Keegan video 3");
          playSnippet(90);
          break;
        case "4":
          console.log("Set the startTime for Keegan video 4");
          playSnippet(100);
          break;
        case "5":
          console.log("Set the startTime for Keegan video 5");
          playSnippet(110);
          break;
        case "6":
          console.log("Set the startTime for Keegan video 6");
          playSnippet(120);
          break;
        }
        setTimeout(function() {
          ref.child("mckinley").child(snapshot.key()).set("PLAYED");
        }, SNIPPET_DURATION_S * 1000);
      }
    }, function(errorObject) {
      console.log("The McKinley read failed: " + errorObject.code);
    });

console.log("Loaded Firebase listeners!");
