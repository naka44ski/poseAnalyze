    // Copyright (c) 2018 ml5
    //
    // This software is released under the MIT License.
    // https://opensource.org/licenses/MIT
    
    /* ===
    ml5 Example
    PoseNet example using p5.js
    === */
    
    let video;
    let poseNet;
    let poses = [];
    let vid = null;
    var hipShift = [];
    var midShift = [];
    var pt = 0;
    var ps = 0;
    var ph = 0;
    var shoulderWidth = 0;
    var hipWidth = 0;
    let cgx = 0;
    let constCgx = 0;
    let preconstCgx = 0;
    let cgx_i = 0;
    let speed = 0;
    let precgxTime = 0;
    let pxHeight = 0;
    let height_i = 0;
    let constPxH = 0;
    let avgPxh = 0;
    let pxh = 0;
    let cgxSpeed = 0;
    let start_flag = false;
    let start_r = 200;
    let start_i = 0;
    let T_Height, T_Scale;
    
    const startBtn = document.getElementById("start");
    const downloadBtn = document.getElementById("download");
    
    downloadBtn.addEventListener("click", () => {
      const blob = new Blob(chunks, { type: 'video/mp4' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "openpose.mp4";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    });
    
    //最初に1回だけ呼ばれる関数。表示エリアの作成や全体に共通する設定を書く。
    function setup() {
      createCanvas(640, 480);
      video = createCapture(VIDEO);
      video.size(width, height);
      
      
      // Create a new poseNet method with a single detection(=信号検出)
      poseNet = ml5.poseNet(video, modelReady);
      // This sets up an event that fills the global variable "poses"
      // with an array every time new poses are detected
      poseNet.on('pose', function(results) {
        poses = results;
      });
      // Hide the video element, and just show the canvas
      video.hide();
    }
    
    function modelReady() {
      select('#status').html('Model Loaded');
    }
    
    //1フレーム（1/60秒）ごとに実行される関数。描画される内容を書く。
    function draw() {
      image(video, 0, 0, width, height);
      
      // We can call both functions to draw all keypoints and the skeletons
      drawKeypoints();
      window.str3 = window.str3/1.5;
      drawSkeleton();
    }
    
    // A function to draw ellipses over the detected keypoints
    function drawKeypoints()  {
      let heightText = document.getElementById("height");
      let weightText = document.getElementById("weight");
      let HT = (isNaN(parseInt(heightText.value)) ? parseInt(heightText.value) : 170) / 100;
      let BW = (isNaN(parseInt(weightText.value)) ? parseInt(weightText.value) : 65);
      // Loop through all the poses detected
      for (let i = 0; i < poses.length; i++) {
        // For each pose detected, loop through all the keypoints
        let pose = poses[i].pose;
        if (pose.score > 0.2) {
          let trankg = calcTrunk(pose.leftShoulder, 
                                 pose.rightShoulder, 
                                 pose.leftHip, 
                                 pose.rightHip);
          let upper1 = calcMidpoint(pose.leftShoulder, 
                                    pose.leftElbow);
          let upper2 = calcMidpoint(pose.rightShoulder, 
                                    pose.rightElbow);
          let fore1 = calcMidpoint(pose.leftElbow, 
                                   pose.leftAnkle);
          let fore2 = calcMidpoint(pose.rightElbow, 
                                   pose.rightAnkle);
          let thigh1 = calcMidpoint(pose.leftHip, 
                                    pose.leftKnee);
          let thigh2 = calcMidpoint(pose.rightHip, 
                                    pose.rightKnee);
          let shank1 = calcMidpoint(pose.leftKnee, 
                                    pose.leftAnkle);
          let shank2 = calcMidpoint(pose.rightKnee, 
                                    pose.rightAnkle);
      
          let headx = pose.nose.x;
          let trunkx = trankg[0];
          let upper1x = upper1[0];
          let upper2x = upper2[0];
          let fore1x = fore1[0];
          let fore2x = fore2[0];
          let hand1x = pose.leftWrist.x;
          let hand2x = pose.rightWrist.x;
          let thigh1x = thigh1[0];
          let thigh2x = thigh2[0];
          let shank1x = shank1[0];
          let shank2x = shank2[0];
          let foot1x = pose.leftAnkle.x;
          let foot2x = pose.rightAnkle.x;
          
          pxHeight = ((pose.leftAnkle.y + pose.rightAnkle.y)/2) - pose.nose.y;
      
          let W_Head = 1.9074 + 0.0319 * BW;
          let W_Trunk = -0.7076 + 0.5324 * BW;
          let W_UpperArm = 0.4852 + 0.0215 * BW;
          let W_Forearm = 0.2477 + 0.0129 * BW;
          let W_Hand = 0.0759 + 0.0045 * BW;
          let W_Thigh = -1.5112 + 0.1271 * BW;
          let W_Shank = -0.1792 + 0.0437 * BW;
          let W_Foot = 0.2529 + 0.0089 * BW;
          
          cgx = (W_Head * headx + 
                          W_Trunk * trunkx + 
                          W_UpperArm * (upper1x + upper2x) + 
                          W_Forearm * (fore1x + fore2x) + 
                          W_Hand * (hand1x + hand2x) + 
                          W_Thigh * (thigh1x + thigh2x) + 
                          W_Shank * (shank1x + shank2x) + 
                          W_Foot * (foot1x + foot2x)) / BW;
          
          
          window.time3 = Date.now();

          if(height_i != 50 && height_i != -1) {
            constPxH += pxHeight;
            height_i += 1;
          } else if(height_i = 50) {
            avgPxh = constPxH/50;
            constPxH = 0;
            height_i = 0;
          }

          if (window.centergx.length >= 4000) {
            window.centergx = window.centergx.splice(2000);
          }
          if (cgx >= 0 && start_flag) {
            window.centergx.push(cgx + ',' + window.time3);
          }

          if(cgx_i != 5) {
            if(cgx_i == 0){
              precgxTime = window.time3;
            }
            constCgx += cgx;
            cgx_i += 1;
          } else if(cgx_i == 5) {
            T_Height = pxh;
            T_Scale = HT / T_Height;
            isFinite(((((constCgx/5.0) - preconstCgx)*T_Scale)*1000)/(window.time3 - precgxTime)) ? 
              window.str3 = ((((constCgx/5.0) - preconstCgx)*T_Scale)*1000)/(window.time3 - precgxTime) : 0;

            preconstCgx = constCgx/5.0;
            constCgx = 0;
            cgx_i = 0;
          }

          let speedDiv = document.getElementById("speed");
          speedDiv.innerHTML = "" + 
            (Math.round(window.str3 * 1000) / 1000);
        }

        for (let j = 0; j < pose.keypoints.length; j++) {
          // A keypoint is an object describing a body part (like rightArm or leftShoulder)
          let keypoint = pose.keypoints[j];
          // Only draw an ellipse is the pose probability is bigger than 0.2
          if (keypoint.score > 0.2) {

            fill(255, 0, 0);
            noStroke();
            ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
            text(keypoint.part, keypoint.position.x + 10, keypoint.position.y - 10);
            text(Date.now(), 10, 10);

            if(record3.length >= 10000) record3 = record3.splice(5000)  ;
            if(keypoint.position.x >= 0 && keypoint.position.y >= 0){
              record3.push(keypoint.score + ',' + keypoint.position.x + ',' + 
             keypoint.position.y + ',' +
              keypoint.part + ',' + Date.now());
            }
          }
        }
      }
    }

    // A function to draw the skeletons
    function drawSkeleton() {
      // Loop through all the skeletons detected
      for (let i = 0; i < poses.length; i++) {
        let skeleton = poses[i].skeleton;
        // For every skeleton, loop through all body connections
        for (let j = 0; j < skeleton.length; j++) {
          let partA = skeleton[j][0];
          let partB = skeleton[j][1];
          stroke(255, 0, 0);
          line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
      }
    }
    
    btn = document.querySelector('button'),
      chunks = [];
      
      function record() {
      chunks.length = 0;
      var options = {mimeType: 'video/webm;codecs=h264'};
      let stream = document.getElementById("defaultCanvas0").captureStream(30),
        recorder = new MediaRecorder(stream, options);
      recorder.ondataavailable = e => {
        if (e.data.size) {
          chunks.push(e.data);
        }
      };
      recorder.onstop = exportVideo;
      //止めたあとの処理
      startBtn.onclick = e => {
        recorder.stop();
        startBtn.textContent = 'start recording';
        startBtn.onclick = record;
        display_4("myChart4");
        display_5("myChart5");
        display_6('myChart6');
        display_7("myChart7");
        start_flag = false;
      };
      //開始した後の処理
      recorder.start();
      blt1.reset_record();
      blt2.reset_record();
      reset_log();
      window.centergx.length = 0;
      window.disp1.chart.data.length = 0;
      window.disp2.chart.data.length = 0;
      window.disp3.chart.data.length = 0;
      window.centergx.length = 0;
      startBtn.textContent = 'stop recording';
      start_flag = true;
      start_i = 1;
    }
    
    function exportVideo(e) {
      var blob = new Blob(chunks);
      if (vid == null) {
        vid = document.createElement('video');
      } else {
      }
      vid.width = width;
      vid.height = height;
      vid.id = 'recorded'
      vid.controls = true;
      vid.src = URL.createObjectURL(blob);
      document.body.appendChild(vid);
      vid.play();
    }
    startBtn.onclick = record;

    function logDataDownload(){
      var blob = new Blob([record3.join('\n')],{"type":"text/csv"});
      let link = document.createElement('a');
      link.href=window.URL.createObjectURL(blob);
      link.download='log_data.csv';
      link.click();
    }

    function GxDataDownload(){
      var blob = new Blob([window.centergx.join('\n')],{"type":"text/csv"});
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'centergx.csv'
      link.click()
    }

    function show_height(){
      let pxHeight = document.getElementById("px_height");
          pxHeight.innerHTML = "" + avgPxh*1.1;
          pxh = avgPxh*1.1;
          height_i = -1;
    }

    function reset_log() {
      record3.length=0;
    }

    //参考に作成した関数
let motion = 1;
let motioncount = 0;
let nosequeue = [];

function calcTrunk(SD1, SD2, HP2, HP1) {
  let X1 = SD1.x;
  let Y1 = SD1.y;
  let X2 = SD2.x;
  let Y2 = SD2.y;
  let X3 = HP1.x;
  let Y3 = HP1.y;
  let X4 = HP2.x;
  let Y4 = HP2.y;
  let S1 = (X1 * Y2 - X2 * Y1) / 2;
  let S2 = (X2 * Y3 - X3 * Y2) / 2;
  let S3 = (X3 * Y4 - X4 * Y3) / 2;
  let S4 = (X4 * Y1 - X1 * Y4) / 2;
  let S = S1 + S2 + S3 + S4;
  let XG1 = (X1 + X2) / 3;
  let XG2 = (X2 + X3) / 3;
  let XG3 = (X3 + X4) / 3;
  let XG4 = (X4 + X1) / 3;
  let YG1 = (Y1 + Y2) / 3;
  let YG2 = (Y2 + Y3) / 3;
  let YG3 = (Y3 + Y4) / 3;
  let YG4 = (Y4 + Y1) / 3;
  XG = (XG1 * S1 + XG2 * S2 + XG3 * S3 + XG4 * S4) / S;
  YG = (YG1 * S1 + YG2 * S2 + YG3 * S3 + YG4 * S4) / S;
  return [XG, YG];
}

function calcMidpoint(SD1, AN1) {
  let X1 = SD1.x;
  let Y1 = SD1.y;
  let X2 = AN1.x;
  let Y2 = AN1.y;
  return [(X1 + X2) / 2, (Y1 + Y2) / 2];
}