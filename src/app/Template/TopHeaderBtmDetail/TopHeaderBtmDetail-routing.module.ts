import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopHeaderBtmDetailComponent } from './TopHeaderBtmDetail.component';

const routes: Routes = [
	{ path: '', component: TopHeaderBtmDetailComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class TopHeaderBtmDetailRoutingModule { }

