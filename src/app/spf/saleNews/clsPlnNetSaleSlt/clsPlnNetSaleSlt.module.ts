declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClsPlnNetSaleSltComponent } from './clsPlnNetSaleSlt.component';

@NgModule({
	declarations: [
		ClsPlnNetSaleSltComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class ClsPlnNetSaleSltModule { }
