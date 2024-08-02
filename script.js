document.addEventListener('DOMContentLoaded', () => {
    const tracks = document.querySelectorAll('.tracks h3');
    let currentTrack = document.getElementById('faixa1');

    // Initializing AudioContext and GainNodes
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const gainNodePoem = audioContext.createGain();
    const gainNodeMusic = audioContext.createGain();

    function updateSliders(track) {
        const video = track.querySelector('.video');
        const legendas = track.querySelector('.legendas');
        const poem = track.querySelector('.poem');
        const music = track.querySelector('.music');

        // Update Video Slider
        const videoSlider = document.getElementById('videoSlider');
        videoSlider.value = video.style.opacity * 100 || 100;
        video.style.opacity = videoSlider.value / 100;
        videoSlider.oninput = () => video.style.opacity = videoSlider.value / 100;

        // Update Legendas Slider
        const legendasSlider = document.getElementById('legendasSlider');
        legendasSlider.value = legendas.style.opacity * 100 || 100;
        legendas.style.opacity = legendasSlider.value / 100;
        legendasSlider.oninput = () => legendas.style.opacity = legendasSlider.value / 100;

        // Update Poem Slider
        const poemSlider = document.getElementById('poemSlider');
        const sourcePoem = audioContext.createMediaElementSource(poem);
        sourcePoem.connect(gainNodePoem).connect(audioContext.destination);
        gainNodePoem.gain.value = poemSlider.value / 100;
        poemSlider.oninput = () => gainNodePoem.gain.value = poemSlider.value / 100;

        // Update Music Slider
        const musicSlider = document.getElementById('musicSlider');
        const sourceMusic = audioContext.createMediaElementSource(music);
        sourceMusic.connect(gainNodeMusic).connect(audioContext.destination);
        gainNodeMusic.gain.value = musicSlider.value / 100;
        musicSlider.oninput = () => gainNodeMusic.gain.value = musicSlider.value / 100;
    }

    tracks.forEach(track => {
        track.addEventListener('click', () => {
            const trackId = track.getAttribute('data-track');
            const newTrack = document.getElementById(trackId);

            if (currentTrack !== newTrack) {
                currentTrack.style.display = 'none';
                newTrack.style.display = 'block';
                currentTrack = newTrack;
                updateSliders(currentTrack);
            }
        });
    });

    // Initialize sliders for the first track
    updateSliders(currentTrack);
});