declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProgListComponent } from './userProgList.component';

@NgModule({
	declarations: [
		UserProgListComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class UserProgListModule { }




/**
 * @copy to "tab-components.ts"
 * import { UserProgListComponent } from '../../admin/userProgList/userProgList.component';
 * { id : 'UserProgList',        component : UserProgListComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { UserProgListModule } from '../../admin/userProgList/userProgList.module';
 */
/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 * 	id: "UserProgList", name: "UserProgList", text: "사용자 메뉴 관리", iconCls: "x-fa fa-home", leaf: true
 * }
 */