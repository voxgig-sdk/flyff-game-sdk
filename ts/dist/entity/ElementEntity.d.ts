import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Element, ElementLoadMatch } from '../FlyffGameTypes';
declare class ElementEntity extends FlyffGameEntityBase<Element> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: ElementEntity): ElementEntity;
    load(this: any, reqmatch?: ElementLoadMatch, ctrl?: Control): Promise<ElementEntity>;
}
export { ElementEntity };
