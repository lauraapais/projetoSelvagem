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

// Função para definir progresso inicial
function setInitialProgress() {
    jazzAudio.volume = 0.7; // 70% do volume inicial do Jazz
    poesiaAudio.volume = 0.5; // 50% do volume inicial da Poesia
    videoElement.style.opacity = 1.0; // 100% de opacidade no início

    updateProgressBar(progressJazz, 0.7, true); // Atualiza a barra de progresso inicial do Jazz
    updateProgressBar(progressPoesia, 0.5, false); // Atualiza a barra de progresso inicial da Poesia
    updateProgressBar(progressVideo, 1.0, false); // Atualiza a barra de progresso inicial do Vídeo
}

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

        setInitialProgress(); // Aplica o progresso inicial
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

// Função para manipular eventos de toque no telemóvel
function handleTouchMove(event, progressElement, adjustFunction, isHorizontal = true) {
    const touch = event.touches[0];
    const rect = progressElement.getBoundingClientRect();
    
    if (isHorizontal) {
        const value = adjustValue(touch.clientX, rect.left + 50, rect.right - 50);
        adjustFunction(value);
    } else {
        const value = adjustValue(touch.clientY, rect.top + 50, rect.bottom - 50);
        adjustFunction(value);
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

divTop.addEventListener('touchmove', (e) => {
    handleTouchMove(e, divTop, (volume) => {
        jazzAudio.volume = volume;
        updateProgressBar(progressJazz, volume, true);
    }, true);
});

// Ajuste de opacidade para o vídeo na divRight
divRight.addEventListener('mousemove', (e) => {
    const rect = divRight.getBoundingClientRect();
    const opacity = adjustValue(e.clientY, rect.top + 50, rect.bottom - 50); 
    videoElement.style.opacity = opacity;
    updateProgressBar(progressVideo, opacity, false); // Atualiza a altura da barra de progresso
});

divRight.addEventListener('touchmove', (e) => {
    handleTouchMove(e, divRight, (opacity) => {
        videoElement.style.opacity = opacity;
        updateProgressBar(progressVideo, opacity, false);
    }, false);
});

// Ajuste de volume para a poesia na divLeft (volume invertido)
divLeft.addEventListener('mousemove', (e) => {
    const rect = divLeft.getBoundingClientRect();
    const volume = 1 - adjustValue(e.clientY, rect.top + 50, rect.bottom - 50); // Invertendo o valor
    poesiaAudio.volume = volume;
    updateProgressBar(progressPoesia, volume, false); // Atualiza a altura da barra de progresso
});

divLeft.addEventListener('touchmove', (e) => {
    handleTouchMove(e, divLeft, (volume) => {
        volume = 1 - volume; // Volume invertido
        poesiaAudio.volume = volume;
        updateProgressBar(progressPoesia, volume, false);
    }, false);
});

faixaElements.forEach(faixa => {
    faixa.addEventListener('click', () => {
        if (!interactionEnabled) return; 

        const trackId = faixa.getAttribute('data-track');
        const trackElement = document.getElementById(trackId);

        playTrack(trackElement); 
    });
});
