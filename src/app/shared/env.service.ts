import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';

export class Setting{
    view: string =  'tab'     //화면 표시 방법 tab or single
}

/**
 * api 로 부터의 응답 (응답코드, 메세지, 응답data)
 */
export class ResponseModel {
    code        : string;   
    message     : string;
    data        : any;
}

/**
 * 사용자 정보 저장
 */
export class Account {
    userId      : string;
    userName    : string;
    userIp      : string;
    lateDate    : string;
    latePgm     : string;
    userAuth    : string;
    jum         : string;
    jumName     : string;
    bu          : string;
    buName      : string;
    team        : string;
    teamName    : string;
}

/**
 * 공통코드
 */
export class CommCode{
    groupCd : string;
    codeId  : string;
    groupNm : string;
    codeNm  : string;
}

/**
 * 매장정보
 */
export class CommStore{
    storeCd : string;
    storeNm : string;
}

/**
 * 포스정보
 */
export class CommPos{
    posNo : string;
}

@Injectable()
export class EnvService extends ApiHttpService {
    public account          = new Account();
    public commCode         = new CommCode();
    public commStore        = new CommStore();
    public commPos          = new CommPos();
    public Setting          = new Setting();
    public progData         : any;
    public progName         : string = "SAY 차세대 웹 시스템";
    public weatherKey =  [
        '52d02d22499f0a08aff5e53cf76c4345'
    ,   '905cd6c32a75bf1da85443fdc68c427d'
    ,   'e1b7e59c59a8fb272dd9313e7b07dc3e'
    ]


    public adminMenu: any = 
        {
            id: "Template", name: "Template", text: "Template", iconCls: "x-fa fa-info", leaf: false, children: [
                {
                    id: "LeftGridRightGrid", name: "LeftGrid RightGrid", text: "LeftGrid RightGrid", iconCls: "x-fa fa-info", leaf: true
                },
                {
                    id: "LeftGridRightForm", name: "LeftGrid RightForm", text: "LeftGrid RightForm", iconCls: "x-fa fa-home", leaf: true
                },
                {
                    id: "CenterGrid", name: "Center Grid", text: "Center Grid", iconCls: "x-fa fa-home", leaf: true
                },
                {
                    id: "LeftGridTopHeaderBtmDetail", name: "LeftGrid TopHeader BtmDetail", text: "LeftGrid TopHeader BtmDetail", iconCls: "x-fa fa-home", leaf: true
                },
                {
                    id: "LeftTreeRightGrid", name: "LeftTree RightGrid", text: "LeftTree RightGrid", iconCls: "x-fa fa-home", leaf: true
                },
                {
                    id: "CenterTreeGrid", name: "Center TreeGrid", text: "Center TreeGrid", iconCls: "x-fa fa-home", leaf: true
                },
                {
                    id: "LeftTreeRightForm", name: "LeftTree RightForm", text: "LeftTree RightForm", iconCls: "x-fa fa-home", leaf: true
                },
                {
                    id: "TopHeaderBtmDetail", name: "TopHeader BtmDetail", text: "TopHeader BtmDetail", iconCls: "x-fa fa-home", leaf: true
                },
                {
                    id: "CorpSaleNews", name: "CorpSaleNews", text: "CorpSaleNews", iconCls: "x-fa fa-home", leaf: true
                },
                {
                    id: "BillReport", name: "BillReport", text: "BillReport", iconCls: "x-fa fa-home", leaf: true
                },
                {
                    id: "Calendar", name: "Calendar", text: "Calendar", iconCls: "x-fa fa-home", leaf: true
                },
                {
                    id: "TimeWeek", name: "TimeWeek", text: "TimeWeek", iconCls: "x-fa fa-home", leaf: true
                },
                {
                    id: "ProgList", name: "ProgList", text: "ProgList", iconCls: "x-fa fa-home", leaf: true
                },
                {
                 	id: "UserProgList", name: "UserProgList", text: "사용자 메뉴 관리", iconCls: "x-fa fa-home", leaf: true
                },
                ]
        }
    ;
        
