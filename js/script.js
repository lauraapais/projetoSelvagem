const startButton = document.getElementById('startButton');
const videos = document.querySelectorAll('.video');  
const legendas = document.querySelectorAll('.legendas');  
const poesiaAudio = document.querySelector('.poesia');  
const jazzAudio = document.querySelector('.jazz'); 
const audios = document.querySelectorAll('audio');
const divRight = document.querySelector('.divRight');
const divBottom = document.querySelector('.divBottom');
const divLeft = document.querySelector('.divLeft');
const divTop = document.querySelector('.divTop');
const margin = 50; 
let isActive = false; 
let currentTrack = null;
let previousTrack = null;

const maxBackground = '#252525';

// Função para definir opacidade do fundo e aplicar o efeito multiply
function setDivBackground(div, opacity) {
    div.style.backgroundColor = `rgba(37, 37, 37, ${opacity})`; // Cor #252525 com opacidade ajustada
    div.style.mixBlendMode = 'multiply'; // Aplicar o efeito multiply
}

startButton.addEventListener('click', function() {
    if (currentTrack === null) {
        currentTrack = 1;
    }
    showTrack(currentTrack);

    videos.forEach(video => {
        video.style.opacity = '1';
        video.play();
    });

    legendas.forEach(legenda => {
        legenda.style.opacity = '1';
        legenda.play();
    });

    poesiaAudio.play();
    jazzAudio.play();

    startButton.style.opacity = '0';

    isActive = true;
});

function hideAllTracks() {
    for (let i = 1; i <= 8; i++) {
        const track = document.querySelector(`.track${i}`);
        if (track) track.style.display = 'none';
    }
}

function showTrack(trackNumber) {
    hideAllTracks();
    const selectedTrack = document.querySelector(`.track${trackNumber}`);
    if (selectedTrack) selectedTrack.style.display = 'block';
}

const faixas = document.querySelectorAll('.hover-link');
faixas.forEach(faixa => {
    faixa.addEventListener('click', function() {
        const selectedTrackNumber = this.getAttribute('data-track').replace('faixa', '');
        changeTrack(selectedTrackNumber);
    });
});

function changeTrack(trackNumber) {
    // Pausar a música de jazz e a poesia quando sair da track 1 pela primeira vez
    if (currentTrack === 1 && previousTrack === null) {
        if (poesiaAudio) poesiaAudio.pause();
        if (jazzAudio) jazzAudio.pause();
    }

    if (previousTrack) {
        const previousTrackElement = document.querySelector(`.track${previousTrack}`);
        const previousAudioPoesia = previousTrackElement.querySelector('.poesia');
        const previousAudioJazz = previousTrackElement.querySelector('.jazz');
        const previousVideo = previousTrackElement.querySelector('video');

        if (previousAudioPoesia) previousAudioPoesia.pause(); 
        if (previousAudioJazz) previousAudioJazz.pause(); 
        if (previousVideo) previousVideo.pause(); 
    }

    currentTrack = trackNumber;
    showTrack(currentTrack);

    const currentTrackElement = document.querySelector(`.track${currentTrack}`);
    const currentAudioPoesia = currentTrackElement.querySelector('.poesia');
    const currentAudioJazz = currentTrackElement.querySelector('.jazz');
    const currentVideo = currentTrackElement.querySelector('video');

    if (currentAudioPoesia) currentAudioPoesia.play(); 
    if (currentAudioJazz) currentAudioJazz.play(); 
    if (currentVideo) currentVideo.play(); 

    previousTrack = currentTrack;
}


// Função para atualizar opacidade do fundo da div ao interagir com o vídeo
function updateVideoOpacity(event) {
    if (!isActive) return;

    const rect = divRight.getBoundingClientRect();
    const mouseY = event.clientY - rect.top;
    const divHeight = rect.height;
    const adjustedHeight = divHeight - 2 * margin;

    let opacity = 0;
    if (mouseY < margin) {
        opacity = 0;
    } else if (mouseY > divHeight - margin) {
        opacity = 1;
    } else {
        const adjustedMouseY = mouseY - margin;
        opacity = Math.min(1, Math.max(0, adjustedMouseY / adjustedHeight));
    }

    setDivBackground(divRight, opacity);
    videos.forEach(video => video.style.opacity = opacity.toString());
}

// Função para atualizar opacidade do fundo da div ao interagir com as legendas
function updateLegendasOpacity(event) {
    if (!isActive) return;

    const rect = divBottom.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;  
    const divWidth = rect.width;
    const adjustedWidth = divWidth - 2 * margin;

    let opacity = 0;
    if (mouseX < margin) {
        opacity = 0;
    } else if (mouseX > divWidth - margin) {
        opacity = 1;
    } else {
        const adjustedMouseX = mouseX - margin;
        opacity = Math.min(1, Math.max(0, adjustedMouseX / adjustedWidth));
    }

    setDivBackground(divBottom, opacity);
    legendas.forEach(legenda => legenda.style.opacity = opacity.toString());
}

// Função para atualizar volume e opacidade do fundo da div da poesia
function updatePoesiaVolume(event) {
    if (!isActive) return;

    const rect = divLeft.getBoundingClientRect();
    const mouseY = event.clientY - rect.top;  
    const divHeight = rect.height;
    const adjustedHeight = divHeight - 2 * margin;

    let volume = 0;
    if (mouseY < margin) {
        volume = 0;  
    } else if (mouseY > divHeight - margin) {
        volume = 1; 
    } else {
        const adjustedMouseY = mouseY - margin;
        volume = Math.min(1, Math.max(0, adjustedMouseY / adjustedHeight));
    }

    setDivBackground(divLeft, volume);
    poesiaAudio.volume = volume;
}

// Função para atualizar volume e opacidade do fundo da div do jazz
function updateJazzVolume(event) {
    if (!isActive) return;

    const rect = divTop.getBoundingClientRect();
    const mouseX = event.clientX - rect.left; 
    const divWidth = rect.width;
    const adjustedWidth = divWidth - 2 * margin;

    let volume = 0;
    if (mouseX < margin) {
        volume = 0;  
    } else if (mouseX > divWidth - margin) {
        volume = 1; 
    } else {
        const adjustedMouseX = mouseX - margin;
        volume = Math.min(1, Math.max(0, adjustedMouseX / adjustedWidth));
    }

    setDivBackground(divTop, volume);
    jazzAudio.volume = volume;
}

// Adiciona listeners para as divs reagirem ao movimento do mouse
divRight.addEventListener('mousemove', updateVideoOpacity);
divBottom.addEventListener('mousemove', updateLegendasOpacity);
divLeft.addEventListener('mousemove', updatePoesiaVolume);
divTop.addEventListener('mousemove', updateJazzVolume);
