
    const startButton = document.getElementById('startButton');
    const jazzAudio = document.querySelector('.track1 .jazz');
    const poesiaAudio = document.querySelector('.track1 .poesia');
    const videoElement = document.querySelector('.track1 .video');
    const legendasVideo = document.querySelector('.track1 .legendas');

    let interactionEnabled = false;

    videoElement.style.display = 'none';
    legendasVideo.style.display = 'none';

    startButton.addEventListener('click', function() {
        interactionEnabled = true;

        jazzAudio.play();
        poesiaAudio.play();
        videoElement.play();
        legendasVideo.play();

        videoElement.style.display = 'block';
        legendasVideo.style.display = 'block';

        startButton.style.display = 'none';
    });

    