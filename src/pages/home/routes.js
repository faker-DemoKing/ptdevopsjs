import { lazy } from 'react';
import { makeRoute } from 'libs/router';

export default [
    makeRoute('', lazy(() => import('./index'))),
]