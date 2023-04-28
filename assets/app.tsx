import React, {StrictMode} from 'react';

import './index.scss';


import GroupsPage from './view/pages/Groups/Groups';
import {renderTitleScreen} from "./view/pages/TitleScreen/TitleScreen";
import {renderAuthenticationPage} from "./view/pages/Authentication/Authentication";
import {renderOnboardingScreen} from "./view/pages/Onboarding/Onboarding";


let loc = location.pathname
switch (loc) {
    case "/login": {
        renderAuthenticationPage("loginPage")
        break
    }
    case "/onboarding": {
        renderOnboardingScreen("onboardingPage")
        break
    }
    default: {
        renderTitleScreen("titlePage")
        break
    }
}

