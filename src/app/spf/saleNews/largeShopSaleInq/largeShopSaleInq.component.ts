/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { LargeShopSaleInq } from './shared/largeShopSaleInq.model';
import { LargeShopSaleInqService } from './shared/largeShopSaleInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-largeShopSaleInq',
	templateUrl: './largeShopSaleInq.component.html',
	providers: [LargeShopSaleInqService],
})
export class LargeShopSaleInqComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: LargeShopSaleInq = <LargeShopSaleInq>{};

	//grid select model
	public gridModel: LargeShopSaleInq = <LargeShopSaleInq>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: LargeShopSaleInq = <LargeShopSaleInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: LargeShopSaleInq = <LargeShopSaleInq>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: LargeShopSaleInq = <LargeShopSaleInq>{};

	//grid store
	gridStore = new Ext.data.Store({});
	public days = [];
	//시작일
	public startDt: any = null;
	public mmDt: any = null;
	public yyDt: any = null;

	//종료일
	public endDt: any = null;

	renderSign = (value, record) => {	
		if (record.get('division') == "달성율"){
			var formattedValue = Ext.util.Format.number(value, '000.00%');
			}
			else{
				var formattedValue = Ext.util.Format.number(value, '0,000');
			}
			var col = '';
			var backCol = '';
			if (value > 0) { col = 'black'; }
			else if (value < 0) { col = 'red'; }
			
	  
			const result =  `<span style='color:${col}'>${formattedValue}</span>`;
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
  
	//  renderSignNormal = (value, record) => {   
		
	// 	var formattedValue = Ext.util.Format.number(value, '0,000');
	 
	// 	var col = '';
	// 	var backCol = '';
	// 	if (value > 0) { col = 'black'; }
	// 	else if (value < 0) { col = 'red'; }
  
	// 	const result = `<span style='color:${col}'>${formattedValue}</span>`;
	// 	return result;
	//  }


	
	constructor(private largeShopSaleInqService: LargeShopSaleInqService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date();
		this.mmDt =new Date();
		this.mmDt.setDate('01');
		this.yyDt=new Date();
		this.yyDt.setMonth('00');
		this.yyDt.setDate('01');
		this.endDt = new Date();

		console.log(this.mmDt);
		console.log(this.yyDt);

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(null);
		this.paramModel.endDt 		= this.envService.getDateToString(null);
		this.paramModel.mmDt		= this.mmDt;
		this.paramModel.yyDt		= this.yyDt;
		this.paramModel.mmDt		= this.envService.getDateToString(this.mmDt);
		this.paramModel.yyDt		= this.envService.getDateToString(this.yyDt);
		
       //점 콤보박스 셋팅
       this.baseStoreCombo()
	
	}
	
	 //달력 포멧 변경
	 startDtCmp: any;
	 onReadystartDt(event){
		 this.startDtCmp = event.cmp;
		 this.startDtCmp.getPicker().setHeaderFormat('Y년m월d일');
	 }
	//시작일 변경 이벤트
	onChangeStartDt(date){
		this.paramModel.startDt = this.envService.getDateToString(date.newDate);
		console.log(this.paramModel.startDt)
		this.mmDt=new Date(date.newDate);
		this.mmDt.setDate('01');
		this.yyDt.setDate('01');
		this.paramModel.mmDt=this.envService.getDateToString(this.mmDt);
		console.log(this.paramModel.startDt)
		console.log(this.paramModel.mmDt)
		console.log('변환후')
		this.yyDt.setMonth('00');
		this.yyDt.setDate('01');
		this.paramModel.yyDt=this.envService.getDateToString(this.yyDt);
	
	}

	//종료일 변경 이벤트
	onChangeEndDt(date){
		this.paramModel.endDt = this.envService.getDateToString(date.newDate);
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
		this.largeShopSaleInqService.selectLargeShopSaleInqList(this.paramModel).subscribe(
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

    
   

	
	

	
	
	//도움말 버튼 이벤트
	onTapHelp(event){
		this.largeShopSaleInqService.helpLargeShopSaleInq(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
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