import './index.css';


import {renderTitleScreen} from "./view/pages/TitleScreen/TitleScreen";
import {renderAuthenticationPage} from "./view/pages/Authentication/Authentication";
import {renderOnboardingScreen} from "./view/pages/Onboarding/Onboarding";
import {renderEditGroupPage} from "./view/pages/EditGroup/EditGroup";
import {renderGroupsListPage} from "./view/pages/GroupsList/GroupsList";
import {renderMarksTable} from "./view/pages/MarksTable/MarksTable";


let loc = location.pathname
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
    case  "/table": {
        renderMarksTable()
        break
    }
    default: {
        renderTitleScreen()
        break
    }
}