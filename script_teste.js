const startButton = document.getElementById('startButton');
const jazzAudio = document.querySelector('.track1 .jazz');
const poesiaAudio = document.querySelector('.track1 .poesia');
const videoElement = document.querySelector('.track1 .video');
const legendasVideo = document.querySelector('.track1 .legendas');

videoElement.style.display = legendasVideo.style.display = 'none';

startButton.addEventListener('click', () => {
    [jazzAudio, poesiaAudio, videoElement, legendasVideo].forEach(el => el.play());
    
    videoElement.style.display = legendasVideo.style.display = 'block';
    videoElement.style.opacity = legendasVideo.style.opacity = '1';
    
    startButton.style.display = 'none';
});