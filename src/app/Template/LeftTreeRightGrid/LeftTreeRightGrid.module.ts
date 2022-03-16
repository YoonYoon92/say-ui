declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeftTreeRightGridRoutingModule } from './LeftTreeRightGrid-routing.module';
import { LeftTreeRightGridComponent } from './LeftTreeRightGrid.component';

@NgModule({
	declarations: [
		LeftTreeRightGridComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		LeftTreeRightGridRoutingModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class LeftTreeRightGridModule { }