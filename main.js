song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
songStatus1="";
songStatus2="";


function preload(){
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}


function draw(){

    fill("#FF0000");
    stroke("#FF0000");
   
    if(scoreLeftWrist>0.2)
    {
    circle(leftWristX, leftWristY, 20);
    
    if(song1.isPlaying()){
    song2.stop();
    }
    else{
    song1.play()
    song2.stop()
          }
      }
      if(scoreRightWrist>0.2){
    circle(rightWristX, rightWristY, 20);
    if(song2.isPlaying()) {
    song1.stop();

    }
    else{
        song2.play();
        song1.stop();
    }
      }
 }


function modelLoaded(){
console.log('Posenet Is Initialized');
}



function gotPoses(results){
    if(results.length>0)
    {
    console.log(results);
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    scoreRightWrist=results[0].pose.keypoints[9].score;
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX ="+leftWristX+"leftWristY ="+leftWristY);
    
    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX ="+rightWristX+"rightWristY ="+rightWristY);
    }
    }