    /**
     * 개발메뉴
     */
    public devMenu: any = 
        {
            id: "Template2", name: "Template2", text: "개발프로그램", iconCls: "x-fa fa-info", leaf: false, children: [
                // {
                //     id: "Notice", name: "Notice", text: "공지사항 입력", iconCls: "x-fa fa-home", leaf: true
                // },
                // 
                // {
                //     id: "WeekTimeSaleNews", name: "WeekTimeSaleNews", text: "주간시간대별매출", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "CalendarSaleNews", name: "CalendarSaleNews", text: "매출속보Calendar", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "LastYearCntstWeekSaleNews", name: "LastYearCntstWeekSaleNews", text: "전년대비주간매출속보", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "NewBrandSaleInq", name: "NewBrandSaleInq", text: "신규입점브랜드매출조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "OnHandTimeSaleNews", name: "OnHandTimeSaleNews", text: "시재별시간대매출속보", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //  	id: "CornerRtnSts", name: "CornerRtnSts", text: "코너별반품사유현황", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "NonSalesCornerByPeriodMgt", name: "NonSalesCornerByPeriodMgt", text: "매출 미발생 코너 관리", iconCls: "x-fa fa-home", leaf: true
                // },
                // //매출관리
                // {
                //     id: "SalesByTypeInq", name: "SalesByTypeInq", text: "형태별 매출 조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "SingleItemSalesInq", name: "SingleItemSalesInq", text: "단품 매출 조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "ProfitAnalysisOfMarginRateChg", name: "ProfitAnalysisOfMarginRateChg", text: "마진율 조정 이익 분석", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "CardApprLogInq", name: "CardApprLogInq", text: "카드 승인 로그 조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "GeneralCreditSalesInq", name: "GeneralCreditSalesInq", text: "기타시재 매출조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // 
                // {
                //     id: "ConerMmAvrageSaleInq", name: "ConerMmAvrageSaleInq", text: "코너 기간 실적 & 월 평균 매출 조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "DayBestSaleInq", name: "DayBestSaleInq", text: "기네스매출조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "CloseBefProfitInq", name: "CloseBefProfitInq", text: "가마감매출조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "CloseBefZoneSale", name: "CloseBefZoneSale", text: "Report테스트존별실적", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "CloseBefZoneSalePrint", name: "CloseBefZoneSalePrint", text: "Report존별실적", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "GiftEventInq", name: "GiftEventInq", text: "사은행사내역조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "PwdChg", name: "PwdChg", text: "비밀번호 변경", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "ConerHistoryInq", name: "ConerHistoryInq", text: "ConerHistoryInq", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "YearCornerSaleNews", name: "YearCornerSaleNews", text: "년간 코너 매출속보", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "CornerMarginChgSalesInq", name: "CornerMarginChgSalesInq", text: "코너 마진 변경 매출 조회", iconCls: "x-fa fa-home", leaf: true
                // },
                
                {
                    id: "ConerBestSaleInq", name: "ConerBestSaleInq", text: "ConerBestSaleInq", iconCls: "x-fa fa-home", leaf: true
                },
                // 
                // {
                //     id: "ClsSaleNews", name: "ClsSaleNews", text: "클래스별매출속보", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "BuRtnSaleNews", name: "BuRtnSaleNews", text: "반품매출속보조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "ClsPlnNetSaleSlt", name: "ClsPlnNetSaleSlt", text: "코너계획대순매출조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "CorpSpecialtradSaleBrkNs", name: "CorpSpecialtradSaleBrkNs", text: "전사특판매출조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "PeriodyearMmSaleAnalys", name: "PeriodyearMmSaleAnalys", text: "년간월별매출분석조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "AppSayPlusCoupon", name: "AppSayPlusCoupon", text: "세이플러스쿠폰조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "AppSayPlusSale", name: "AppSayPlusSale", text: "세이플러스매출조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "AppSayMsgCoupon", name: "AppSayMsgCoupon", text: "세이메세지쿠폰조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "CreditCardApprInq", name: "CreditCardApprInq", text: "카드별승인내역조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "DirectoryOfPartnersInq", name: "DirectoryOfPartnersInq", text: "협력업체인명부조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "ClsDanPumCdInq", name: "ClsDanPumCdInq", text: "클래스별단품조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "RcptNoDanPumInq", name: "RcptNoDanPumInq", text: "영수증번호별단품조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "JumManagement", name: "JumManagement", text: "점-관리화면", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "BuManagement", name: "BuManagement", text: "부-관리화면", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "TimManagement", name: "TimManagement", text: "팀-관리화면", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "PcManagement", name: "PcManagement", text: "PC-관리화면", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "ZoneManagement", name: "ZoneManagement", text: "존-관리화면", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "UserProgListManagement", name: "UserProgListManagement", text: "프로그램목록관리", iconCls: "x-fa fa-microchip", leaf: true
                // },
                // {
                //     id: "CornerManagement", name: "CornerManagement", text: "코너-관리화면", iconCls: "x-fa fa-microchip", leaf: true
                // },
                // {
                //     id: "AcntSleManageCt", name: "AcntSleManageCt", text: "계정별판관비실적", iconCls: "x-fa fa-microchip", leaf: true
                // },
                // {
                //     id: "ClsSendHistory", name: "ClsSendHistory", text: "클래스전송내역조회", iconCls: "x-fa fa-microchip", leaf: true
                // },
                // {
                //     id: "RegiMasterSendInq", name: "RegiMasterSendInq", text: "레지별마스터송신조회", iconCls: "x-fa fa-microchip", leaf: true
                // },
                // {
                //     id: "ChgMarginCmplSlp", name: "ChgMarginCmplSlp", text: "마진변경내역처리조회", iconCls: "x-fa fa-microchip", leaf: true
                // },
                // {
                //     id: "RegiMasterSendInq", name: "RegiMasterSendInq", text: "레지별마스터송신조회", iconCls: "x-fa fa-microchip", leaf: true
                // },
                // //회계
                // {
                //     id: "AcntSleManageCt", name: "AcntSleManageCt", text: "계정별판관비실적", iconCls: "x-fa fa-microchip", leaf: true
                // },
                // {
                //     id: "LedgrSbManageCt", name: "LedgrSbManageCt", text: "보조원장관리", iconCls: "x-fa fa-microchip", leaf: true
                // },

              

                // 
                // //매출속보
                // {
                //     id: "PcLastYearCntstIncrsrateInq", name: "PcLastYearCntstIncrsrateInq", text: "전년대비신장율조회", iconCls: "x-fa fa-home", leaf: true
                // },                 
                // {
                //     id: "BuPlanSaleInq", name: "BuPlanSaleInq", text: "부서계획매출조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "EventHallSaleInq", name: "EventHallSaleInq", text: "행사장매출조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "EventHistoryInq", name: "EventHistoryInq", text: "행사내역조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "LargeShopSaleInq", name: "LargeShopSaleInq", text: "대형매장 매출조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "ConerPlanCntstPerfomSts", name: "ConerPlanCntstPerfomSts", text: "코너계획대비매출현황", iconCls: "x-fa fa-home", leaf: true
                // },
                // //조직관리
                // {
                //     id: "OrgnztInq", name: "OrgnztInq", text: "조직 조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "ConerLinkManagement", name: "ConerLinkManagement", text: "코너 연계성 관리", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "ZoneLinkManagement", name: "ZoneLinkManagement", text: "존 연계성 관리", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "WorkEnvMangement", name: "WorkEnvMangement", text: "영업 환경 관리", iconCls: "x-fa fa-home", leaf: true
                // },
                // //상품관리
                // {
                //     id: "ClsSendHistory", name: "ClsSendHistory", text: "CLASS 전송내역", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "ClsInq", name: "ClsInq", text: "CLASS 조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "ClsManagement", name: "ClsManagement", text: "클래스 관리", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "PartnerManagement", name: "PartnerManagement", text: "PartnerManagement", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "MarginExchangeInq", name: "MarginExchangeInq", text: "코너별 마진변경 조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "DiscountClsManagement", name: "DiscountClsManagement", text: "DiscountClsManagement", iconCls: "x-fa fa-home", leaf: true
                // },
                // //매출관리
                // {
                //     id: "partnerSaleInq", name: "partnerSaleInq", text: "협력업체 매출조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "ConerDcntListInq", name: "ConerDcntListInq", text: "코너 할인내역 조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "ReceiptInfoInq", name: "ReceiptInfoInq", text: "영수증 종합정보 조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // //매출관리-영수증관리
                // {
                //     id: "TrLogConerSaleInq", name: "TrLogConerSaleInq", text: "TR-LOG코너매출 조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // //매가관리
                // {
                //     id: "salePriceChgReqFormInq", name: "salePriceChgReqFormInq", text: "매가변경 의뢰서 조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "SalePriceChgReqManagement", name: "SalePriceChgReqManagement", text: "매가변경의뢰서 관리", iconCls: "x-fa fa-home", leaf: true
                // },
                // //매입관리
                // {
                //     id: "BuyReqFormInq", name: "BuyReqFormInq", text: "매입 의뢰서 조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "BuyReqManagement", name: "BuyReqManagement", text: "매입 의뢰서 입력", iconCls: "x-fa fa-home", leaf: true
                // },
                // //반품관리
                // {
                //     id: "RtnReqFormInq", name: "RtnReqFormInq", text: "반품 의뢰서조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "RtnReqManagement", name: "RtnReqManagement", text: "반품 의뢰서 입력", iconCls: "x-fa fa-home", leaf: true
                // },
                // //excel
                // {
                //   	id: "DayAggregation", name: "DayAggregation", text: "일집계 출력", iconCls: "x-fa fa-home", leaf: true
                // },
                // //신용판매
                // {
                //     id: "TradingAreaPostInq", name: "TradingAreaPostInq", text: "상권별 우편번호 조회", iconCls: "x-fa fa-home", leaf: true
                // },
                // {
                //     id: "PointSalesInq", name: "PointSalesInq", text: "포인트매출내역 조회", iconCls: "x-fa fa-home", leaf: true
                // },
                {
                    id: "SmsExceptManagement", name: "SmsExceptManagement", text: "sms전송 제외 대상자 설정", iconCls: "x-fa fa-home", leaf: true
                }
                ]
        };

