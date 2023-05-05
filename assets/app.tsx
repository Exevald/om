import React, {StrictMode} from 'react';
import './index.scss';


import {renderTitleScreen} from "./view/pages/TitleScreen/TitleScreen";
import {renderAuthenticationPage} from "./view/pages/Authentication/Authentication";
import {renderOnboardingScreen} from "./view/pages/Onboarding/Onboarding";
import {renderGroupsListPage} from "./view/pages/GroupList/GroupsList";
import {renderEditGroupPage} from "./view/pages/EditGroup/EditGroup";


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
    case "/groups/list": {
        renderGroupsListPage("groupsListPage")
        break
    }
    case "/groups/edit": {
        renderEditGroupPage("editGroupPage")
        break
    }
    default: {
        renderTitleScreen("titlePage")
        break
    }
}