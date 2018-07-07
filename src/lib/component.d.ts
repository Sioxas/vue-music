import Vue, { ComponentOptions } from 'vue';
import { VueClass } from '@/lib/declarations';
export declare const $internalHooks: string[];
export declare function componentFactory<VC extends VueClass<Vue>>(Component:VC, options?: ComponentOptions<Vue>): VC;
