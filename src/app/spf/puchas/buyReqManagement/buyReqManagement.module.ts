declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuyReqManagementComponent } from './buyReqManagement.component';
import { SearchClassModule } from 'src/app/component/searchClass/searchClass.module';
import { SearchCcpyModule } from 'src/app/component/searchCcpy/searchCcpy.module';

@NgModule({
	declarations: [
		BuyReqManagementComponent
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

export class BuyReqManagementModule { }

/**
 * @copy to "tab-components.ts"
 * import { BuyReqManagementComponent } from '../../grop/menu/buyReqManagement/buyReqManagement.component';
 * { id : 'BuyReqManagement',        component : BuyReqManagementComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { BuyReqManagementModule } from '../../grop/menu/buyReqManagement/buyReqManagement.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "BuyReqManagement", name: "BuyReqManagement", text: "BuyReqManagement", iconCls: "x-fa fa-home", leaf: true
 * }
 */