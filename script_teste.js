const startButton = document.getElementById('startButton');
const jazzAudio = document.querySelector('.track1 .jazz');
const poesiaAudio = document.querySelector('.track1 .poesia');
const videoElement = document.querySelector('.track1 .video');
const legendasVideo = document.querySelector('.track1 .legendas');

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