    // Copyright (c) 2018 ml5
    //
    // This software is released under the MIT License.
    // https://opensource.org/licenses/MIT
    
    /* ===
    ml5 Example
    PoseNet example using p5.js
    === */
    let hoge;
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
      // 横幅は画面全体、縦幅はデバイスに応じて適切に調整
      createCanvas(windowWidth * 0.98, windowWidth * 0.75 * 0.98);
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

    function windowResized() {
      // ウィンドウサイズが変わったときにキャンバスサイズをリサイズする
      resizeCanvas(windowWidth * 0.98, windowWidth * 0.75 * 0.9);
      video.size(width, height); // videoのサイズもキャンバスに合わせてリサイズ
    }
    
    function modelReady() {
      select('#status').html('Model Loaded');
    }
    
    //1フレーム（1/60秒）ごとに実行される関数。描画される内容を書く。
    function draw() {
      image(video, 0, 0, width, height);
      // We can call both functions to draw all keypoints and the skeletons
      drawKeypoints();
      drawSkeleton();
    }
    
    // A function to draw ellipses over the detected keypoints
    function drawKeypoints()  {
      // Loop through all the poses detected
      for (let i = 0; i < poses.length; i++) {
        // For each pose detected, loop through all the keypoints
        let pose = poses[i].pose;
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

            if(record3.length >= 10000) record3 = record3.splice(5000);
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
        start_flag = false;
      };
      //開始した後の処理
      recorder.start();
      reset_log();
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

    function reset_log() {
      record3.length=0;
    }