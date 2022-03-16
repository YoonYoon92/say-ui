declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscountClsManagementComponent } from './discountClsManagement.component';

@NgModule({
	declarations: [
		DiscountClsManagementComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class DiscountClsManagementModule { }

/**
 * @copy to "tab-components.ts"
 * import { DiscountClsManagementComponent } from '../../grop/menu/discountClsManagement/discountClsManagement.component';
 * { id : 'DiscountClsManagement',        component : DiscountClsManagementComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { DiscountClsManagementModule } from '../../grop/menu/discountClsManagement/discountClsManagement.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "DiscountClsManagement", name: "DiscountClsManagement", text: "DiscountClsManagement", iconCls: "x-fa fa-home", leaf: true
 * }
 */