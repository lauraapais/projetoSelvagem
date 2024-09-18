const startButton = document.getElementById('startButton');
const faixas = document.querySelectorAll('.faixa');
let selectedTrack = "1";  // Definir faixa 1 como padrão

const hideAllTracks = () => {
    document.querySelectorAll('.track').forEach(track => {
        track.style.display = 'none';
    });
};

// Função para iniciar a reprodução da faixa selecionada
const playTrack = (trackNumber) => {
    const track = document.querySelector(`.track${trackNumber}`);
    if (!track) return;

    const jazzAudio = track.querySelector('.jazz');
    const poesiaAudio = track.querySelector('.poesia');
    const videoElement = track.querySelector('.video');
    const legendasVideo = track.querySelector('.legendas');
    
    videoElement.style.display = 'block';
    legendasVideo.style.display = 'block';

    jazzAudio.play();
    poesiaAudio.play();
    videoElement.play();
    legendasVideo.play();

    videoElement.style.opacity = '1';
    legendasVideo.style.opacity = '1';

    startButton.style.display = 'none';
};

// Adicionando o evento de clique nas faixas para selecionar a faixa correta
faixas.forEach(faixa => {
    faixa.addEventListener('click', (event) => {
        const trackNumber = event.target.getAttribute('data-track').replace('faixa', '');
        selectedTrack = trackNumber;
        
        hideAllTracks(); // Esconder todas as faixas antes de exibir a selecionada
        document.querySelector(`.track${trackNumber}`).style.display = 'block';
    });
});

// Iniciar a reprodução quando o botão Start for clicado
startButton.addEventListener('click', () => {
    if (selectedTrack) {
        playTrack(selectedTrack);
    }
});
