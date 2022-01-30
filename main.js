import { createInterface } from 'readline';
import { arrayBuffer } from 'stream/consumers';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

const generateField = (height, width, percentageHoles) => {
    let generatedField = new Array(height);
    for (let i = 0; i < height; i++) {
        generatedField[i] = new Array(width);
        generatedField[i].fill(fieldCharacter);
    };
    //Creating the start path
    generatedField[0][0] = pathCharacter;
    //Creating the hat
    let randomX = 0;
    let randomY = 0;
    let helper = 1;
    let position;
    for (let i = 0; i < helper; i++) {
        randomX = Math.floor(Math.random() * width);
        randomY = Math.floor(Math.random() * height);
        if (position === pathCharacter) {
            helper +=1;
            continue;
        } else {
            generatedField[randomY][randomX] = hat;
        }
    }
    //Placing random holes
    let totalElements = (height * width) - 2;
    let totalHoles = totalElements * percentageHoles / 100;
    for (let i = 0; i < totalHoles; i++) {
        randomX = Math.floor(Math.random() * width);
        randomY = Math.floor(Math.random() * height);
        position = generatedField[randomY][randomX];
        if (position === pathCharacter || position === hat) {
            totalHoles += 1;
            continue;
        } else {
            generatedField[randomY][randomX] = hole;
        };
    };
    return generatedField;
};

class Field {
    constructor(fieldArray) {
        this.fieldArray = fieldArray;
        this.x = 0;
        this.y = 0;
        this.state = '';
    }

    print() {
        this.fieldArray.forEach(line => {
            console.log(line.join(""));
        });
    }

    move(direction) {

        let x = this.x;
        let y = this.y;
        let len;

        const movementLogic = (x, y, len) => {
            let position = this.fieldArray[y][x];
            if (x < 0 || x > len || y < 0 || y > len) { 
                console.log("You're outbounds\n");
                this.state = 'lose';
            } else {
                if (position === hole) {
                    console.log("You fell in a hole.\n");
                    this.state = 'lose';
                } else if (position === hat) {
                    console.log("You found your hat!\n");
                    this.state = 'win';
                } else {
                    this.fieldArray[y][x] = pathCharacter;
                    this.print();
                };
            };
        };

        switch (direction) {

            case 'u' || 'U':

                this.y -= 1;
                len = this.fieldArray.length;
                movementLogic(x, this.y, len);
                
                break;

            case 'd' || 'D':
                
                this.y += 1;
                len = this.fieldArray.length;
                movementLogic(x, this.y, len);
                
                break;

            case 'l' || 'L':

                this.x -= 1;
                len = this.fieldArray[y].length;
                movementLogic(this.x, y, len);
                
                break;

            case 'r' || 'R':
                
                this.x += 1;
                len = this.fieldArray[y].length;
                movementLogic(this.x, y, len);
                
                break;

            default:

                console.log("That direction doesn't exist.\n");

                break;
        };
    }

    play() {
        const recursion = () => {
            rl.question('Which way? (u, d, r, l, exit): ', (direction) => {
                if (direction === 'exit') {
                    return rl.close();
                };
                try {
                    this.move(direction);
                    if (this.state !== '') {
                        return rl.close();
                    }
                } catch(e) {
                    console.log("You're outbounds.\n");
                    return rl.close();
                }
                recursion();
            });
        };
        this.print();
        recursion();
    }
};

//Initial functionality
/*const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);
myField.play();*/

let random1 = Math.floor(Math.random() * (8 - 4) + 4);
let random2 = Math.floor(Math.random() * (8 - 4) + 4);
const myField = new Field(generateField(random1, random2, 50));
myField.play();