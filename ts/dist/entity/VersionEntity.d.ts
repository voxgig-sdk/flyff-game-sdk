import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Version, VersionLoadMatch } from '../FlyffGameTypes';
declare class VersionEntity extends FlyffGameEntityBase<Version> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: VersionEntity): VersionEntity;
    load(this: any, reqmatch?: VersionLoadMatch, ctrl?: Control): Promise<VersionEntity>;
}
export { VersionEntity };
