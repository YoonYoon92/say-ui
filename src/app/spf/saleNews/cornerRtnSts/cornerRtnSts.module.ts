declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CornerRtnStsComponent } from './cornerRtnSts.component';

@NgModule({
	declarations: [
		CornerRtnStsComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class CornerRtnStsModule { }




/**
 * @copy to "tab-components.ts"
 * import { CornerRtnStsComponent } from '../../spf/saleNews/cornerRtnSts/cornerRtnSts.component';
 * { id : 'CornerRtnSts',        component : CornerRtnStsComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { CornerRtnStsModule } from '../../spf/saleNews/cornerRtnSts/cornerRtnSts.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "CornerRtnSts", name: "CornerRtnSts", text: "코너별반품사유현황", iconCls: "x-fa fa-home", leaf: true
 * }
 */