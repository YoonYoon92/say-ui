import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeftGridRightFormComponent } from './LeftGridRightForm.component';

const routes: Routes = [
	{ path: '', component: LeftGridRightFormComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class LeftGridRightFormRoutingModule { }

