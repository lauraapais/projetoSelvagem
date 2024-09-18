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

// Função para verificar se todas as mídias estão prontas
function checkMediaReady() {
    if (jazzAudio.readyState >= 3 && poesiaAudio.readyState >= 3 && videoElement.readyState >= 3) {
        // Ocultar o texto de loading quando áudio e vídeo estiverem prontos
        loadingText.style.display = 'none';
    }
}

startButton.addEventListener('click', () => {
    interactionEnabled = true;

    // Mostrar o texto de loading antes de carregar as mídias na primeira interação
    loadingText.style.display = 'block';

    // Carregar os vídeos e áudios
    if (!videoElement.src) {
        videoElement.src = videoElement.getAttribute('data-src');
    }
    videoElement.load(); 

    // Garantir que o áudio jazz está pronto
    ensureMediaReady(jazzAudio, () => {
        jazzAudio.play();
        checkMediaReady(); // Verificar se tudo está pronto para esconder o loading
    });

    // Garantir que o áudio poesia está pronto
    ensureMediaReady(poesiaAudio, () => {
        poesiaAudio.play();
        checkMediaReady(); // Verificar se tudo está pronto para esconder o loading
    });

    // Garantir que o vídeo está pronto
    ensureMediaReady(videoElement, () => {
        videoElement.play();
        videoElement.style.display = 'block';
        videoElement.style.opacity = '1';
        legendasVideo.style.display = 'block';
        checkMediaReady(); // Verificar se tudo está pronto para esconder o loading
    });

    // Esconder o botão de início após a primeira interação
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

function playTrack(trackElement) {
    stopCurrentTrack();  

    // Mostrar o texto de loading ao trocar de faixa
    loadingText.style.display = 'block';

    currentTrack = trackElement;

    jazzAudio = currentTrack.querySelector('.jazz');
    poesiaAudio = currentTrack.querySelector('.poesia');
    videoElement = currentTrack.querySelector('.video');
    legendasVideo = currentTrack.querySelector('.legendas');

    videoElement.src = videoElement.getAttribute('data-src'); 
    videoElement.load();

    ensureMediaReady(jazzAudio, () => {
        jazzAudio.play();
        checkMediaReady(); // Verificar se tudo está pronto para esconder o loading
    });

    ensureMediaReady(poesiaAudio, () => {
        poesiaAudio.play();
        checkMediaReady(); // Verificar se tudo está pronto para esconder o loading
    });

    ensureMediaReady(videoElement, () => {
        videoElement.play();
        videoElement.style.display = 'block';
        videoElement.style.opacity = '1';
        legendasVideo.style.display = 'block';
        checkMediaReady(); // Verificar se tudo está pronto para esconder o loading
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
