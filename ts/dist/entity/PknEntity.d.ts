import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Pkn, PknLoadMatch } from '../FlyffGameTypes';
declare class PknEntity extends FlyffGameEntityBase<Pkn> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: PknEntity): PknEntity;
    load(this: any, reqmatch?: PknLoadMatch, ctrl?: Control): Promise<PknEntity>;
}
export { PknEntity };
