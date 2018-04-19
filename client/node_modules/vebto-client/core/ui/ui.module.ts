import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {SvgIconComponent} from "./svg-icon/svg-icon.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoadingIndicatorComponent} from "./loading-indicator/loading-indicator.component";
import {NoResultsMessageComponent} from "./no-results-message/no-results-message.component";
import {CommonModule} from "@angular/common";
import {CustomMenuComponent} from "./custom-menu/custom-menu.component";
import {InfiniteScrollDirective} from "./infinite-scroll/infinite-scroll.directive";
import {EmptyRouteComponent} from './empty-route/empty-route.component';
import {MapToIterable} from "./map-to-iterable.pipe";
import {EnterKeybindDirective} from "./enter-keybind.directive";
import {MatButtonModule, MatSnackBarModule, MatMenuModule, MatCheckboxModule} from '@angular/material';
import {Toast} from "./toast.service";
import {Modal} from "./modal.service";
import {CustomScrollbarDirective} from "./custom-scrollbar.directive";
import {ConfirmModalComponent} from "./confirm-modal/confirm-modal.component";
import {LoggedInUserWidgetComponent} from "./logged-in-user-widget/logged-in-user-widget.component";
import {CustomPageComponent} from "./custom-page/custom-page.component";
import { ColorPickerModule } from 'ngx-color-picker';
import {ColorPickerPanel} from "./color-picker/color-picker-panel.service";
import {MaterialNavbar} from "./material-navbar/material-navbar.component";
import {AdHostComponent} from "./ad-host/ad-host.component";
import {ColorpickerPanelComponent} from "./color-picker/colorpicker-panel.component";
import {FormattedDatePipe} from "./formatted-date.pipe";
import {UploadFileModalComponent} from "../files/upload-file-modal/upload-file-modal.component";
import {FileDropzoneDirective} from "../files/file-dropzone/file-dropzone.directive";
import {TranslateDirective} from "../../translations/translate.directive";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,

        //color picker
        ColorPickerModule,

        //material
        MatButtonModule,
        MatSnackBarModule,
        MatMenuModule,
        MatCheckboxModule
    ],
    declarations: [
        TranslateDirective,
        SvgIconComponent,
        LoadingIndicatorComponent,
        NoResultsMessageComponent,
        CustomMenuComponent,
        InfiniteScrollDirective,
        EmptyRouteComponent,
        UploadFileModalComponent,
        FileDropzoneDirective,
        MapToIterable,
        EnterKeybindDirective,
        CustomScrollbarDirective,
        ConfirmModalComponent,
        LoggedInUserWidgetComponent,
        CustomPageComponent,
        ColorpickerPanelComponent,
        MaterialNavbar,
        AdHostComponent,
        FormattedDatePipe,
    ],
    exports: [
        TranslateDirective,
        SvgIconComponent,
        LoadingIndicatorComponent,
        NoResultsMessageComponent,
        CustomMenuComponent,
        InfiniteScrollDirective,
        EmptyRouteComponent,
        FileDropzoneDirective,
        MapToIterable,
        EnterKeybindDirective,
        CustomScrollbarDirective,
        ConfirmModalComponent,
        LoggedInUserWidgetComponent,
        CustomPageComponent,
        ColorpickerPanelComponent,
        MaterialNavbar,
        AdHostComponent,
        FormattedDatePipe,

        //color picker
        ColorPickerModule,

        //material
        MatButtonModule,
        MatSnackBarModule,
        MatMenuModule,
        MatCheckboxModule,
    ],
    providers: [
        Toast,
        Modal,
        ColorPickerPanel,
    ],
    entryComponents: [
        UploadFileModalComponent,
        ConfirmModalComponent,
        ColorpickerPanelComponent,
        CustomPageComponent,
    ]
})
export class UiModule {
}

