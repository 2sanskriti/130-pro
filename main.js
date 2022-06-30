song="";
leftx=0;
lefty=0;
rightx=0;
righty=0;

scoreleft=0;
scoreright=0;

function preload()
{
    song=loadSound("music.mp3");
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet( video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
  console.log( 'PoseNet is initialized');
}

function draw()
{
    image(video,0,0,600,500);

    fill("red");
    stroke("red");
     if(scoreleft > 0.2)
     {
       
     
    circle(leftx,lefty,20);
    no=Number(lefty);
    decimal= floor(no);
    volume= decimal/500;

    document.getElementById("volume").innerHTML="Volume = " + volume;
    song.setVolume(volume);
     }
     if(scoreright > 0.2)
     {
        circle(rightx,righty,20);
        if(righty > 0 && righty <= 100)
        {
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }
        else if(righty > 100 && righty <= 200)
        {
            document.getElementById("speed").innerHTML="Speed = 1x";
            song.rate(1);
        }
        else if(righty > 200 && righty <= 300)
        {
            document.getElementById("speed").innerHTML="Speed = 1.5x";
            song.rate(1.5);
        }
        else if(righty > 300 && righty <= 400)
        {
            document.getElementById("speed").innerHTML="Speed = 2x";
            song.rate(2);
        }
        else if(righty > 400 && righty <= 500)
        {
            document.getElementById("speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }

     }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        scoreleft=results[0].pose.keypoints[9].score;
        scoreright=results[0].pose.keypoints[10].score;
        console.log(" Score left= " + scoreleft + "Score right = " + scoreright);

        leftx= results[0].pose.leftWrist.x;
        lefty= results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftx + "Left Wrist Y = " + lefty);

        rightx= results[0].pose.rightWrist.x;
        righty= results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightx + "Right Wrist Y = " + righty);

    }
}