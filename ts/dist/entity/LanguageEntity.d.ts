import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Language, LanguageLoadMatch, LanguageListMatch } from '../FlyffGameTypes';
declare class LanguageEntity extends FlyffGameEntityBase<Language> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: LanguageEntity): LanguageEntity;
    load(this: any, reqmatch?: LanguageLoadMatch, ctrl?: Control): Promise<LanguageEntity>;
    list(this: any, reqmatch?: LanguageListMatch, ctrl?: Control): Promise<LanguageEntity[]>;
}
export { LanguageEntity };
