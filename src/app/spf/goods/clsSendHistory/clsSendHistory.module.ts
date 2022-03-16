declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClsSendHistoryComponent } from './clsSendHistory.component';
import { SearchCcpyModule } from 'src/app/component/searchCcpy/searchCcpy.module';

@NgModule({
	declarations: [
		ClsSendHistoryComponent
		
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule,
		SearchCcpyModule
	],
	providers: [
	]
})

export class ClsSendHistoryModule { }

/**
 * @copy to "tab-components.ts"
 * import { ClsSendHistoryComponent } from '../../grop/menu/clsSendHistory/clsSendHistory.component';
 * { id : 'ClsSendHistory',        component : ClsSendHistoryComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { ClsSendHistoryModule } from '../../grop/menu/clsSendHistory/clsSendHistory.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "ClsSendHistory", name: "ClsSendHistory", text: "ClsSendHistory", iconCls: "x-fa fa-home", leaf: true
 * }
 */