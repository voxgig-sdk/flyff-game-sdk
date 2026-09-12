import { FlyffGameEntityBase } from '../FlyffGameEntityBase';
import type { FlyffGameSDK } from '../FlyffGameSDK';
import type { Control } from '../types';
import type { Recipe, RecipeLoadMatch, RecipeListMatch } from '../FlyffGameTypes';
declare class RecipeEntity extends FlyffGameEntityBase<Recipe> {
    constructor(client: FlyffGameSDK, entopts: any);
    make(this: RecipeEntity): RecipeEntity;
    load(this: any, reqmatch?: RecipeLoadMatch, ctrl?: Control): Promise<RecipeEntity>;
    list(this: any, reqmatch?: RecipeListMatch, ctrl?: Control): Promise<RecipeEntity[]>;
}
export { RecipeEntity };
