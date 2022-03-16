import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenterGridComponent } from './CenterGrid.component';

const routes: Routes = [
	{ path: '', component: CenterGridComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class CenterGridRoutingModule { }

