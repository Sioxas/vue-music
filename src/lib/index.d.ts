import Vue, { ComponentOptions } from 'vue';
import { VueClass } from '@/lib/declarations';
export { createDecorator, VueDecorator, mixins } from '@/lib/util';
declare function Component<V extends Vue>(options: ComponentOptions<V> & ThisType<V>): <VC extends VueClass<V>>(target: VC) => VC;
declare function Component<VC extends VueClass<Vue>>(target: VC): VC;
declare namespace Component {
    function registerHooks(keys: string[]): void;
}
export default Component;
