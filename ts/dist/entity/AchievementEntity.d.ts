import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Achievement, AchievementLoadMatch, AchievementListMatch } from '../FlyffGameTypes';
declare class AchievementEntity extends FlyffGameEntityBase<Achievement> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: AchievementEntity): AchievementEntity;
    load(this: any, reqmatch?: AchievementLoadMatch, ctrl?: Control): Promise<AchievementEntity>;
    list(this: any, reqmatch?: AchievementListMatch, ctrl?: Control): Promise<AchievementEntity[]>;
}
export { AchievementEntity };
