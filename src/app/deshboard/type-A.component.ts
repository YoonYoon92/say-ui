declare var Ext: any;
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Deshboard } from './shared/deshboard.model';
import { DeshboardService } from './shared/deshboard.service';
import { EnvService } from '../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
    selector: 'app-type-A',
    templateUrl: './type-A.component.html',
    styleUrls: [
        './css/type-A.component.css'
    ,   './css/deshboard.css'
    ],
    providers: [DeshboardService],
})
export class TypeAComponent implements OnInit {

    public paramModel: Deshboard = <Deshboard>{};

    public padding : number = 10;

    //일매출 달성율
    public dailySale    : any;

    //월매출 달성율
    public monthlySale  : any;

    //년매출 진도율
    public annualSale   : any;

    //온라인 매출
    public onlineSale   : any;

    //라인차트
    public lineChart    : any;

    //도넛차트
    public douctChart   : any;

    //접속자 위치 정보
    public location     : any;

    //날씨 정보
    public weatherMap   : any;

    public monthNm: string; //월
    public dayNm: string;   //일
    public weekNm: string;  //요일

    //공지 상세 다이얼로그 화면 표시 구분
    public isDialogShowing: boolean = false;

    //달력 데이터 모델
    public calendarModel: any;

    public complainModel: any;          //컴플레인 목록 처리 model
    public compainDialogItem: any = {}  //컴플레인 다이얼로그 처리 model
    public isCompainDialog: boolean = false;    //컴플레인 다이얼로그 표시 여부
    public compainDialogTitle: string = "";     //컴플레인 다이이얼로그 제목

    //공지사항 상세보기 제어
    public isCollapse: boolean = true;

    //공지사항 달력 상세보기 item model
    public eventItem: any = {};
    //공지사항 다이얼로그 상세보기 item model
    public noticeDialogItem: any = {};
    //공지사항 모델
    public noticeModel: any;            //공지사항 목록 처리 model
    public ArrNoticeModel: any = [];    //공지사항 달력 처리 Array

    public isNoticeDialog: boolean = false; //공지 상세보기 다이얼로그 표시 여부
    public noticeDialogTitle: string = "";  //공지 상세보기 다이얼로그 제목

    config: AngularEditorConfig = {
		editable: false,				    //편집여부
		spellcheck: false,					//맞춤법 검사
		height: '30rem',					//높이
        minHeight: '5rem',					//최소높이
		placeholder: '',
		translate: 'no',					//번역사용
		defaultParagraphSeparator: 'p',		//단락 구분기호
		defaultFontName: 'Arial',
		toolbarHiddenButtons: [				//숨길 툴바버튼(배열)
			['insertImage']
		],
		toolbarPosition: 'top',				//툴바위치(top, bottom)
		showToolbar: false,					//툴바표시
		uploadUrl: '/api/blahblah',			//이미지 업로드시 처리할 서버 api 주소
	};

