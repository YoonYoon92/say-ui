declare var Ext: any;
import { ExtAngularModernModule } from '@sencha/ext-angular-modern';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeekTimeSaleNewsComponent } from './weekTimeSaleNews.component';

@NgModule({
   declarations: [
      WeekTimeSaleNewsComponent,
   ],
   imports: [
      CommonModule,
      FormsModule,
      ExtAngularModernModule
   ],
   providers: [
   ]
})

export class WeekTimeSaleNewsModule { }



/**
 * @copy to "tab-components.ts"
 * import { WeekTimeSaleNewsComponent } from '../../spf/saleNews/weekTimeSaleNews/weekTimeSaleNews.component';
 * { id : 'WeekTimeSaleNews',              component : WeekTimeSaleNewsComponent},
 */

/**
 * @copy to "tab-modules.ts"
 * import { WeekTimeSaleNewsModule } from '../../spf/saleNews/weekTimeSaleNews/weekTimeSaleNews.module';
 */

/**
 * @copy to "account.component.ts" (개발 & 테스트때만)
 * {
 *     id: "WeekTimeSaleNews", name: "WeekTimeSaleNews", text: "시간대별매출속보", iconCls: "x-fa fa-home", leaf: true
*  }, 
 */