declare var Ext: any;
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Deshboard } from './shared/deshboard.model';
import { DeshboardService } from './shared/deshboard.service';
import { EnvService } from '../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
    selector: 'app-type-B',
    templateUrl: './type-B.component.html',
    styleUrls: [
        './css/type-A.component.css'
    ,   './css/deshboard.css'
    ],
    providers: [DeshboardService],
})
export class TypeBComponent implements OnInit {

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
        this.paramModel.account = this.envService.account;

        // this.paramModel.saleDate = '20200601';
        // this.paramModel.jum = '01';
        // this.paramModel.userId = '211015'; 


        //당일 당월 당년 온라인 조회
        this.getAchiv();

        //시간대별 조회
        this.getTimeZone();

        //행사장 매출
        this.getEventSale();

        //월 일 요일
        this.monthNm    = this.envService.getCalMonth(0);
        this.dayNm      = this.envService.getCalDay(0);
        this.weekNm     = this.envService.dayOfWeek(0);

        //날씨 조회
        this.getGeolocation();

        //타이머 10분(600000 밀리초) 마다 reLoad 함수 실행
        setInterval(()=>this.reLoad(), 600000);
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
                ,   vh : '60vh'
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

    myTestClick(event){
        this.monthlySale = {
            title   : '월매출 달성율'
        ,   style   : 'alert alert-success'
        ,   value   : 90.33
        ,   dayInfo : this.envService.getDateToStringFormat(null,'.').substring(0,7)
        ,   chart   : true
        }
    }
}
