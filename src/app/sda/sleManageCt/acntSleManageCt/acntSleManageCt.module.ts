declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AcntSleManageCtComponent } from './acntSleManageCt.component';

@NgModule({
	declarations: [
		AcntSleManageCtComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class AcntSleManageCtModule { }
