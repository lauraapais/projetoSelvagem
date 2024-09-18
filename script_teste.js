const startButton = document.getElementById('startButton');
const videos = document.querySelectorAll('.video');  
const legendas = document.querySelectorAll('.legendas');  
const poesiaAudio = document.querySelector('.poesia');  
const jazzAudio = document.querySelector('.jazz'); 
const divRight = document.querySelector('.divRight');
const divBottom = document.querySelector('.divBottom');
const divLeft = document.querySelector('.divLeft');
const divTop = document.querySelector('.divTop');
const cursor = document.getElementById("cursor"); 

const margin = 50; 
let isActive = false; 
let currentTrack = null;
let previousTrack = null;


startButton.addEventListener('click', function() {
    videos.forEach(video => {
        video.play();
    });
    poesiaAudio.play();
    jazzAudio.play();
});

function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

function initializeProgress() {
    const randomVideoOpacity = getRandomValue(0.8, 1); 
    videos.forEach(video => {
        video.style.opacity = randomVideoOpacity.toString();  
        if (randomVideoOpacity > 0) {
            video.play();
        } else {
            video.pause();
        }
    });
    const progressRight = document.getElementById('progressRight');
    progressRight.style.height = `${randomVideoOpacity * 100}%`;

    const randomLegendasOpacity = getRandomValue(0, 1);
    legendas.forEach(legenda => {
        legenda.style.opacity = randomLegendasOpacity.toString();  
        if (randomLegendasOpacity > 0) {
            legenda.play();
        } else {
            legenda.pause();
        }
    });
    const progressBottom = document.getElementById('progressBottom');
    progressBottom.style.width = `${randomLegendasOpacity * 100}%`;

    const randomPoesiaVolume = getRandomValue(0, 1);
    poesiaAudio.volume = randomPoesiaVolume; 
    if (randomPoesiaVolume > 0) {
        poesiaAudio.play();
    } else {
        poesiaAudio.pause();
    }
    const progressLeft = document.getElementById('progressLeft');
    progressLeft.style.height = `${randomPoesiaVolume * 100}%`;

    const randomJazzVolume = getRandomValue(0, 1);
    jazzAudio.volume = randomJazzVolume;
    if (randomJazzVolume > 0) {
        jazzAudio.play();
    } else {
        jazzAudio.pause();
    }
    const progressTop = document.getElementById('progressTop');
    progressTop.style.width = `${randomJazzVolume * 100}%`;
}

document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
});

startButton.addEventListener('click', function() {
    if (currentTrack === null) {
        currentTrack = 1;
    }
    showTrack(currentTrack);

    videos.forEach(video => {
        video.style.opacity = '1';
        video.play();
    });

    legendas.forEach(legenda => {
        legenda.style.opacity = '1';
        legenda.play();
    });

    poesiaAudio.play();
    jazzAudio.play();

    startButton.style.opacity = '0';
    isActive = true;

    initializeProgress();
});

function hideAllTracks() {
    for (let i = 1; i <= 8; i++) {
        const track = document.querySelector(`.track${i}`);
        if (track) track.style.display = 'none';
    }
}

function showTrack(trackNumber) {
    hideAllTracks();
    const selectedTrack = document.querySelector(`.track${trackNumber}`);
    if (selectedTrack) selectedTrack.style.display = 'block';
}

const faixas = document.querySelectorAll('.faixa');
faixas.forEach(faixa => {
    faixa.addEventListener('click', function() {
        const selectedTrackNumber = this.getAttribute('data-track').replace('faixa', '');
        changeTrack(selectedTrackNumber);
    });
});

function changeTrack(trackNumber) {
    if (currentTrack === 1 && previousTrack === null) {
        if (poesiaAudio) poesiaAudio.pause();
        if (jazzAudio) jazzAudio.pause();
    }

    if (previousTrack) {
        const previousTrackElement = document.querySelector(`.track${previousTrack}`);
        const previousAudioPoesia = previousTrackElement.querySelector('.poesia');
        const previousAudioJazz = previousTrackElement.querySelector('.jazz');
        const previousVideo = previousTrackElement.querySelector('video');

        if (previousAudioPoesia) previousAudioPoesia.pause(); 
        if (previousAudioJazz) previousAudioJazz.pause(); 
        if (previousVideo) previousVideo.pause(); 
    }

    currentTrack = trackNumber;
    showTrack(currentTrack);

    const currentTrackElement = document.querySelector(`.track${currentTrack}`);
    const currentAudioPoesia = currentTrackElement.querySelector('.poesia');
    const currentAudioJazz = currentTrackElement.querySelector('.jazz');
    const currentVideo = currentTrackElement.querySelector('video');

    if (currentAudioPoesia) {
        const poesiaProgressValue = parseFloat(document.getElementById('progressLeft').style.height) / 100;
        currentAudioPoesia.volume = poesiaProgressValue || 0;
        currentAudioPoesia.play();
    }
    if (currentAudioJazz) {
        const jazzProgressValue = parseFloat(document.getElementById('progressTop').style.width) / 100;
        currentAudioJazz.volume = jazzProgressValue || 0;
        currentAudioJazz.play();
    }
    if (currentVideo) currentVideo.play(); 

    previousTrack = currentTrack;
}




const hoverLinks = document.querySelectorAll('.hover-link');

hoverLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add("active");
    });

    link.addEventListener('mouseleave', () => {
        cursor.classList.remove("active");
    });
});



