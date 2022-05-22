import { CheckCollisionPointRec, IsMouseButtonPressed, DrawRectangleRec, MOUSE_BUTTON_LEFT, DrawText, GetMousePosition, GOLD, Rectangle, RED } from "raylib"

interface ButtonConfig {
    text: string
    x: number,
    y: number
    padding?: number,
    font_size?:number
}

export class Button {
    rec: Rectangle
    text: string
    padding: number
    font_size: number

    constructor({ text, x, y, padding, font_size }: ButtonConfig) {
        this.padding = padding || 10
        this.font_size = font_size || 20 

        this.rec = { x, y, width: ((this.font_size / 2) * text.length) * 2 + (this.padding * 2), height: this.font_size * 2 }
        this.text = text

        console.log(text.length)
    }

    is_clicked(): boolean {
        return CheckCollisionPointRec(GetMousePosition(), this.rec) && IsMouseButtonPressed(MOUSE_BUTTON_LEFT)
    }

    render() {
        DrawRectangleRec(this.rec, RED)
        DrawText(this.text, this.rec.x + this.padding, this.rec.y + this.padding, this.font_size, GOLD)
    }
}