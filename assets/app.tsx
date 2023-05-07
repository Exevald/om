import React, {StrictMode} from 'react';
import './index.scss';


import {renderTitleScreen} from "./view/pages/TitleScreen/TitleScreen";
import {renderAuthenticationPage} from "./view/pages/Authentication/Authentication";
import {renderOnboardingScreen} from "./view/pages/Onboarding/Onboarding";
import {renderEditGroupPage} from "./view/pages/EditGroup/EditGroup";
import {renderGroupsListPage} from "./view/pages/GroupsList/GroupsList";


let loc = location.pathname;
switch (loc) {
    case "/login": {
        renderAuthenticationPage()
        break
    }
    case "/onboarding": {
        renderOnboardingScreen()
        break
    }
    case "/groups/list": {
        renderGroupsListPage()
        break
    }
    case "/groups/edit": {
        renderEditGroupPage()
        break
    }
    default: {
        renderTitleScreen()
        break
    }
}