import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Dungeon, DungeonLoadMatch } from '../FlyffGameTypes';
declare class DungeonEntity extends FlyffGameEntityBase<Dungeon> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: DungeonEntity): DungeonEntity;
    load(this: any, reqmatch?: DungeonLoadMatch, ctrl?: Control): Promise<DungeonEntity>;
}
export { DungeonEntity };
