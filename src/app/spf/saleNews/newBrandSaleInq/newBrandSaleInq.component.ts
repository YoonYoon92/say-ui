/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { NewBrandSaleInq } from './shared/newBrandSaleInq.model';
import { NewBrandSaleInqList } from './shared/newBrandSaleInqList.model';
import { NewBrandSaleInqService } from './shared/newBrandSaleInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-newBrandSaleInq',
	templateUrl: './newBrandSaleInq.component.html',
	providers: [NewBrandSaleInqService],
})
export class NewBrandSaleInqComponent implements OnInit {

	@Input() public route: any;

	storeCd : string;

	//param model
	public paramModel: NewBrandSaleInq = <NewBrandSaleInq>{};

	//grid select model
	public gridModel: NewBrandSaleInqList = <NewBrandSaleInqList>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: NewBrandSaleInq = <NewBrandSaleInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: NewBrandSaleInq = <NewBrandSaleInq>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: NewBrandSaleInq = <NewBrandSaleInq>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	public corner = [];

	constructor(private newBrandSaleInqService: NewBrandSaleInqService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date(this.envService.getBeforeDate(30));
		this.endDt = new Date();
		this.storeCd = '01';

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(this.envService.getBeforeDate(30));
		this.paramModel.endDt 		= this.envService.getDateToString(null);
       	//점 콤보박스 셋팅
	   	this.baseStoreCombo()
	   	//시작점 
		this.storeCd = "01";
		//this.paramModel.jum = this.storeCd;
		this.baseBuCombo();
	
	}

	renderSign = (value, record) => {	
		
		var formattedValue = Ext.util.Format.number(value/1000, '0,000');

		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }

		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	}

	renderSignRate = (value, record) => {	
		
		var formattedValue = Ext.util.Format.number(value, '000.00 %');

		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }

		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	}

	renderSignNormal = (value, record) => {	
		
		var formattedValue = Ext.util.Format.number(value, '0,000');
	
		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }

		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	}

	//점 초기 01 세팅
	onReadyJum(event){
		this.comboStoreLv1.storeLvCd ='01';
	}

	//달력 포멧 한글로 변경
	searchFromDayCmp: any;
	onReadysearchFromDay(event){
		this.searchFromDayCmp = event.cmp;
		this.searchFromDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//달력 포멧 한글로 변경
	searchToDayCmp: any;
	onReadysearchToDay(event){
		this.searchToDayCmp = event.cmp;
		this.searchToDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
	   //에러체크
	   if(this.envService.getDateToString(date.newDate) > this.paramModel.endDt)
	   {
		  // console.log(date.oldDate);
		  // console.log(this.searchFromDayCmp);
		  this.searchFromDayCmp.setValue(date.oldDate);               
		  Ext.Msg.alert('Error!!', '시작일은 종료일보다 클 수 없습니다');   
	   }   
	   else
	   {         
		  this.paramModel.startDt = this.envService.getDateToString(date.newDate);
	   }
	   
	}
 
	//종료일 변경 이벤트
	onChangeEndDt(date){
	   //에러체크
	   if(this.envService.getDateToString(date.newDate) < this.paramModel.startDt)
	   {
		  // console.log(date.oldDate);
		  // console.log(this.searchFromDayCmp);
		  this.searchToDayCmp.set
		  this.searchToDayCmp.setValue(date.oldDate);         
		  Ext.Msg.alert('Error!!', '종료일은 시작일보다 커야 합니다');
	   }
	   else
	   {
		  this.paramModel.endDt = this.envService.getDateToString(date.newDate);
	   }
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
		console.log(this.paramModel);
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});

		this.newBrandSaleInqService.selectNewBrandSaleInqList(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */

				console.log('res:'+ res);


				this.gridModel=res
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