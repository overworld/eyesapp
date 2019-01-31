import React, {Component} from 'react';
import {Engine,Render, Runner, Composite, Composites, Common, Constraint, MouseConstraint, Mouse, World, Bodies} from "matter-js"
import Physique from './classes/physique'
import Eye from './classes/eye'
import Camera from './classes/camera'

class googlyeyes extends Component {

    constructor() {
        super();
        this.camera = new Camera();
        this.eyes = [];

    }


    onResize() {
        this.physique.resize();
        this.refs.canvas.width = window.innerWidth;
        this.refs.canvas.height = window.innerHeight;


    }

    componentDidMount() {

        this.ctx = this.refs.canvas.getContext('2d');
        this.refs.canvas.width = window.innerWidth;
        this.refs.canvas.height = window.innerHeight;
        this.physique = new Physique(this.refs.canvas);

        //this.createEye();
        this.physique.addMouse();
        this.draw();





        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('devicemotion', this.updateMotion.bind(this));


        this.refs.canvas.addEventListener('touchstart',this.onClick.bind(this),false);
        this.refs.canvas.addEventListener('click',this.onClick.bind(this),false);

    }

    updateMotion(event) {
        var x = event.accelerationIncludingGravity.x;
        var y = event.accelerationIncludingGravity.y;
        //var z = event.accelerationIncludingGravity.z;

        this.physique.updateGravity(x, y);

    }



    onClick(e){

        if(e.targetTouches)
        {
            e = e.targetTouches[0];
        }
        let eye = new Eye(this.physique.world);
        eye.updatePosition(e.clientX, e.clientY);
        this.eyes.push(eye);


    }


    picture(){
        this.camera.takeSnapshot();
    }

    draw() {

        this.physique.update();
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);


        let videoW= this.camera.video.videoWidth;
        let videoH = this.camera.video.videoHeight;
        let ratio = Math.max(window.innerWidth/videoW, window.innerHeight/videoH);

        let windowWidth = window.innerWidth;
        let windowHeigth = window.innerHeight;

        let newVideoW = videoW * ratio;
        let newVideoH = videoH * ratio;
        let newX = (windowWidth - newVideoW)/2;
        let newY = (windowHeigth - newVideoH)/2;

        this.ctx.drawImage(this.camera.video,0,0,videoW,videoH,newX,newY, newVideoW, newVideoH);

        for (let i = 0 ; i <this.eyes.length; i++)
        {
            this.eyes[i].render(this.ctx);
        }

        requestAnimationFrame(() => this.draw());
    }

    render() {
        return (
            <canvas  className={"googlyeyes"} ref={"canvas"}> </canvas>
        );
    }


}

export default googlyeyes;
