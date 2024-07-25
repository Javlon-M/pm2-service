import PM2 from "./components/pm2";
import PM2impl from "./components/pm2";

(async function (){
    const pm2: PM2 = new PM2impl()

    await pm2.connectAndList()

    const status = await pm2.stop(0)

    if(status === 'Success'){
       try{
           await pm2.start('8080', 0)
       }catch (err){
           console.log(err)
       }
    }
})()
