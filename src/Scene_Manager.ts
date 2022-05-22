import { Player } from "./Player"
import { Scene } from "./Scene"

interface SceneMap {
    [key:string]: Scene
}

export class SceneManager {
    private static instance: SceneManager
    private constructor() { 
        this.player = new Player()
    }
    public static get_instance(): SceneManager {
        if (!SceneManager.instance) {
            SceneManager.instance = new SceneManager()
        }

        return SceneManager.instance
    }

    current_scene = ""
    scene_map: SceneMap = {}

    player: Player

    private get_current_scene(): Scene {
        return this.scene_map[this.current_scene]
    }

    add_scene(name: string, scene: Scene) {
        this.scene_map[name] = scene
    }

    change_scene(scene_name: string) {
        this.unload_scene()

        this.current_scene = scene_name

        this.load_scene()
    }

    load_scene() {
        this.get_current_scene().load()
    }

    unload_scene() {
        this.get_current_scene().unload()
    }

    animate_objects() {
        this.player.sprite.animate()
    }

    update() {
        let { objs } = this.get_current_scene()
        
        objs.triggers.forEach(trg => {
            trg.check_collision(this.player.get_rec())
        })
    }

    render_current_scene() {
        let curr = this.get_current_scene()

        let { game_obj, triggers } = curr.objs

        curr.render_background()
        game_obj.forEach(obj => {
            obj.render()
        })

        this.player.render()

        triggers.forEach(trg => {
            trg.render()
        })

        curr.render_foreground()
    }

    close() {
        this.unload_scene()
        this.player.unload()
    }
}