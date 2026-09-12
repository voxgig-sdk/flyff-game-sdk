import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Place, PlaceLoadMatch } from '../FlyffGameTypes';
declare class PlaceEntity extends FlyffGameEntityBase<Place> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: PlaceEntity): PlaceEntity;
    load(this: any, reqmatch?: PlaceLoadMatch, ctrl?: Control): Promise<PlaceEntity>;
}
export { PlaceEntity };
