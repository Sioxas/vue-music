import { MyhttpService } from './http.service'

function realServiceName(serviceShortName){
    return serviceShortName.substring(0,1).toUpperCase()+serviceShortName.substring(1)+'Service'
}

function getServiceShortName(serviceName){
    return serviceName.replace('Service','').toLowerCase()
}

function assembleProperty(serviceShortName,serviceInstance){
    return {
        ['$'+serviceShortName]:{
            get(){
                return serviceInstance
            }
        }
    }
}

class Provider{
    instances = {MyhttpService}
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

class Provider4Vue{
    instances = {}
    install(Vue,services){
        this.instances = Object.keys(services).map(s=>{
            services[s].prototype.__name = s
            return {
                [s]:new services[s]()
            }
        }).reduce((a,b)=>({...a,...b}),this.instances)

        const properties = Object.keys(this.instances).map(name=>{
            const initFn = this.instances[name].onInit
            if(initFn){
                initFn(this)
            }
            const __services = this.instances[name].__services
            if(__services){
                Object.defineProperties(this.instances[name],__services
                    .map(s=>assembleProperty(s,this.instances[s]))
                    .reduce((a,b)=>({...a,...b}),{}))
            }
            return assembleProperty(getServiceShortName(name),this.instances[name])
        }).reduce((a,b)=>({...a,...b}),{})
        
        Object.defineProperties(Vue.prototype,properties)
    }
    get(serviceShortName){
        const args = Array.from(arguments)
        return args.length>1 
            ? args.map(s=>this.instances[realServiceName(s)]) 
            : this.instances[realServiceName(serviceShortName)]
    }
}

export const DI4Vue = new Provider4Vue()
