declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchClassComponent } from './searchClass.component';

@NgModule({
	declarations: [
		SearchClassComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule
	],
	providers: [
	],
	exports:[SearchClassComponent]
	,
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class SearchClassModule { }

/**
 * @copy to "*.module.ts"
 * import { SearchClassComponent } from '../../../component/searchClass/searchClass.component';
 *
 *
 * @NgModule
 *   declarations: 에 SearchClassComponent  추가
 * 
 * 
 * @ 사용할 HTML 
 * <app-searchClass 
 *     [isDialogShowing]="this.isDialogShowing"
 *     [searchClassParamModel]="this.searchClassParamModel"  
 *     (sendObject)="itemSelected($event)"
 * >
 * </app-searchClass>
 * 
 *	
 **/



