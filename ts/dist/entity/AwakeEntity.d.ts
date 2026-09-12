import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Awake, AwakeLoadMatch } from '../FlyffGameTypes';
declare class AwakeEntity extends FlyffGameEntityBase<Awake> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: AwakeEntity): AwakeEntity;
    load(this: any, reqmatch?: AwakeLoadMatch, ctrl?: Control): Promise<AwakeEntity>;
}
export { AwakeEntity };
