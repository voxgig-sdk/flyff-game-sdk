import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Lifestyle, LifestyleLoadMatch } from '../FlyffGameTypes';
declare class LifestyleEntity extends FlyffGameEntityBase<Lifestyle> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: LifestyleEntity): LifestyleEntity;
    load(this: any, reqmatch?: LifestyleLoadMatch, ctrl?: Control): Promise<LifestyleEntity>;
}
export { LifestyleEntity };