        public envMenu: any = 
            {
                id: "PwdChg", name: "PwdChg", text: "비밀번호 변경", iconCls: "x-fa fa-home", leaf: true
            }
        
    //접속자 위치 획득
    getPosition(): Promise<any>{
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resp => {
                resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
            },
            err => {
                reject(err);
            });
        });
    }

    //접속 지역 날씨 조회
    selectWeatherMap(reqeust: any){
        //배열로 저장된 API KEY를 무작위로 뽑아서 가저온다
        let useKey =  this.weatherKey[Math.floor(Math.random() * this.weatherKey.length)];
        return this.httpGetOutside(`https://api.openweathermap.org/data/2.5/onecall?lat=${reqeust.lat}&lon=${reqeust.lng}&appid=${useKey}&lang=kr`);
    }

    /**
     * 공통코드 조회 처리
     * @param reqeust 
     */
    public selectCommonCodeList(reqeust: CommCode){
        return this.httpPost('/api/comm/selectCommCodeList', reqeust);
    }

    /**
     * 매장목록 조회
     * @param reqeust 
     */
    public selectCommStoreList(reqeust: CommStore){
        return this.httpPost('/api/comm/selectCommStoreList', reqeust);
    }

    
    /**
     * 사용자메뉴 조회
     * @param reqeust 
     */
    public selectCommEnvProgList(reqeust: Account){
        return this.httpPost('/api/program/selectUserEnvProgList', reqeust);
    }

    public selectCommProgList(reqeust: Account){
        return this.httpPost('/api/program/selectUserProgList', reqeust);
    }



    //히팅 카운드 update
	public updateHitCount(request: any){
		return this.httpPost('/api/program/updateHitCount',request);
	}
    
    /**
     * 포스목록 조회
     * @param reqeust 
     */
    public selectCommPosList(reqeust: CommPos){
        return this.httpPost('/api/program/selectCommPosList', reqeust);
    }

    /**
     * 조직 tree
     * @param reqeust 
     */
    public selectCommStoreTree(reqeust: any){
        return this.httpPost('/api/comm/selectStoreList', reqeust);
    }

    /**
     * 조직(점)
     * @param reqeust 
     */
    public selectStoreComboLv1List(reqeust: any){
        return this.httpPost('/api/comm/selectStoreComboLv1List', reqeust);
    }

    /**
     * 조직(부)
     * @param reqeust 
     */
    public selectStoreComboLv2List(reqeust: any){
        return this.httpPost('/api/comm/selectStoreComboLv2List', reqeust);
    }
    public selectStoreComboLv2ListInsa(reqeust: any){
        return this.httpPost('/api/comm/selectStoreComboLv2ListInsa', reqeust);
    }

    /**
     * 조직(팀)
     * @param reqeust 
     */
    public selectStoreComboLv3List(reqeust: any){
        return this.httpPost('/api/comm/selectStoreComboLv3List', reqeust);
    }
    public selectStoreComboLv3ListInsa(reqeust: any){
        return this.httpPost('/api/comm/selectStoreComboLv3ListInsa', reqeust);
    }

    /**
     * 조직(PC)
     * @param reqeust 
     */
    public selectStoreComboLv4List(reqeust: any){
        return this.httpPost('/api/comm/selectStoreComboLv4List', reqeust);
    }

    /**
     * 조직(코너)
     * @param reqeust 
     */
    public selectStoreComboLv5List(reqeust: any){
        return this.httpPost('/api/comm/selectStoreComboLv5List', reqeust);
    }

    /**
     * 조직(Class)
     * @param reqeust 
     */
    public selectStoreComboLv6List(reqeust: any){
        return this.httpPost('/api/comm/selectStoreComboLv6List', reqeust);
    }

    /**
     * 입력 받은 만큼 전일 일자 
     * @param day 
     */
    public getBeforeDate(day){
        let date = new Date();
        return date.setDate( date.getDate() - day );
    } 

    /**
     * Date To String
     * @param date 
     */
    public getDateToString(date){

        if( date == null ) date = new Date();
        let stringDate = new Date(date);

        let year    = stringDate.getFullYear();
        let month   = stringDate.getMonth() + 1 < 10 ? `0${stringDate.getMonth() + 1}` : stringDate.getMonth() + 1;
        let day     = stringDate.getDate() < 10 ? `0${stringDate.getDate()}` : stringDate.getDate();

        return `${year}${month}${day}`;
    }

    /**
     * Date To String Format
     * @param date 
     */
    public getDateToStringFormat(date, type){

        if( date == null ) date = new Date();
        let stringDate = new Date(date);

        let year    = stringDate.getFullYear();
        let month   = stringDate.getMonth() + 1 < 10 ? `0${stringDate.getMonth() + 1}` : stringDate.getMonth() + 1;
        let day     = stringDate.getDate() < 10 ? `0${stringDate.getDate()}` : stringDate.getDate();

        return `${year}${type}${month}${type}${day}`;
    }

    /**
     * ±val 날짜
     * @param day 
     */
    public getCalDate(val){
        let date = new Date();
        return val > 0 ? date.setDate( date.getDate() - val ) : date.setDate( date.getDate() + val );
    } 

    //±val 년도
    public getCalYear(val){
        let date = new Date();
        return val > 0 ? date.getFullYear() - val :  date.getFullYear() + val;
    }

    //±val 월
    public getCalMonth(val){

        let date = new Date();
        return val > 0 ? (date.getMonth() - val) + 1 :  (date.getMonth() + val) +1;
    }

    //±val 일
    public getCalDay(val){
        let date = new Date();
        return val > 0 ? date.getDate() - val :  date.getDate() + val;
    }

    //요일
    public dayOfWeek(day){
        let week = ['일', '월', '화', '수', '목', '금', '토'];
        let date = new Date();
        date.setDate( date.getDate() + day );
        return week[date.getDay()];
    }

    public getDateWeekToStringFormat(date, type){

        if( date == null ) date = new Date();
        let stringDate = new Date(date);
        let week = ['일','월','화','수','목','금','토'];

        let year    = stringDate.getFullYear();
        let month   = stringDate.getMonth() + 1 < 10 ? `0${stringDate.getMonth() + 1}` : stringDate.getMonth() + 1;
        let day     = stringDate.getDate() < 10 ? `0${stringDate.getDate()}` : stringDate.getDate();
        let dayOfWeek = week[stringDate.getDay()];
        return `${year}${type}${month}${type}${day}(${dayOfWeek})`;
    }

    public getStringToDateFormat(str) {
        let year = str.substr(0, 4);
        let month = str.substr(4, 2);
        let day = str.substr(6, 2);
        return new Date(year,month-1,day);
    }
    

    //val 값만큼 배열수 만들기(*ngfor 돌릴때 종종 필요해서 만듬)
    public getArrayNum(val: number){
        return new Array(val).fill(0).map((x,i)=>i);
    }

    //천단위 콤마
    comma(str) { 
        str = String(str); 
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'); 
    } 

    //콤마 삭제
    uncomma(str) { 
        str = String(str); 
        return str.replace(/[^\d]+/g, ''); 
    }

    //켈빈 단위 섭씨로 변경
    public kToc(val){
        return val < 0 ? val : (val - 273.15).toFixed(1);
    }

    //날씨 API 아이콘 변환
    public weatherIcon(val){
        let icon = '';
        switch (val) {
            case '01d':
                icon = 'wi wi-day-sunny';
                break;
            case '01n':
                icon = 'wi wi-night-clear';
                break;
            case '02d':
                icon = 'wi wi-day-cloudy';
                break;
            case '02n':
                icon = 'wi wi-night-alt-cloudy';
                break;
            case '03d':
                icon = 'wi wi-cloud';
                break;
            case '03n':
                icon = 'wi wi-cloud';
                break;
            case '04d':
                icon = 'wi wi-cloudy';
                break;
            case '04n':
                icon = 'wi wi-cloudy';
                break;
            case '09d':
                icon = 'wi wi-rain';
                break;
            case '09n':
                icon = 'wi wi-rain';
                break;
            case '10d':
                icon = 'wi wi-day-rain-mix';
                break;
            case '10n':
                icon = 'wi wi-night-alt-rain';
                break;
            case '11d':
                icon = 'wi wi-day-lightning';
                break;
            case '11n':
                icon = 'wi wi-night-lightning';
                break;
            case '13d':
                icon = 'wi wi-snow';
                break;
            case '13n':
                icon = 'wi wi-snow';
                break;
            case '50d':
                icon = 'wi wi-dust';
                break;
            case '50n':
                icon = 'wi wi-dust';
                break;
            default:
                icon = 'wi wi-na';
                break;
        }

        return icon;
    }
}
