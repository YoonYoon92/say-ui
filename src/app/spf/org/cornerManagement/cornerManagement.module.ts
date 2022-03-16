declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CornerManagementComponent } from './cornerManagement.component';

@NgModule({
	declarations: [
		CornerManagementComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class CornerManagementModule { }

/**
 * @copy to "tab-components.ts"
 * import { CornerManagementComponent } from '../../grop/menu/cornerManagement/cornerManagement.component';
 * { id : 'CornerManagement',        component : CornerManagementComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { CornerManagementModule } from '../../grop/menu/cornerManagement/cornerManagement.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "CornerManagement", name: "CornerManagement", text: "CornerManagement", iconCls: "x-fa fa-home", leaf: true
 * }
 */