import { createInterface } from 'readline';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

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
        let movementX;
        let movementY;
        let length;

        const movementLogic = (movementX, movementY, length) => {
            let position = this.fieldArray[movementY][movementX];
            if (movementX < 0 || movementX > length || movementY < 0 || movementY > length) { 
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
                    this.fieldArray[movementY][movementX] = pathCharacter;
                    this.print();
                };
            };
        };

        switch (direction) {

            case 'u' || 'U':
                
                movementX = x
                movementY = y-1
                length = this.fieldArray.length;
                movementLogic(movementX, movementY, length);
                this.y -= 1;
                
                break;

            case 'd' || 'D':
                
                movementX = x
                movementY = y+1
                length = this.fieldArray.length;
                movementLogic(movementX, movementY, length);
                this.y += 1;
                
                break;

            case 'l' || 'L':

                movementX = x-1
                movementY = y
                length = this.fieldArray[y].length;
                movementLogic(movementX, movementY, length);
                this.x -= 1;
                
                break;

            case 'r' || 'R':

                movementX = x+1
                movementY = y
                length = this.fieldArray[y].length;
                movementLogic(movementX, movementY, length);
                this.x += 1;
                
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

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

myField.play();