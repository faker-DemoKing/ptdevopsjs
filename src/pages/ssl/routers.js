import { makeRoute } from 'libs/router';
import Index from './index/index';
import Setting from './setting/index'
import Acme from './setting/AcmeSetting'

export default [
    makeRoute('/index', Index),
    makeRoute('/setting', Setting),
    makeRoute('/setting/acme', Acme)
]