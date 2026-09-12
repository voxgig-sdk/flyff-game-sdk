import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Monster, MonsterLoadMatch, MonsterListMatch } from '../FlyffGameTypes';
declare class MonsterEntity extends FlyffGameEntityBase<Monster> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: MonsterEntity): MonsterEntity;
    load(this: any, reqmatch?: MonsterLoadMatch, ctrl?: Control): Promise<MonsterEntity>;
    list(this: any, reqmatch?: MonsterListMatch, ctrl?: Control): Promise<MonsterEntity[]>;
}
export { MonsterEntity };
