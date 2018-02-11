import { HttpService } from './http.service'
import { NotifyService } from './notify.service'
import { PlayerService } from './player.service'
import { ApiService } from './api.service'
import { service } from './../config/types'

export const provider = new Provider({
    [service.HTTP]:HttpService,
    [service.API]:ApiService,
    [service.PLAYER]:PlayerService,
    [service.NOTIFY]:NotifyService
})

class Provider{
    instances = {}
    constructor(services){
        this.instances = Object.keys(services).map(s=>({
            [s]:new services[s]()
        })).reduce((a,b)=>({...a,...b}),this.instances)
    }
    get(serviceName){
        const args = Array.from(arguments)
        return args.length>1 
            ? args.map(s=>this.instances[s]) 
            : this.instances[serviceName]
    }
}