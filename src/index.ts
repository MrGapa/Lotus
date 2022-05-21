import { GameManager } from "./Game_Manager"

const Game = GameManager.get_instance()

Game.init()

Game.load_assets()

while (!Game.should_close) {
    Game.game_loop()
}

Game.close()

// TODO Figure out how to package all of this