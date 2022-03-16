declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimManagementComponent } from './timManagement.component';

@NgModule({
	declarations: [
		TimManagementComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class TimManagementModule { }

/**
 * @copy to "tab-components.ts"
 * import { TimManagementComponent } from '../../grop/menu/timManagement/timManagement.component';
 * { id : 'TimManagement',        component : TimManagementComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { TimManagementModule } from '../../grop/menu/timManagement/timManagement.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "TimManagement", name: "TimManagement", text: "TimManagement", iconCls: "x-fa fa-home", leaf: true
 * }
 */