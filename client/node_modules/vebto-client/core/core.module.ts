import {APP_INITIALIZER, ErrorHandler, ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FileValidator} from "./files/file-validator";
import {HttpErrorHandler} from "./http/http-error-handler.service";
import {UiModule} from "./ui/ui.module";
import {Settings} from "./services/settings.service";
import {AppHttpClient} from "./http/app-http-client.service";
import {HttpCacheClient} from "./http/http-cache-client";
import {Translations} from "../translations/translations.service";
import {Localizations} from "../translations/localizations.service";
import {ContextMenu} from "./ui/context-menu/context-menu.service";
import {CurrentUser} from "../auth/current-user";
import {utils} from "./services/utils";
import {LocalStorage} from "./services/local-storage.service";
import {BrowserEvents} from "./services/browser-events.service";
import {Uploads} from "./files/uploads.service";
import {ValueLists} from "./services/value-lists.service";
import {PreviewApp} from "./services/preview-app.service";
import {Keybinds} from "./keybinds/keybinds.service";
import {TitleService} from "./services/title.service";
import {Bootstrapper, init_app} from "./bootstrapper.service";
import {Toast} from "./ui/toast.service";
import {CustomHomepage} from "./services/custom-homepage.service";
import {VebtoConfig} from "./vebto-config.service";
import {errorHandlerFactory} from "./raven-error-handler";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        UiModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        UiModule,
    ],
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                Settings,
                AppHttpClient,
                HttpCacheClient,
                HttpErrorHandler,
                Translations,
                Localizations,
                ContextMenu,
                CurrentUser,
                utils,
                LocalStorage,
                BrowserEvents,
                Uploads,
                FileValidator,
                ValueLists,
                PreviewApp,
                Keybinds,
                TitleService,
                Bootstrapper,
                Toast,
                CustomHomepage,
                VebtoConfig,
                {
                    provide: APP_INITIALIZER,
                    useFactory: init_app,
                    deps: [Bootstrapper],
                    multi: true,
                },
                {
                    provide: ErrorHandler,
                    useFactory: errorHandlerFactory,
                    deps: [Settings, CurrentUser],
                },
            ]
        };
    }
}

