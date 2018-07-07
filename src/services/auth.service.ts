import {BaseService,Provide} from '@/common/dependency-injection'

@Provide('AuthService')
export class AuthService extends BaseService {

    name = 'asdf'

    created(){
        setTimeout(()=>{
            this.name = 'auth name changed in service'
        },2000)
    }

    changeName(name:string){
        this.name = name
    }
}