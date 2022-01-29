import { CreaturesController } from "./Controllers/CreaturesController.js";
import { GameController } from "./Controllers/GameController.js";
import { PlayersController } from "./Controllers/PlayersController.js";

class App {
  creaturesController = new CreaturesController()
  playersController = new PlayersController()
  gameController = new GameController()
}

window["app"] = new App();
