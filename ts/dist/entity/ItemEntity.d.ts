import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Item, ItemLoadMatch, ItemListMatch } from '../FlyffGameTypes';
declare class ItemEntity extends FlyffGameEntityBase<Item> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: ItemEntity): ItemEntity;
    load(this: any, reqmatch?: ItemLoadMatch, ctrl?: Control): Promise<ItemEntity>;
    list(this: any, reqmatch?: ItemListMatch, ctrl?: Control): Promise<ItemEntity[]>;
}
export { ItemEntity };
