function useAudioData(song, freqArr = 25, fftSize = 1024) {
  const frequencyArray = [...Array(freqArr).keys()];

  let analyser;

  const initializeAudioAnalyser = () => {
    const audio = new Audio();
    const audioContext = new AudioContext();
    const audioContextsource = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();
    audio.src = song;
    analyser.fftSize = fftSize;
    audioContextsource.connect(audioContext.destination);
    audioContextsource.connect(analyser);
    audio.play();
  };

  const getFrequencyData = visualizer => {
    const bufferLength = analyser.frequencyBinCount;
    const amplitudeArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(amplitudeArray);
    visualizer(amplitudeArray);
  };

  return { initializeAudioAnalyser, getFrequencyData, frequencyArray };
}

export { useAudioData };
