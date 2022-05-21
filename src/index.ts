import {
    InitWindow,
    SetTargetFPS,
    BeginDrawing,
    EndDrawing,
    WindowShouldClose,
    CloseWindow,
    ClearBackground,
    BLACK,
    DrawText,
    GOLD
} from 'raylib'

InitWindow(1280, 720, "Lotus")
SetTargetFPS(60)

while (!WindowShouldClose()) {
    BeginDrawing()

    ClearBackground(BLACK)
    DrawText("HELLO", 640, 360, 20, GOLD)

    EndDrawing()
}

CloseWindow()