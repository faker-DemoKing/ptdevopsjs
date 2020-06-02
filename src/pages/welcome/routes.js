import { makeRoute } from 'libs/router';
import Index from './index';
import Info from './info';

export default [
    makeRoute('/index', Index),
    makeRoute('/info', Info),
]
