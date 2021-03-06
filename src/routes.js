import { makeModuleRoute } from "./libs/router";

import welcomeRoues from './pages/welcome/routes';
import homeRoutes from './pages/home/routes';
import hostRoutes from './pages/host/routes';
import sslRoutes from './pages/ssl/routers'
import systemRoutes from './pages/system/routes';

export default [
    makeModuleRoute('/welcome', welcomeRoues),
    makeModuleRoute('/home', homeRoutes),
    makeModuleRoute('/host', hostRoutes),
    makeModuleRoute('/ssl', sslRoutes),
    makeModuleRoute('/system',systemRoutes)
]
