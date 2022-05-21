import { GameObject } from "./Game_Object";
import { Sprite } from "./Sprite";

export class Player extends GameObject {
    sprite: Sprite
    direction = -1

    constructor() {
        super(0, 0)

        this.sprite = new Sprite({
            filename: "assets/dance-girl/slide.png",
            width: 39,
            height: 53,
            is_animated: true,
            frames: 8,
            scale: 3.5
        })
    }

    unload(): void {
        this.sprite.unload()
    }

    render(): void {
        this.sprite.render(this.x, this.y, this.direction)
    }
}