import type IAnthena from './anthena.types.ts';
import type { INewAnthena, IAnthenaLink, INewAnthenaLink } from './anthena.types.ts';
import * as anthenaActions from './actions';
import Anthena, { AnthenaLink } from './model';

export default Anthena;
export {
    AnthenaLink,
    anthenaActions,
    IAnthena,
    IAnthenaLink,
    INewAnthena,
    INewAnthenaLink,
}
