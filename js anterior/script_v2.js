document.addEventListener('DOMContentLoaded', function() {
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

    function mapToRange(value, minInput, maxInput, minOutput, maxOutput) {
        return ((value - minInput) * (maxOutput - minOutput)) / (maxInput - minInput) + minOutput;
    }

    document.querySelector('.divTop').addEventListener('mousemove', function(event) {
        if (!interactionEnabled) return;

        const rect = this.getBoundingClientRect();
        const margin = 50;
        const x = event.clientX - rect.left;
        const width = rect.width - margin * 2;

        if (x >= margin && x <= width + margin) {
            const volume = mapToRange(x, margin, width + margin, 0, 1);
            jazzAudio.volume = volume;
        }
    });

    document.querySelector('.divLeft').addEventListener('mousemove', function(event) {
        if (!interactionEnabled) return;

        const rect = this.getBoundingClientRect();
        const margin = 50;
        const y = event.clientY - rect.top; 
        const height = rect.height - margin * 2;

        if (y >= margin && y <= height + margin) {
            const volume = mapToRange(y, margin, height + margin, 0, 1);
            poesiaAudio.volume = volume;
        }
    });

    videoElement.style.opacity = 1; 

    document.querySelector('.divRight').addEventListener('mousemove', function(event) {
        if (!interactionEnabled) return;

        const rect = this.getBoundingClientRect();
        const margin = 50;
        const y = event.clientY - rect.top; 
        const height = rect.height - margin * 2;

        if (y >= margin && y <= height + margin) {
            const opacity = mapToRange(y, margin, height + margin, 0, 1);
            videoElement.style.opacity = opacity;
        }
    });

    legendasVideo.style.opacity = 1;

    document.querySelector('.divBottom').addEventListener('mousemove', function(event) {
        if (!interactionEnabled) return;

        const rect = this.getBoundingClientRect();
        const margin = 50;
        const x = event.clientX - rect.left; 
        const width = rect.width - margin * 2;

        if (x >= margin && x <= width + margin) {
            const opacity = mapToRange(x, margin, width + margin, 0, 1);
            legendasVideo.style.opacity = opacity;
        }
    });

    const faixas = document.querySelectorAll('.faixas p');
    faixas.forEach(faixa => {
        faixa.addEventListener('click', function() {
            const trackClass = this.getAttribute('data-track');
            
            document.querySelectorAll('.track > div').forEach(track => {
                track.style.display = 'none';
            });
            document.querySelector('.' + trackClass).style.display = 'block';

            document.querySelectorAll('audio, video').forEach(media => {
                media.pause();
                media.currentTime = 0;
            });

            const selectedTrack = document.querySelector('.' + trackClass);
            const selectedJazz = selectedTrack.querySelector('.jazz');
            const selectedPoesia = selectedTrack.querySelector('.poesia');
            const selectedVideo = selectedTrack.querySelector('.video');
            const selectedLegendas = selectedTrack.querySelector('.legendas');

            selectedJazz.play();
            selectedPoesia.play();
            selectedVideo.play();
            selectedLegendas.play();
        });
    });
});