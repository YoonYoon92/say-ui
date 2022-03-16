/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { OnHandTimeSaleNews } from './shared/onHandTimeSaleNews.model';
import { OnHandTimeSaleNewsInqList } from './shared/onHandTimeSaleNewsInqList.model';
import { OnHandTimeSaleNewsInqTotal } from './shared/onHandTimeSaleNewsInqTotal.model';
import { OnHandTimeSaleNewsService } from './shared/onHandTimeSaleNews.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-onHandTimeSaleNews',
	templateUrl: './onHandTimeSaleNews.component.html',
	providers: [OnHandTimeSaleNewsService],
	styleUrls: ['./onHandTimeSaleNews.component.css'],
})
export class OnHandTimeSaleNewsComponent implements OnInit {

	@Input() public route: any;

	isPhone:boolean = Ext.os.is.Phone;

	storeCd : string;

	//시작일
	public startDt: any = Date();

	//param model
	public paramModel: OnHandTimeSaleNews = <OnHandTimeSaleNews>{};

	//종료일
	public endDt: any = null;


	//grid select model
	public gridModel: OnHandTimeSaleNews = <OnHandTimeSaleNews>{};

	//점
	public comboStoreLv1: any = null;
	public comboStoreLv1Model: OnHandTimeSaleNews = <OnHandTimeSaleNews>{};

	//부
	public comboStoreLv2: any = null;
	public comboStoreLv2Model: OnHandTimeSaleNews = <OnHandTimeSaleNews>{};

	//팀
	public comboStoreLv3: any = null;
	public comboStoreLv3Model: OnHandTimeSaleNews = <OnHandTimeSaleNews>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//조회일자
	public searchDay: any = null;

	public onHandTimeSaleNewsInqList : OnHandTimeSaleNewsInqList = <OnHandTimeSaleNewsInqList>{};
	public onHandTimeSaleNewsInqTotal : OnHandTimeSaleNewsInqTotal;
	public week = [];
	
	public dayGoal : any;
	public daySaleAmount : any;
	public achievementRate : any;


	constructor(private onHandTimeSaleNewsService: OnHandTimeSaleNewsService, public envService: EnvService ) {}


    renderSign = (value, record) => {	
		
		if (record.get('division') == "달성율" || record.get('division') == "신장율"||record.get('division') == "구성비") {
			var formattedValue = Ext.util.Format.number(value, '000.00 %');
		} else if(record.get('division') == "고객수") {
			var formattedValue = Ext.util.Format.number(value, '0,000');
		} else {			
			var formattedValue = Ext.util.Format.number(value/1000, '0,000');
		}

		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }

		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	}

	renderSignCustom = (value, record) => {	
		
		if (record.get('division') == "구성비" ) {
			const result = null; 
			return result;
		} else {
			var formattedValue = Ext.util.Format.number(value, '0,000');
			var col = '';
			var backCol = '';
			if (value > 0) { col = 'black'; }
			else if (value < 0) { col = 'red'; }

			const result = `<span style='color:${col}'>${formattedValue}</span>`;
			return result;
		}
		
		
	}


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

	//grid ready
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}

	//Title 버튼 이벤트
	onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
	}

	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel);
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});

		this.gridListQuery();

	}

	gridListQuery() {

		//주간 일자 조회
		this.onHandTimeSaleNewsService.selectOnHandTimeSaleNews(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				this.onHandTimeSaleNewsInqTotal = res;

				// 일목표 
				this.dayGoal = Ext.util.Format.number(this.onHandTimeSaleNewsInqTotal.dayGoal/1000,'0,000 천원');
				this.dayGoal = `<br><h6 style='color:#1064e0ef' align='center'>${this.dayGoal}</h6>`;
				// 일실적
				this.daySaleAmount = Ext.util.Format.number(this.onHandTimeSaleNewsInqTotal.daySaleAmount/1000,'0,000 천원');
				this.daySaleAmount =  `<br><h6 style='color:#1064e0ef' align='center'>${this.daySaleAmount}</h6>`;
				// 일달성율
				this.achievementRate = Ext.util.Format.number(this.onHandTimeSaleNewsInqTotal.achievementRate, '000.00 %');
				this.achievementRate =  `<br><h6 style='color:#1064e0ef' align='center'>${this.achievementRate}</h6>`;

			  },
			  (err: HttpErrorResponse) => {
				  /**
				   * @error
				   */
				  Ext.Msg.alert('Error!!', 'Server communication error.');
				  this.gridCmp.setMasked(false);
			  }
		)

		//주간 속보 조회
		this.onHandTimeSaleNewsService.selectOnHandTimeSaleNewsList(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				this.onHandTimeSaleNewsInqList=res;
				this.gridStore.setData(this.onHandTimeSaleNewsInqList);
				this.gridCmp.setMasked(false);

			  },
			  (err: HttpErrorResponse) => {
				  /**
				   * @error
				   */
				  Ext.Msg.alert('Error!!', 'Server communication error.');
				  this.gridCmp.setMasked(false);
			  }
		 );

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