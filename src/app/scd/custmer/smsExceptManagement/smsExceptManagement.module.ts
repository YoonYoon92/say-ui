declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SmsExceptManagementComponent } from './smsExceptManagement.component';

@NgModule({
	declarations: [
		SmsExceptManagementComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class SmsExceptManagementModule { }

/**
 * @copy to "tab-components.ts"
 * import { SmsExceptManagementComponent } from '../../grop/menu/smsExceptManagement/smsExceptManagement.component';
 * { id : 'SmsExceptManagement',        component : SmsExceptManagementComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { SmsExceptManagementModule } from '../../grop/menu/smsExceptManagement/smsExceptManagement.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "SmsExceptManagement", name: "SmsExceptManagement", text: "SmsExceptManagement", iconCls: "x-fa fa-home", leaf: true
 * }
 */