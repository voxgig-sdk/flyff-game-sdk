import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Core, CoreLoadMatch } from '../FlyffGameTypes';
declare class CoreEntity extends FlyffGameEntityBase<Core> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: CoreEntity): CoreEntity;
    load(this: any, reqmatch?: CoreLoadMatch, ctrl?: Control): Promise<CoreEntity>;
}
export { CoreEntity };
