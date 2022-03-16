declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewBrandSaleInqComponent } from './newBrandSaleInq.component';

@NgModule({
	declarations: [
		NewBrandSaleInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class NewBrandSaleInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { NewBrandSaleInqComponent } from '../../spf/saleNews/newBrandSaleInq/newBrandSaleInq.component';
 * { id : 'NewBrandSaleInq',        component : NewBrandSaleInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { NewBrandSaleInqModule } from '../../spf/saleNews/newBrandSaleInq/newBrandSaleInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "NewBrandSaleInq", name: "NewBrandSaleInq", text: "신규입점브랜드매출조회", iconCls: "x-fa fa-home", leaf: true
 * }
 */