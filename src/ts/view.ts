import {EventEmitter} from 'events'
import {Game} from "./game";
import {Cell} from "./cell";

export class View extends EventEmitter {
    private readonly guessInput: HTMLInputElement;
    private readonly okBtn: HTMLButtonElement;
    private readonly errorLabel: HTMLLabelElement;
    private readonly boardGame: HTMLDivElement[][] = [];
    private readonly endGameMsg: HTMLDivElement;
    private readonly resetBtn: HTMLButtonElement;

    constructor() {
        super();
        this.guessInput = document.getElementById("guess_input") as HTMLInputElement;

        this.okBtn = document.getElementById("ok_btn") as HTMLButtonElement;
        if (this.okBtn) {
            this.okBtn.addEventListener("click", () => {
                this.emit("onGuess", {guess: this.guessInput.value});
            });
        }

        this.errorLabel = document.getElementById('error_label') as HTMLLabelElement;

        for (let r = 1; r <= 6; r++) {
            let row: HTMLDivElement[] = [];
            for (let c = 1; c <= 5; c++)
                row.push(document.getElementById('r' + r + '-c' + c) as HTMLDivElement);
            this.boardGame.push(row);
        }

        this.resetBtn = document.getElementById('reset_btn') as HTMLButtonElement;
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => {
                this.emit("onReset");

            });
        }

        this.endGameMsg = document.getElementById("end_game_msg") as HTMLDivElement;
    }

    public renderGame(game: Game): void {
        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 5; c++) {
                let cell: Cell = game.boardGame[r][c];

                this.boardGame[r][c].innerText = cell.content;
                switch (cell.status) {
                    case "wrong": {
                        this.boardGame[r][c].classList.add("wrong");
                        break;
                    }
                    case "exists": {
                        this.boardGame[r][c].classList.add("exists");
                        break;
                    }
                    case "exact": {
                        this.boardGame[r][c].classList.add("exact");
                        break;
                    }
                    default: {
                        this.boardGame[r][c].classList.remove("wrong", "exists", "exact");
                        this.boardGame[r][c].classList.add("empty");
                        break;
                    }
                }
            }
        }

        if (game.isGameOver()) {
            this.guessInput.disabled = true;
            this.okBtn.disabled = true;
            this.endGameMsg.innerHTML = game.hasWon() ? "You win! :)" : "Game over! You lose :(";
            this.endGameMsg.style.display = "block";
        }
        this.guessInput.value = "";
    }

    public reset(game: Game): void {
        this.endGameMsg.style.display = "none";
        this.endGameMsg.innerHTML = "";
        this.guessInput.disabled = false;
        this.okBtn.disabled = false;

        this.renderGame(game);
    }

    public alertErrorMsg(msg: string) : void{
        this.errorLabel.style.display = "block";
        this.errorLabel.innerHTML = msg;
        setTimeout(() => {
            this.errorLabel.innerHTML = "";
            this.errorLabel.style.display = "none";
        }, 1500);
    }
}