const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
});

const hoverLinks = document.querySelectorAll('.hover-link');

hoverLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add("active");
    });

    link.addEventListener('mouseleave', () => {
        cursor.classList.remove("active");
    });
});

let locoScroll;

function initLocomotiveScroll() {
    if (locoScroll) {
        locoScroll.destroy(); // Destroy the existing instance
    }

    locoScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        mobile: {
            smooth: true,
            breakpoint: 0
        },
        tablet: {
            smooth: true,
            breakpoint: 0
        }
    });
    
    new ResizeObserver(() => locoScroll.update()).observe(
        document.querySelector("[data-scroll-container]")
    );
}

window.addEventListener("load", initLocomotiveScroll);