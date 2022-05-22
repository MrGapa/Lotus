import * as rl from 'raylib'
import { GameInputs } from './Game_Inputs'
import { Button } from './GUI/Button'
import { Scene, SceneType } from './Scene'
import { SceneManager } from './Scene_Manager'

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

    init() {
        rl.InitWindow(1280, 720, "Lotus");
        rl.SetTargetFPS(60)

        this.game_inputs = GameInputs.get_instance()
        this.scene_manager = SceneManager.get_instance()

        this.scene_manager.add_scene("Home", new Scene({
            background: "assets/space.png",
            x: 0,
            y: 0,
            objs: {
                game_obj: [],
                triggers: []
            },
            scene_type: SceneType.GAMEPLAY
        }))
        // this.scene_manager.add_scene("Two", new Scene({
        //     background: "assets/Random.png",
        //     foreground: "assets/dance-girl/hips.png",
        //     x: 0,
        //     y: 0,
        //     objs: {
        //         game_obj: [],
        //         triggers: []
        //     },
        //     scene_type: SceneType.GAMEPLAY
        // }))

        this.scene_manager.current_scene = "Home"
    }

    load_assets() {
        this.scene_manager?.load_scene()
    }

    private render() {
        rl.BeginDrawing()

        rl.ClearBackground(rl.BLACK)
        
        this.scene_manager?.render_current_scene()

        rl.EndDrawing()
    }

    private update() {
        this.delta_time = rl.GetFrameTime()
        this.should_close = rl.WindowShouldClose()

        this.game_inputs?.player_inputs(this.scene_manager?.player!)

        this.update_time += this.delta_time
        if (this.update_time > this.ANIMATION_UPDATE) {
            this.update_time = 0

            this.scene_manager?.animate_objects()
        }

        this.scene_manager?.update()
    }

    game_loop() {
        this.update()

        this.render()
    }

    close() {
        this.scene_manager?.close()

        rl.CloseWindow()
    }
}