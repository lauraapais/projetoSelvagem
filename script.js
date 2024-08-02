// Video
const videoSlider = document.getElementById('videoSlider');
const multimediaVideo1 = document.getElementById('multimediaVideo1');

videoSlider.addEventListener('input', function() {
    const opacity = videoSlider.value / 100;
    multimediaVideo1.style.opacity = opacity;
});

// Legendas
const legendasSlider = document.getElementById('legendasSlider');
const legendas1 = document.getElementById('legendas1');

legendasSlider.addEventListener('input', function() {
    const opacity = legendasSlider.value / 100;
    legendas1.style.opacity = opacity;
});
 
// Poem
const poemSlider = document.getElementById('poemSlider');
const poem1 = document.getElementById('poem1');

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNodePoem = audioContext.createGain();
const sourcePoem = audioContext.createMediaElementSource(poem1);
sourcePoem.connect(gainNodePoem);
gainNodePoem.connect(audioContext.destination);

gainNodePoem.gain.value = poemSlider.value / 100;

poemSlider.addEventListener('input', function() {
    const gainValue = poemSlider.value / 100;
    gainNodePoem.gain.value = gainValue;
});

// Music
const musicSlider = document.getElementById('musicSlider');
const music1 = document.getElementById('music1');

const gainNodeMusic = audioContext.createGain();
const sourceMusic = audioContext.createMediaElementSource(music1);
sourceMusic.connect(gainNodeMusic);
gainNodeMusic.connect(audioContext.destination);

gainNodeMusic.gain.value = musicSlider.value / 100;

musicSlider.addEventListener('input', function() {
    const gainValue = musicSlider.value / 100;
    gainNodeMusic.gain.value = gainValue;
});
