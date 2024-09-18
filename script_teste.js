const startButton = document.getElementById('startButton');
const mediaTracks = document.querySelectorAll('.mediaTrack'); 
let currentTrack = document.querySelector('.track1'); 

let jazzAudio = currentTrack.querySelector('.jazz');
let poesiaAudio = currentTrack.querySelector('.poesia');
let videoElement = currentTrack.querySelector('.video');
let legendasVideo = currentTrack.querySelector('.legendas');

// Escondemos os elementos de vídeo e legendas inicialmente
videoElement.style.display = 'none';
legendasVideo.style.display = 'none';

let interactionEnabled = false;

startButton.addEventListener('click', () => {
    interactionEnabled = true;

    // Inicia a reprodução da faixa inicial
    playCurrentTrack();
    
    startButton.style.display = 'none'; // Esconde o botão de início após o clique
});

// Função para reproduzir a faixa atual
function playCurrentTrack() {
    if (interactionEnabled) { // Garante que o usuário já tenha interagido
        jazzAudio.play();
        poesiaAudio.play();
        videoElement.play();

        // Exibe os vídeos
        videoElement.style.display = 'block';
        videoElement.style.opacity = '1';
        legendasVideo.style.display = 'block';
    }
}

// Função para parar a faixa atual
function stopCurrentTrack() {
    if (jazzAudio) jazzAudio.pause();
    if (poesiaAudio) poesiaAudio.pause();
    if (videoElement) videoElement.pause();

    // Esconde os vídeos ao parar a faixa
    videoElement.style.display = 'none';
    legendasVideo.style.display = 'none';
}

// Função para alternar entre as faixas
function playTrack(trackElement) {
    stopCurrentTrack(); // Para a faixa atual antes de iniciar a nova

    currentTrack = trackElement;

    // Atualiza os elementos da nova faixa
    jazzAudio = currentTrack.querySelector('.jazz');
    poesiaAudio = currentTrack.querySelector('.poesia');
    videoElement = currentTrack.querySelector('.video');
    legendasVideo = currentTrack.querySelector('.legendas');

    playCurrentTrack(); // Reproduz a nova faixa
}

// Adiciona os event listeners a cada faixa
const faixaElements = document.querySelectorAll('.faixa');
faixaElements.forEach(faixa => {
    faixa.addEventListener('click', () => {
        const trackId = faixa.getAttribute('data-track');
        const trackElement = document.getElementById(trackId);

        if (!trackElement) {
            console.error('Faixa não encontrada:', trackId); 
            return;
        }

        playTrack(trackElement); // Reproduz a nova faixa quando o usuário clicar
    });
});
