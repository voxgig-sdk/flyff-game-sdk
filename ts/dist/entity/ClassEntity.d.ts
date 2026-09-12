import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Class, ClassLoadMatch, ClassListMatch } from '../FlyffGameTypes';
declare class ClassEntity extends FlyffGameEntityBase<Class> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: ClassEntity): ClassEntity;
    load(this: any, reqmatch?: ClassLoadMatch, ctrl?: Control): Promise<ClassEntity>;
    list(this: any, reqmatch?: ClassListMatch, ctrl?: Control): Promise<ClassEntity[]>;
}
export { ClassEntity };
