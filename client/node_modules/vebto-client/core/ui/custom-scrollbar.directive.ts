import {AfterViewInit, Directive, ElementRef, Input, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import PerfectScrollbar from 'perfect-scrollbar';
import {filter} from "rxjs/operators/filter";
import {Subscription} from "rxjs/Subscription";

@Directive({
    selector: '[customScrollbar]'
})
export class CustomScrollbarDirective implements AfterViewInit, OnDestroy {

    /**
     * Active directive suscriptions.
     */
    private subscriptions: Subscription[] = [];

    /**
     * Theme that should be used for the scrollbar.
     */
    @Input('customScrollbar') theme: string;

    /**
     * Minimum length for scrollbar drag handle.
     */
    @Input('customScrollbarMinLength') minLength: number = 100;

    /**
     * scrollTop value set via custom setScrollTop() method.
     * Perfect Scrollbar doesn't preserve scrollTop value on DOM
     * element for some reason, so we need to keep it here.
     */
    private scrollTop = 0;

    /**
     * Whether custom or native scrollbar is used.
     */
    private native = true;

    private scrollbar: PerfectScrollbar;

    /**
     * CustomScrollbarDirective Constructor.
     */
    constructor(
        private el: ElementRef,
        private router: Router,
    ) {}

    ngAfterViewInit() {
        this.bindToRouterEvents();
        if ( ! this.theme) this.theme = 'default';

        if (this.shouldUseNative()) return;

        this.scrollbar = new PerfectScrollbar(this.el.nativeElement, {
            minScrollbarLength: this.minLength,
            suppressScrollX: true,
            //theme: this.theme,
            wheelSpeed: 2
        });

        this.native = false;
    }

    /**
     * Update custom scrollbar.
     */
    public update() {
        if (this.native) return;
        this.scrollbar.update();
    }

    /**
     * Scroll container top to given value.
     */
    public setScrollTop(value = 0) {
        this.el.nativeElement.scrollTop = value;
        this.scrollTop = this.el.nativeElement.scrollTop;
        this.update();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
        this.subscriptions = [];

        if ( ! this.native) {
            this.scrollbar.destroy();
        }
    }

    /**
     * Check whether native or custom scrollbar should be used.
     */
    private shouldUseNative(): boolean {
        if (/Edge/.test(navigator.userAgent)) return false;
        //return 'WebkitAppearance' in document.documentElement.style || this.state.isMobile;
    }

    /**
     * Scroll to top on navigation to different route.
     */
    private bindToRouterEvents() {
        const sub = this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe(() => this.setScrollTop());

        this.subscriptions.push(sub);
    }
}
