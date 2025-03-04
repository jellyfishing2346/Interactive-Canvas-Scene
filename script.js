const canvas = document.getElementById('sceneCanvas');
const ctx = canvas.getContext('2d');

// Load images and sounds
const backgrounds = {
    sky: 'images/sky.jpg',
    forest: 'images/forest.jpg',
    desert: 'images/desert.jpg'
};

const characterImage = new Image();
characterImage.src = 'images/character.png';
characterImage.onerror = () => {
    console.error('Failed to load character image. Path:', characterImage.src);
};

const items = {
    item1: { image: new Image(), visible: false },
    item2: { image: new Image(), visible: false },
    item3: { image: new Image(), visible: false }
};

items.item1.image.src = 'images/item1.png';
items.item1.image.onerror = () => {
    console.error('Failed to load item1 image');
};

items.item2.image.src = 'images/item2.png';
items.item2.image.onerror = () => {
    console.error('Failed to load item2 image');
};

items.item3.image.src = 'images/item3.png';
items.item3.image.onerror = () => {
    console.error('Failed to load item3 image');
};

const sounds = {
    sound1: new Audio('sounds/sound1.mp3'),
    sound2: new Audio('sounds/sound2.mp3'),
    sound3: new Audio('sounds/sound3.mp3')
};

// Initial state
let currentBackground = 'sky';
let characterX = 250;
let characterY = 250;

// Event listeners for form inputs
document.querySelectorAll('input[name="background"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        currentBackground = e.target.value;
        drawScene();
    });
});

document.getElementById('xSlider').addEventListener('input', (e) => {
    characterX = parseInt(e.target.value);
    drawScene();
});

document.getElementById('ySlider').addEventListener('input', (e) => {
    characterY = parseInt(e.target.value);
    drawScene();
});

document.getElementById('item1').addEventListener('change', (e) => {
    items.item1.visible = e.target.checked;
    drawScene();
});

document.getElementById('item2').addEventListener('change', (e) => {
    items.item2.visible = e.target.checked;
    drawScene();
});

document.getElementById('item3').addEventListener('change', (e) => {
    items.item3.visible = e.target.checked;
    drawScene();
});

document.getElementById('sound1').addEventListener('click', () => {
    sounds.sound1.play().catch(() => {
        console.error('Failed to play sound1');
    });
});

document.getElementById('sound2').addEventListener('click', () => {
    sounds.sound2.play().catch(() => {
        console.error('Failed to play sound2');
    });
});

document.getElementById('sound3').addEventListener('click', () => {
    sounds.sound3.play().catch(() => {
        console.error('Failed to play sound3');
    });
});

// Draw the scene
function drawScene() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    const backgroundImage = new Image();
    backgroundImage.src = backgrounds[currentBackground];
    backgroundImage.onload = () => {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // Draw character
        if (characterImage.complete && characterImage.naturalWidth !== 0) {
            ctx.drawImage(characterImage, characterX, characterY, 50, 50);
        }

        // Draw items
        if (items.item1.visible && items.item1.image.complete && items.item1.image.naturalWidth !== 0) {
            ctx.drawImage(items.item1.image, 100, 100, 50, 50);
        }
        if (items.item2.visible && items.item2.image.complete && items.item2.image.naturalWidth !== 0) {
            ctx.drawImage(items.item2.image, 400, 100, 50, 50);
        }
        if (items.item3.visible && items.item3.image.complete && items.item3.image.naturalWidth !== 0) {
            ctx.drawImage(items.item3.image, 250, 400, 50, 50);
        }
    };
    backgroundImage.onerror = () => {
        console.error('Failed to load background image');
    };
}

// Initial draw
drawScene();