import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { HousingTemplate, HousingTemplateLoadMatch, HousingTemplateListMatch } from '../FlyffGameTypes';
declare class HousingTemplateEntity extends FlyffGameEntityBase<HousingTemplate> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: HousingTemplateEntity): HousingTemplateEntity;
    load(this: any, reqmatch?: HousingTemplateLoadMatch, ctrl?: Control): Promise<HousingTemplateEntity>;
    list(this: any, reqmatch?: HousingTemplateListMatch, ctrl?: Control): Promise<HousingTemplateEntity[]>;
}
export { HousingTemplateEntity };
