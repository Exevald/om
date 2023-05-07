import React, {StrictMode} from 'react';
import './index.scss';


import {renderTitleScreen} from "./view/pages/TitleScreen/TitleScreen";
import {renderAuthenticationPage} from "./view/pages/Authentication/Authentication";
import {renderOnboardingScreen} from "./view/pages/Onboarding/Onboarding";
import {renderEditGroupPage} from "./view/pages/EditGroup/EditGroup";
import {renderGroupsListPage} from "./view/pages/GroupsList/GroupsList";
import {renderMarksTable} from "./view/pages/MarksTable/MarksTable";


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
    case  "/table": {
        renderMarksTable("marksTablePage")
        break
    }
    default: {
        renderTitleScreen("titlePage")
        break
    }
}