
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

    enableSliders();
    playCurrentTrackMedia();
});

const tracks = document.querySelectorAll('.tracks h3');
let currentTrack = document.getElementById('faixa1');
let trackTimes = {};
let sliderValues = {};
let increasingVolume = true;  // Variable to track volume increase or decrease
let isMouseDown = false;      // Variable to track mouse down state

function updateSliders(track) {
    const video = track.querySelector('.video');
    const legendas = track.querySelector('.legendas');
    const poem = track.querySelector('audio:nth-of-type(1)');
    const music = track.querySelector('audio:nth-of-type(2)');

    // Update Video Slider (now for display only)
    const videoSlider = document.getElementById('videoSlider');
    videoSlider.value = video.style.opacity * 100 || 100;
    video.style.opacity = videoSlider.value / 100;
    videoSlider.disabled = !isPlaying;
    videoSlider.style.opacity = isPlaying ? 1 : 0.5;

    // Disable Legendas Slider (opacity controlled by mouse position)
    const legendasSlider = document.getElementById('legendasSlider');
    legendasSlider.disabled = true;
    legendasSlider.style.opacity = 0.5;

    // Update Poem Slider
    const poemSlider = document.getElementById('poemSlider');
    poemSlider.value = (sliderValues[track.id] && sliderValues[track.id].poem) || 100;
    gainNodePoem.gain.value = poemSlider.value / 100;
    poemSlider.oninput = () => {
        gainNodePoem.gain.value = poemSlider.value / 100;
        sliderValues[track.id].poem = poemSlider.value;
    };
    poemSlider.disabled = !isPlaying;
    poemSlider.style.opacity = isPlaying ? 1 : 0.5;

    // Update Music Slider
    const musicSlider = document.getElementById('musicSlider');
    musicSlider.value = (sliderValues[track.id] && sliderValues[track.id].music) || 100;
    gainNodeMusic.gain.value = musicSlider.value / 100;
    musicSlider.oninput = () => {
        gainNodeMusic.gain.value = musicSlider.value / 100;
        sliderValues[track.id].music = musicSlider.value;
    };
    musicSlider.disabled = !isPlaying;
    musicSlider.style.opacity = isPlaying ? 1 : 0.5;

    if(currentTrack && isPlaying){
        video.play();
        poem.play();
        music.play();
        legendas.play();
    }
}

function saveTrackTimes(track) {
    const video = track.querySelector('.video');
    const poem = track.querySelector('audio:nth-of-type(1)');
    const music = track.querySelector('audio:nth-of-type(2)');
    const legendas = track.querySelector('.legendas');

    trackTimes[track.id] = {
        video: video.currentTime,
        poem: poem.currentTime,
        music: music.currentTime,
        legendas: legendas.currentTime
    };

    video.pause();
    poem.pause();
    music.pause();
    legendas.pause();
}

function restoreTrackTimes(track) {
    const video = track.querySelector('.video');
    const poem = track.querySelector('audio:nth-of-type(1)');
    const music = track.querySelector('audio:nth-of-type(2)');
    const legendas = track.querySelector('.legendas');

    if (trackTimes[track.id]) {
        video.currentTime = trackTimes[track.id].video;
        poem.currentTime = trackTimes[track.id].poem;
        music.currentTime = trackTimes[track.id].music;
        legendas.currentTime = trackTimes[track.id].legendas;
    }
}

function playCurrentTrackMedia() {
    const video = currentTrack.querySelector('.video');
    const poem = currentTrack.querySelector('audio:nth-of-type(1)');
    const music = currentTrack.querySelector('audio:nth-of-type(2)');
    const legendas = currentTrack.querySelector('.legendas');

    sourcePoem = audioContext.createMediaElementSource(poem);
    sourcePoem.connect(gainNodePoem).connect(audioContext.destination);
    
    sourceMusic = audioContext.createMediaElementSource(music);
    sourceMusic.connect(gainNodeMusic).connect(audioContext.destination);

    restoreTrackTimes(currentTrack);

    video.play();
    poem.play();
    music.play();
    legendas.play();
}

function enableSliders() {
    const sliders = document.querySelectorAll('#videoSlider, #legendasSlider, #poemSlider, #musicSlider');
    sliders.forEach(slider => {
        slider.disabled = false;
        slider.style.opacity = 1;
    });
}

tracks.forEach(track => {
    track.addEventListener('click', () => {
        const trackId = track.getAttribute('data-track');
        const newTrack = document.getElementById(trackId);

        if (currentTrack !== newTrack) {
            saveTrackTimes(currentTrack);

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

function handleMouseMove(event) {
    if (!isPlaying) return;

    const video = currentTrack.querySelector('.video');
    const screenWidth = window.innerWidth;
    const mouseX = event.clientX;

    // Calculate margins (5% of the screen width)
    const margin = screenWidth * 0.05;
    const effectiveWidth = screenWidth - 2 * margin;

    // Calculate the opacity based on mouseX position within the effective width
    let opacity = (mouseX - margin) / effectiveWidth;
    opacity = Math.min(1, Math.max(0, opacity));
    video.style.opacity = opacity;

    // Update the slider for display purposes
    const videoSlider = document.getElementById('videoSlider');
    videoSlider.value = opacity * 100;
}

function handleMouseMoveY(event) {
    if (!isPlaying) return;

    const legendas = currentTrack.querySelector('.legendas');
    const screenHeight = window.innerHeight;
    const mouseY = event.clientY;

    // Calculate margins (5% of the screen height)
    const margin = screenHeight * 0.05;
    const effectiveHeight = screenHeight - 2 * margin;

    // Calculate the opacity based on mouseY position within the effective height
    let opacity = (mouseY - margin) / effectiveHeight;
    opacity = Math.min(1, Math.max(0, opacity));
    legendas.style.opacity = opacity;

    // Update the slider for display purposes (optional)
    const legendasSlider = document.getElementById('legendasSlider');
    legendasSlider.value = opacity * 100;
}

function handleMouseDown() {
    if (!isPlaying) return;

    isMouseDown = true;
    changeVolume();
}

function handleMouseUp() {
    isMouseDown = false;
}

function handleMouseLeave() {
    isMouseDown = false;
}

function changeVolume() {
    const musicSlider = document.getElementById('musicSlider');
    let currentVolume = gainNodeMusic.gain.value;

    function adjustVolume() {
        if (!isMouseDown) return;

        if (increasingVolume) {
            currentVolume += 0.01;
            if (currentVolume >= 1) {
                currentVolume = 1;
                increasingVolume = false;
            }
        } else {
            currentVolume -= 0.01;
            if (currentVolume <= 0) {
                currentVolume = 0;
                increasingVolume = true;
            }
        }

        gainNodeMusic.gain.value = currentVolume;
        musicSlider.value = currentVolume * 100;

        setTimeout(adjustVolume, 50); // Adjust volume every 50 milliseconds
    }

    adjustVolume();
}

// Listen for mouse movement
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mousemove', handleMouseMoveY);

// Listen for mouse down, up, and leave to adjust volume
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('mouseleave', handleMouseLeave);

// Initialize slider values and sliders for the first track
sliderValues[currentTrack.id] = { poem: 100, music: 100 };
updateSliders(currentTrack);