    constructor(private deshboardService: DeshboardService, public envService: EnvService, private cd: ChangeDetectorRef ) { }
    ngOnInit() {

        /**
         * api/dashboard/achiv 호출시(당일,당월,당년,온라인 조회) 결과가 없으면 쿼리에서 오류가 발생해서 테스트는 값 지정하고 진행함
         */
        this.paramModel.saleDate = this.envService.getDateToString(null);   //오늘날짜
        //this.paramModel.saleDate = '20201010';
        this.paramModel.account = this.envService.account;


        // this.paramModel.jum = this.envService.account.jum;                  //점코드
        // this.paramModel.userId = this.envService.account.userId;            //유저아이디

        // this.paramModel.saleDate = '20201001';
        // this.paramModel.jum = '01';
        // this.paramModel.userId = '211015'; 


        //당일 당월 당년 온라인 조회
        this.getAchiv();

        //시간대별 조회
        this.getTimeZone();

        //행사장 매출
        this.getEventSale();

        //공지사항 조회
        this.getNotice();

        //컴플레인 조회
        this.getComplain();

        //월 일 요일
        this.monthNm    = this.envService.getCalMonth(0);
        this.dayNm      = this.envService.getCalDay(0);
        this.weekNm     = this.envService.dayOfWeek(0);

        //날씨 조회
        this.getGeolocation();

         //타이머 10분(600000 밀리초) 마다 reLoad 함수 실행
         //setInterval(()=>this.reLoad(), 300000);
    }
    //새로고침
    reLoad(){
        //당일 당월 당년 온라인 조회
        this.getAchiv();
        //시간대별 조회
        this.getTimeZone();
        //행사장 매출
        this.getEventSale();
        //날씨 조회
        this.getGeolocation();
    }
    getGeolocation(){
        //현재 접속한 사용자의 위치 정보를 가져온다
        this.envService.getPosition().then(pos=>{
            /* 날씨 정보 조회
               위도 경도는 접속자 위치(브라우저에서 권한 동의 해야함) 
               위치 정보를 못가져 올때는 기본값으로 대전
            */
           this.location = {
                lng: pos.lng
            ,   lat: pos.lat
           }
           this.getWeatherMap();
        }).catch(err=>{
            this.location = {
                lng: '127.408961'
            ,   lat: '36.321038'
           }
           this.getWeatherMap();
        });

    }

