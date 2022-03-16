declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeriodyearMmSaleAnalysComponent } from './periodyearMmSaleAnalys.component';

@NgModule({
	declarations: [
		PeriodyearMmSaleAnalysComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class PeriodyearMmSaleAnalysModule { }
