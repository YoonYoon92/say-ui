/**
 * Deshboard Module
 */
import { DeshboardModule } from '../../deshboard/deshboard.module';
/**
 * 프로그램 Module
 */
import { LeftGridRightFormModule } from '../../Template/LeftGridRightForm/LeftGridRightForm.module';
import { LeftGridRightGridModule } from '../../Template/LeftGridRightGrid/LeftGridRightGrid.module';
import { CenterGridModule } from '../../Template/CenterGrid/CenterGrid.module';
import { LeftGridTopHeaderBtmDetailModule } from '../../Template/LeftGridTopHeaderBtmDetail/LeftGridTopHeaderBtmDetail.module';
import { LeftTreeRightGridModule } from '../../Template/LeftTreeRightGrid/LeftTreeRightGrid.module';
import { CenterTreeGridModule } from '../../Template/CenterTreeGrid/CenterTreeGrid.module';
import { LeftTreeRightFormModule } from '../../Template/LeftTreeRightForm/LeftTreeRightForm.module';
import { TopHeaderBtmDetailModule } from '../../Template/TopHeaderBtmDetail/TopHeaderBtmDetail.module';

import { CorpSaleNewsModule } from '../../spf/saleNews/corpSaleNews/corpSaleNews.module';
import { BillReportModule } from '../../spf/bill/billReport/billReport.module';
import { CalendarModule } from '../../Template/calendar/calendar.module';
import { TimeWeekModule } from '../../Template/timeWeek/timeWeek.module';
import { CornerRtnStsModule } from '../../spf/saleNews/cornerRtnSts/cornerRtnSts.module';

import { WeekTimeSaleNewsModule } from '../../spf/saleNews/weekTimeSaleNews/weekTimeSaleNews.module';
import { DayBestSaleInqModule } from '../../spf/saleNews/dayBestSaleInq/dayBestSaleInq.module';
import { ClsSaleNewsModule } from '../../spf/saleNews/clsSaleNews/clsSaleNews.module';
import { ConerMmAvrageSaleInqModule } from '../../spf/saleNews/conerMmAvrageSaleInq/conerMmAvrageSaleInq.module';
import { BuRtnSaleNewsModule } from '../../spf/saleNews/buRtnSaleNews/buRtnSaleNews.module';
import { ClsPlnNetSaleSltModule } from '../../spf/saleNews/clsPlnNetSaleSlt/clsPlnNetSaleSlt.module';
import { BuPlanSaleInqModule } from '../../spf/saleNews/buPlanSaleInq/buPlanSaleInq.module';
import { PcLastYearCntstIncrsrateInqModule } from '../../spf/saleNews/pcLastYearCntstIncrsrateInq/pcLastYearCntstIncrsrateInq.module';
import { CloseBefProfitInqModule } from '../../spf/saleNews/closeBefProfitInq/closeBefProfitInq.module';
import { CalendarSaleNewsModule } from '../../spf/saleNews/calendarSaleNews/calendarSaleNews.module';
import { LastYearCntstWeekSaleNewsModule } from '../../spf/saleNews/lastYearCntstWeekSaleNews/lastYearCntstWeekSaleNews.module';
import { NewBrandSaleInqModule } from '../../spf/saleNews/newBrandSaleInq/newBrandSaleInq.module';
import { OnHandTimeSaleNewsModule } from '../../spf/saleNews/onHandTimeSaleNews/onHandTimeSaleNews.module';
import { EventHallSaleInqModule } from '../../spf/saleNews/eventHallSaleInq/eventHallSaleInq.module';
import { EventHistoryInqModule } from '../../spf/saleNews/eventHistoryInq/eventHistoryInq.module';
import { LargeShopSaleInqModule } from '../../spf/saleNews/largeShopSaleInq/largeShopSaleInq.module';
import { CorpSpecialtradSaleBrkNsModule } from '../../spf/saleNews/corpSpecialtradSaleBrkNs/corpSpecialtradSaleBrkNs.module';
import { PeriodyearMmSaleAnalysModule } from '../../spf/saleNews/periodyearMmSaleAnalys/periodyearMmSaleAnalys.module'; 
import { CloseBefZoneSaleModule } from '../../spf/saleNews/closeBefZoneSale/closeBefZoneSale.module';
import { CloseBefZoneSalePrintModule } from '../../spf/saleNews/closeBefZoneSalePrint/closeBefZoneSalePrint.module';
import { GiftEventInqModule } from '../../spf/giftEvent/giftEventInq/giftEventInq.module';