    //당일 당월 당년 온라인 조회
    getAchiv(){
        this.deshboardService.achiv(this.paramModel).subscribe(
            (res: any) => {
				/**
				 * @success
				 */
                //일매출
                this.dailySale = {
                    title   : '일매출 달성율'
                ,   style   : 'alert alert-primary'
                ,   netSale : this.envService.comma( Math.round(res.dayNetSale / 1000) )
                ,   netTry  : this.envService.comma( Math.round(res.dayNetTry / 1000) )
                ,   value   : res.dayAchivRate
                ,   dayInfo : this.envService.getDateToStringFormat(null, '.')
                ,   isChart : true
                ,   canvasId: 'dailyGauge'
                }

                //월매출
                this.monthlySale = {
                    title   : '월매출 달성율'
                ,   style   : 'alert alert-success'
                ,   netSale : this.envService.comma( Math.round(res.monthNetSale / 1000) )
                ,   netTry  : this.envService.comma( Math.round(res.monthNetTry / 1000) )
                ,   value   : res.monthAchivRate
                ,   dayInfo : this.envService.getDateToStringFormat(null,'.').substring(0,7)
                ,   isChart : true
                ,   canvasId: 'monthGauge'
                }

                //년매출
                this.annualSale = {
                    title   : '년매출 달성율'
                ,   style   : 'alert alert-danger'
                ,   netSale : this.envService.comma( Math.round(res.yearNetSale / 1000) )
                ,   netTry  : this.envService.comma( Math.round(res.yearNetTry / 1000) )
                ,   value   : res.yearAchivRate
                ,   dayInfo : this.envService.getDateToStringFormat(null,'.').substring(0,4)
                ,   isChart : true
                ,   canvasId: 'annuaGauge'
                }

                //온라인
                this.onlineSale = {
                    title   : '온라인 매출'
                ,   style   : 'alert alert-info'
                ,   value   : `${this.envService.comma(res.dayOnlineNetSale)}원`
                ,   dayInfo : this.envService.getDateToStringFormat(null, '.')
                ,   isChart : false
                }

			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'API Connection Error!!');
				if (err.error instanceof Error) {
					console.log('An error occurred:', err.error.message);
				} else {
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
        );
    }

    //시간대별 조회
    getTimeZone(){
        this.deshboardService.timeZone(this.paramModel).subscribe(
            (res: any) => {
				/**
				 * @success
				 */
                //라인차트
                this.lineChart ={
                    title: `${this.envService.getCalMonth(0)}월 ${this.envService.getCalDay(0)}일 시간대별 매출`
                ,   labels: res.dayTimeLable
                ,   vh : '30vh'
                ,   rows:[
                        {
                            label:  '당일'
                        ,   data:   res.daySale     //서버에서 가져온 값으로... x축 맞춰서 값이 없는 경우는 0으로 해줘야함
                        ,   backgroundColor: 'rgba(255, 99, 132, 0.5)'
                        ,   borderColor: 'rgba(255,99,132,1)'
                        ,   borderWidth: 1
                        ,   fill: false
                        },
                        {
                            label:  '전주'
                        ,   data:   res.lastWeekSale   //서버에서 가져온 값으로... x축 맞춰서 값이 없는 경우는 0으로 해줘야함
                        ,   backgroundColor: 'rgba(54, 162, 235, 0.5)'
                        ,   borderColor: 'rgba(54, 162, 235, 1)'
                        ,   borderWidth: 1
                        ,   fill: false
                        },
                        {
                            label:  '전년'
                        ,   data:   res.lastYearSale   //서버에서 가져온 값으로... x축 맞춰서 값이 없는 경우는 0으로 해줘야함
                        ,   backgroundColor: 'rgba(75, 192, 192, 0.5)'
                        ,   borderColor: 'rgba(75, 192, 192, 1)'
                        ,   borderWidth: 1
                        ,   fill: false
                        }
                    ]
                }
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'API Connection Error!!');
				if (err.error instanceof Error) {
					console.log('An error occurred:', err.error.message);
				} else {
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}  
        );
    }

    //행사장 매출 조회
    getEventSale(){
        this.deshboardService.eventSale(this.paramModel).subscribe(
            (res: any) => {
				/**
				 * @success
				 */
                //행사장 차트
                this.douctChart={
                    title: '행사장 매출(일별)',
                    labels: res.eventNm,
                    data: res.netSale 
                }
               
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'API Connection Error!!');
				if (err.error instanceof Error) {
					console.log('An error occurred:', err.error.message);
				} else {
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
        );
    }

    //공지사항 조회
    getNotice(){
        this.deshboardService.notice(this.paramModel).subscribe(
            (res: any) => {
				/**
				 * @success
				 */
                this.noticeModel = res;
                this.ArrNoticeModel = res;
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'API Connection Error!!');
				if (err.error instanceof Error) {
					console.log('An error occurred:', err.error.message);
				} else {
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
        );
    }

    //컴플레인 조회
    getComplain(){
        this.deshboardService.complain(this.paramModel).subscribe(
            (res: any) => {
				/**
				 * @success
				 */
                this.complainModel = res;
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'API Connection Error!!');
				if (err.error instanceof Error) {
					console.log('An error occurred:', err.error.message);
				} else {
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
        );
    }

    //날씨 조회
    getWeatherMap(){
        this.envService.selectWeatherMap(this.location).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
                this.weatherMap = res;
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', '날씨정보 조회 실패.');
				if (err.error instanceof Error) {
					console.log('An error occurred:', err.error.message);
				} else {
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
		);
    }

    //공지사항 클릭
    onClickNotice(item, index){

        //상세보기 다이얼로그 표시
        this.noticeDialogItem = this.ArrNoticeModel[index];
        this.noticeDialogTitle = `[공지] ${this.ArrNoticeModel[index].title}`
        this.isNoticeDialog = true;
        this.cd.detectChanges();

        //공지사항 읽음 처리
        this.noticeRead(this.noticeDialogItem);
    
    }

    //공지사항 다이얼로그를 esc or 상단 close 버튼으로 종료할 경우 처리
    noticeDialogHide(event){
        this.isNoticeDialog = false;
        this.cd.detectChanges();
    }

    //공지사항 다이얼로그 닫기
    noticeDialogClose(){
        this.isNoticeDialog = false;
        this.cd.detectChanges();
    }

    //고객의 소리 클릭 클릭
    onClickCompain(item, index){
        
        this.compainDialogItem = item;
        this.isCompainDialog = true;
        //고객의소리 읽음처리
        this.compainRead(item);
    }

    //고객의소리 다이얼로그를 esc or 상단 close 버튼으로 종료할 경우 처리
    compainDialogHide(event){
        console.log(this.compainDialogItem)
        this.isCompainDialog = false;

        this.cd.detectChanges();
    }

    //공지사항 다이얼로그 닫기
    compainDialogClose(){
        this.isCompainDialog = false;
        this.cd.detectChanges();
    }

    myTestClick(event){
        this.monthlySale = {
            title   : '월매출 달성율'
        ,   style   : 'alert alert-success'
        ,   value   : 90.33
        ,   dayInfo : this.envService.getDateToStringFormat(null,'.').substring(0,7)
        ,   chart   : true
        }
    }

    //공지사항 상세창 제어
    noticeDetailController(){
        this.isCollapse = !this.isCollapse;
        this.eventItem = {};
        //공지사항 달력화면이 표시 될때마다 오늘 날짜로 나오도록
		if( !this.isCollapse ) this.getNotice();
        console.log(this.ArrNoticeModel)
         
        /**
         * 1. 공지사항을 최초 조회할때 아래 형식으로 조회해서 상세에서도 같이 쓴다
         * 2. 상세 버튼을 클릭하면 다시 서버롤 조회해서 아래 형식으로 개인 공지만 다시 조회한다 
         * title, start, end 필수 나머지 필요한 값은 사용자 추가
         */
        // this.ArrNoticeModel = [
        //     { title: 'Conference',                start: '20201011', end: '20201013', desc: "상세내용" },
        //     { title: 'Meeting',                   start: '2020-10-12', end: '2020-10-16' },
        // ];

    }

    //공지사항 달력 상세 아이템 클릭
    calItemClick(item){
        this.eventItem = item;
        //공지 읽음 처리
        this.noticeRead(this.eventItem);
    }

    //공지 읽음 처리
    noticeRead(item){
        let noticeReadModel: any = {}

        noticeReadModel.noticeDate  = item.noticeDate;  //공지 년도
        noticeReadModel.seq         = item.seq;         //공지 순번
        noticeReadModel.userId      = this.envService.account.userId;   //아이디

        this.deshboardService.noticeRead(noticeReadModel).subscribe(
            (res: any) => {
				/**
				 * @success
				 */
                console.log( `res : ${res}` )
                //목록에서 new 이미지 제거
                if( res > 0 ){
                    for( let i = 0; i < this.noticeModel.length; i++ ){
                        console.log(this.noticeModel[i]);
                        if( this.noticeModel[i].noticeDate ==  item.noticeDate && this.noticeModel[i].seq == noticeReadModel.seq){
                            this.noticeModel[i].readYn = 'Y';
                            break;
                        }
                    }
                }
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'API Connection Error!!');
				if (err.error instanceof Error) {
					console.log('An error occurred:', err.error.message);
				} else {
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
        );
    }

    //고객의 소리 읽음처리
    compainRead(item){
        //고객의소리 읽음 처리 구현
        let compaineadModel: any = {}

        compaineadModel.userId      = this.envService.account.userId;   //아이디
        //읽음 처리에 필요한 기타 항목을 item(컴플레인 조회데이터 model) 에서 가져와서 셋팅

        this.deshboardService.compainRead(compaineadModel).subscribe(
            (res: any) => {
				/**
				 * @success
				 */
                
                console.log( `res : ${res}` );
                
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'API Connection Error!!');
				if (err.error instanceof Error) {
					console.log('An error occurred:', err.error.message);
				} else {
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
        );
        
    }

    //공지 상세 달력날짜 변경
    calChangeDate(date){
        
    }
    //새로고침 버튼
    containerRef: any;
    onElementReady = (event) => {
        this.containerRef = event.cmp.el;
        this.source.setElement(this.containerRef);
    }

    source = new Ext.drag.Source({
        listeners: {
            dragend: this.onDragEnd.bind(this),
            dragmove: this.onDragMove.bind(this)
        }
    });
    
    onDragMove(source, info) {
        //const pos = info.element.current;
        //this.dragText = Ext.String.format('X: {0}, Y: {1}', Math.round(pos.x), Math.round(pos.y));
    }
    onDragEnd(source, info) {
        //this.dragText = Ext.String.format('Drag End!');
    }

    public onReLoadPage(event) {
        console.log('I am DashboardComponent.');
        this.reLoad();
    }

}
