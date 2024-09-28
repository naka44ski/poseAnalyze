//描画処理
var display_1 = function(chartname) {
  this.ctx = document.getElementById(chartname).getContext('2d');
  
  this.chart = new Chart(this.ctx, {
    type: 'line',
    data: {
      datasets: [{
        data: []
      }, {
        data: []
      }]
    },
    options: {
      tooltips: {
        enabled: false
      },
      scales: {
        xAxes: [{
          type: 'realtime'
        }],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0,
            },
            scaleLabel: {
              display: true,
              labelString: 'アナログ値',
              fontSize: 14
          },
          }
        ]
      },
      plugins: {
        streaming: {
          duration: 10000,
          refresh: 250,
          delay: 1000,
          frameRate: 30,
          pause: false,
          
          onRefresh: function(chart) {
            chart.data.datasets[0].data.push({
                x: Date.now(),
                //y: Number(window.str1)
                y: 1023-Number(window.str1)
            });
          }
        }
      }
    }
    });
    
    this.fileDownload = function(){
      var blob = new Blob([window.record1.join('\n')],{"type":"text/csv"});
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'record_right.csv'
      link.click()
    }
};

//描画処理
var display_2 = function(chartname) {
  this.ctx = document.getElementById(chartname).getContext('2d');
  
  this.chart = new Chart(this.ctx, {
    type: 'line',
    data: {
      datasets: [{
        data: []
      }, {
        data: []
      }]
    },
    options: {
      tooltips: {
        enabled: false
      },
      scales: {
        xAxes: [{
          type: 'realtime'
        }],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0,
            },
            scaleLabel: {
              display: true,
              labelString: 'アナログ値',
              fontSize: 14
          },
          }
        ]
      },
      plugins: {
        streaming: {
          duration: 10000,
          refresh: 250,
          delay: 1000,
          frameRate: 30,
          pause: false,
          
          onRefresh: function(chart) {
            chart.data.datasets[0].data.push({
                x: Date.now(),
                y: 1023-Number(window.str2)
            });
          }
        }
      }
    }
    });
    
    this.fileDownload = function(){
      var blob = new Blob([window.record2.join('\n')],{"type":"text/csv"});
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'record_left.csv'
      link.click()
    }
};

  
//描画処理
var display_3 = function(chartname) {
  this.ctx = document.getElementById(chartname).getContext('2d');
  
  this.chart = new Chart(this.ctx, {
    type: 'line',
    data: {
      datasets: [{
        data: []
      }, {
        data: []
      }]
    },
    options: {
      tooltips: {
        enabled: false
      },
      scales: {
        xAxes: [{
          type: 'realtime'
        }],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0,
            },
            scaleLabel: {
              display: true,
              labelString: '重心移動速度',
              fontSize: 14
          },
          }
        ]
      },
      plugins: {
        streaming: {
          duration: 10000,
          refresh: 250,
          delay: 1000,
          frameRate:30,
          pause: false,
          
          onRefresh: function(chart) {
            chart.data.datasets[0].data.push({
                x: Date.now(),
                y: Number(window.str3)
            });
          }
        }
      }
    }
    });
};

//描画処理
var display_4 = function(chartname) {
this.ctx = document.getElementById(chartname).getContext('2d');
var fp1 = [];
var fp1_time = [];
for (var i = 0;i < window.record1.length; i++) {
  var tmp = [2]; 
  tmp = window.record1[i].split(',');
  fp1.push(1018 - Number(tmp[0]));
  fp1_time.push(tmp[1]);
}
this.chart = new Chart(this.ctx, {
  type: 'line',
  data: {
    labels: fp1_time,
    datasets: [{
        label: 'アナログ値',
        data: fp1,
        borderColor: 'rgba(255, 100, 100, 1)',
        lineTension: 0,
        fill: false,
        borderWidth: 1
    }]
},
  options: {
    scales: {
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: '時刻'
            }
        }],
        yAxes: [{
            ticks: {
                min: 0,
                userCallback: function(tick) {
                    return tick.toString();
                }
            },
            scaleLabel: {
                display: true,
                labelString: ''
            }
        }]
    },
    title: {
        display: true,
        text: ''
    }
}
  });
  
  this.fileDownload = function(){
    var blob = new Blob([window.record1.join('\n')],{"type":"text/csv"});
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = 'record_right.csv'
    link.click()
  }
};

