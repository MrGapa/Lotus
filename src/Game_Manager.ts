import * as rl from 'raylib'
import { GameInputs } from './Game_Inputs'
import { Player } from './Player'
import { Scene } from './Scene'
import { SceneManager } from './Scene_Manager'
import { Trigger } from './Trigger'

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
    private scene_manager: SceneManager | null = null

    private ANIMATION_UPDATE = 1 / 12
    private update_time = 0

    should_close = false
    delta_time = 0

    player: Player | null = null
    rec: rl.Rectangle = {
        x: 600,
        y: 0,
        width: 100,
        height: 100
    }

    init() {
        rl.InitWindow(1280, 720, "Lotus");
        rl.SetTargetFPS(60)
        // rl.ToggleFullscreen()

        this.game_inputs = GameInputs.get_instance()
        this.scene_manager = SceneManager.get_instance()

        this.scene_manager.add_scene("Home", new Scene({
            background: "assets/thanos.png",
            foreground: "assets/Raylib_logo.png",
            x: 0,
            y: 0,
            objs: {
                game_obj: [],
                triggers: [
                    new Trigger({
                        x: 500,
                        y: 0,
                        width: 200,
                        height: 100,
                        behavior: {
                            type: "change_scene",
                            action: "Two"
                        }
                    })
                ]
            }
        }))
        this.scene_manager.add_scene("Two", new Scene({
            background: "assets/Random.png",
            foreground: "assets/dance-girl/hips.png",
            x: 0,
            y: 0,
            objs: {
                game_obj: [],
                triggers: []
            }
        }))


        this.scene_manager.current_scene = "Home"

        this.player = new Player()
    }

    load_assets() {
        this.scene_manager?.load_scene()
    }

    private render() {
        rl.BeginDrawing()

        rl.ClearBackground(rl.BLACK)
        
        this.scene_manager?.render_current_scene(this.player!)

        rl.DrawRectangleRec(this.rec, rl.ColorAlpha(rl.WHITE, 0))

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

        if (rl.CheckCollisionRecs(this.rec, this.player!.get_rec())) {
            this.scene_manager?.change_scene("Two")
        }
    }

    game_loop() {
        this.update()

        this.render()
    }

    close() {
        this.player?.unload()
        this.scene_manager?.unload_scene()

        rl.CloseWindow()
    }
}