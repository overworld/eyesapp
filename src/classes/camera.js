
export default class Camera {

    constructor()
    {
        const constraints = { audio: false, video: true };

        this.video = document.createElement('video');
        //document.body.appendChild(this.video);

        navigator.mediaDevices.getUserMedia(constraints)
            .then((mediaStream)=> {
                this.video.srcObject = mediaStream;
                this.video.onloadedmetadata =(e)=> {
                    this.video.play();
                };
            })
            .catch(function(err) { console.log(err.name + ": " + err.message); });
            this.snapShot = null;
    }

    takeSnapshot(){
        this.video.pause();
    }

}