//描画処理
var display_5 = function(chartname) {
  this.ctx = document.getElementById(chartname).getContext('2d');
  var fp1 = [];
  var fp1_time = [];
  for (var i = 0;i < window.record2.length; i++) {
    var tmp = [2]; 
    tmp = window.record2[i].split(',');
    fp1.push(1018 - Number(tmp[0]));
    fp1_time.push(tmp[1]);
  }
  this.chart = new Chart(this.ctx, {
    type: 'line',
    data: {
      labels: fp1_time,
      datasets: [{
          label: 'アナログ値',
          data: fp1,
          borderColor: 'rgba(255, 100, 100, 1)',
          lineTension: 0,
          fill: false,
          borderWidth: 1
      }]
  },
    options: {
      scales: {
          xAxes: [{
              scaleLabel: {
                  display: true,
                  labelString: '時刻'
              }
          }],
          yAxes: [{
              ticks: {
                  min: 0,
                  userCallback: function(tick) {
                      return tick.toString();
                  }
              },
              scaleLabel: {
                  display: true,
                  labelString: ''
              }
          }]
      },
      title: {
          display: true,
          text: ''
      }
  }
    });
    
    this.fileDownload = function(){
      var blob = new Blob([window.record2.join('\n')],{"type":"text/csv"});
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'record_right.csv'
      link.click()
    }
};

//描画処理
var display_6 = function(chartname) {
  this.ctx = document.getElementById(chartname).getContext('2d');
  var fp1 = [];
  var fp1_time = [];
  for (var i = 0;i < window.centergx.length; i++) {
    var tmp = [2]; 
    tmp = window.centergx[i].split(',');
    fp1.push(1018 - Number(tmp[0]));
    fp1_time.push(tmp[1]);
  }
  this.chart = new Chart(this.ctx, {
    type: 'line',
    data: {
      labels: fp1_time,
      datasets: [{
          label: '重心座標',
          data: fp1,
          borderColor: 'rgba(255, 100, 100, 1)',
          lineTension: 0,
          fill: false,
          borderWidth: 1
      }]
  },
    options: {
      scales: {
          xAxes: [{
              scaleLabel: {
                  display: true,
                  labelString: '時刻'
              }
          }],
          yAxes: [{
              ticks: {
                  min: 0,
                  userCallback: function(tick) {
                      return tick.toString();
                  }
              },
              scaleLabel: {
                  display: true,
                  labelString: ''
              }
          }]
      },
      title: {
          display: true,
          text: ''
      }
  }
    });
    
    this.fileDownload = function(){
      var blob = new Blob([window.record2.join('\n')],{"type":"text/csv"});
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'record_right.csv'
      link.click()
    }
};

var rep = [];
var rep1 = [];
var rep2 = [];
var rep3 = [];
var w1 = [];
var w2 = [];
var speed3 = [];
var speed4 = [];
var time = [];
var barChartData;
var complexChartOption;

function saikiTmp(array, array_t) {
  for(i = 1; ; i++){
    if(i >= array.length){
      break;
    }
    if(Math.abs(array[i-1]-array[i]) >= 100){
      array.splice(i, 1);
      array_t.splice(i,1);
      i = i-1;
    }
  }

  return [array,array_t]
}

