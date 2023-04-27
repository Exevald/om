import React, {StrictMode} from 'react';

import './index.scss';


import Onboarding from './view/pages/Onboarding/Onboarding';
import GroupsPage from './view/pages/Groups/Groups';
import {renderTitleScreen} from "./view/pages/TitleScreen/TitleScreen";
import {renderAuthenticationPage} from "./view/pages/Authentication/Authentication";


let loc = location.pathname
switch (loc) {
    case "/login": {
        renderAuthenticationPage("loginPage")
        break
    }
    default: {
        renderTitleScreen("titlePage")
        break
    }
}

