declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypeAComponent } from './type-A.component';
import { TypeBComponent } from './type-B.component';
import { TypeCComponent } from './type-C.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { WidgetModule } from '../widget/widget.module';
import { PipeModule } from '../pipe/pipe.module';

@NgModule({
	declarations: [
		TypeAComponent,
		TypeBComponent,
		TypeCComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule,
		AngularEditorModule,
		WidgetModule,
		PipeModule
	],
	providers: [
		
	]
})

export class DeshboardModule { }