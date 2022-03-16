import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index.component';

/**
 * Dashboard Compoent
 */
import { TypeAComponent } from '../deshboard/type-A.component';
import { TypeBComponent } from '../deshboard/type-B.component';
import { TypeCComponent } from '../deshboard/type-C.component';

/**
 * 프로그램 Component
 */
import { LeftGridRightFormComponent } from '../Template/LeftGridRightForm/LeftGridRightForm.component';
import { LeftGridRightGridComponent } from '../Template/LeftGridRightGrid/LeftGridRightGrid.component';
import { CenterGridComponent } from '../Template/CenterGrid/CenterGrid.component';
import { LeftGridTopHeaderBtmDetailComponent } from '../Template/LeftGridTopHeaderBtmDetail/LeftGridTopHeaderBtmDetail.component';
import { LeftTreeRightGridComponent } from '../Template/LeftTreeRightGrid/LeftTreeRightGrid.component';
import { CenterTreeGridComponent } from '../Template/CenterTreeGrid/CenterTreeGrid.component';
import { LeftTreeRightFormComponent } from '../Template/LeftTreeRightForm/LeftTreeRightForm.component';
import { TopHeaderBtmDetailComponent } from '../Template/TopHeaderBtmDetail/TopHeaderBtmDetail.component';

import { CorpSaleNewsComponent } from '../spf/saleNews/corpSaleNews/corpSaleNews.component';
import { BillReportComponent } from '../spf/bill/billReport/billReport.component';
import { CalendarViewComponent } from '../Template/calendar/calendar.component';
import { TimeWeekComponent } from '../Template/timeWeek/timeWeek.component';

import { WeekTimeSaleNewsComponent } from '../spf/saleNews/weekTimeSaleNews/weekTimeSaleNews.component';
import { DayBestSaleInqComponent } from '../spf/saleNews/dayBestSaleInq/dayBestSaleInq.component';

const routes: Routes = [
	{ path: '', component: IndexComponent,
		children: [
			{ path: 'TypeA', loadChildren: ()=> TypeAComponent },
			{ path: 'TypeA', loadChildren: ()=> TypeBComponent },
			{ path: 'TypeB', loadChildren: ()=> TypeCComponent },
			{ path: 'TypeC', loadChildren: ()=> TypeAComponent },

			{ path: 'LeftGridRightGrid', loadChildren: ()=> LeftGridRightGridComponent },
			{ path: 'LeftGridRightForm', loadChildren: ()=> LeftGridRightFormComponent },
			{ path: 'CenterGrid', loadChildren: ()=> CenterGridComponent },
			{ path: 'LeftGridTopHeaderBtmDetail', loadChildren: ()=> LeftGridTopHeaderBtmDetailComponent },
			{ path: 'LeftTreeRightGrid', loadChildren: ()=> LeftTreeRightGridComponent },
			{ path: 'CenterTreeGrid', loadChildren: ()=> CenterTreeGridComponent },
			{ path: 'LeftTreeRightForm', loadChildren: ()=> LeftTreeRightFormComponent },
			{ path: 'TopHeaderBtmDetail', loadChildren: ()=> TopHeaderBtmDetailComponent },
			{ path: 'CorpSaleNews', loadChildren: ()=> CorpSaleNewsComponent },
			{ path: 'BillReport', loadChildren: ()=> BillReportComponent },
			{ path: 'Calendar', loadChildren: ()=> CalendarViewComponent },
			{ path: 'TimeWeek', loadChildren: ()=> TimeWeekComponent },
			{ path: 'WeekTimeSaleNews', loadChildren: ()=> WeekTimeSaleNewsComponent },
			{ path: 'DayBestSaleInq', loadChildren: ()=> DayBestSaleInqComponent },
		]
	 },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class IndexRoutingModule { }

