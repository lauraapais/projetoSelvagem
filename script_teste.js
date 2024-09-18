/*const startButton = document.getElementById('startButton');
const mediaTracks = document.querySelectorAll('.mediaTrack'); 
let currentTrack = document.querySelector('.track1'); 

let jazzAudio = currentTrack.querySelector('.jazz');
let poesiaAudio = currentTrack.querySelector('.poesia');
let videoElement = currentTrack.querySelector('.video');
let legendasVideo = currentTrack.querySelector('.legendas');

videoElement.style.display = 'none';
legendasVideo.style.display = 'none';

let interactionEnabled = false;

startButton.addEventListener('click', () => {
    interactionEnabled = true;

    jazzAudio.play();
    poesiaAudio.play();
    videoElement.play();
    
    videoElement.style.display = 'block';
    videoElement.style.opacity = '1';

    startButton.style.display = 'none';
});

function stopCurrentTrack() {
    if (jazzAudio) jazzAudio.pause();
    if (poesiaAudio) poesiaAudio.pause();
    if (videoElement) videoElement.pause();

    videoElement.style.display = 'none';
    legendasVideo.style.display = 'none';
}

function playTrack(trackElement) {
    stopCurrentTrack(); 

    currentTrack = trackElement;

    jazzAudio = currentTrack.querySelector('.jazz');
    poesiaAudio = currentTrack.querySelector('.poesia');
    videoElement = currentTrack.querySelector('.video');
    legendasVideo = currentTrack.querySelector('.legendas');

   
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

        if (!trackElement) {
            console.error('Faixa não encontrada:', trackId); 
            return;
        }

        playTrack(trackElement); 
    });
});*/


const startButton = document.getElementById('startButton');
const mediaTracks = document.querySelectorAll('.mediaTrack'); 
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
    if (videoElement) videoElement.pause();

    videoElement.style.display = 'none';
    legendasVideo.style.display = 'none';
}

function playTrack(trackElement) {
    stopCurrentTrack(); 

    currentTrack = trackElement;

    jazzAudio = currentTrack.querySelector('.jazz');
    poesiaAudio = currentTrack.querySelector('.poesia');
    videoElement = currentTrack.querySelector('.video');
    legendasVideo = currentTrack.querySelector('.legendas');

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
