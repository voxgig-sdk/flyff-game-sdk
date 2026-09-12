import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { RaisedPet, RaisedPetLoadMatch } from '../FlyffGameTypes';
declare class RaisedPetEntity extends FlyffGameEntityBase<RaisedPet> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: RaisedPetEntity): RaisedPetEntity;
    load(this: any, reqmatch?: RaisedPetLoadMatch, ctrl?: Control): Promise<RaisedPetEntity>;
}
export { RaisedPetEntity };
