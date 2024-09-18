const startButton = document.getElementById('startButton');
let currentTrack = document.querySelector('.track1'); 

let jazzAudio = currentTrack.querySelector('.jazz');
let poesiaAudio = currentTrack.querySelector('.poesia');
let videoElement = currentTrack.querySelector('.video');
let legendasVideo = currentTrack.querySelector('.legendas');

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
    if (jazzAudio) jazzAudio.pause();
    if (poesiaAudio) poesiaAudio.pause();
    if (videoElement) {
        videoElement.pause();
        videoElement.src = '';
        videoElement.load(); 
    }

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

    videoElement.src = videoElement.getAttribute('data-src'); 
    videoElement.load();

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
