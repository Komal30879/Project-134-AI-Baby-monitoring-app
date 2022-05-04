img = "";
status = "";
objects = [];

function preload(){
    song = loadSound("alarm_r.mp3");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    object_detector = ml5.objectDetector("cocossd", model_loaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
} 

function model_loaded(){
    console.log("model_loaded");
    status = true;
}

function got_result(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
}

function draw(){
    image(video, 0,0, 380, 380);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video,got_result);

        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+ "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person"){
                document.getElementById("baby_status").innerHTML = "Baby Detected";
                song.stop();
            } else {
                document.getElementById("baby_status").innerHTML = "Baby not detected";
                song.play();
            }
        }

        if(objects[i].length<0){
            document.getElementById("baby_status").innerHTML = "Baby not detected";
            song.play();
        }
    }
}