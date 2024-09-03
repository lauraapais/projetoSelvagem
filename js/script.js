const playButton = document.querySelector('#playButton');
const playButtonBackground = document.querySelector('#playButtonBack');
let isPlaying = false;
let sourcePoem = null;
let sourceMusic = null;

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNodePoem = audioContext.createGain();
const gainNodeMusic = audioContext.createGain();

function isMobile() {
    return window.innerWidth <= 768; // Define a width threshold for mobile
}

playButton.addEventListener('click', async function () {
    if (!isMobile()) { // Só inicia no clique se não for mobile
        playButton.style.display = "none";
        playButton.style.opacity = "0";
        playButtonBackground.style.display = "none";
        playButtonBackground.style.opacity = "0";
        isPlaying = true;

        // Resume audio context after user interaction
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        enableSliders();
        playCurrentTrackMedia();
    }
});

const tracks = document.querySelectorAll('.tracks h3');
let currentTrack = document.getElementById('faixa1');
let trackTimes = {};
let sliderValues = {};
let increasingVolume = true; 
let isMouseDown = false;

function updateSliders(track) {
    const video = track.querySelector('.video');
    const legendas = track.querySelector('.legendas');
    const poem = track.querySelector('audio:nth-of-type(1)');
    const music = track.querySelector('audio:nth-of-type(2)');

    // Update Video Slider
    const videoSlider = document.getElementById('videoSlider');
    videoSlider.value = (sliderValues[track.id] && sliderValues[track.id].video) || 50;
    video.style.opacity = videoSlider.value / 100;

    // Update Poem Slider
    const poemSlider = document.getElementById('poemSlider');
    poemSlider.value = (sliderValues[track.id] && sliderValues[track.id].poem) || 50;
    gainNodePoem.gain.value = poemSlider.value / 100;
    poemSlider.oninput = () => {
        gainNodePoem.gain.value = poemSlider.value / 100;
        sliderValues[track.id].poem = poemSlider.value;
    };

    // Update Music Slider
    const musicSlider = document.getElementById('musicSlider');
    musicSlider.value = (sliderValues[track.id] && sliderValues[track.id].music) || 50;
    gainNodeMusic.gain.value = musicSlider.value / 100;
    musicSlider.oninput = () => {
        gainNodeMusic.gain.value = musicSlider.value / 100;
        sliderValues[track.id].music = musicSlider.value;
    };

    // Update Legendas Slider
    const legendasSlider = document.getElementById('legendasSlider');
    legendasSlider.value = (sliderValues[track.id] && sliderValues[track.id].legendas) || 50;
    legendas.style.opacity = legendasSlider.value / 100;
    legendasSlider.oninput = () => {
        legendas.style.opacity = legendasSlider.value / 100;
        sliderValues[track.id].legendas = legendasSlider.value;
    };

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

    sliderValues[track.id] = {
        video: document.getElementById('videoSlider').value,
        poem: document.getElementById('poemSlider').value,
        music: document.getElementById('musicSlider').value,
        legendas: document.getElementById('legendasSlider').value
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

function handleStart(event) {
    event.preventDefault();

    const touchPoints = event.touches.length; // Número de dedos usados

    if (touchPoints === 1 || !isMobile()) { // Interação com 1 dedo ou desktop
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const clientY = event.touches ? event.touches[0].clientY : event.clientY;

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
        startX = clientX;
        startY = clientY;
        currentX = startX;
        currentY = startY;

        videoSliderInitial = parseInt(videoSlider.value);
        legendasSliderInitial = parseInt(legendasSlider.value);
        musicSliderInitial = parseInt(musicSlider.value);
        poemSliderInitial = parseInt(poemSlider.value);
    } else if (touchPoints === 2 && isMobile()) { // Interação com 2 dedos no mobile
        // Tratamento específico para 2 dedos, se necessário
        // Exemplo: Ajustar apenas o volume de música e poema
        const clientX1 = event.touches[0].clientX;
        const clientY1 = event.touches[0].clientY;
        const clientX2 = event.touches[1].clientX;
        const clientY2 = event.touches[1].clientY;

        startX = (clientX1 + clientX2) / 2;
        startY = (clientY1 + clientY2) / 2;
        currentX = startX;
        currentY = startY;

        musicSliderInitial = parseInt(musicSlider.value);
        poemSliderInitial = parseInt(poemSlider.value);
        isDragging = true;
        isDoubleClick = true; // Forçar ajuste de volume com 2 dedos
    }
}

function handleMove(event) {
    if (isDragging) {
        event.preventDefault();

        // Suporte para mouse e toque
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const clientY = event.touches ? event.touches[0].clientY : event.clientY;

        currentX = clientX;
        currentY = clientY;
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
}

function handleEnd(event) {
    isDragging = false;
    isDoubleClick = false;

    console.log(gainNodePoem.gain.value, gainNodeMusic.gain.value);
}

// Adiciona listeners de eventos tanto para mouse quanto para toque
document.addEventListener('mousedown', handleStart);
document.addEventListener('mousemove', handleMove);
document.addEventListener('mouseup', handleEnd);

document.addEventListener('touchstart', handleStart, { passive: false });
document.addEventListener('touchmove', handleMove, { passive: false });
document.addEventListener('touchend', handleEnd);

window.addEventListener("resize", windowSize);
