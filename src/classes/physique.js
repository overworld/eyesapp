import {Engine, Render, Runner, Composite, Composites, Common, Constraint, MouseConstraint, Mouse, World, Bodies} from "matter-js"


export default class physique {
    constructor(canvas){

        this.engine = Engine.create();
        this.world = this.engine.world;

        this.render = Render.create({
            canvas: canvas,
            engine: this.engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                showAngleIndicator: true
            }
        });
    }

    updateGravity(x,y){
        let gravity = this.engine.world.gravity;
        gravity.x = -x || gravity.x;
        gravity.y = y || gravity.y;
    }


    addMouse() {
        var mouse = Mouse.create(this.render.canvas),
            mouseConstraint = MouseConstraint.create(this.engine, {
                mouse: mouse,
                constraint: {
                    // allow bodies on mouse to rotate
                    angularStiffness: 0,
                    render: {
                        visible: false
                    }
                }
            });

        World.add(this.world, mouseConstraint);
        this.render.mouse = mouse;

    }

    update()
    {
        Engine.update(this.engine, 1000/60);
    }

    resize(){
        Render.lookAt(this.render, {
            min: {x: 0, y: 0},
            max: {x: window.innerWidth, y: window.innerHeight}
        });
    }

}