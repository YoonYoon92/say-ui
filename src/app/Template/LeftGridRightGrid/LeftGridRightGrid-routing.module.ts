import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeftGridRightGridComponent } from './LeftGridRightGrid.component';

const routes: Routes = [
	{ path: '', component: LeftGridRightGridComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class LeftGridRightGridRoutingModule { }

