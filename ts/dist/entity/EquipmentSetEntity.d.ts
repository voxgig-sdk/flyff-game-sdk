import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { EquipmentSet, EquipmentSetLoadMatch, EquipmentSetListMatch } from '../FlyffGameTypes';
declare class EquipmentSetEntity extends FlyffGameEntityBase<EquipmentSet> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: EquipmentSetEntity): EquipmentSetEntity;
    load(this: any, reqmatch?: EquipmentSetLoadMatch, ctrl?: Control): Promise<EquipmentSetEntity>;
    list(this: any, reqmatch?: EquipmentSetListMatch, ctrl?: Control): Promise<EquipmentSetEntity[]>;
}
export { EquipmentSetEntity };
