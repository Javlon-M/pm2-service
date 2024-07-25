export default interface PM2{
    connectAndList(): Promise<void>
    stop(pid: number): Promise<string>
    start(port: string, pid: number): Promise<string>
}