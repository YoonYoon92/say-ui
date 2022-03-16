declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DayAggregationComponent } from './dayAggregation.component';

@NgModule({
	declarations: [
		DayAggregationComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class DayAggregationModule { }

/**
 * @copy to "tab-components.ts"
 * import { DayAggregationComponent } from '../../grop/menu/dayAggregation/dayAggregation.component';
 * { id : 'DayAggregation',        component : DayAggregationComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { DayAggregationModule } from '../../grop/menu/dayAggregation/dayAggregation.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "DayAggregation", name: "DayAggregation", text: "DayAggregation", iconCls: "x-fa fa-home", leaf: true
 * }
 */