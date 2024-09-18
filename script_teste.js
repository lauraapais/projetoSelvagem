const startButton = document.getElementById('startButton');
let currentTrack = document.querySelector('.track1'); 

let jazzAudio = currentTrack.querySelector('.jazz');
let poesiaAudio = currentTrack.querySelector('.poesia');
let videoElement = currentTrack.querySelector('.video');
let legendasVideo = currentTrack.querySelector('.legendas');

// Selecionar o elemento de loading
const loadingText = document.getElementById('loadingText');

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

startButton.addEventListener('click', () => {
    interactionEnabled = true;

    if (!videoElement.src) {
        videoElement.src = videoElement.getAttribute('data-src');
    }
    videoElement.load(); 

    ensureMediaReady(jazzAudio, () => jazzAudio.play());
    ensureMediaReady(poesiaAudio, () => poesiaAudio.play());
    ensureMediaReady(videoElement, () => videoElement.play());
    
    videoElement.style.display = 'block';
    videoElement.style.opacity = '1';

    startButton.style.display = 'none';
});

function stopCurrentTrack() {
    if (jazzAudio) {
        jazzAudio.pause();
        jazzAudio.currentTime = 0; // Reinicia o áudio
    }
    if (poesiaAudio) {
        poesiaAudio.pause();
        poesiaAudio.currentTime = 0; // Reinicia o áudio
    }
    if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0; // Reinicia o vídeo
        videoElement.src = ''; // Limpa o src para garantir que o vídeo será recarregado
        videoElement.load(); 
    }

    videoElement.style.display = 'none';
    legendasVideo.style.display = 'none';
}

// Função para mostrar o loading
function showLoading() {
    loadingText.style.display = 'block';
}

// Função para ocultar o loading
function hideLoading() {
    loadingText.style.display = 'none';
}

function playTrack(trackElement) {
    stopCurrentTrack();  
    
    // Mostrar o texto de loading
    showLoading();

    currentTrack = trackElement;

    jazzAudio = currentTrack.querySelector('.jazz');
    poesiaAudio = currentTrack.querySelector('.poesia');
    videoElement = currentTrack.querySelector('.video');
    legendasVideo = currentTrack.querySelector('.legendas');

    videoElement.src = videoElement.getAttribute('data-src'); 
    videoElement.load();

    // Se houver problema no carregamento, mostrar loading novamente
    videoElement.addEventListener('waiting', showLoading);
    
    // Quando o vídeo começar a tocar, ocultar o loading
    videoElement.addEventListener('playing', hideLoading);

    // Se o vídeo carregar normalmente, esconder o loading
    ensureMediaReady(jazzAudio, () => jazzAudio.play());
    ensureMediaReady(poesiaAudio, () => poesiaAudio.play());

    ensureMediaReady(videoElement, () => {
        videoElement.play();
        videoElement.style.display = 'block';
        videoElement.style.opacity = '1';
        legendasVideo.style.display = 'block';

        // Ocultar o texto de loading assim que o vídeo estiver pronto
        hideLoading();
    });
}

const faixaElements = document.querySelectorAll('.faixa');
faixaElements.forEach(faixa => {
    faixa.addEventListener('click', () => {
        const trackId = faixa.getAttribute('data-track');
        const trackElement = document.getElementById(trackId);

        if (!trackElement) {
            console.error('Faixa não encontrada:', trackId); 
            return;
        }

        playTrack(trackElement); 
    });
});
