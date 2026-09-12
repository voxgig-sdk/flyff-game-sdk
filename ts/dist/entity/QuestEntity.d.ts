import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Quest, QuestLoadMatch, QuestListMatch } from '../FlyffGameTypes';
declare class QuestEntity extends FlyffGameEntityBase<Quest> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: QuestEntity): QuestEntity;
    load(this: any, reqmatch?: QuestLoadMatch, ctrl?: Control): Promise<QuestEntity>;
    list(this: any, reqmatch?: QuestListMatch, ctrl?: Control): Promise<QuestEntity[]>;
}
export { QuestEntity };
