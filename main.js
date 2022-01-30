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

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

myField.play();