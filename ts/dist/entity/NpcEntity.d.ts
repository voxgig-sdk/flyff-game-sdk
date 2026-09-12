import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Npc, NpcLoadMatch, NpcListMatch } from '../FlyffGameTypes';
declare class NpcEntity extends FlyffGameEntityBase<Npc> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: NpcEntity): NpcEntity;
    load(this: any, reqmatch?: NpcLoadMatch, ctrl?: Control): Promise<NpcEntity>;
    list(this: any, reqmatch?: NpcListMatch, ctrl?: Control): Promise<NpcEntity[]>;
}
export { NpcEntity };
