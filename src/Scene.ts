import { DrawTexture, LoadTexture, Texture2D, UnloadTexture, WHITE } from "raylib";

interface SceneConfig {
    background: string
    foreground: string
    x: number
    y: number
}

export class Scene {
    private background: Texture2D | null = null
    private foreground: Texture2D | null = null

    private is_loaded = false

    private x: number
    private y: number

    private values: {
        background: string,
        foreground: string
    }

    constructor({ background, foreground, x, y }: SceneConfig) {
        this.x = x
        this.y = y

        this.values = { background, foreground }
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