declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarViewComponent } from './calendar.component';

import { CalendarComponent } from '../../widget/calendar/calendar.component';

@NgModule({
	declarations: [
		CalendarComponent,
		CalendarViewComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ExtAngularModernModule,
	],
	providers: [
	]
})

export class CalendarModule { }