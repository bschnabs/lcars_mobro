import "./app.css"
import "../lcars/css/lcars.css"

(async () => {

   // console.log('test');
   // console.log(document);
   // var top = document.getElementById("cpuTemp8.3");
   // top.classList.remove('lcars-red-alert-bg');
   // top.classList.add('lcars-danub-bg');


   /*CPU VARIABLES*/
   var cpuTempBars = document.querySelectorAll('div[id*="cpuTemp"]');
   var cpuTempVal = document.getElementById('cpuTmpVal');
   var cpuLoadBars = document.querySelectorAll('div[id*="cpuLoad"]');
   var cpuLoadVal = document.getElementById('cpuLdVal');

   /*GPU VARIABLES*/
   var gpuTempBar = document.getElementById('gpuTempBar');
   var gpuLoadBar = document.getElementById('gpuLoadBar');

   await MobroSDK.init().then(() => {
      /*CPU TEMP*/
      MobroSDK.addChannelListener('general_processor_temperature', (data) => {
         var temp = data.payload.value;
         cpuTempVal.innerText = temp + String.fromCharCode(176) + 'C'
         for (var x = 0; x < cpuTempBars.length; x++) {
            var staticTemp = cpuTempBars[x].id.replace('cpuTemp', '');
            if (staticTemp > temp) {
               cpuTempBars[x].classList.remove('lcars-red-alert-bg');
               cpuTempBars[x].classList.remove('lcars-red-alert-color');
               cpuTempBars[x].classList.add('lcars-danub-bg');
               cpuTempBars[x].classList.add('lcars-danub-color');
            } else {
               cpuTempBars[x].classList.add('lcars-red-alert-bg');
               cpuTempBars[x].classList.add('lcars-red-alert-color');
               cpuTempBars[x].classList.remove('lcars-danub-bg');
               cpuTempBars[x].classList.remove('lcars-danub-color');
            }
         }
      });

      /*CPU LOAD*/
      MobroSDK.addChannelListener('general_processor_usage', (data) => {
         var load = data.payload.value;
         cpuLoadVal.innerText = load.toFixed(2) + '%';
         for (var x = 0; x < cpuLoadBars.length; x++) {
            var staticLoad = cpuLoadBars[x].id.replace('cpuLoad', '');
            if (staticLoad > load) {
               cpuLoadBars[x].classList.remove('lcars-red-alert-bg');
               cpuLoadBars[x].classList.remove('lcars-red-alert-color');
               cpuLoadBars[x].classList.add('lcars-danub-bg');
               cpuLoadBars[x].classList.add('lcars-danub-color');
            } else {
               cpuLoadBars[x].classList.add('lcars-red-alert-bg');
               cpuLoadBars[x].classList.add('lcars-red-alert-color');
               cpuLoadBars[x].classList.remove('lcars-danub-bg');
               cpuLoadBars[x].classList.remove('lcars-danub-color');
            }
         }
      });

      /*GPU TEMP*/
      MobroSDK.addChannelListener('general_graphics_temperature', (data) => {
         var gpuTempPerc = data.payload.value + '%';
         gpuTempBar.style.width = gpuTempPerc;
         gpuTempBar.innerText = data.payload.value + String.fromCharCode(176) + 'C'
      });

      /*GPU LOAD*/
      MobroSDK.addChannelListener('general_graphics_usage', (data) => {
         var gpuLoadPerc = data.payload.value + '%';
         gpuLoadBar.style.width = gpuLoadPerc;
         gpuLoadBar.innerText = gpuLoadPerc;
      });
   });

   /*CPU LOAD*/

   let data = await MobroSDK.emit("monitor:sensor:data", "general_processor_usage");
   console.log(data.value);
   var cpuBars = document.querySelectorAll('div[id*="cpuTemp"]');
   console.log(cpuBars);
   for (var x = 0; x < cpuBars.length; x++) {
      //console.log(cpuBars[x].id.replace('cpuTemp', ''));
      var staticTemp = cpuBars[x].id.replace('cpuTemp', '');
      if (staticTemp > data.value) {
         cpuBars[x].classList.remove('lcars-red-alert-bg');
         cpuBars[x].classList.remove('lcars-red-alert-color');
         cpuBars[x].classList.add('lcars-danub-bg');
         cpuBars[x].classList.add('lcars-danub-color');
      }
   }
})();