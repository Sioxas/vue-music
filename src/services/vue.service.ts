import {Provide,BaseService} from '@/common/dependency-injection'

@Provide('VueService')
export class VueService extends BaseService{
    info = "vue service"

    hahah(){
        this.info = "service info"
    }

    created(){
        this.hahah()
    }
}