import { AppSayPlusCouponModule } from '../../spf/saleNews/appSayPlusCoupon/appSayPlusCoupon.module';
import { AppSayPlusSaleModule } from '../../spf/saleNews/appSayPlusSale/appSayPlusSale.module';
import { AppSayMsgCouponModule } from '../../spf/saleNews/appSayMsgCoupon/appSayMsgCoupon.module';
import { CreditCardApprInqModule } from '../../spf/saleNews/creditCardApprInq/creditCardApprInq.module'; 
import { DirectoryOfPartnersInqModule } from '../../spf/saleNews/directoryOfPartnersInq/directoryOfPartnersInq.module'; 
import { ClsDanPumCdInqModule } from '../../spf/saleNews/clsDanPumCdInq/clsDanPumCdInq.module'; 
import { RcptNoDanPumInqModule } from '../../spf/saleNews/rcptNoDanPumInq/rcptNoDanPumInq.module'; 

import { OrgnztInqModule } from '../../spf/org/orgnztInq/orgnztInq.module';
import { ClsSendHistoryModule } from '../../spf/goods/clsSendHistory/clsSendHistory.module';
import { partnerSaleInqModule } from '../../spf/selng/partnerSaleInq/partnerSaleInq.module';
import { ConerPlanCntstPerfomStsModule } from '../../spf/saleNews/conerPlanCntstPerfomSts/conerPlanCntstPerfomSts.module';
import { ConerDcntListInqModule } from '../../spf/selng/conerDcntListInq/conerDcntListInq.module';
import { SalePriceChgReqFormInqModule } from '../../spf/salePrice/salePriceChgReqFormInq/salePriceChgReqFormInq.module';
import { BuyReqFormInqModule } from '../../spf/puchas/buyReqFormInq/buyReqFormInq.module';
import { RtnReqFormInqModule } from '../../spf/rtngud/rtnReqFormInq/rtnReqFormInq.module';
import { ClsInqModule } from '../../spf/goods/clsInq/clsInq.module';
import { TrLogConerSaleInqModule } from '../../spf/selng/selngrcpt/TrLogConerSaleInq/TrLogConerSaleInq.module';
import { ConerHistoryInqModule } from '../../spf/org/conerHistoryInq/conerHistoryInq.module';
import { ConerLinkManagementModule } from '../../spf/org/conerLinkManagement/conerLinkManagement.module';
import { ZoneLinkManagementModule } from '../../spf/org/zoneLinkManagement/zoneLinkManagement.module';

import { JumManagementModule } from '../../spf/org/jumManagement/jumManagement.module'; 
import { BuManagementModule } from '../../spf/org/buManagement/buManagement.module'; 
import { TimManagementModule } from '../../spf/org/timManagement/timManagement.module'; 
import { PcManagementModule } from '../../spf/org/pcManagement/pcManagement.module'; 
import { ZoneManagementModule } from '../../spf/org/zoneManagement/zoneManagement.module'; 
import { UserProgListManagementModule } from '../../admin/userProgListManagement/userProgListManagement.module'; 

