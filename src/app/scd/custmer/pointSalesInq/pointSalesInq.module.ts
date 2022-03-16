declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PointSalesInqComponent } from './pointSalesInq.component';

@NgModule({
	declarations: [
		PointSalesInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class PointSalesInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { PointSalesInqComponent } from '../../grop/menu/pointSalesInq/pointSalesInq.component';
 * { id : 'PointSalesInq',        component : PointSalesInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { PointSalesInqModule } from '../../grop/menu/pointSalesInq/pointSalesInq.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "PointSalesInq", name: "PointSalesInq", text: "PointSalesInq", iconCls: "x-fa fa-home", leaf: true
 * }
 */