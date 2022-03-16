declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopHeaderBtmDetailRoutingModule } from './TopHeaderBtmDetail-routing.module';
import { TopHeaderBtmDetailComponent } from './TopHeaderBtmDetail.component';

@NgModule({
	declarations: [
		TopHeaderBtmDetailComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		TopHeaderBtmDetailRoutingModule,
		ExtAngularModernModule
	],
	providers: [
	]
})

export class TopHeaderBtmDetailModule { }