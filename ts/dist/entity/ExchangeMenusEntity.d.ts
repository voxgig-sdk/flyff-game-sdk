import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { ExchangeMenus, ExchangeMenusLoadMatch } from '../FlyffGameTypes';
declare class ExchangeMenusEntity extends FlyffGameEntityBase<ExchangeMenus> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: ExchangeMenusEntity): ExchangeMenusEntity;
    load(this: any, reqmatch?: ExchangeMenusLoadMatch, ctrl?: Control): Promise<ExchangeMenusEntity>;
}
export { ExchangeMenusEntity };
