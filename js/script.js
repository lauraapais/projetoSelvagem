window.onload = function() {
    const startButton = document.getElementById('startButton');
    const videos = document.querySelectorAll('.video');  
    const legendas = document.querySelectorAll('.legendas');  
    const poesiaAudio = document.querySelector('.poesia');  
    const jazzAudio = document.querySelector('.jazz'); 
    const audios = document.querySelectorAll('audio');
    const divRight = document.querySelector('.divRight');
    const divBottom = document.querySelector('.divBottom');
    const divLeft = document.querySelector('.divLeft');
    const divTop = document.querySelector('.divTop');
    const margin = 50; 
    let isActive = false; 
    let currentTrack = null; // Faixa atual sendo tocada
    let previousTrack = null; // Faixa anterior

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

    const faixas = document.querySelectorAll('.hover-link');
    faixas.forEach(faixa => {
        faixa.addEventListener('click', function() {
            const selectedTrackNumber = this.getAttribute('data-track').replace('faixa', '');
            changeTrack(selectedTrackNumber);
        });
    });

    function changeTrack(trackNumber) {
        // Se houver uma faixa anterior, pausá-la
        if (previousTrack) {
            const previousTrackElement = document.querySelector(`.track${previousTrack}`);
            const previousAudio = previousTrackElement.querySelector('audio');
            const previousVideo = previousTrackElement.querySelector('video');

            if (previousAudio) previousAudio.pause(); // Pausar áudio da faixa anterior
            if (previousVideo) previousVideo.pause(); // Pausar vídeo da faixa anterior
        }

        // Atualiza a faixa atual
        currentTrack = trackNumber;
        showTrack(currentTrack);

        // Reproduz a faixa atual a partir do ponto onde foi pausada
        const currentTrackElement = document.querySelector(`.track${currentTrack}`);
        const currentAudio = currentTrackElement.querySelector('audio');
        const currentVideo = currentTrackElement.querySelector('video');

        if (currentAudio) currentAudio.play(); // Inicia o áudio da nova faixa
        if (currentVideo) currentVideo.play(); // Inicia o vídeo da nova faixa

        // Atualiza a faixa anterior para ser a faixa atual
        previousTrack = currentTrack;
    }

    function updateVideoOpacity(event) {
        if (!isActive) return;

        const rect = divRight.getBoundingClientRect();
        const mouseY = event.clientY - rect.top;
        const divHeight = rect.height;
        const adjustedHeight = divHeight - 2 * margin;

        if (mouseY < margin) {
            videos.forEach(video => video.style.opacity = '0');
        } else if (mouseY > divHeight - margin) {
            videos.forEach(video => video.style.opacity = '1');
        } else {
            const adjustedMouseY = mouseY - margin;
            const opacity = Math.min(1, Math.max(0, adjustedMouseY / adjustedHeight));
            videos.forEach(video => video.style.opacity = opacity.toString());
        }
    }

    function updateLegendasOpacity(event) {
        if (!isActive) return;

        const rect = divBottom.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;  
        const divWidth = rect.width;
        const adjustedWidth = divWidth - 2 * margin;

        if (mouseX < margin) {
            legendas.forEach(legenda => legenda.style.opacity = '0');
        } else if (mouseX > divWidth - margin) {
            legendas.forEach(legenda => legenda.style.opacity = '1');
        } else {
            const adjustedMouseX = mouseX - margin;
            const opacity = Math.min(1, Math.max(0, adjustedMouseX / adjustedWidth));
            legendas.forEach(legenda => legenda.style.opacity = opacity.toString());
        }
    }

    function updatePoesiaVolume(event) {
        if (!isActive) return;

        const rect = divLeft.getBoundingClientRect();
        const mouseY = event.clientY - rect.top;  
        const divHeight = rect.height;
        const adjustedHeight = divHeight - 2 * margin;

        if (mouseY < margin) {
            poesiaAudio.volume = 0;  
        } else if (mouseY > divHeight - margin) {
            poesiaAudio.volume = 1; 
        } else {
            const adjustedMouseY = mouseY - margin;
            const volume = Math.min(1, Math.max(0, adjustedMouseY / adjustedHeight));
            poesiaAudio.volume = volume;  
        }
    }

    function updateJazzVolume(event) {
        if (!isActive) return;

        const rect = divTop.getBoundingClientRect();
        const mouseX = event.clientX - rect.left; 
        const divWidth = rect.width;
        const adjustedWidth = divWidth - 2 * margin;

        if (mouseX < margin) {
            jazzAudio.volume = 0;  
        } else if (mouseX > divWidth - margin) {
            jazzAudio.volume = 1; 
        } else {
            const adjustedMouseX = mouseX - margin;
            const volume = Math.min(1, Math.max(0, adjustedMouseX / adjustedWidth));
            jazzAudio.volume = volume;
        }
    }

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

        audios.forEach(audio => audio.play());

        startButton.style.opacity = '0';

        isActive = true;
    });

    divRight.addEventListener('mousemove', updateVideoOpacity);
    divBottom.addEventListener('mousemove', updateLegendasOpacity);
    divLeft.addEventListener('mousemove', updatePoesiaVolume);
    divTop.addEventListener('mousemove', updateJazzVolume);
};
