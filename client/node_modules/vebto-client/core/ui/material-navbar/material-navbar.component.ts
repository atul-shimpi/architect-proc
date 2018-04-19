import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {VebtoConfig} from "../../vebto-config.service";
import {Settings} from "../../services/settings.service";

@Component({
    selector: 'material-navbar',
    templateUrl: './material-navbar.component.html',
    styleUrls: ['./material-navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MaterialNavbar {

    @Input() menuPosition: string;

    @Input() showToggleButton: boolean = false;

    @Output() toggleButtonClick = new EventEmitter();

    /**
     * MaterialNavbar Constructor.
     */
    constructor(public settings: Settings, public vebtoConfig: VebtoConfig) {}
}
