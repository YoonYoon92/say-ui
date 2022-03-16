/**
* 생성자       : '양수영' 	생성일 : '20200612' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;

import { Component, OnInit, Input, SystemJsNgModuleLoader, NgModule } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { WeekTimeSaleNews } from './shared/weekTimeSaleNews.model';
import { WeekTimeSaleNewsInqList } from './shared/weekTimeSaleNewsInqList.model';
import { WeekTimeSaleNewsOrgInqList } from './shared/weekTimeSaleNewsOrgInqList.model';
import { WeekTimeSaleNewsService } from './shared/weekTimeSaleNews.service';
import { EnvService } from '../../../shared/env.service';
import { LastYearCntstWeekSaleNewsInqList } from '../lastYearCntstWeekSaleNews/shared/lastYearCntstWeekSaleNewsInqList.model';

Ext.require([
	'Ext.grid.plugin.*',
	'Ext.tip.ToolTip',
	'Ext.data.summary.Sum',
	'Ext.exporter.*'
  ]);


@Component({
	selector: 'app-weekTimeSaleNews',
	templateUrl: './weekTimeSaleNews.component.html',
	styleUrls: [
        './weekTimeSaleNews.component.css'
    ],
	providers: [WeekTimeSaleNewsService],
})
export class WeekTimeSaleNewsComponent implements OnInit {

	@Input() public route: any;

	d6day : String;
	d5day : String; 
	d4day : String; 
	d3day : String; 
	d2day : String; 
	d1day : String; 
	dday  : String; 
	storeCd : string;
	buCd : string;
	teamCd : string;
	rb : string;
	weekTitle: string; 
	comboOnOff: boolean = false;

	//시작일
	public startDt: any = Date();

	//param model
	public paramModel: WeekTimeSaleNews = <WeekTimeSaleNews>{};

	//종료일
	public endDt: any = null;


	//grid select model
	public gridModel: WeekTimeSaleNews = <WeekTimeSaleNews>{};

	//점
	public comboStoreLv1: any = null;
	public comboStoreLv1Model: WeekTimeSaleNews = <WeekTimeSaleNews>{};

	//부
	public comboStoreLv2: any = null;
	public comboStoreLv2Model: WeekTimeSaleNews = <WeekTimeSaleNews>{};

	//팀
	public comboStoreLv3: any = null;
	public comboStoreLv3Model: WeekTimeSaleNews = <WeekTimeSaleNews>{};

	public weekTimeSaleNewsInqList: WeekTimeSaleNewsInqList = <WeekTimeSaleNewsInqList>{};
	public weekTimeSaleNewsOrgInqList: WeekTimeSaleNewsOrgInqList = <WeekTimeSaleNewsOrgInqList>{};
	public weekTimeTitle: any;

	//grid store
	gridStore = new Ext.data.Store({});

	//조회일자
	public searchDay: any = null;
    public week = [];

	trendColumnCell = {
		bind: '{record.trend}',
		xtype: 'widgetcell',
		forceWidth: true,
		widget: {
		  xtype: 'sparklineline',
		  tipTpl: 'Price: {y:number("0.00")}'
		}
	};

	constructor(private weekTimeSaleNewsService: WeekTimeSaleNewsService, public envService: EnvService ) {}

	
	
	ngOnInit() {

		this.searchDay = new Date(this.envService.getBeforeDate(null));
		//조회일자 셋팅
		this.paramModel.startDate 	= this.envService.getDateToString(this.envService.getBeforeDate(null));
        //점 콤보박스 셋팅
		this.baseStoreCombo();
			//시작점 
		this.storeCd = "01";
		//this.paramModel.jum = this.storeCd;
		this.baseBuCombo();

		this.rb = "1";
		this.paramModel.selectVal = this.rb;
		this.weekTitle = "주 간 대 비";
	}

	//달력 포멧 변경
	searchDayCmp: any;
	onReadysearchDay(event){
		this.searchDayCmp = event.cmp;
		this.searchDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
		this.paramModel.startDate = this.envService.getDateToString(date.newDate);
	}

	//종료일 변경 이벤트
	onChangeEndDt(date){
		//this.paramModel.endDt = this.envService.getDateToString(date.newDate);
	}

	//Title 버튼 이벤트
	onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
	}

	//조회 버튼 이벤트
	onTapQuery(event){
		console.log('rb:'+ this.rb)
		if (this.rb=='3') {
			this.buCd='';
			this.teamCd='';
			this.comboOnOff=true;
		}else{
			this.comboOnOff=false;
		};
		this.gridListQuery();
	
	}


	onChangeSelect(data){
		console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
		this.paramModel.selectVal = data.newValue;
		this.rb = data.newValue;

		if (data.newValue=='3') {
			this.buCd='';
			this.teamCd='';
			this.comboOnOff=true;
		} else{
			this.comboOnOff=false;			
		}

		this.gridListQuery();
	}

	gridListQuery() {

		// selectfield value "1:주간" 또는 "2:동요일"
		if(this.paramModel.selectVal == '1' || this.paramModel.selectVal == '2') {
			//주간 일자 조회
			this.weekTimeSaleNewsService.selectWeekTimeSaleNewsDate(this.paramModel).subscribe(
				(res: any) => {
					/**
					 * @success
					 */
					let date = new Date();
					
					this.dday  = this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.startDate),'-');
					this.d6day = this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.d6Day),'-');
					this.d5day = this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.d5Day),'-');
					this.d4day = this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.d4Day),'-');
					this.d3day = this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.d3Day),'-');
					this.d2day = this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.d2Day),'-');
					this.d1day = this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.d1Day),'-');

					this.weekTimeTitle = ['구분', this.d6day, this.d5day, this.d4day, this.d3day, this.d2day, this.d1day, this.dday, '금일고객수'];

				},
				(err: HttpErrorResponse) => {
					/**
					 * @error
					 */
					Ext.Msg.alert('Error!!', 'Server communication error.');
				}
			)

			//주간 속보 조회
			this.weekTimeSaleNewsService.selectWeekTimeSaleNewsList(this.paramModel).subscribe(
				(res: any) => {
					/**
					 * @success
					 */
					this.weekTimeSaleNewsInqList = res;

					for (let index in this.weekTimeSaleNewsInqList) {
						this.weekTimeSaleNewsInqList[index].col6 = this.redColor(this.weekTimeSaleNewsInqList[index].saleday6);
						this.weekTimeSaleNewsInqList[index].col5 = this.redColor(this.weekTimeSaleNewsInqList[index].saleday5);
						this.weekTimeSaleNewsInqList[index].col4 = this.redColor(this.weekTimeSaleNewsInqList[index].saleday4);
						this.weekTimeSaleNewsInqList[index].col3 = this.redColor(this.weekTimeSaleNewsInqList[index].saleday3);
						this.weekTimeSaleNewsInqList[index].col2 = this.redColor(this.weekTimeSaleNewsInqList[index].saleday2);
						this.weekTimeSaleNewsInqList[index].col1 = this.redColor(this.weekTimeSaleNewsInqList[index].saleday1);
						this.weekTimeSaleNewsInqList[index].col  = this.redColor(this.weekTimeSaleNewsInqList[index].saleday );
						this.weekTimeSaleNewsInqList[index].colcustom  = this.redColor(this.weekTimeSaleNewsInqList[index].saledaycustom);
					}
				},
				(err: HttpErrorResponse) => {
					/**
					 * @error
					 */
					Ext.Msg.alert('Error!!', 'Server communication error.');
				}
			);		
		}else {
		// selectfield value "3:팀별" 
			//주간 속보 조회
			this.weekTimeSaleNewsService.selectWeekTimeSaleNewsOrgList(this.paramModel).subscribe(
				(res: any) => {
					/**
					 * @success
					 */
					this.weekTimeSaleNewsOrgInqList = res;

					for (let index in this.weekTimeSaleNewsOrgInqList) {
						this.weekTimeSaleNewsOrgInqList[index].timezone11preColor      = this.redColor(this.weekTimeSaleNewsOrgInqList[index].timezone11pre);
						this.weekTimeSaleNewsOrgInqList[index].timezone13preColor      = this.redColor(this.weekTimeSaleNewsOrgInqList[index].timezone13pre);
						this.weekTimeSaleNewsOrgInqList[index].timezone14preColor      = this.redColor(this.weekTimeSaleNewsOrgInqList[index].timezone14pre);
						this.weekTimeSaleNewsOrgInqList[index].timezone15preColor      = this.redColor(this.weekTimeSaleNewsOrgInqList[index].timezone15pre);
						this.weekTimeSaleNewsOrgInqList[index].timezone16preColor      = this.redColor(this.weekTimeSaleNewsOrgInqList[index].timezone16pre);
						this.weekTimeSaleNewsOrgInqList[index].timezone17preColor      = this.redColor(this.weekTimeSaleNewsOrgInqList[index].timezone17pre);
						this.weekTimeSaleNewsOrgInqList[index].timezone18preColor      = this.redColor(this.weekTimeSaleNewsOrgInqList[index].timezone18pre);
						this.weekTimeSaleNewsOrgInqList[index].timezone19preColor      = this.redColor(this.weekTimeSaleNewsOrgInqList[index].timezone19pre);
						this.weekTimeSaleNewsOrgInqList[index].timezone20preColor      = this.redColor(this.weekTimeSaleNewsOrgInqList[index].timezone20pre);
						this.weekTimeSaleNewsOrgInqList[index].timezone21preColor      = this.redColor(this.weekTimeSaleNewsOrgInqList[index].timezone21pre);
						this.weekTimeSaleNewsOrgInqList[index].timezone24preColor      = this.redColor(this.weekTimeSaleNewsOrgInqList[index].timezone24pre);
						this.weekTimeSaleNewsOrgInqList[index].daysaleamountColor      = this.redColor(this.weekTimeSaleNewsOrgInqList[index].daysaleamount);
						this.weekTimeSaleNewsOrgInqList[index].daygoalColor            = this.redColor(this.weekTimeSaleNewsOrgInqList[index].daygoal);
						this.weekTimeSaleNewsOrgInqList[index].daydifferenceColor      = this.redColor(this.weekTimeSaleNewsOrgInqList[index].daydifference);
						this.weekTimeSaleNewsOrgInqList[index].dayachievementrateColor = this.redColor(this.weekTimeSaleNewsOrgInqList[index].dayachievementrate);
						this.weekTimeSaleNewsOrgInqList[index].customercntColor        = this.redColor(this.weekTimeSaleNewsOrgInqList[index].customercnt);
						this.weekTimeSaleNewsOrgInqList[index].olddaysaleamountColor   = this.redColor(this.weekTimeSaleNewsOrgInqList[index].olddaysaleamount);
						this.weekTimeSaleNewsOrgInqList[index].strechratColor          = this.redColor(this.weekTimeSaleNewsOrgInqList[index].strechrat);
					}
				},
				(err: HttpErrorResponse) => {
					/**
					 * @error
					 */
					Ext.Msg.alert('Error!!', 'Server communication error.');
				}
			);		
		}

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

	 //조직(점) 기본 셋팅
	baseStoreCombo = () =>{
	    this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
		    (res: any) => {
		    this.comboStoreLv1 = res;
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
   }

}