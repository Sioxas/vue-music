import {Provide,BaseService} from '@/common/dependency-injection'
import { AuthService } from '@/services/auth.service';

@Provide('Test2Service')
export class Test2Service extends BaseService{
    
}