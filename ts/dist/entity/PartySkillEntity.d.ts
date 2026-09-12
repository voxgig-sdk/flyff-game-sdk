import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { PartySkill, PartySkillLoadMatch, PartySkillListMatch } from '../FlyffGameTypes';
declare class PartySkillEntity extends FlyffGameEntityBase<PartySkill> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: PartySkillEntity): PartySkillEntity;
    load(this: any, reqmatch?: PartySkillLoadMatch, ctrl?: Control): Promise<PartySkillEntity>;
    list(this: any, reqmatch?: PartySkillListMatch, ctrl?: Control): Promise<PartySkillEntity[]>;
}
export { PartySkillEntity };
