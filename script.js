
const playButton = document.querySelector('#playButton');
let isPlaying = false; 
let sourcePoem = null;
let sourceMusic = null;

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNodePoem = audioContext.createGain();
const gainNodeMusic = audioContext.createGain();

playButton.addEventListener('click', async function () {
    playButton.style.display = "none";
    playButton.style.opacity = "0";
    isPlaying = true; 

    // Resume audio context after user interaction
    if (audioContext.state === 'suspended') {
        await audioContext.resume();
    }

    playCurrentTrackMedia();
});

const tracks = document.querySelectorAll('.tracks h3');
let currentTrack = document.getElementById('faixa1');


function updateSliders(track) {
    const video = track.querySelector('.video');
    const legendas = track.querySelector('.legendas');
    const poem = track.querySelector('audio:nth-of-type(1)');
    const music = track.querySelector('audio:nth-of-type(2)');

    // Update Video Slider
    const videoSlider = document.getElementById('videoSlider');
    videoSlider.value = video.style.opacity * 100 || 100;
    video.style.opacity = videoSlider.value / 100;
    videoSlider.oninput = () => video.style.opacity = videoSlider.value / 100;

    // Update Legendas Slider
    const legendasSlider = document.getElementById('legendasSlider');
    legendasSlider.value = legendas.style.opacity * 100 || 100;
    legendas.style.opacity = legendasSlider.value / 100;
    legendasSlider.oninput = () => legendas.style.opacity = legendasSlider.value / 100;

    // Update Poem Slider
    const poemSlider = document.getElementById('poemSlider');
    gainNodePoem.gain.value = poemSlider.value / 100;
    poemSlider.oninput = () => gainNodePoem.gain.value = poemSlider.value / 100;

    // Update Music Slider
    const musicSlider = document.getElementById('musicSlider');
    gainNodeMusic.gain.value = musicSlider.value / 100;
    musicSlider.oninput = () => gainNodeMusic.gain.value = musicSlider.value / 100;

}

function playCurrentTrackMedia() {
    const video = currentTrack.querySelector('.video');
    const poem = currentTrack.querySelector('audio:nth-of-type(1)');
    const music = currentTrack.querySelector('audio:nth-of-type(2)');
    const legendas = currentTrack.querySelector('.legendas');

    // Disconnect previous audio sources if they exist
    if (sourcePoem) {
        sourcePoem.disconnect();
    }
    if (sourceMusic) {
        sourceMusic.disconnect();
    }

    // Create new MediaElementSource and connect to gain nodes
    sourcePoem = audioContext.createMediaElementSource(poem);
    sourcePoem.connect(gainNodePoem).connect(audioContext.destination);
    
    sourceMusic = audioContext.createMediaElementSource(music);
    sourceMusic.connect(gainNodeMusic).connect(audioContext.destination);

    video.play();
    poem.play();
    music.play();
    legendas.play();
}

tracks.forEach(track => {
    track.addEventListener('click', () => {
        const trackId = track.getAttribute('data-track');
        const newTrack = document.getElementById(trackId);

        if (currentTrack !== newTrack) {
            currentTrack.style.display = 'none';
            newTrack.style.display = 'block';
            currentTrack = newTrack;
            updateSliders(currentTrack);

            if (isPlaying) {
                playCurrentTrackMedia();
            }
        }
    });
});

// Initialize sliders for the first track
updateSliders(currentTrack);
