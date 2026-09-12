import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { World, WorldLoadMatch, WorldListMatch } from '../FlyffGameTypes';
declare class WorldEntity extends FlyffGameEntityBase<World> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: WorldEntity): WorldEntity;
    load(this: any, reqmatch?: WorldLoadMatch, ctrl?: Control): Promise<WorldEntity>;
    list(this: any, reqmatch?: WorldListMatch, ctrl?: Control): Promise<WorldEntity[]>;
}
export { WorldEntity };
