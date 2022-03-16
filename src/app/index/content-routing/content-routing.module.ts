import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentRoutingComponent } from './content-routing.component';

const routes: Routes = [
    {path: '', component: ContentRoutingComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContentRoutingModule { }
