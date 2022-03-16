/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { TradingAreaMemberInq } from './shared/tradingAreaMemberInq.model';
import { TradingAreaMemberInqService } from './shared/tradingAreaMemberInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { param } from 'jquery';

@Component({
	selector: 'app-tradingAreaMemberInq',
	templateUrl: './tradingAreaMemberInq.component.html',
	providers: [TradingAreaMemberInqService],
})
export class TradingAreaMemberInqComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: TradingAreaMemberInq = <TradingAreaMemberInq>{};

	//grid select model
	public gridModel: TradingAreaMemberInq = <TradingAreaMemberInq>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: TradingAreaMemberInq = <TradingAreaMemberInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: TradingAreaMemberInq = <TradingAreaMemberInq>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: TradingAreaMemberInq = <TradingAreaMemberInq>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	public tradingAreaStore : any = null;
	public areaStore : any = null;
	public searchStore : any = [
		{searchCd: '1', searchNm: '상권별 조회'},
		{searchCd: '2', searchNm: '아파트별 조회'}
	]
	searchShowing: any ;
	searchShowing2: any ;
	tradingShowing : any;
	tradingShowing2 : any;
	ApartShowing: any ;
	ApartShowing2: any ;

	constructor(private tradingAreaMemberInqService: TradingAreaMemberInqService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date(this.envService.getBeforeDate(30));
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(null);
		this.paramModel.endDt 		= this.envService.getDateToString(null);
		this.paramModel.searchDt = this.paramModel.startDt.substr(0,6);
		this.paramModel.searchCd ='';
		this.paramModel.tradingAreaCd ='';
		this.paramModel.areaCd ='';
		
       //점 콤보박스 셋팅
       this.baseStoreCombo()
	   this.tradingAreaCdList()
	
	}
	onSearchShowing(event){						
		this.searchShowing = event.cmp;
	}
	onSearchShowing2(event){						
		this.searchShowing2 = event.cmp;
	}
	onApartShowing(event){						
		this.ApartShowing = event.cmp;
	}
	onApartShowing2(event){						
		this.ApartShowing2 = event.cmp;
	}
	onTradingShowing(event){						
		this.tradingShowing = event.cmp;
	}
	onTradingShowing2(event){						
		this.tradingShowing2 = event.cmp;
	}
	//시작일 변경 이벤트
	onChangeStartDt(date){
		this.paramModel.startDt = this.envService.getDateToString(date.newDate);
	}

	//종료일 변경 이벤트
	onChangeEndDt(date){
		this.paramModel.endDt = this.envService.getDateToString(date.newDate);
	}

	onChangesearchDt = (data) =>{
		this.paramModel.searchDt = data.newValue;
		console.log(this.paramModel.searchDt);
	}

	onChangeSearchCd = (data) =>{
		this.paramModel.searchCd = data.newValue;
		console.log(this.paramModel.searchCd);
		if(this.paramModel.searchCd=='1'){
			this.searchShowing.show(true);
			this.searchShowing2.show(true);
		}
		else{
			this.searchShowing.hide(true);
			this.searchShowing2.hide(true);
		}
		
	}
	onChangeTradingArea(date){
		this.paramModel.tradingAreaCd = date.newValue;
		this.tradingAreaMemberInqService.areaCdList(this.paramModel).subscribe(
		    (res: any) => {
		    this.areaStore = res;
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
	    );
	}
	onChangeArea(date){
		this.paramModel.areaCd = date.newValue;
	}
	//grid row 선택 이벤트
	onSelectGrid(row){
		//row 데이터 model 바인딩
		this.gridModel = row.selected[0].data;
	}

	//grid ready
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}

	//조회 버튼 이벤트
	onTapQuery(event){
		if(this.paramModel.searchCd==''){Ext.Msg.alert('Error!!', '조회구분을 선택하세요');}
		else{
			console.log(this.paramModel);
			this.gridCmp.setMasked({
				xtype: 'loadmask',
				message: 'Loading...'
			});
			if(this.paramModel.searchCd=='1')
			{	this.ApartShowing.hide(true);
				this.ApartShowing2.hide(true);
				this.tradingShowing.show(true);
				this.tradingShowing2.show(true);
			}
			else
			{	this.ApartShowing.show(true);
				this.ApartShowing2.show(true);
				this.tradingShowing.hide(true);
				this.tradingShowing2.hide(true);
			}
			this.tradingAreaMemberInqService.selectTradingAreaMemberInqList(this.paramModel).subscribe(
				(res: any) => {
					/**
					 * @success
					 */
					this.gridStore.setData(res);
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
	}

    
 tradingAreaCdList = () =>{
	    this.tradingAreaMemberInqService.tradingAreaCdList(this.paramModel).subscribe(
		    (res: any) => {
		    this.tradingAreaStore = res;
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
	    );
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