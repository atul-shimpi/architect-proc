import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Plan} from "../plan";
import {Translations} from '../../../translations/translations.service';
import {utils} from '../../../core/services/utils';

@Component({
    selector: 'full-plan-name',
    template: '{{getFullPlanName()}}',
    encapsulation: ViewEncapsulation.None
})
export class FullPlanNameComponent {

    @Input() plan: Plan;

    /**
     * FullPlanNameComponent Constructor.
     */
    constructor(private i18n: Translations) {}

    public getFullPlanName(): string {
        if ( ! this.plan) return;
        let name = this.plan.parent ? this.plan.parent.name : this.plan.name;
        name = utils.ucFirst(name);
        name += ' ' + this.i18n.t('Plan');
        if (this.plan.parent) name += ': ' + this.plan.name;
        return name;
    }
}
