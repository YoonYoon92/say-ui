import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeftTreeRightGridComponent } from './LeftTreeRightGrid.component';

const routes: Routes = [
	{ path: '', component: LeftTreeRightGridComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class LeftTreeRightGridRoutingModule { }