function calc() {
var tmp1 = [];
var tmp1_t = [];
var tmp2 = [];
var tmp2_t = [];
var tmp33 = [];
var tmp33_t = [];
rep = [];
rep1 = [];
rep2 = [];
rep3 = [];
w1 = [];
w2 = [];
speed3 = [];
time = [];


for (var i = 0;i < window.record1.length; i++) {
  var tmp = [2];
  tmp = window.record1[i].split(',');
  tmp1_t[i] = (Number(tmp[1]));
  tmp1[i] = (Number(tmp[0]));
}

for (var i = 0;i < window.record2.length; i++) {
  var tmp = [2]; 
  tmp = window.record2[i].split(',');
  tmp2_t[i] = (Number(tmp[1]));
  tmp2[i] = (Number(tmp[0]));
}

for (var i = 0;i < window.centergx.length; i++) {
  var tmp = [2]; 
  tmp = window.centergx[i].split(',');
  tmp33_t[i] = (Number(tmp[1]));
  tmp33[i] = (Number(tmp[0]));
}

var t1 = 0;
var t2 = 0;
var t3 = 0;

let arrayTmp = saikiTmp(tmp33,tmp33_t);

var tmp3pre = arrayTmp[0];
var tmp3pre_t = arrayTmp[1];

var tmp3 = [];
var tmp3_t = [];

for (var i = 0;i <tmp3pre.length-1; i++) {
  var sum = 0;
  for(var j = 0;j < 8; j++) {
    sum += tmp3pre[i+j];
  }
  tmp3[i] = sum/8.0;

  var sum_t = 0;
  for(var j=0; j<6; j++) {
    sum_t += tmp3pre_t[i+j];
  }
  tmp3_t[i] = sum_t/6.0;
}

var n1 = tmp1_t[0];
var n2 = tmp2_t[0];
var n3 = tmp3_t[0];

var min = n1;
if( n2 < min ) {
  min = n2;
}
if( n3 < min ) {
  min = n3;
}

var m1 = tmp1_t[tmp1.length-1];
var m2 = tmp2_t[tmp2.length-1];
var m3 = tmp3_t[tmp3.length-1];

console.log(m1, m2, m3);
var max = m1;
if( max < m2 ) {
  max = m2;
}
if( max < m3 ) {
  max = m3;
}

console.log(min, max);

const s = T_Scale*1000;
speed3[0] = 0;
for (let i = 1; i < tmp3.length; i++) {
  if(tmp3[i] <= tmp3[i-1]){
    speed3[i] = speed3[i-1];
  } else {
    speed3[i] = ((tmp3[i]-tmp3[i-1])*s)/((tmp3_t[i]-tmp3_t[i-1]));
  }
}

for (var i = 0;i <speed3.length-1; i++) {
  var sum = 0;
  for(var j = 0;j < 8; j++) {
    sum += speed3[i+j];
  }
  speed4[i] = sum/8.0;
}

let k = 0;
for (let i = min; i <= max; i++){
  var c = 0;
  if(tmp1_t[t1] <= i){
    c = 1;
    rep[k] = tmp1_t[t1];
    rep1[k] = tmp1[t1];
    rep2[k] = tmp2[t2];
    rep3[k] = speed4[t3];
    t1++;
  }
  if(tmp2_t[t2] <= i){
    c = 2;
    rep[k] = tmp2_t[t2];
    rep1[k] = tmp1[t1];
    rep2[k] = tmp2[t2];
    rep3[k] = speed4[t3];
    t2++;
  }
  if(tmp3_t[t3] <= i){
    c = 3;
    rep[k] = tmp3_t[t3];
    rep1[k] = tmp1[t1];
    rep2[k] = tmp2[t2];
    rep3[k] = speed4[t3];
    t3++;
  }
  if(c != 0){
    k++;
  }
}

let jiku = document.getElementById("jiku");
let humikomi = document.getElementById("humikomi");
console.log(jiku.value,humikomi.value);
let JK = (isNaN(jiku.value) ? 1.7 : jiku.value);
let HK = (isNaN(humikomi.value) ? 1.7 : humikomi.value);
console.log(JK,HK);
for (let i = 1; i < rep1.length; i++) {
  w1[i] = JK*(157.63514*Math.exp(-0.00454899421*(rep1[i]-567.574356)) - 17.8917946);
}

for (let i = 1; i < rep2.length; i++) {
  w2[i] = HK*(157.63514*Math.exp(-0.00454899421*(rep2[i]-567.574356)) - 17.8917946);
}

let del = 0;
for(let i = rep.length-1; i >= 0; i--) {
  if((w1[i] < 15 && w2[i] < 15) || (isNaN(w1[i]) && w2[i] < 15) || (w1[i] < 15 && isNaN(w2[i])) || (isNaN(w1[i]) && isNaN(w2[i])) ){
    del++;
  }else {
    break;
  }
}

for(let i = 0; i < del; i++){
  rep.pop();
  w1.pop();
  w2.pop();
  rep3.pop();
}

del = 0;
for(let i = 0; i <rep.length; i++) {
  if((w1[i] < 15 && w2[i] < 15) || (isNaN(w1[i]) && w2[i] < 15) || (w1[i] < 15 && isNaN(w2[i])) || (isNaN(w1[i]) && isNaN(w2[i])) ){
    del++;
  }else {
    break;
  }
}

for(let i = 0; i < del; i++){
  rep.shift();
  w1.shift();
  w2.shift();
  rep3.shift();
}


let maxSpeedDiv = document.getElementById("maxspeed");
maxSpeedDiv.innerHTML = "" + Math.max(...rep3);
let maxJK = document.getElementById("maxJK");
maxJK.innerHTML = "" + Math.max(...w1);
let maxHK = document.getElementById("maxHK");
maxHK.innerHTML = "" + Math.max(...w2);

barChartData = {
  labels: rep,
  datasets: [
    {
        type: 'line',
        label: '地面反力(軸足)',
        data: w1,
        borderColor : "rgba(54,164,235,0.8)",
        fill: false,
        pointRadius: 0,
        yAxisID: "y-axis-1",// 追加
        cubicInterpolationMode: "default",
    },{
        type: 'line',
        label: '地面反力(踏込足)',
        data: w2,
        borderColor : "rgba(132,235,94,0.8)",
        fill: false,
        pointRadius: 0,
        yAxisID: "y-axis-1",// 追加
        cubicInterpolationMode: "default",
    },
    {
        type: 'line',
        label: '重心移動速度',
        data: rep3,
        borderColor : "rgba(254,97,132,0.5)",
        fill: false,
        pointRadius: 0,
        yAxisID: "y-axis-2",
        cubicInterpolationMode: "default",
    },
  ],
}

complexChartOption = {
  responsive: true,
  scales: {
      xAxes: [{scaleLabel: {                 // 軸ラベル
                          display: true,                // 表示設定
                          labelString: '経過秒数[ms]',    // ラベル
                          fontColor: "black",             // 文字の色
                          fontSize: 16                  // フォントサイズ
                      }}],
      yAxes: [{
          id: "y-axis-1",
          type: "linear", 
          position: "left",
          scaleLabel: {                 // 軸ラベル
                          display: true,                // 表示設定
                          labelString: '[kgf]',    // ラベル
                          fontColor: "black",             // 文字の色
                          fontSize: 16            // フォントサイズ
                      },
          ticks: {
              max: 100,
              min: 0,
              stepSize: 10
          },
      },{
          id: "y-axis-2",
          type: "linear", 
          position: "right",
          scaleLabel: {                 // 軸ラベル
                          display: true,                // 表示設定
                          labelString: '[m/s]',    // ラベル
                          fontColor: "black",             // 文字の色
                          fontSize: 16                  // フォントサイズ
                      },
          ticks: {
              max: 5,
              min: 0,
              stepSize: 1
          },
          gridLines: {
              drawOnChartArea: false, 
          },
      },],
  }
};
}


//描画処理
var display_7 = function(chartname) {
  calc();
  ctx = document.getElementById(chartname).getContext("2d");
  window.myBar = new Chart(ctx, {
      type: 'bar',
      data: barChartData,
      options: complexChartOption
  });
};

var disp1 = new display_1('myChart1');
var disp2 = new display_2('myChart2');
var disp3 = new display_3("myChart3");
var blt1 = new blt_1(disp1);
var blt2 = new blt_2(disp2);