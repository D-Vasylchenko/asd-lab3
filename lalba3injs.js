const n1 = 3
const n2 = 3
const n3 = 0
const n4 = 7
const n = 10 + n3;

const prng = new PRNG(3307);
let matrix2 = [];
let matrix3 = [];
const k1 = 1 - n3 * 0.01 - n4 * 0.01 - 0.3;
const k2 = 1 - n3 * 0.005 -n4 * 0.005 -0.27;
for (let i = 0; i < n; i++) {
    matrix2[i] = [];
    matrix3[i] = [];
    for (let j = 0; j < n; j++) {
        let num = prng.next();
        matrix3[i][j] = Math.floor(num*k2);
        matrix2[i][j] = Math.floor(num*k1);
    }
}

let matrix1 = [];
for (let i = 0; i < matrix2.length; i++) {
    matrix1[i] = [];
    for (let j = 0; j < matrix2[i].length; j++) {
        matrix1[i][j] = matrix2[i][j];
    }
}
for (let i = 0; i < matrix1.length; i++) {
    for (let j = i; j < matrix1[i].length; j++) {
        if (matrix1[i][j] !== matrix1[j][i]) {
            matrix1[i][j] = matrix1[j][i] = Math.max(matrix1[i][j], matrix1[j][i]);
        }
    }
}
console.log('Undirected graph matrix: ');
console.log(matrix1);
console.log('Directed graph matrix: ');
console.log(matrix2);
function PRNG(seed) {
    this.seed = seed;
    const g= Math.pow(2, 31);
    this.next = function() {
        this.seed = (5665 * this.seed + 999) % g;
        return (this.seed / g) * 2;
    };
}

const centerX = 300;
const centerY = 300;
const rad = 250;
const position = [];
const angleIncrement = (2 * Math.PI) / (n - 1);
for (let i = 0; i < n - 1; i++) {
    const x = centerX + rad * Math.cos(i * angleIncrement);
    const y = centerY + rad * Math.sin(i * angleIncrement);
    position.push({ x, y });
}


const x = centerX;
const y = centerY;
position.push({ x, y });
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'black';
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (matrix1[i][j] == 1) {
            if(i != j)
            {
                ctx.beginPath();
                ctx.moveTo(position[i].x, position[i].y);
                ctx.lineTo(position[j].x, position[j].y);
                ctx.stroke();
            }
            else{
                selfCircle(i);
            }

        }
    }
}
for (let i = 0; i < n; i++) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(position[i].x, position[i].y, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${i+1}`, position[i].x, position[i].y);
}
const canvasArrows = document.getElementById('graphCanvasWithArrows');
const ctxArrow = canvasArrows.getContext('2d');

ctxArrow.strokeStyle = 'black';
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (matrix2[i][j] == 1) {
            if(i != j)
            {
                ctxArrow.beginPath();
                ctxArrow.moveTo(position[j].x, position[j].y);
                if ((position[j].x < centerX / 2 && position[i].x < centerX / 2) || (position[j].x > centerX / 2 && position[i].x > centerX / 2)) {
                    ctxArrow.lineTo(position[i].x + 20, position[i].y);
                } else {
                    ctxArrow.lineTo(position[i].x, position[i].y + 20);
                }
                ctxArrow.stroke();
                const angle = Math.atan2(position[j].y - position[i].y, position[j].x - position[i].x);
                const offsetX = Math.cos(angle) * 30;
                const offsetY = Math.sin(angle) * 30;
                drawArrow(ctxArrow,position[j].x - offsetX, position[j].y - offsetY, angle);
            }
            else {
                selfArrow(i);
            }
        }
    }
}
function drawArrow(ctx, x, y, angle) {
    const arrowheadSize = 15;
    ctxArrow.save();
    ctxArrow.translate(x, y);
    ctxArrow.rotate(angle);
    ctxArrow.beginPath();
    ctxArrow.moveTo(0, 0);
    ctxArrow.lineTo(-arrowheadSize, arrowheadSize / 2);
    ctxArrow.lineTo(-arrowheadSize, -arrowheadSize / 2);
    ctxArrow.closePath();
    ctxArrow.fill();
    ctxArrow.restore();
}
for (let i = 0; i < n; i++) {
    ctxArrow.fillStyle = 'white';
    ctxArrow.beginPath();
    ctxArrow.arc(position[i].x, position[i].y, 30, 0, Math.PI * 2);
    ctxArrow.fill();
    ctxArrow.strokeStyle = 'black';
    ctxArrow.stroke();
    ctxArrow.closePath();
    ctxArrow.fillStyle = 'black';
    ctxArrow.font = '20px Arial';
    ctxArrow.textAlign = 'center';
    ctxArrow.textBaseline = 'middle';
    ctxArrow.fillText(`${i+1}`, position[i].x, position[i].y);
}


function selfArrow(i) {
    const arrowheadSize = 15;
    let x, y;
    const offsetX = position[i].x < canvasArrows.width / 2 ? -30 : 30;
    const angle = position[i].x < canvasArrows.width / 2 ? Math.PI / 4 : Math.PI * 3 / 4;
    x = position[i].x + offsetX;
    y = position[i].y;

    ctxArrow.beginPath();
    ctxArrow.moveTo(position[i].x, position[i].y);
    ctxArrow.lineTo(x, y);
    ctxArrow.stroke();
    drawArrow(ctxArrow, x, y, angle);

    ctxArrow.strokeStyle = 'black';
    ctxArrow.beginPath();
    ctxArrow.arc(x, y-15, 10, Math.PI / 1.3, Math.PI * 4.5/2);
    ctxArrow.stroke();
    ctxArrow.closePath();
}

function selfCircle(i) {
    let x, y;
    const offsetX = position[i].x < canvas.width / 2 ? -30 : 30;

    x = position[i].x + offsetX;
    y = position[i].y;
    
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(x, y-15, 10, Math.PI / 1.3, Math.PI * 4.5);
    ctx.stroke();
    ctx.closePath();
}

