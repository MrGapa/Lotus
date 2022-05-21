import * as rl from 'raylib'
import { GameInputs } from './Game_Inputs'
import { Player } from './Player'
import { Scene } from './Scene'

export class GameManager {
    private static instance: GameManager
    private constructor() { }
    
    public static get_instance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager()
        }

        return GameManager.instance
    }

    private game_inputs: GameInputs | null = null

    private ANIMATION_UPDATE = 1 / 12
    private update_time = 0

    should_close = false
    delta_time = 0

    player: Player | null = null
    scene: Scene | null = null

    init() {
        rl.InitWindow(1280, 720, "Lotus");
        rl.SetTargetFPS(60)
        // rl.ToggleFullscreen()

        this.game_inputs = GameInputs.get_instance()

        this.player = new Player()
        this.scene = new Scene({
            background: "assets/thanos.png",
            foreground: "assets/Raylib_logo.png",
            x: 0,
            y: 0
        })
    }

    load_assets() {
        this.scene?.load()
    }

    private render() {
        rl.BeginDrawing()

        rl.ClearBackground(rl.BLACK)
        
        this.scene?.render_background()

        this.player?.render()

        // this.scene?.render_foreground()

        rl.EndDrawing()
    }

    private update() {
        this.delta_time = rl.GetFrameTime()
        this.should_close = rl.WindowShouldClose()

        this.game_inputs?.player_inputs(this.player!)

        this.update_time += this.delta_time
        if (this.update_time > this.ANIMATION_UPDATE) {
            this.update_time = 0

            if (this.player?.sprite.get_is_animated()) {
                this.player.sprite.animate()
            }
        }

        this.player?.update()
    }

    game_loop() {
        this.update()

        this.render()
    }

    close() {
        this.player?.unload()
        this.scene?.unload()

        rl.CloseWindow()
    }
}