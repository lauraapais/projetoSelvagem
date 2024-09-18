const startButton = document.getElementById('startButton');
let currentTrack = document.querySelector('.track1'); 

let jazzAudio = currentTrack.querySelector('.jazz');
let poesiaAudio = currentTrack.querySelector('.poesia');
let videoElement = currentTrack.querySelector('.video');
let legendasVideo = currentTrack.querySelector('.legendas');

videoElement.style.display = 'none';
legendasVideo.style.display = 'none';

let interactionEnabled = false;

// Função para garantir que o conteúdo de mídia está pronto
function ensureMediaReady(mediaElement, callback) {
    if (mediaElement.readyState >= 3) {  // 3: "canplay", 4: "canplaythrough"
        callback();
    } else {
        mediaElement.addEventListener('canplaythrough', callback, { once: true });
    }
}

startButton.addEventListener('click', () => {
    interactionEnabled = true;

    // Defina a fonte do vídeo da faixa 1 (se necessário)
    if (!videoElement.src) {
        videoElement.src = videoElement.getAttribute('data-src');
    }
    videoElement.load();  // Carrega o vídeo para garantir que ele está pronto

    // Carregar apenas o áudio e o vídeo da faixa 1 ao clicar no start
    ensureMediaReady(jazzAudio, () => jazzAudio.play());
    ensureMediaReady(poesiaAudio, () => poesiaAudio.play());
    ensureMediaReady(videoElement, () => videoElement.play());
    
    videoElement.style.display = 'block';
    videoElement.style.opacity = '1';

    startButton.style.display = 'none';
});

function stopCurrentTrack() {
    if (jazzAudio) jazzAudio.pause();
    if (poesiaAudio) poesiaAudio.pause();
    if (videoElement) {
        videoElement.pause();
        // Remove a fonte do vídeo para liberar memória
        videoElement.src = '';
        videoElement.load();  // Recarrega para reiniciar o estado do vídeo
    }

    videoElement.style.display = 'none';
    legendasVideo.style.display = 'none';
}

function playTrack(trackElement) {
    stopCurrentTrack();  // Para e descarrega a faixa atual

    currentTrack = trackElement;

    jazzAudio = currentTrack.querySelector('.jazz');
    poesiaAudio = currentTrack.querySelector('.poesia');
    videoElement = currentTrack.querySelector('.video');
    legendasVideo = currentTrack.querySelector('.legendas');

    // Defina a fonte do vídeo para carregar o vídeo necessário
    videoElement.src = videoElement.getAttribute('data-src'); // O "data-src" contém o link do vídeo
    videoElement.load(); // Carrega o vídeo para reproduzi-lo

    // Garantir que os elementos de mídia estão prontos antes de reproduzir
    ensureMediaReady(jazzAudio, () => jazzAudio.play());
    ensureMediaReady(poesiaAudio, () => poesiaAudio.play());
    ensureMediaReady(videoElement, () => videoElement.play());

    videoElement.style.display = 'block';
    videoElement.style.opacity = '1';
    legendasVideo.style.display = 'block';
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
