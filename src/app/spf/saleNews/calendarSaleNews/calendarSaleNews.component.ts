/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { CalendarSaleNews } from './shared/calendarSaleNews.model';
import { CalendarSaleNewsList } from './shared/calendarSaleNewsList.model';
import { CalendarSaleNewsService } from './shared/calendarSaleNews.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { datepickerLocale } from 'fullcalendar/src/locale';//
//import { Console } from 'console';


@Component({
    selector: 'app-calendarSaleNews',
	templateUrl: './calendarSaleNews.component.html',
	styleUrls: [
        './calendarSaleNews.component.css'
    ],
    providers: [CalendarSaleNewsService],
})
export class CalendarSaleNewsComponent implements OnInit {

    @Input() public route: any;

   //param model
	public paramModel: CalendarSaleNews = <CalendarSaleNews>{};

	//form model
	public formModel: CalendarSaleNewsList = <CalendarSaleNewsList>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: CalendarSaleNews = <CalendarSaleNews>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: CalendarSaleNews = <CalendarSaleNews>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: CalendarSaleNews = <CalendarSaleNews>{};

    //grid store
    gridStore = new Ext.data.Store({});

    //시작일
    public inqYM: any = null;

	//today
	public today: string;

	
	//점코드
	public storeCd: string = '01';

    //fild disabled
    public isDisabled : boolean = true;

    //Fieldset padding
	public padding : string = '15px';
	
	//달력 년월 
	public year: number;
	public month: number;

	//년월 증감 감소
	public addYear: number = 0;
	public addMonth: number = 0;
	
	public days: any;
	public arrayDay: any;
	
	public dayOfWeekSum = [];

	constructor(private calendarSaleNewsService : CalendarSaleNewsService, public envService: EnvService ) { }
	ngOnInit() { 
		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.inqYM = new Date(this.envService.getBeforeDate(null));
		this.storeCd = '01';

		this.today = this.envService.getDateToString(this.envService.getBeforeDate(null)).substr(0,);

		//최초 조회시 조회 년월, 점 세팅
		this.paramModel.inqYM 	= this.envService.getDateToString(this.envService.getBeforeDate(null)).substr(0,6);
		this.paramModel.jum = this.storeCd;
       	//점 콤보박스 셋팅
	   	this.baseStoreCombo();
		
		//점 콤보박스 셋팅
		this.baseBuCombo();

	   	//현재 년월 
		this.year = this.envService.getCalYear(this.addYear);
        this.month = this.envService.getCalMonth(this.addMonth);
		
		//일수
        this.getDayCount();
	
	}

	//점 초기 01 세팅
	onReadyJum(event){
		this.comboStoreLv1.storeLvCd ='01';
	}

	//달력 포멧 한글로 변경
	searchDayCmp: any;
	onReadysearchDay(event){
		this.searchDayCmp = event.cmp;
		this.searchDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//시작일 변경 이벤트
	onChangeinqYM(date){	         
		  this.paramModel.inqYM = this.envService.getDateToString(date.newDate).substr(0,6);	   
	}
 

	//달력 만들기
	
    public getDayCount(){
		
		this.calendarSaleNewsService.selectCalendarSaleNewsList(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				
				this.formModel = res;	
				for(let index in this.formModel) {
					this.formModel[index].col1 = this.redColor(this.formModel[index].saleAmount);
					this.formModel[index].col2 = this.redColor(this.formModel[index].dayGoal);
					this.formModel[index].col3 = this.redColor(this.formModel[index].achievementRate);					
				}
				
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		)
    }

    //달력(일) 클래스 스타일 정의
    public dayClass(item: any){

        let classNm: string;

        if( item.week == 0 ){
            classNm = 'line-r line-b sun';
        }else if( item.week == 6){
            classNm = 'line-r line-b sat';
        }else{
            classNm = 'line-r line-b nor';
        }

        //1일은 왼쪽 라인선 추가
        classNm = item.day == 1 ? `${classNm} line-l` : classNm;  

        return classNm;
	}

	redColor(value: number) {
		let colorValue : string; 
		if (value < 0) {
			colorValue ='red'
		}else{
		    colorValue ='black'
		} 

		return colorValue;
	}

	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel);

		this.getDayCount()
	}

    
   //조직(점) 기본 셋팅
   public jumComboVal: string;
   baseStoreCombo = () =>{
	    this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
		    (res: any) => {
		   this.comboStoreLv1 = res;
           this.jumComboVal = this.comboStoreLv1[0].storeLvCd;
           this.paramModel.jum = this.comboStoreLv1[0].storeLvCd;
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
		);
   }

   //조직(부) 기본 셋팅
	baseBuCombo = () =>{
		this.paramModel.jum = this.storeCd;
		this.comboStoreLv2Model.paramLvCd = this.storeCd;
		this.envService.selectStoreComboLv2List(this.comboStoreLv2Model).subscribe(
			(res: any) => {
				//하위 콤보박스를 전부 초기화 한다
				this.comboStoreLv3 = null;	
				//조직(부) data set
				this.comboStoreLv2 = res;
			},
			(err: HttpErrorResponse) => {
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		);
	}

   //점 콤보박스 선택 이벤트
   comboStoreLv1Event = (data) =>{
       this.paramModel.jum = data.newValue;
	    //조직(부) 조회
	    this.comboStoreLv2Model.paramLvCd = data.newValue;
	    this.envService.selectStoreComboLv2List(this.comboStoreLv2Model).subscribe(
		    (res: any) => {
			    //하위 콤보박스를 전부 초기화 한다
			    this.comboStoreLv3 = null;	
			    //조직(부) data set
			    this.comboStoreLv2 = res;
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
	    );
   }

   //부 콤보박스 선택 이벤트
   comboStoreLv2Event = (data) =>{
       this.paramModel.bu = data.newValue;
	    //조직(팀) 조회
	    this.comboStoreLv3Model.paramLvCd = data.newValue;
	    this.envService.selectStoreComboLv3List(this.comboStoreLv3Model).subscribe(
		    (res: any) => {
			    //조직(팀) data set
			    this.comboStoreLv3 = res;
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
	    );
   }

   //팀 콤보박스 선택 이벤트
   comboStoreLv3Event = (data) =>{
       this.paramModel.tim = data.newValue;
       console.log(data.newValue)
   }

   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }
}