import { Texture2D, LoadTexture, UnloadTexture, DrawTexture, WHITE, DrawTexturePro, Rectangle } from 'raylib'

interface SpriteConfig {
    filename: string
    width: number,
    height: number

    scale?: number
    is_animated?: boolean,
    frames?: number
}

export class Sprite {
    private texture: Texture2D
    private width: number
    private height: number

    private scale: number
    private is_animated: boolean
    private frames: number
    private curr_frame = 0

    constructor({ filename, width, height, scale, is_animated, frames }: SpriteConfig) {
        this.texture = LoadTexture(filename)
        this.width = width
        this.height = height

        this.scale = scale || 1
        this.is_animated = is_animated || false
        this.frames = frames || 0
    }

    get_source(direction?: number): Rectangle {
        return {
            x: this.curr_frame * this.width,
            y: 0,
            width: direction? direction * this.width : this.width,
            height: this.height
        }
    }

    get_dest(x: number, y: number): Rectangle {
        return {  
            x,
            y,
            width: this.width * this.scale,
            height: this.height * this.scale
        }
    }

    render(x: number, y: number, direction?: number) {
        if (!this.is_animated) {
            DrawTexture(this.texture, x, y, WHITE)
        } else {
            DrawTexturePro(
                this.texture,
                this.get_source(direction),
                this.get_dest(x, y),
                { x: 0, y: 0 },
                0,
                WHITE
            )
        }
    }

    get_is_animated(): boolean {
        return this.is_animated
    }

    animate() {
        this.curr_frame += 1

        if(this.curr_frame >= this.frames) this.curr_frame = 0
    }

    unload() {
        UnloadTexture(this.texture)
    }
}