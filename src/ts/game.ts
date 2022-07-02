import {Cell} from "./cell";
import {WORDS} from "./words";

export class Game {
    public boardGame: Cell[][] = [];
    public filledRows: number = 0;
    public randomWord: string = WORDS[0];
    public gussWord: string = "";

    constructor() {
        this.createAndInitBoardGame(6, 5);
        this.randomWord = this.drawWord();
    }

    private createAndInitBoardGame(rows: number, cols: number) {
        for (let r = 0; r < rows; r++) {
            let row: Cell[] = [];
            for (let c = 0; c < cols; c++) {
                row.push(new Cell("empty", ""));
            }
            this.boardGame.push(row);
        }
    }

    private drawWord(): string {
        return WORDS[Math.floor(Math.random() * WORDS.length)];
    }

    public reset(): void {
        this.boardGame.forEach((rows: Cell[]) => {
            rows.forEach((cell: Cell) => {
                cell.setStatus = "empty";
                cell.setContent = "";
            })
        });
        this.filledRows = 0;
        this.randomWord = this.drawWord();
        this.gussWord = "";
    }

    public addGuess(guess: string): void {
        if (guess.length !== 5 || !(WORDS.includes(guess.toLowerCase())))
            throw new Error("invalid word");

        let letIndex: number = 0;
        this.gussWord = guess;
        this.boardGame[this.filledRows++].forEach((cell: Cell) => {
            cell.setContent = this.gussWord.charAt(letIndex);
            cell.setStatus = this.getStatus(cell.getContent, letIndex);
            letIndex++;
        });
    }

    private getStatus(letter: string, position: number): "empty" | "wrong" | "exists" | "exact" {
        /*TODO
            * need to add status logic (more than one letter repeating)
        */

        if (this.randomWord[position] === letter) {
            return "exact";
        }

        if (this.randomWord.includes(letter)) {
            return "exists";
        }

        return "wrong";
    }

    public isGameOver(): boolean {
        if (this.hasWon()) {
            return true;
        }

        if (this.filledRows === 6) {
            return true;
        }

        return false;
    }

    public hasWon(): boolean {
        return this.gussWord.toLowerCase() == this.randomWord.toLowerCase();
    }
}