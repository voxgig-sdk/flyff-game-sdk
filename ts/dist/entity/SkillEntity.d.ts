import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Skill, SkillLoadMatch, SkillListMatch } from '../FlyffGameTypes';
declare class SkillEntity extends FlyffGameEntityBase<Skill> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: SkillEntity): SkillEntity;
    load(this: any, reqmatch?: SkillLoadMatch, ctrl?: Control): Promise<SkillEntity>;
    list(this: any, reqmatch?: SkillListMatch, ctrl?: Control): Promise<SkillEntity[]>;
}
export { SkillEntity };
