import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeftTreeRightFormComponent } from './LeftTreeRightForm.component';

const routes: Routes = [
	{ path: '', component: LeftTreeRightFormComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class LeftTreeRightFormRoutingModule { }

