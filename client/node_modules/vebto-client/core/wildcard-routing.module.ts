import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NotFoundPageComponent} from "./ui/not-found-page/not-found-page.component";

const routes: Routes = [
    // {
    //     path: '**',
    //     pathMatch: 'full',
    //     component: NotFoundPageComponent
    // },
    // {
    //     path: '404',
    //     pathMatch: 'full',
    //     component: NotFoundPageComponent
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [
        NotFoundPageComponent
    ],
})
export class WildcardRoutingModule { }