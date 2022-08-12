const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const start = () => {
      mediaRecorder.start();
      console.log("start recording");
    }

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          console.log("stop recording");
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();
          resolve({ audioBlob, audioUrl, play });
        });

        mediaRecorder.stop();
      });

    resolve({ start, stop });
  });

  (async () => {
    let record_button = document.getElementById('btnStart');
    async function start_record(btn) {
      return new Promise(resolve =>  btn.onmousedown = () => resolve());
    }

    async function stop_record(btn) {
      return new Promise(resolve =>  btn.onmouseup = () => resolve());
    }
    
    await start_record(record_button);

    const recorder = await recordAudio();
    recorder.start();

    await stop_record(record_button);
    const audio = await recorder.stop();
    audio.play();
  })();

/*   (async () => {
    async function start_record(btn) {
      return new Promise(resolve =>  btn.onmousedown = () => resolve());
    }

    async function stop_record(btn) {
      return new Promise(resolve =>  btn.onmouseup = () => resolve());
    }

    let record_button = document.getElementById('btnStart');
    await start_record(record_button);
    console.log("start recording");

    const recorder = await recordAudio();
    recorder.start();

    await stop_record(record_button);
    const audio = await recorder.stop();
    audio.play();
    console.log("stop recording");
  })(); */