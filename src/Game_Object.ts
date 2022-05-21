export class GameObject {
    x: number
    y:number
    
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    load() { }
    unload() { }
    render() { }
    update(...arg: any) { }
}