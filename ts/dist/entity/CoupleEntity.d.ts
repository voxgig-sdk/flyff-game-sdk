import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Couple, CoupleLoadMatch } from '../FlyffGameTypes';
declare class CoupleEntity extends FlyffGameEntityBase<Couple> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: CoupleEntity): CoupleEntity;
    load(this: any, reqmatch?: CoupleLoadMatch, ctrl?: Control): Promise<CoupleEntity>;
}
export { CoupleEntity };
