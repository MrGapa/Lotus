import { GameManager } from "./Game_Manager"

const Game = GameManager.get_instance()

Game.init()

Game.load_assets()

while (!Game.should_close) {
    Game.game_loop()
}

Game.close()

/**
 * TODO Put all of this in a README.md and make it look good
 * 
 * * Required for Windows
 * * - Node (im using 16.14.2, i started using it node at 8.0.0)
 * * - Maybe Yarn
 * 
 * ! For some reason i haven't figure out pkg doesn't work windows
 * * Tried in Ubuntu an worked
 * * I dont have a Mac, can't test
 * 
 * ? Should i try in Window 10? How do you try in Win 10 Waker? you have Win 11 CUNT
 * 
 * TODO Remove Thanos or hide it
 */