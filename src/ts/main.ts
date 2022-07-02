import {Game} from "./game";
import {View} from "./view";

let game: Game = new Game();
let viewGame: View = new View();

viewGame.on("onGuess", (args) => {
    try{
        game.addGuess(args['guess']);
        viewGame.renderGame(game);
    }catch (error){
        viewGame.alertErrorMsg("Invalid word");
    }
});

viewGame.on("onReset", () => {
    game.reset();
    viewGame.reset(game);
});
