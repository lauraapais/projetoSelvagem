
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

    if (currentTrack && isPlaying) {
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

let windowWidth, windowHeight;

const video = currentTrack.querySelector('.video');
const videoSlider = document.getElementById('videoSlider');

const legendas = currentTrack.querySelector('.legendas');
const legendasSlider = document.getElementById('legendasSlider');

//gainNodeMusic
const musicSlider = document.getElementById('musicSlider');

//gainNodePoem
const poemSlider = document.getElementById('poemSlider');


let videoSliderInitial, legendasSliderInitial, musicSliderInitial, poemSliderInitial;
let startX, startY, currentX, currentY, deltaX, deltaY, normalizedX, normalizedY;
let isDragging = false, isDoubleClick = false;
let clickTimeout;

function windowSize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
}

windowSize();

document.addEventListener('mousedown', (event) => {
    if (clickTimeout) {
        clearTimeout(clickTimeout);
        clickTimeout = null;
        isDoubleClick = true;
    } else {
        isDoubleClick = false;
        clickTimeout = setTimeout(() => {
            clickTimeout = null;
        }, 300);
    }

    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    currentX = startX;
    currentY = startY;

    videoSliderInitial = parseInt(videoSlider.value);
    legendasSliderInitial = parseInt(legendasSlider.value);
    musicSliderInitial = parseInt(musicSlider.value);
    poemSliderInitial = parseInt(poemSlider.value);
});

document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        currentX = event.clientX;
        currentY = event.clientY;
        deltaX = currentX - startX;
        deltaY = currentY - startY;

        normalizedX = Math.min(1, Math.max(-1, deltaX / windowWidth));
        normalizedY = Math.min(1, Math.max(-1, deltaY / windowHeight));

        if (!isDoubleClick) {
            video.style.opacity = Math.min(1, Math.max(0, videoSliderInitial / 100 + normalizedX));
            videoSlider.value = Math.min(100, Math.max(0, videoSliderInitial + normalizedX * 100));

            legendas.style.opacity = Math.min(1, Math.max(0, legendasSliderInitial / 100 + normalizedY));
            legendasSlider.value = Math.min(100, Math.max(0, legendasSliderInitial + normalizedY * 100));
        } else {
            gainNodeMusic.gain.value = Math.min(1, Math.max(0, musicSliderInitial / 100 + normalizedX));
            musicSlider.value = Math.min(100, Math.max(0, musicSliderInitial + normalizedX * 100));

            gainNodePoem.gain.value = Math.min(1, Math.max(0, poemSliderInitial / 100 + normalizedY));
            poemSlider.value = Math.min(100, Math.max(0, poemSliderInitial + normalizedY * 100));
        }
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    isDoubleClick = false;

    console.log(gainNodePoem.gain.value, gainNodeMusic.gain.value);
});

window.addEventListener("resize", windowSize);