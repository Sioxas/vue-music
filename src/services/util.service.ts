import { BaseService, Provide } from '@/common/dependency-injection';
import Vue from 'vue';
import { service } from '@/common/types';

@Provide(service.UTIL)
export class UtilService extends BaseService {
    
}
