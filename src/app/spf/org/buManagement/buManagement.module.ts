declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuManagementComponent } from './buManagement.component';

@NgModule({
	declarations: [
		BuManagementComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class BuManagementModule { }

/**
 * @copy to "tab-components.ts"
 * import { BuManagementComponent } from '../../grop/menu/buManagement/buManagement.component';
 * { id : 'BuManagement',        component : BuManagementComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { BuManagementModule } from '../../grop/menu/buManagement/buManagement.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "BuManagement", name: "BuManagement", text: "BuManagement", iconCls: "x-fa fa-home", leaf: true
 * }
 */