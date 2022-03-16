declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardApprLogInqComponent } from './cardApprLogInq.component';

@NgModule({
	declarations: [
		CardApprLogInqComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class CardApprLogInqModule { }

/**
 * @copy to "tab-components.ts"
 * import { CardApprLogInqComponent } from '../../spf/selng/cardApprLogInq/cardApprLogInq.component';
 * { id : 'CardApprLogInq',        component : CardApprLogInqComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { CardApprLogInqModule } from '../../spf/selng/cardApprLogInq/cardApprLogInq.module';
 */

/**
 * @copy to "env.service.ts" (개발 & 테스트때만)
 * {
 * 	id: "CardApprLogInq", name: "CardApprLogInq", text: "카드 승인 로그 조회", iconCls: "x-fa fa-home", leaf: true
 * }
 */