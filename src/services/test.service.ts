import { Provide, BaseService, validate } from '@/common/dependency-injection'

class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Pointer {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

@Provide('AbaService')
export class AbaService extends BaseService {

    @validate
    @Reflect.metadata('design:type', Point)
    public name: Point = new Point(1, 2);

    @validate
    @Reflect.metadata('design:type', Pointer)
    public pointer: Pointer = new Pointer(1, 2);

}

@Provide('TestService')
export class TestService extends BaseService {

}