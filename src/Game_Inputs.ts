import { GetFrameTime, IsKeyDown, KEY_A, KEY_D } from 'raylib'
import { Player } from "./Player"

export class GameInputs {
    private static instance: GameInputs
    private constructor() { }

    public static get_instance(): GameInputs {
        if (!GameInputs.instance) {
            GameInputs.instance = new GameInputs()
        }

        return GameInputs.instance
    }

    private SPEED = 150

    player_inputs(player: Player) {
        let dt = GetFrameTime()

        if (IsKeyDown(KEY_A)) {
            player.x -= dt * this.SPEED
            player.direction = 1
        }

        if (IsKeyDown(KEY_D)) {
            player.x += dt * this.SPEED
            player.direction = -1
        }
    }
}