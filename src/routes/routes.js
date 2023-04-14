import config from '~/config';

// Layouts
// import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import Details from '~/pages/Details';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.details, component: Details, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
