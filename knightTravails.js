class Node {
    constructor(row, col, distance) {
        this.row = row;
        this.col = col;
        this.distance = distance;
    }

    getPositionString() {
        return `${this.row}, ${this.col}`;
    }
}

const getNeighbors = (row, col) => {
    const neighbors = [];

    const directions = [
        [2, 1], [2, -1],
        [-2, 1], [-2, -1],
        [1, 2], [1, -2],
        [-1, 2], [-1, -2]
    ];

    for (const direction of directions) {
        const [rowChange, colChange] = direction;

        const neighborRow = row + rowChange;
        const neighborCol = col + colChange;

        neighbors.push([neighborRow, neighborCol]);
    }

    return neighbors
}

function reconstrucPath(target, parent) {
    const path = [];

    let current = target;
    while (current !== null) {
        path.unshift(current);
        current = parent.get(JSON.stringify(current));
    }

    return path
}

export default function knightMoves(arrStart, arrTarget) {

    function BSF(start, end) {
        const queue = [];
        const startPath = new Node(arrStart[0], arrStart[1], 0);
        const visited = new Set();
        const parentMap = new Map();

        queue.push(startPath);
        parentMap.set(JSON.stringify(startPath), null);
        visited.add(JSON.stringify(startPath));


        while (queue.length > 0) {
            const node = queue.shift();
            const { row, col, distance } = node;

            if (row === arrTarget[0] && col === arrTarget[1]) return reconstrucPath(node, parentMap);

            for (const neighbor of getNeighbors(row, col)) {
                const [neighborRow, neighborCol] = neighbor;
                const neighborNode = new Node(neighborRow, neighborCol, distance + 1);

                const neighborNodeStr = JSON.stringify(neighborNode);
                if (!visited.has(neighborNodeStr)) {
                    visited.add(neighborNodeStr);
                    parentMap.set(neighborNodeStr, node);
                    queue.push(neighborNode);
                };
            }
        }
    }

    const path = BSF(arrStart, arrTarget);

    if (path) {
        const movesCounts = path.length - 1;
        console.log(`You made it in ${movesCounts} move/s. Here's your path:\n`);
        path.forEach((node, index) => {
            console.log([node.row, node.col]);
        });
        console.log('');
        return path;
    }
}