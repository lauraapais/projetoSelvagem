document.addEventListener('DOMContentLoaded', () => {
    const tracks = document.querySelectorAll('.tracks h3');
    let currentTrack = document.getElementById('faixa1');

    tracks.forEach(track => {
        track.addEventListener('click', () => {
            const trackId = track.getAttribute('data-track');
            const newTrack = document.getElementById(trackId);

            if (currentTrack !== newTrack) {
                currentTrack.style.display = 'none';
                newTrack.style.display = 'block';
                currentTrack = newTrack;

                // Update sliders for the new active track
                updateSliders(currentTrack);
            }
        });
    });

    function updateSliders(track) {
        const video = track.querySelector('.video');
        const legendas = track.querySelector('.legendas');
        const poem = track.querySelector('audio');
        const music = track.querySelectorAll('audio')[1];

        const videoSlider = document.getElementById('videoSlider');
        videoSlider.addEventListener('input', () => {
            video.style.opacity = videoSlider.value / 100;
        });

        const legendasSlider = document.getElementById('legendasSlider');
        legendasSlider.addEventListener('input', () => {
            legendas.style.opacity = legendasSlider.value / 100;
        });

        const poemSlider = document.getElementById('poemSlider');
        const gainNodePoem = audioContext.createGain();
        const sourcePoem = audioContext.createMediaElementSource(poem);
        sourcePoem.connect(gainNodePoem);
        gainNodePoem.connect(audioContext.destination);
        gainNodePoem.gain.value = poemSlider.value / 100;
        poemSlider.addEventListener('input', () => {
            gainNodePoem.gain.value = poemSlider.value / 100;
        });

        const musicSlider = document.getElementById('musicSlider');
        const gainNodeMusic = audioContext.createGain();
        const sourceMusic = audioContext.createMediaElementSource(music);
        sourceMusic.connect(gainNodeMusic);
        gainNodeMusic.connect(audioContext.destination);
        gainNodeMusic.gain.value = musicSlider.value / 100;
        musicSlider.addEventListener('input', () => {
            gainNodeMusic.gain.value = musicSlider.value / 100;
        });
    }

    // Initialize sliders for the first track
    updateSliders(currentTrack);
});
