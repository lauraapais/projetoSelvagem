const startButton = document.getElementById('startButton');
const mediaTracks = document.querySelectorAll('.mediaTrack'); // Todas as faixas
let currentTrack = document.querySelector('.track1'); // Faixa atual iniciada com faixa 1

// Elementos da faixa 1
let jazzAudio = currentTrack.querySelector('.jazz');
let poesiaAudio = currentTrack.querySelector('.poesia');
let videoElement = currentTrack.querySelector('.video');
let legendasVideo = currentTrack.querySelector('.legendas');

videoElement.style.display = 'none';
legendasVideo.style.display = 'none';

let interactionEnabled = false;

// Função para iniciar a primeira faixa
startButton.addEventListener('click', () => {
    interactionEnabled = true;

    jazzAudio.play();
    poesiaAudio.play();
    videoElement.play();
    
    videoElement.style.display = 'block';
    videoElement.style.opacity = '1';

    startButton.style.display = 'none';
});

// Função para parar a faixa atual
function stopCurrentTrack() {
    if (jazzAudio) jazzAudio.pause();
    if (poesiaAudio) poesiaAudio.pause();
    if (videoElement) videoElement.pause();

    videoElement.style.display = 'none';
    legendasVideo.style.display = 'none';
}

// Função para tocar uma nova faixa
function playTrack(trackElement) {
    stopCurrentTrack(); // Parar a faixa anterior

    // Atualizar para a nova faixa
    currentTrack = trackElement;

    // Pegar os novos elementos de áudio e vídeo da nova faixa
    jazzAudio = currentTrack.querySelector('.jazz');
    poesiaAudio = currentTrack.querySelector('.poesia');
    videoElement = currentTrack.querySelector('.video');
    legendasVideo = currentTrack.querySelector('.legendas');

    // Tocar a nova faixa
    jazzAudio.play();
    poesiaAudio.play();
    videoElement.play();

    videoElement.style.display = 'block';
    videoElement.style.opacity = '1';
    legendasVideo.style.display = 'block';
}

const faixaElements = document.querySelectorAll('.faixa');
faixaElements.forEach(faixa => {
    faixa.addEventListener('click', () => {
        const trackId = faixa.getAttribute('data-track');
        const trackElement = document.getElementById(trackId);

        // Verifica se o elemento da faixa foi encontrado
        if (!trackElement) {
            console.error('Faixa não encontrada:', trackId); // Mostra um erro no console
            return;
        }

        playTrack(trackElement); // Reproduz a faixa se encontrada
    });
});