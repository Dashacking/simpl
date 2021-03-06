'use strict';

var constraints = {
  video: true
};

var video = document.querySelector('video');
var settingsDiv = document.querySelector('div#settings');

function handleSuccess(stream) {
  window.stream = stream; // stream available to console
  video.src = window.URL.createObjectURL(stream);
  var track = stream.getTracks()[0];
  var settings = track.getSettings ? track.getSettings() : null;
  var settingsString;
  if (settings) {
    settingsString = JSON.stringify(settings).
      replace(/,"/g,'\n').
      replace(/":/g, ': ').
      replace(/{"/g, '').
      replace(/[}]/g, '');
  } else {
    settingsString = 'MediaStreamTrack.getSettings() is not supported by this browser :^(.';
  }
  settingsDiv.textContent = settingsString;
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);
