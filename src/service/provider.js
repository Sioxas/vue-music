import { HttpService } from './http.service'
import { NotifyService } from './notify.service'
import { PlayerService } from './player.service'
import { ApiService } from './api.service'

function realServiceName(serviceShortName){
    return serviceShortName.substring(0,1).toUpperCase()+serviceShortName.substring(1)+'Service'
}
class Provider{
    instances = {HttpService}
    constructor(services){
        this.instances = Object.keys(services).map(s=>({
            [s]:new services[s]()
        })).reduce((a,b)=>({...a,...b}),this.instances)
        Object.keys(this.instances).forEach(name=>{
            let initFn = this.instances[name].onInit
            if(initFn){
                initFn(this)
            }
        })
    }
    get(serviceShortName){
        const args = Array.from(arguments)
        return args.length>1 
            ? args.map(s=>this.instances[realServiceName(s)]) 
            : this.instances[realServiceName(serviceShortName)]
    }
}

export const DI = new Provider({
    ApiService,
    PlayerService,
    NotifyService
})

