import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Badge, BadgeLoadMatch } from '../FlyffGameTypes';
declare class BadgeEntity extends FlyffGameEntityBase<Badge> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: BadgeEntity): BadgeEntity;
    load(this: any, reqmatch?: BadgeLoadMatch, ctrl?: Control): Promise<BadgeEntity>;
}
export { BadgeEntity };
