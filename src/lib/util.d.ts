import Vue, { ComponentOptions } from 'vue';
import { VueClass } from '@/lib/declarations';
export declare const noop: () => void;
export declare const hasProto: boolean;
export interface VueDecorator {
    (Ctor: typeof Vue): void;
    (target: Vue, key: string): void;
    (target: Vue, key: string, index: number): void;
}
export declare function createDecorator(factory: (options: ComponentOptions<Vue>, key: string, index: number) => void): VueDecorator;
export declare function mixins<A>(CtorA: VueClass<A>): VueClass<A>;
export declare function mixins<A, B>(CtorA: VueClass<A>, CtorB: VueClass<B>): VueClass<A & B>;
export declare function mixins<A, B, C>(CtorA: VueClass<A>, CtorB: VueClass<B>, CtorC: VueClass<C>): VueClass<A & B & C>;
export declare function mixins<A, B, C, D>(CtorA: VueClass<A>, CtorB: VueClass<B>, CtorC: VueClass<C>, CtorD: VueClass<D>): VueClass<A & B & C & D>;
export declare function mixins<A, B, C, D, E>(CtorA: VueClass<A>, CtorB: VueClass<B>, CtorC: VueClass<C>, CtorD: VueClass<D>, CtorE: VueClass<E>): VueClass<A & B & C & D & E>;
export declare function mixins<T>(...Ctors: Array<VueClass<Vue>>): VueClass<T>;
export declare function isPrimitive(value: any): boolean;
export declare function warn(message: string): void;
