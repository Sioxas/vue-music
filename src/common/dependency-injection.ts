import Vue, { ComponentOptions } from 'vue'
import { VueClass } from '@/lib/declarations'
import { componentFactory } from '@/lib/component'

import 'reflect-metadata';

export function validate(target: any, propertyKey: string) {

    const type = Reflect.getMetadata('design:type', target, propertyKey);
    console.log(type.name);

}

const instances: {
    [key: string]: any,
} = {}

export function Provide(name: string) {
    return function <VC extends VueClass<Vue>>(target: VC) {
        console.log(target)
        return componentFactory(target, {
            name,
        })
    }
}

export class BaseService extends Vue { }

export function Inject(service: Function | string) {
    return function(target: any, key: string) {
        Object.defineProperty(target, key, {
            get() {
                return typeof service === 'function'
                    ? instances[service.name]
                    : instances[service]
            },
            configurable: true,
        })
    }
}

export function Provider<VC extends VueClass<Vue>>(providers: VC[]) {
    providers.forEach((provider) => {
        const instance = new (provider as VC)()
        Object.defineProperty(instances, instance.$options.name!, {
            get() {
                return instance
            },
            configurable: true,
        })
    });
    return instances;
}
