//フォースプレートと接続して通信し、データを格納する処理
var record1 = [];
var record2 = [];
var record3 = [];
var centergx = [];
var str1 = "";
var str2 = "";
var str3 = 0;
var time1 = 0;
var time2 = 0;
var time3 = 0;
var count = 0;

//フォースプレート１と接続する処理
var blt_1 = function(disp) {
  
  this.uart_device = null;
  
  //micro:bit BLE UUID
  this.uuid = {};
  this.uuid["UART_SERVICE"]                 = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
  this.uuid["UART_SERVICE_CHARACTERISTICS"] = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
  
  //microbitと接続する
  this.connect = function() {
      navigator.bluetooth.requestDevice({
          filters: [{
              namePrefix: 'BBC micro:bit',
          }],
          optionalServices: [this.uuid["UART_SERVICE"]]
      })
      .then(device => {
          this.uart_device = device;
          return device.gatt.connect();
      })
      .then(server => {
          return server.getPrimaryService(this.uuid["UART_SERVICE"]);
      })
      .then(service => {
          return service.getCharacteristic(this.uuid["UART_SERVICE_CHARACTERISTICS"]);
      })
      .then(chara => {
          //alert("BLE connected");
          characteristic = chara;
          characteristic.startNotifications();
          characteristic.addEventListener('characteristicvaluechanged', this.onCharacteristicValueChanged);
      })
      .catch(error => {
          alert("BLE error");
          console.log(error);
          console.log(this.uuid);
      });
  }
  
  //microbitから受け取った文字列をwindowで保持している配列に数字に変換して追加する処理
  this.onCharacteristicValueChanged = function() {
      var str_arr = [];
      for (var i = 0; i < this.value.byteLength; i++) {
          str_arr[i] = this.value.getUint8(i);
      }
      //直接文字列を数値に変換せず、一旦格納
      window.str1 = String.fromCharCode.apply(null, str_arr);
      window.time1 = Date.now();
      if (window.record1.length >= 2000) {
        window.record1 = window.record1.splice(1000);
        //window.record1.shift();
      }
      //数値に変換し、時刻とともにwindowで保持している配列に格納
      if (Number.isInteger(Number(window.str1))) {
        window.record1.push(Number(window.str1) + ',' + window.time1);
        //console.log(Number(window.str1) + ',' + window.time1)
      }
  }
  
  //配列をリセットする処理
  this.reset_record = function() {
    window.record1.length = 0;
    console.log("reset");
  }
  
  //microbitを切断する処理
  this.disconnect = function() {
      if((!this.uart_device)||(!this.uart_device.gatt.connected)){
          console.log("return")
          return;
      }else{
          this.uart_device.gatt.disconnect();
          alert("BLE disconnected");
      }
  }

  //数値の始まりと終わりを示す
  this.start = function() {
    window.record1.push("Start");
  }

  this.stop = function() {
    window.record1.push("Stop");
  }
};

//フォースプレート２と接続する処理
var blt_2 = function(disp) {
  
  this.uart_device = null;
  
  //micro:bit BLE UUID
  this.uuid = {};
  this.uuid["UART_SERVICE"]                 = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
  this.uuid["UART_SERVICE_CHARACTERISTICS"] = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
  
  this.connect = function() {
      navigator.bluetooth.requestDevice({
          filters: [{
              namePrefix: 'BBC micro:bit',
          }],
          optionalServices: [this.uuid["UART_SERVICE"]]
      })
      .then(device => {
          this.uart_device = device;
          return device.gatt.connect();
      })
      .then(server => {
          return server.getPrimaryService(this.uuid["UART_SERVICE"]);
      })
      .then(service => {
          return service.getCharacteristic(this.uuid["UART_SERVICE_CHARACTERISTICS"]);
      })
      .then(chara => {
          //alert("BLE connected");
          characteristic = chara;
          characteristic.startNotifications();
          characteristic.addEventListener('characteristicvaluechanged', this.onCharacteristicValueChanged);
      })
      .catch(error => {
          alert("BLE error");
          console.log(error);
          console.log(this.uuid);
      });
  }
  
  this.onCharacteristicValueChanged = function() {
      var str_arr = [];
      for (var i = 0; i < this.value.byteLength; i++) {
          
          str_arr[i] = this.value.getUint8(i);
      }
      window.str2 = String.fromCharCode.apply(null, str_arr);
      window.time2 = Date.now();
      if (window.record2.length >= 2000) {
        window.record2 = window.record2.splice(1000);
        //window.record2.shift();
      }
      if (Number.isInteger(Number(window.str2))) {
        window.record2.push(Number(window.str2) + ',' + window.time2);
      }
  }
  
  this.reset_record = function() {
    window.record2.length = 0;
    console.log("reset");
  }
  
  this.disconnect = function() {
      if((!this.uart_device)||(!this.uart_device.gatt.connected)){
          console.log("return")
          return;
      }else{
          this.uart_device.gatt.disconnect();
          alert("BLE disconnected");
      }
  }
};