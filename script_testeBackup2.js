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

faixaElements.forEach(faixa => {
    faixa.addEventListener('click', () => {
        if (!interactionEnabled) return; 

        const trackId = faixa.getAttribute('data-track');
        const trackElement = document.getElementById(trackId);

        playTrack(trackElement); 
    });
});


