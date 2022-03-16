import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenterTreeGridComponent } from './CenterTreeGrid.component';

const routes: Routes = [
	{ path: '', component: CenterTreeGridComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class CenterTreeGridRoutingModule { }

