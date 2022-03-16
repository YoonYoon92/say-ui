declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrLogConerSaleInqComponent } from './TrLogConerSaleInq.component';
import { SearchConerComponent } from '../../../../component/searchConer/searchConer.component';
import { SearchConerModule } from 'src/app/component/searchConer/searchConer.module';

@NgModule({
	declarations: [
		TrLogConerSaleInqComponent,
	],
	imports: [
		
		CommonModule,
		FormsModule,
		ExtAngularModernModule,
		SearchConerModule
	],
	// providers: [
	// 	SearchConerComponent,
	// ],
	// schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class TrLogConerSaleInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { TrLogConerSaleInqComponent } from '../../grop/menu/TrLogConerSaleInq/TrLogConerSaleInq.component';
 * { id : 'TrLogConerSaleInq',        component : TrLogConerSaleInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { TrLogConerSaleInqModule } from '../../grop/menu/TrLogConerSaleInq/TrLogConerSaleInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "TrLogConerSaleInq", name: "TrLogConerSaleInq", text: "TrLogConerSaleInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */