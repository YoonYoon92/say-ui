declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeftGridRightGridRoutingModule } from './LeftGridRightGrid-routing.module';
import { LeftGridRightGridComponent } from './LeftGridRightGrid.component';



@NgModule({
	declarations: [
		LeftGridRightGridComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		LeftGridRightGridRoutingModule,
		ExtAngularModernModule,

	],
	providers: [
	]
})

export class LeftGridRightGridModule { }