import {ElementRef, Injectable} from '@angular/core';
import {Overlay, OverlayRef, PositionStrategy} from "@angular/cdk/overlay";
import {ComponentPortal, ComponentType} from "@angular/cdk/portal";
import {Observable} from "rxjs/Observable";
import {ColorpickerPanelComponent} from "./colorpicker-panel.component";

@Injectable()
export class ColorPickerPanel {

    /**
     * Overlay reference of currently open panel.
     */
    public overlayRef: OverlayRef;

    /**
     * Component reference of currently open panel.
     */
    private componentRef: any;

    private origin: ElementRef;

    /**
     * InspectorFloatingPanel Constructor.
     */
    constructor(private overlay: Overlay) {}

    public open<T>(origin: ElementRef, config: {position: 'right'|'bottom'}): ColorpickerPanelComponent {
        this.close();
        this.origin = origin;

        this.overlayRef = this.overlay.create({
            positionStrategy: this.getPositionStrategy(config.position),
            hasBackdrop: true
        });

        this.overlayRef.backdropClick().subscribe(() => this.close());

        this.componentRef = this.overlayRef.attach(new ComponentPortal(ColorpickerPanelComponent));

        this.componentRef.instance.closed.subscribe(() => {
            this.close();
        });

        return this.componentRef.instance;
    }

    public close() {
        this.overlayRef && this.overlayRef.dispose();

        if ( ! this.componentRef) return;

        if (this.componentRef.instance.closed) {
            this.componentRef.instance.closed.observers.forEach(observer => {
                observer.unsubscribe();
            });
        }

        if (this.componentRef.instance.selected) {
            this.componentRef.instance.selected.observers.forEach(observer => {
                observer.unsubscribe();
            });
        }
    }

    /**
     * Get position strategy for color picker panel.
     */
    private getPositionStrategy(position: 'bottom'|'right'): PositionStrategy {
        if (position === 'bottom') {
            return this.getBottomPositionStrategy();
        } else {
            return this.getRightPositionStrategy();
        }
    }

    /**
     * Position color picker on the right of origin.
     */
    private getRightPositionStrategy(): PositionStrategy {
        return this.overlay.position().connectedTo(
            this.origin,
            {originX: 'end', originY: 'center'},
            {overlayX: 'start', overlayY: 'center'}
        ).withFallbackPosition(
            {originX: 'end', originY: 'center'},
            {overlayX: 'start', overlayY: 'top'}
        ).withOffsetX(35);
    }

    /**
     * Position color picker at the bottom of origin with top fallback.
     */
    private getBottomPositionStrategy(): PositionStrategy {
        return this.overlay.position().connectedTo(
            this.origin,
            {originX: 'center', originY: 'bottom'},
            {overlayX: 'end', overlayY: 'top'}
        ).withFallbackPosition(
            {originX: 'center', originY: 'top'},
            {overlayX: 'center', overlayY: 'bottom'}
        ).withOffsetY(5);
    }
}
