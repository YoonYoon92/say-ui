import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeftGridTopHeaderBtmDetailComponent } from './LeftGridTopHeaderBtmDetail.component';

const routes: Routes = [
	{ path: '', component: LeftGridTopHeaderBtmDetailComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class LeftGridTopHeaderBtmDetailRoutingModule { }

