import {Component, ViewEncapsulation} from "@angular/core";
import {CurrentUser} from "../auth/current-user";
import {AuthService} from "../auth/auth.service";
import {VebtoConfig} from "../core/vebto-config.service";
import {Settings} from "../core/services/settings.service";

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AdminComponent {

    /**
     * Controls left column visibility.
     */
    public leftColumnIsHidden = false;

    constructor(
        public settings: Settings,
        public currentUser: CurrentUser,
        public auth: AuthService,
        private vebtoConfig: VebtoConfig,
    ) {
    }

    public toggleLeftSidebar() {
        this.leftColumnIsHidden = !this.leftColumnIsHidden;
    }

    public getCustomSidebarItems() {
        return this.vebtoConfig.get().admin.pages;
    }
}
