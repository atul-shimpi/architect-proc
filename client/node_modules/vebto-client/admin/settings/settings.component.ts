import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SettingsState} from "./settings-state.service";
import {VebtoConfig} from "../../core/vebto-config.service";
import {Settings} from "../../core/services/settings.service";

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit {

    constructor(
        private settings: Settings,
        private route: ActivatedRoute,
        private state: SettingsState,
        public siteConfig: VebtoConfig,
    ) {}

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.state.setAll(data['settings']);
        });
    }
}
