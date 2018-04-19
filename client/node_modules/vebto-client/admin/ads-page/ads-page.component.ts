import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {VebtoConfig} from "../../core/vebto-config.service";
import {Settings} from "../../core/services/settings.service";
import {Toast} from "../../core/ui/toast.service";

@Component({
    selector: 'ads-page',
    templateUrl: './ads-page.component.html',
    styleUrls: ['./ads-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdsPageComponent implements OnInit {

    /**
     * Ads model.
     */
    public ads = {};

    /**
     * AdsPageComponent Constructor.
     */
    constructor(
        private settings: Settings,
        private toast: Toast,
        public siteConfig: VebtoConfig,
    ) {}

    ngOnInit() {
        this.hydrate();
    }

    /**
     * Save ads to the server.
     */
    public saveAds() {
        this.settings.save({client: this.ads}).subscribe(() => {
            this.toast.open('Ads have been updated.');
        });
    }

    /**
     * Hydrate ads model.
     */
    private hydrate() {
        const all = this.settings.getAll();

        for (let name in all) {
            if (name.indexOf('ad_slot') > -1 || name === 'ads.disable') {
                this.ads[name] = all[name];
            }
        }
    }
}
