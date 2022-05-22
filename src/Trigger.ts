import { CheckCollisionRecs, ColorAlpha, DrawRectangleRec, Rectangle, WHITE } from "raylib";
import { GameObject } from "./Game_Object";
import { SceneManager } from "./Scene_Manager";

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
    private trg_behavior: TriggerBehaivior

    activated: boolean = false

    constructor({ x, y, width, height, behavior }: TriggerConfig) {
        super(x, y)
        
        this.width = width
        this.height = height

        this.trg_behavior = behavior
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
        (<any>this)[this.trg_behavior.type](this.trg_behavior.action)
    }

    change_scene(scene: string) {
        SceneManager.get_instance().change_scene(scene)
    }

    check_collision(other: Rectangle) {
        if (CheckCollisionRecs(this.get_rec(), other) && !this.activated) {
            this.activated = true
            this.behavior()
        }
    }

    render() {
        DrawRectangleRec(this.get_rec(), ColorAlpha(WHITE, 0))
    }
}