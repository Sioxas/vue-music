import {Provide,BaseService,Inject} from '@/common/dependency-injection'
import { AuthService } from '@/services/auth.service';

@Provide('Test3Service')
export class Test3Service extends BaseService{
    @Inject('AuthService') auth!:AuthService
    created(){
        console.log(this.auth)
        setTimeout(()=>{

            this.auth.changeName('auth name changed in Test3Service through method')

        },3000)
    }
}