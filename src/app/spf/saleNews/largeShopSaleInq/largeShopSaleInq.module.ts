declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LargeShopSaleInqComponent } from './largeShopSaleInq.component';

@NgModule({
	declarations: [
		LargeShopSaleInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class LargeShopSaleInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { LargeShopSaleInqComponent } from '../../grop/menu/largeShopSaleInq/largeShopSaleInq.component';
 * { id : 'LargeShopSaleInq',        component : LargeShopSaleInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { LargeShopSaleInqModule } from '../../grop/menu/largeShopSaleInq/largeShopSaleInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "LargeShopSaleInq", name: "LargeShopSaleInq", text: "LargeShopSaleInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */