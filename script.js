// Video
const videoSlider = document.getElementById('videoSlider');
const multimediaVideo1 = document.getElementById('multimediaVideo1');

videoSlider.addEventListener('input', function() {
    const opacity = videoSlider.value / 100;
    multimediaVideo1.style.opacity = opacity;
});


// Poem
const poemSlider = document.getElementById('poemSlider');
const poem1 = document.getElementById('poem1');

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain();
const source = audioContext.createMediaElementSource(poem1);
source.connect(gainNode);
gainNode.connect(audioContext.destination);

gainNode.gain.value = poemSlider.value / 100;

poemSlider.addEventListener('input', function() {
    const gainValue = poemSlider.value / 100;
    gainNode.gain.value = gainValue;
});