import { NoticeModule } from '../../comm/notice/notice.module';
import { ProgListModule } from '../../Template/progList/progList.module';
import { UserProgListModule } from '../../admin/userProgList/userProgList.module';
import { PwdChgModule } from '../../admin/pwdChg/pwdChg.module';
import { DayAggregationModule } from '../../spf/excel/dayAggregation/dayAggregation.module';
import { WorkEnvMangementModule } from '../../spf/org/workEnvMangement/workEnvMangement.module';
import { NonSalesCornerByPeriodMgtModule } from '../../spf/org/nonSalesCornerByPeriodMgt/nonSalesCornerByPeriodMgt.module';
import { CornerManagementModule } from '../../spf/org/cornerManagement/cornerManagement.module'; 
import { ClsManagementModule } from '../../spf/goods/clsManagement/clsManagement.module';
import { YearCornerSaleNewsModule } from '../../spf/saleNews/yearCornerSaleNews/yearCornerSaleNews.module';
import { PartnerManagementModule } from '../../spf/goods/partnerManagement/partnerManagement.module';
import { MarginExchangeInqModule } from '../../spf/goods/marginExchangeInq/marginExchangeInq.module';
import { DiscountClsManagementModule } from '../../spf/goods/discountClsManagement/discountClsManagement.module';
import { RegiMasterSendInqModule } from '../../spf/goods/regiMasterSendInq/regiMasterSendInq.module'; 
import { BuyReqManagementModule } from '../../spf/puchas/buyReqManagement/buyReqManagement.module';
import { RtnReqManagementModule } from '../../spf/rtngud/rtnReqManagement/RtnReqManagement.module';
import { SalesByTypeInqModule } from '../../spf/selng/salesByTypeInq/salesByTypeInq.module';
import { ReceiptInfoInqModule } from '../../spf/selng/receiptInfoInq/receiptInfoInq.module';
import { ChgMarginCmplSlpModule } from '../../spf/goods/chgMarginCmplSlp/chgMarginCmplSlp.module'; 
import { RegiMasterSendInqComponent } from '../../spf/goods/regiMasterSendInq/regiMasterSendInq.component';
//import { LedgrSbManageCtModule } from '../../sda/sleManageCt/ledgrSbManageCt/ledgrSbManageCt.module'; 
import { SingleItemSalesInqModule } from '../../spf/selng/singleItemSalesInq/singleItemSalesInq.module';
import { ProfitAnalysisOfMarginRateChgModule } from '../../spf/selng/profitAnalysisOfMarginRateChg/profitAnalysisOfMarginRateChg.module';
import { CardApprLogInqModule } from '../../spf/selng/cardApprLogInq/cardApprLogInq.module';
import { SalePriceChgReqManagementModule } from '../../spf/salePrice/salePriceChgReqManagement/salePriceChgReqManagement.module';
import { CornerMarginChgSalesInqModule } from '../../spf/selng/cornerMarginChgSalesInq/cornerMarginChgSalesInq.module';
import { GeneralCreditSalesInqModule } from '../../spf/selng/generalCreditSalesInq/generalCreditSalesInq.module';
import { ConerBestSaleInqModule } from '../../spf/selng/conerBestSaleInq/conerBestSaleInq.module';


//신용판매SCD
import { TradingAreaPostInqModule } from '../../scd/custmer/tradingAreaPostInq/tradingAreaPostInq.module';
import { TradingAreaMemberInqModule } from '../../scd/custmer/tradingAreaMemberInq/tradingAreaMemberInq.module';
import { PointSalesInqModule } from '../../scd/custmer/pointSalesInq/pointSalesInq.module';
import { SmsExceptManagementModule } from '../../scd/custmer/smsExceptManagement/smsExceptManagement.module';
import { DmEventHisInqModule } from '../../scd/custmer/dmEventHisInq/dmEventHisInq.module';

//회계SDA
import { AcntSleManageCtModule } from '../../sda/sleManageCt/acntSleManageCt/acntSleManageCt.module'; 
import { LedgrSbManageCtModule } from '../../sda/sleManageCt/ledgrSbManageCt/ledgrSbManageCt.module'; 

export class TabModules { }