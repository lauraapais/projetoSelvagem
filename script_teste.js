const startButton = document.getElementById('startButton');
const mediaTracks = document.querySelectorAll('.mediaTrack'); 
let currentTrack = document.querySelector('.track1'); 

let jazzAudio = currentTrack.querySelector('.jazz');
let poesiaAudio = currentTrack.querySelector('.poesia');
let videoElement = currentTrack.querySelector('.video');
let legendasVideo = currentTrack.querySelector('.legendas');

// Escondemos os vídeos e legendas inicialmente
videoElement.style.display = 'none';
legendasVideo.style.display = 'none';

let interactionEnabled = false;

startButton.addEventListener('click', () => {
    interactionEnabled = true;

    // Inicia a reprodução da faixa inicial
    playCurrentTrack();
    
    startButton.style.display = 'none'; // Esconde o botão de início
});

// Função para reproduzir a faixa atual
function playCurrentTrack() {
    if (interactionEnabled) {
        jazzAudio.play();
        poesiaAudio.play();
        videoElement.play();

        // Exibe os vídeos
        videoElement.style.display = 'block';
        videoElement.style.opacity = '1';
        legendasVideo.style.display = 'block';
    }
}

// Função para parar a faixa atual e pausar todas as faixas
function stopCurrentTrack() {
    // Para todos os vídeos e áudios de todas as faixas
    mediaTracks.forEach(track => {
        const jazz = track.querySelector('.jazz');
        const poesia = track.querySelector('.poesia');
        const video = track.querySelector('.video');
        const legendas = track.querySelector('.legendas');

        if (jazz) jazz.pause();
        if (poesia) poesia.pause();
        if (video) video.pause();

        // Esconde os vídeos e legendas de todas as faixas
        if (video) video.style.display = 'none';
        if (legendas) legendas.style.display = 'none';
    });
}

// Função para alternar entre as faixas
function playTrack(trackElement) {
    stopCurrentTrack(); // Pausa todas as faixas antes de iniciar a nova

    currentTrack = trackElement;

    // Atualiza os elementos da nova faixa
    jazzAudio = currentTrack.querySelector('.jazz');
    poesiaAudio = currentTrack.querySelector('.poesia');
    videoElement = currentTrack.querySelector('.video');
    legendasVideo = currentTrack.querySelector('.legendas');

    playCurrentTrack(); // Reproduz a nova faixa
}

// Adiciona event listeners para cada faixa
const faixaElements = document.querySelectorAll('.faixa');
faixaElements.forEach(faixa => {
    faixa.addEventListener('click', () => {
        const trackId = faixa.getAttribute('data-track');
        const trackElement = document.getElementById(trackId);

        if (!trackElement) {
            console.error('Faixa não encontrada:', trackId); 
            return;
        }

        playTrack(trackElement); // Reproduz a faixa selecionada
    });
});
