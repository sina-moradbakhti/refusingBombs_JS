const bombsCount = 10
const playgroundSize = bombsCount
let _refusedBombs = 0 // the count of refused bombs


const getRandLocation = () => {
    return Math.floor(Math.random(0, bombsCount) * 10)
}

const generateBombs = () => {
    let bombs = []
    let i = 0
    while (i < bombsCount) {
        const randLocX = getRandLocation()
        const randLocY = getRandLocation()
        if (bombs.filter(item => item.x === randLocX && item.y === randLocY).length === 0) {
            bombs.push({ x: randLocX, y: randLocY })
            i++
        } else {
            continue
        }
    }

    return bombs
}

const spawningBombs = (bombsLocations) => {
    bombsLocations.forEach(location => {
        playground[location.x][location.y] = 'B'
    })
}

const attack = (x, y) => {
    if (bombsCount === _refusedBombs) return false

    const count = bombsLocations.filter(bombLocation => bombLocation.x === x && bombLocation.y === y).length
    if (count > 0 && playground[x][y] === 'B') {
        console.log(`(${x},${y})`, `Bombs: ${count} (You Loose!)`)
        console.table(playground)
        return false
    }

    let possibleBombsLocations = []
    for (let i = -2; i < 2; i++) {
        for (let j = -2; j < 2; j++) {
            if (x + i >= 0 && y + j >= 0 && x + i <= playgroundSize - 1 && y + j <= playgroundSize - 1) {
                if (playground[x + i][y + j] !== 'X') {
                    possibleBombsLocations.push({ x: x + i, y: y + j })
                }
            }

        }
    }

    possibleBombsLocations.forEach(bombLocation => {
        if (playground[bombLocation.y][bombLocation.x] === 'B') {
            playground[bombLocation.y][bombLocation.x] = 'X'
            _refusedBombs++
        }
    })

    console.log(`(${x},${y})`, `Bombs: ${_refusedBombs}`);
    console.table(playground);
    return true;
}

// First Step: Making a playground
let playground = new Array(playgroundSize).fill('').map(_ => new Array(playgroundSize).fill(''))

// Second Step: Generating Bombs
const bombsLocations = generateBombs()

// Third Step: Spawning the bombs in the playground
spawningBombs(bombsLocations)

// Fourth Step: Start Playing the game by using Attack function
let tried = 0
let keepGoing = true
while (keepGoing) {
    keepGoing = attack(getRandLocation(), getRandLocation())
    tried++
}

console.log('\n\n');
console.log(`******* You ${(_refusedBombs === bombsCount) ? 'Win' : 'Loose'} *******`);
console.log(`******* You tried ${tried} times for refusing bombs *******`);
console.log('\n\n');


