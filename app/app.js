import "./app.css"
import "../lcars/css/lcars.css"

(async () => {

   console.log('test');

   await MobroSDK.init();

   let data = await MobroSDK.emit("monitor:sensor:data", "general_processor_usage");

   MobroSDK.addChannelListener("processor", (data) => {
      console.log(data.payload);
   });

   console.log(data);
})();