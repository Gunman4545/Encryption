let audioIN = { audio: true };
//  audio is true, for recording

// Access the permission for use
// the microphone
navigator.mediaDevices.getUserMedia(audioIN)

  // 'then()' method returns a Promise
  .then(function (mediaStreamObj) {

    // Start record
    let record_button = document.getElementById('btnStart');

    // This is the main thing to recorded
    // the audio 'MediaRecorder' API
    let mediaRecorder = new MediaRecorder(mediaStreamObj);
    // Pass the audio stream

    // Start event
    record_button.addEventListener('mousedown', function (ev) {
      mediaRecorder.start();
      record_button.value = "Recording";
      // console.log(mediaRecorder.state);
    })

    // Stop event
    record_button.addEventListener('mouseup', function (ev) {
      mediaRecorder.stop();
      record_button.value = "Record";
      // console.log(mediaRecorder.state);
    });

    // If audio data available then push
    // it to the chunk array
    mediaRecorder.ondataavailable = function (ev) {
      dataArray.push(ev.data);
    }

    // Chunk array to store the audio data
    let dataArray = [];

    // Convert the audio data in to blob
    // after stopping the recording
    mediaRecorder.onstop = function (ev) {

      // blob of type mp3
      let audioData = new Blob(dataArray,
                { 'type': 'audio/mp3;' });
       
      // After fill up the chunk
      // array make it empty
      dataArray = [];

      // Creating audio url with reference
      // of created blob named 'audioData'
      let audioSrc = window.URL
          .createObjectURL(audioData);

      const audio = new Audio(audioSrc);
      audio.play();
    }
  })

  // If any error occurs then handles the error
  .catch(function (err) {
    console.log(err.name, err.message);
  });