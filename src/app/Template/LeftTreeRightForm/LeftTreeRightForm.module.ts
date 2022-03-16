declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeftTreeRightFormRoutingModule } from './LeftTreeRightForm-routing.module';
import { LeftTreeRightFormComponent } from './LeftTreeRightForm.component';

@NgModule({
	declarations: [
		LeftTreeRightFormComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		LeftTreeRightFormRoutingModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class LeftTreeRightFormModule { }