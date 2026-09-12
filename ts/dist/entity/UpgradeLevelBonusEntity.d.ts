import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { UpgradeLevelBonus, UpgradeLevelBonusLoadMatch } from '../FlyffGameTypes';
declare class UpgradeLevelBonusEntity extends FlyffGameEntityBase<UpgradeLevelBonus> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: UpgradeLevelBonusEntity): UpgradeLevelBonusEntity;
    load(this: any, reqmatch?: UpgradeLevelBonusLoadMatch, ctrl?: Control): Promise<UpgradeLevelBonusEntity>;
}
export { UpgradeLevelBonusEntity };
