declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeftGridRightFormRoutingModule } from './LeftGridRightForm-routing.module';
import { LeftGridRightFormComponent } from './LeftGridRightForm.component';
import { PaginationComponent } from '../../widget/pagination/pagination.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		LeftGridRightFormComponent,
		PaginationComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		LeftGridRightFormRoutingModule,
		ExtAngularModernModule,
		AngularEditorModule,
		HttpClientModule
	],
	providers: [
	]
})

export class LeftGridRightFormModule { }