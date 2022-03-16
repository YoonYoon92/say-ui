declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { partnerSaleInqComponent } from './partnerSaleInq.component';
import { SearchCcpyComponent } from '../../../component/searchCcpy/searchCcpy.component';


@NgModule({
	declarations: [
		partnerSaleInqComponent,
		//SearchCcpyComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class partnerSaleInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { partnerSaleInqComponent } from '../../grop/menu/partnerSaleInq/partnerSaleInq.component';
 * { id : 'partnerSaleInq',        component : partnerSaleInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { partnerSaleInqModule } from '../../grop/menu/partnerSaleInq/partnerSaleInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "partnerSaleInq", name: "partnerSaleInq", text: "partnerSaleInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */