import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Translations} from "./translations.service";
import {Settings} from "../core/services/settings.service";

@Directive({
    selector: '[trans], [trans-placeholder], [trans-title]'
})
export class TranslateDirective implements AfterViewInit, OnDestroy {

    /**
     * Active subscriptions for this directive.
     */
    private subscriptions: Subscription[] = [];

    /**
     * TranslateDirective Constructor.
     */
    constructor(
        private el: ElementRef,
        private i18n: Translations,
        private settings: Settings
    ) {}

    ngAfterViewInit() {
        if ( ! this.settings.get('i18n.enable')) return;
        let sub = this.i18n.localizationChange.subscribe(() => this.translate());
        this.translate();
        this.subscriptions.push(sub);
    }

    /**
     * Translate element.
     */
    private translate() {
        let el = this.el.nativeElement;

        //translate placeholder
        if (el.getAttribute('placeholder')) {
            let key = el.getAttribute('placeholder');
            el.setAttribute('placeholder', this.i18n.t(key));
        }

        //translate html5 title
        else if (el.getAttribute('title')) {
            let key = el.getAttribute('title');
            el.setAttribute('title', this.i18n.t(key));
        }

        //translate node text content
        else {
            this.translateTextContent(el);
        }
    }

    private translateTextContent(el: HTMLElement) {
        const children = Array.from(el.childNodes);

        for (let i = 0; i < children.length; i++) {
            const child = children[i] as HTMLElement;

            if (child.nodeType === Node.TEXT_NODE) {
                return child.nodeValue = this.i18n.t(child.textContent);
            } else {
                if (this.translateTextContent(child)) return;
            }
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription && subscription.unsubscribe();
        });
        this.subscriptions = [];
    }
}