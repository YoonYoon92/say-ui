declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalePriceChgReqManagementComponent } from './salePriceChgReqManagement.component';
import { SearchClassModule } from 'src/app/component/searchClass/searchClass.module';
import { SearchCcpyModule } from 'src/app/component/searchCcpy/searchCcpy.module';

@NgModule({
	declarations: [
		SalePriceChgReqManagementComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule,
		SearchClassModule,
		SearchCcpyModule
	],
	providers: [
	]
})

export class SalePriceChgReqManagementModule { }

/**
 * @copy to "tab-components.ts"
 * import { SalePriceChgReqManagementComponent } from '../../grop/menu/salePriceChgReqManagement/salePriceChgReqManagement.component';
 * { id : 'SalePriceChgReqManagement',        component : SalePriceChgReqManagementComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { SalePriceChgReqManagementModule } from '../../grop/menu/salePriceChgReqManagement/salePriceChgReqManagement.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "SalePriceChgReqManagement", name: "SalePriceChgReqManagement", text: "SalePriceChgReqManagement", iconCls: "x-fa fa-home", leaf: true
 * }
 */