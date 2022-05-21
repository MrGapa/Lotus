import { DrawTexture, LoadTexture, Texture2D, UnloadTexture, WHITE } from "raylib";
import { GameObject } from "./Game_Object";
import { Trigger } from "./Trigger";

interface SceneConfig {
    background: string
    foreground: string
    x: number
    y: number
    objs: DifObjects
}

// * I didn´t have a better name for this
interface DifObjects {
    game_obj: GameObject[],
    triggers: Trigger[]
}

export class Scene {
    private background: Texture2D | null = null
    private foreground: Texture2D | null = null

    private is_loaded = false

    private x: number
    private y: number

    objs: DifObjects 
        
    private values: {
        background: string,
        foreground: string
    }

    constructor({ background, foreground, x, y, objs }: SceneConfig) {
        this.x = x
        this.y = y

        this.values = { background, foreground }
        this.objs = objs
    }

    load() {
        const { background, foreground } = this.values

        this.background = LoadTexture(background)
        this.foreground = LoadTexture(foreground)

        this.is_loaded = false
    }

    unload() {
        if (this.is_loaded) {
            UnloadTexture(this.background!)
            UnloadTexture(this.foreground!)
        }
    }

    render_background() {
        DrawTexture(this.background!, this.x, this.y, WHITE)
    }

    render_foreground() {
        DrawTexture(this.foreground!, this.x, this.y, WHITE)
    }
}