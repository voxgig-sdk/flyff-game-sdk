import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { HousingPack, HousingPackLoadMatch, HousingPackListMatch } from '../FlyffGameTypes';
declare class HousingPackEntity extends FlyffGameEntityBase<HousingPack> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: HousingPackEntity): HousingPackEntity;
    load(this: any, reqmatch?: HousingPackLoadMatch, ctrl?: Control): Promise<HousingPackEntity>;
    list(this: any, reqmatch?: HousingPackListMatch, ctrl?: Control): Promise<HousingPackEntity[]>;
}
export { HousingPackEntity };
