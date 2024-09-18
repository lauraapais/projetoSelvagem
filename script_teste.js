const startButton = document.getElementById('startButton');
let currentTrack = document.querySelector('.track1'); 

let jazzAudio = currentTrack.querySelector('.jazz');
let poesiaAudio = currentTrack.querySelector('.poesia');
let videoElement = currentTrack.querySelector('.video');
let legendasVideo = currentTrack.querySelector('.legendas');

const loadingText = document.getElementById('loadingText');

const faixaElements = document.querySelectorAll('.faixa');
faixaElements.forEach(faixa => {
    faixa.setAttribute('disabled', true); 
});

videoElement.style.display = 'none';
legendasVideo.style.display = 'none';

let interactionEnabled = false;

function ensureMediaReady(mediaElement, callback) {
    if (mediaElement.readyState >= 3) { 
        callback();
    } else {
        mediaElement.addEventListener('canplaythrough', callback, { once: true });
    }
}

function checkMediaReady() {
    if (jazzAudio.readyState >= 3 && poesiaAudio.readyState >= 3 && videoElement.readyState >= 3) {
        loadingText.style.display = 'none';
        
        videoElement.play();
        videoElement.style.display = 'block';
        videoElement.style.opacity = '1';
        legendasVideo.style.display = 'block';

        jazzAudio.play();
        poesiaAudio.play();
    }
}

startButton.addEventListener('click', () => {
    interactionEnabled = true;

    faixaElements.forEach(faixa => {
        faixa.removeAttribute('disabled'); 
    });

    loadingText.style.display = 'block';

    if (!videoElement.src) {
        videoElement.src = videoElement.getAttribute('data-src');
    }
    videoElement.load(); 

    ensureMediaReady(jazzAudio, checkMediaReady);
    ensureMediaReady(poesiaAudio, checkMediaReady);
    ensureMediaReady(videoElement, checkMediaReady);

    startButton.style.display = 'none';
});

function stopCurrentTrack() {
    if (jazzAudio) {
        jazzAudio.pause();
        jazzAudio.currentTime = 0; 
    }
    if (poesiaAudio) {
        poesiaAudio.pause();
        poesiaAudio.currentTime = 0; 
    }
    if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0; 
        videoElement.src = ''; 
        videoElement.load(); 
    }

    videoElement.style.display = 'none';
    legendasVideo.style.display = 'none';
}

function playTrack(trackElement) {
    stopCurrentTrack();  

    loadingText.style.display = 'block';

    currentTrack = trackElement;

    jazzAudio = currentTrack.querySelector('.jazz');
    poesiaAudio = currentTrack.querySelector('.poesia');
    videoElement = currentTrack.querySelector('.video');
    legendasVideo = currentTrack.querySelector('.legendas');

    videoElement.src = videoElement.getAttribute('data-src'); 
    videoElement.load();

    ensureMediaReady(jazzAudio, checkMediaReady);
    ensureMediaReady(poesiaAudio, checkMediaReady);
    ensureMediaReady(videoElement, checkMediaReady);
}

function adjustValue(position, start, end) {
    if (position < start) return 0;
    if (position > end) return 1;
    return (position - start) / (end - start);
}

// Função para ajustar a largura ou altura da barra de progresso
function updateProgressBar(progressElement, value, isHorizontal = true) {
    if (isHorizontal) {
        progressElement.style.width = (value * 100) + '%';
    } else {
        progressElement.style.height = (value * 100) + '%';
    }
}

const divTop = document.querySelector('.divTop');
const divRight = document.querySelector('.divRight');
const divLeft = document.querySelector('.divLeft');

const progressJazz = divTop.querySelector('.progress');
const progressVideo = divRight.querySelector('.progress');
const progressPoesia = divLeft.querySelector('.progress');

// Ajuste de volume para o jazz na divTop
divTop.addEventListener('mousemove', (e) => {
    const rect = divTop.getBoundingClientRect();
    const volume = adjustValue(e.clientX, rect.left + 50, rect.right - 50);
    jazzAudio.volume = volume;
    updateProgressBar(progressJazz, volume, true); // Atualiza a largura da barra de progresso
});

// Ajuste de opacidade para o vídeo na divRight
divRight.addEventListener('mousemove', (e) => {
    const rect = divRight.getBoundingClientRect();
    const opacity = adjustValue(e.clientY, rect.top + 50, rect.bottom - 50); 
    videoElement.style.opacity = opacity;
    updateProgressBar(progressVideo, opacity, false); // Atualiza a altura da barra de progresso
});

// Ajuste de volume para a poesia na divLeft (volume invertido)
divLeft.addEventListener('mousemove', (e) => {
    const rect = divLeft.getBoundingClientRect();
    const volume = 1 - adjustValue(e.clientY, rect.top + 50, rect.bottom - 50); // Invertendo o valor
    poesiaAudio.volume = volume;
    updateProgressBar(progressPoesia, volume, false); // Atualiza a altura da barra de progresso
});

faixaElements.forEach(faixa => {
    faixa.addEventListener('click', () => {
        if (!interactionEnabled) return; 

        const trackId = faixa.getAttribute('data-track');
        const trackElement = document.getElementById(trackId);

        playTrack(trackElement); 
    });
});
