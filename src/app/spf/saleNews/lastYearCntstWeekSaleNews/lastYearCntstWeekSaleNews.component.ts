/**
* 생성자       : '양수영' 	생성일 : '20200619' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input, Pipe, PipeDecorator } from '@angular/core';
import { LastYearCntstWeekSaleNews } from './shared/lastYearCntstWeekSaleNews.model';
import { LastYearCntstWeekSaleNewsInqList } from './shared/lastYearCntstWeekSaleNewsInqList.model';
import { LastYearCntstWeekSaleNewsService } from './shared/lastYearCntstWeekSaleNews.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
    selector: 'app-lastYearCntstWeekSaleNews',
    templateUrl: './lastYearCntstWeekSaleNews.component.html',
	providers: [LastYearCntstWeekSaleNewsService],
	styleUrls: ['./lastYearCntstWeekSaleNews.component.css'],
})
export class LastYearCntstWeekSaleNewsComponent implements OnInit {


	@Input() public route: any;

	storeCd : string;
	
	//시작일
	public startDt: any = Date();

	//param model
	public paramModel: LastYearCntstWeekSaleNews = <LastYearCntstWeekSaleNews>{};

	//종료일
	public endDt: any = null;


	//grid select model
	public gridModel: LastYearCntstWeekSaleNews = <LastYearCntstWeekSaleNews>{};

	//점
	public comboStoreLv1: any = null;
	public comboStoreLv1Model: LastYearCntstWeekSaleNews = <LastYearCntstWeekSaleNews>{};

	//부
	public comboStoreLv2: any = null;
	public comboStoreLv2Model: LastYearCntstWeekSaleNews = <LastYearCntstWeekSaleNews>{};

	//팀
	public comboStoreLv3: any = null;
	public comboStoreLv3Model: LastYearCntstWeekSaleNews = <LastYearCntstWeekSaleNews>{};

	//조회일자
	public searchDay: any = null;

	public lastYearCntstWeekSaleNewsInqList : LastYearCntstWeekSaleNewsInqList = <LastYearCntstWeekSaleNewsInqList>{};
	public lastYearCntstweekSaleTitle: any;
	public lastYearCntstweekSaleOldTitle: any;
	public lastYearCntstweekSaleModel: any;
	public lastYearCntstweekSaleOldModel: any;
	

	constructor(private lastYearCntstWeekSaleNewsService: LastYearCntstWeekSaleNewsService, public envService: EnvService ) {}

	
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

	}

	onReadyJum(event){
		this.comboStoreLv1.storeLvCd ='01';
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
		//console.log(this.paramModel);
		
		this.ListQuery();

	}

	ListQuery() {


		//주간 일자 조회
		this.lastYearCntstWeekSaleNewsService.selectLastYearCntstWeekSaleNews(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				//금년 1주일 Title
				this.lastYearCntstweekSaleTitle = ['구분'
												  , this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.d6Day),'-')
												  , this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.d5Day),'-')
												  , this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.d4Day),'-')
												  , this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.d3Day),'-')
												  , this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.d2Day),'-')
												  , this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.d1Day),'-')
												  , this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.startDate),'-')];
				
				//전년 동요일 Title
				this.lastYearCntstweekSaleOldTitle = ['구분'
													 , this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.oldD6Day),'-')
													 , this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.oldD5Day),'-')
													 , this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.oldD4Day),'-')
													 , this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.oldD3Day),'-')
													 , this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.oldD2Day),'-')
													 , this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.oldD1Day),'-')
													 , this.envService.getDateWeekToStringFormat(this.envService.getStringToDateFormat(res.oldStartDate),'-')];
			  },
			  (err: HttpErrorResponse) => {
				  /**
				   * @error
				   */
				  Ext.Msg.alert('Error!!', 'Server communication error.');
			  }
		)

		//주간 속보 조회
		this.lastYearCntstWeekSaleNewsService.selectLastYearCntstWeekSaleNewsList(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				
				this.lastYearCntstWeekSaleNewsInqList=res;

				
				this.lastYearCntstweekSaleModel=[];
				this.lastYearCntstweekSaleOldModel=[];
				for (let index in this.lastYearCntstWeekSaleNewsInqList) {
					this.lastYearCntstWeekSaleNewsInqList[index].col6 = this.redColor(this.lastYearCntstWeekSaleNewsInqList[index].daygoald_6);
					this.lastYearCntstWeekSaleNewsInqList[index].col5 = this.redColor(this.lastYearCntstWeekSaleNewsInqList[index].daygoald_5);
					this.lastYearCntstWeekSaleNewsInqList[index].col4 = this.redColor(this.lastYearCntstWeekSaleNewsInqList[index].daygoald_4);
					this.lastYearCntstWeekSaleNewsInqList[index].col3 = this.redColor(this.lastYearCntstWeekSaleNewsInqList[index].daygoald_3);
					this.lastYearCntstWeekSaleNewsInqList[index].col2 = this.redColor(this.lastYearCntstWeekSaleNewsInqList[index].daygoald_2);
					this.lastYearCntstWeekSaleNewsInqList[index].col1 = this.redColor(this.lastYearCntstWeekSaleNewsInqList[index].daygoald_1);
					this.lastYearCntstWeekSaleNewsInqList[index].col  = this.redColor(this.lastYearCntstWeekSaleNewsInqList[index].daygoald  );

					 
					 if (res[index].no1.substr(0,1)=="0") {			
						this.lastYearCntstweekSaleModel.push(this.lastYearCntstWeekSaleNewsInqList[index]);
					} else {
						this.lastYearCntstweekSaleOldModel.push(this.lastYearCntstWeekSaleNewsInqList[index]);
				    }
				}

				console.log('LastYearCntstweekSaleOldModel:'+this.lastYearCntstweekSaleOldModel);

			  },
			  (err: HttpErrorResponse) => {
				  /**
				   * @error
				   */
				  Ext.Msg.alert('Error!!', 'Server communication error.');
			  }
		 );

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