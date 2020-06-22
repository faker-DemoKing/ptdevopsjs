import { makeModuleRoute } from "./libs/router";

import welcomeRoues from './pages/welcome/routes';
import homeRoutes from './pages/home/routes';
import hostRoutes from './pages/host/routes';


export default [
    makeModuleRoute('/welcome', welcomeRoues),
    makeModuleRoute('/home', homeRoutes),
    makeModuleRoute('/host', hostRoutes),
]
