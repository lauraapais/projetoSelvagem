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

startButton.addEventListener('click', function() {
    videos.forEach(video => video.play());
    poesiaAudio.play();
    jazzAudio.play();
    startButton.style.opacity = '0';
    isActive = true;
});

function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

function initializeProgress() {
    const randomVideoOpacity = getRandomValue(0.8, 1); 
    videos.forEach(video => video.style.opacity = randomVideoOpacity.toString());
    const progressRight = document.getElementById('progressRight');
    progressRight.style.height = `${randomVideoOpacity * 100}%`;

    const randomLegendasOpacity = getRandomValue(0, 1);
    legendas.forEach(legenda => legenda.style.opacity = randomLegendasOpacity.toString());
    const progressBottom = document.getElementById('progressBottom');
    progressBottom.style.width = `${randomLegendasOpacity * 100}%`;

    const randomPoesiaVolume = getRandomValue(0, 1);
    poesiaAudio.volume = randomPoesiaVolume;
    const progressLeft = document.getElementById('progressLeft');
    progressLeft.style.height = `${randomPoesiaVolume * 100}%`;

    const randomJazzVolume = getRandomValue(0, 1);
    jazzAudio.volume = randomJazzVolume;
    const progressTop = document.getElementById('progressTop');
    progressTop.style.width = `${randomJazzVolume * 100}%`;
}

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

function updateOpacity(event, div, items, progress, axis = 'Y') {
    if (!isActive) return;

    const rect = div.getBoundingClientRect();
    const mousePos = axis === 'Y' ? event.clientY - rect.top : event.clientX - rect.left;
    const divSize = axis === 'Y' ? rect.height : rect.width;

    if (mousePos < margin || mousePos > divSize - margin) return;

    const adjustedSize = divSize - 2 * margin;
    const adjustedMousePos = mousePos - margin;
    const opacity = Math.min(1, Math.max(0, adjustedMousePos / adjustedSize));

    items.forEach(item => item.style.opacity = opacity.toString());
    progress.style[axis === 'Y' ? 'height' : 'width'] = `${opacity * 100}%`;

    cursor.style.width = `${2 + opacity * 4}em`;
    cursor.style.height = `${2 + opacity * 4}em`;
}

divRight.addEventListener('mousemove', (e) => updateOpacity(e, divRight, videos, document.getElementById('progressRight')));
divBottom.addEventListener('mousemove', (e) => updateOpacity(e, divBottom, legendas, document.getElementById('progressBottom'), 'X'));
divLeft.addEventListener('mousemove', (e) => updateOpacity(e, divLeft, [poesiaAudio], document.getElementById('progressLeft')));
divTop.addEventListener('mousemove', (e) => updateOpacity(e, divTop, [jazzAudio], document.getElementById('progressTop'), 'X'));

const hoverLinks = document.querySelectorAll('.hover-link');
hoverLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => cursor.classList.add("active"));
    link.addEventListener('mouseleave', () => cursor.classList.remove("active"));
});
