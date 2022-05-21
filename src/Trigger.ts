import { CheckCollisionRecs, Rectangle } from "raylib";
import { GameObject } from "./Game_Object";

interface TriggerBehaivior {
    type: string
    action: string
}

interface TriggerConfig {
    x: number
    y: number
    width: number
    height: number
    behavior: TriggerBehaivior
}

export class Trigger extends GameObject {

    private width: number
    private height: number
    private behaivor: TriggerBehaivior

    activated: boolean = false

    constructor({ x, y, width, height, behavior }: TriggerConfig) {
        super(x, y)
        
        this.width = width
        this.height = height

        this.behaivor = behavior
    }

    private get_rec(): Rectangle {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }
    }

    private behavior() {

    }

    chnage_scene() {
        
    }

    check_collision(other: Rectangle) {
        if (CheckCollisionRecs(this.get_rec(), other) && !this.activated) {
            this.activated = true
        }
    }

    render() {

    }
}