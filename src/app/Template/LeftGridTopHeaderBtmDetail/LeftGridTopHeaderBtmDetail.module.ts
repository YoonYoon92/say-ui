declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeftGridTopHeaderBtmDetailRoutingModule } from './LeftGridTopHeaderBtmDetail-routing.module';
import { LeftGridTopHeaderBtmDetailComponent } from './LeftGridTopHeaderBtmDetail.component';

@NgModule({
	declarations: [
		LeftGridTopHeaderBtmDetailComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		LeftGridTopHeaderBtmDetailRoutingModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class LeftGridTopHeaderBtmDetailModule { }