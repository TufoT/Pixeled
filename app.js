let grid = document.querySelector('.grid'),
    sizeText = document.querySelector('.size-text'),
    sizeInput = document.querySelector('.canvas-size'),
    colorInput = document.querySelector('.color'),
    bgInput = document.querySelector('.bg-color'),
    drawBtn = document.querySelector('.draw'),
    eraseBtn = document.querySelector('.erase'),
    clearBtn = document.querySelector('.clear');

let startErase = false;
let draw = false;
drawBtn.classList.add('pressed');

const updateSize = () => {
    let e = sizeInput.value;
    sizeText.innerText = `${e} x ${e}`;
    createCanvas(e);
};

const createCanvas = (e) => {
    grid.style.setProperty('--size', e);
    grid.innerHTML = '';
    for (let i = 0; i < e * e; i++) {
        let gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        gridItem.addEventListener('mouseover', startDrawing);
        gridItem.addEventListener('mousedown', () => {
            if (startErase) {
                gridItem.style.backgroundColor = 'white';
            } else {
                gridItem.style.backgroundColor = colorInput.value;
            }
        });
        grid.appendChild(gridItem);
    }     
};

const startDrawing = (event) => {
    if(!draw) return
    if (startErase) {
        event.target.style.backgroundColor = 'white';
    } else {
        event.target.style.backgroundColor = colorInput.value;
    }
};

const changeBackground = () => {
    let background = document.querySelectorAll('.grid-item');
    for (let i = 0; i < background.length; i++){
        background[i].style.backgroundColor = bgInput.value;
    }
    

    console.log(bgInput);
}

window.addEventListener('mousedown', () => {
    draw = true;
})

window.addEventListener('mouseup', () => {
    draw = false;
})

clearBtn.addEventListener('click', () => {
    createCanvas(sizeInput.value);
});

eraseBtn.addEventListener('click', () => {
    startErase = true;
    eraseBtn.classList.add('pressed');
    drawBtn.classList.remove('pressed');
});

drawBtn.addEventListener('click', () => {
    startErase = false;
    drawBtn.classList.add('pressed');
    eraseBtn.classList.remove('pressed');
});

bgInput.addEventListener('input', changeBackground);

sizeInput.addEventListener('input', updateSize);

createCanvas(sizeInput.value);