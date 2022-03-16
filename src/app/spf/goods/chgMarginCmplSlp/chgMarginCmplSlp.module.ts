declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChgMarginCmplSlpComponent } from './chgMarginCmplSlp.component';

@NgModule({
	declarations: [
		ChgMarginCmplSlpComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class ChgMarginCmplSlpModule { }
