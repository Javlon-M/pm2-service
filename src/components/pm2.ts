import pm2 from 'pm2'
import * as process from "process";
import PM2 from "./types/PM2";
import PM2Process from "./types/PM2Process";

export default class PM2impl implements PM2{
    private list: PM2Process[]

    private connect(): Promise<string> {
        return new Promise((resolve, reject)=>{
            pm2.connect((err) => {
                if(err){
                    reject(err)
                    process.exit(2)
                }

                resolve('Success')
            })
        })
    }

    public async connectAndList(): Promise<void>{
         const message: string = await this.connect()

         if(message === 'Success'){
             await this.listProcesses()
         }
    }

    public consoleList(): void{
        console.log(this.list)
    }

    private listProcesses(): Promise<string>{
        return new Promise((resolve, reject) => {
            pm2.list((err, list) => {
                if(err){
                    reject(err)
                }
                this.list = list.map((process) => {
                   return {
                       pid: process.pid,
                       name: process.name,
                       path: process.pm2_env.pm_exec_path,
                       pm_id: process.pm_id
                   }
               })

                resolve('Listed successfully')
            })
        })
    }

    public stop(pm_id: number): Promise<string>{
        return new Promise((resolve, reject)=>{
            pm2.stop(pm_id, (err) => {
                if(err){
                    reject(err)
                }
                console.log('Stopped Successfully pm_id', pm_id)
                resolve('Success')
            })
        })
    }

    private getPath(pm_id: number): string{
        let path = ''
        for(let i = 0; i <= this.list.length - 1; i++){
            if (this.list[i].pm_id === pm_id){
                path = this.list[i].path
            }
        }

        return path
    }

    public start(port: string, pm_id: number): Promise<string>{
        const path: string = this.getPath(pm_id)

        return new Promise((resolve, reject) => {
            pm2.start({env: {"PORT": port}, script: path }, (err)=>{
                if(err) {
                    pm2.disconnect()
                    reject(err)
                }

                console.log('Started Successfully pm_id', pm_id)

                resolve('Success')
            })
        })
    }
}
