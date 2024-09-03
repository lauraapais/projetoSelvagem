const playButton = document.querySelector('#playButton');
const playButtonBackground = document.querySelector('#playButtonBack');
let isPlaying = false;
let sourcePoem = null;
let sourceMusic = null;

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNodePoem = audioContext.createGain();
gainNodePoem.gain.value = 1; // Inicializa com 100%
const gainNodeMusic = audioContext.createGain();
gainNodeMusic.gain.value = 1; // Inicializa com 100%

playButton.addEventListener('click', async function () {
    playButton.style.display = "none";
    playButton.style.opacity = "0";
    playButtonBackground.style.display = "none";
    playButtonBackground.style.opacity = "0";
    isPlaying = true;

    if (audioContext.state === 'suspended') {
        await audioContext.resume();
    }

    enableSliders();
    playCurrentTrackMedia();
});

// Função para tratar o evento de clique/toque
async function handlePlayButtonClick() {
    playButton.style.display = "none";
    playButton.style.opacity = "0";
    playButtonBackground.style.display = "none";
    playButtonBackground.style.opacity = "0";
    isPlaying = true;

    if (audioContext.state === 'suspended') {
        await audioContext.resume();
    }

    enableSliders();
    playCurrentTrackMedia();
}

// Adiciona suporte para diferentes eventos de interação
playButton.addEventListener('click', handlePlayButtonClick);
playButton.addEventListener('touchstart', handlePlayButtonClick);

// Previne toques acidentais e atraso na resposta
playButton.style.pointerEvents = "auto";
playButtonBackground.style.pointerEvents = "none"; // Se necessário, ajuste de acordo com a necessidade


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

    const videoSlider = document.getElementById('videoSlider');
    videoSlider.value = (sliderValues[track.id] && sliderValues[track.id].video) || 100; // Alterado para 100
    video.style.opacity = videoSlider.value / 100;

    const poemSlider = document.getElementById('poemSlider');
    poemSlider.value = (sliderValues[track.id] && sliderValues[track.id].poem) || 100; // Alterado para 100
    gainNodePoem.gain.value = poemSlider.value / 100;
    poemSlider.oninput = () => {
        gainNodePoem.gain.value = poemSlider.value / 100;
        sliderValues[track.id].poem = poemSlider.value;
    };

    const musicSlider = document.getElementById('musicSlider');
    musicSlider.value = (sliderValues[track.id] && sliderValues[track.id].music) || 100; // Alterado para 100
    gainNodeMusic.gain.value = musicSlider.value / 100;
    musicSlider.oninput = () => {
        gainNodeMusic.gain.value = musicSlider.value / 100;
        sliderValues[track.id].music = musicSlider.value;
    };

    const legendasSlider = document.getElementById('legendasSlider');
    legendasSlider.value = (sliderValues[track.id] && sliderValues[track.id].legendas) || 100; // Alterado para 100
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

    // Remova fontes antigas se existirem para evitar erros
    if (sourcePoem) {
        sourcePoem.disconnect();
    }
    if (sourceMusic) {
        sourceMusic.disconnect();
    }

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

// Inicializa os sliders com 100% ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateSliders(currentTrack);
});

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

const musicSlider = document.getElementById('musicSlider');
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
}

function handleMove(event) {
    if (isDragging) {
        event.preventDefault();

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

// Mobile Event Listeners (using 1 or 2 fingers)
document.addEventListener('touchstart', function (event) {
    if (event.touches.length === 1) {
        handleStart(event);
    } else if (event.touches.length === 2) {
        handleTwoFingerStart(event);
    }
}, { passive: false });

document.addEventListener('touchmove', handleMove, { passive: false });
document.addEventListener('touchend', handleEnd);

// Função específica para iniciar a interação com dois dedos
function handleTwoFingerStart(event) {
    event.preventDefault();

    isDoubleClick = true;
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];

    // Calcula a posição média dos dois dedos
    startX = (touch1.clientX + touch2.clientX) / 2;
    startY = (touch1.clientY + touch2.clientY) / 2;

    isDragging = true;
    currentX = startX;
    currentY = startY;

    videoSliderInitial = parseInt(videoSlider.value);
    legendasSliderInitial = parseInt(legendasSlider.value);
    musicSliderInitial = parseInt(musicSlider.value);
    poemSliderInitial = parseInt(poemSlider.value);
}

document.addEventListener('mousedown', handleStart);
document.addEventListener('mousemove', handleMove);
document.addEventListener('mouseup', handleEnd);

window.addEventListener('resize', windowSize);
