/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { TrLogConerSaleInq } from './shared/TrLogConerSaleInq.model';
import { TrLogConerSaleInqService } from './shared/TrLogConerSaleInq.service';
import { EnvService } from '../../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchConerParam } from 'src/app/component/searchConer/shared/SearchConerParam.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'app-TrLogConerSaleInq',
	templateUrl: './TrLogConerSaleInq.component.html',
	providers: [TrLogConerSaleInqService],
})
export class TrLogConerSaleInqComponent implements OnInit {
	@Input() public isDialogShowing3:boolean = false;
	@Input() public route: any;
	@Output() public sendObject: any = new EventEmitter();

	//param model
	public paramModel: TrLogConerSaleInq = <TrLogConerSaleInq>{};

	//grid select model
	public gridModel: TrLogConerSaleInq = <TrLogConerSaleInq>{};

	//점
	storeCd : string;
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: TrLogConerSaleInq = <TrLogConerSaleInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: TrLogConerSaleInq = <TrLogConerSaleInq>{};

    //팀
    public comboStoreLv3: any = null;
	public comboStoreLv3Model: TrLogConerSaleInq = <TrLogConerSaleInq>{};
	
	public SearchConerParamModel: SearchConerParam = <SearchConerParam>{};
	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;
	endDtCheckShowing:any;


	public comboOnStore : any = [
		{prePayCheck: 'N', prePayCheckNm: '일반결제'},
		{prePayCheck: 'Y', prePayCheckNm: '선수금'},
		{prePayCheck: 'C', prePayCheckNm: '일반외상'}
		
	 ]

	constructor(private TrLogConerSaleInqService: TrLogConerSaleInqService, public envService: EnvService,private cd: ChangeDetectorRef ) { }
	ngOnInit() { 
		this.startDt = new Date();
		this.endDt = new Date();
		this.paramModel.prePayCheck='N';
		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(this.startDt);
		this.paramModel.endDt 		= ""
       //점 콤보박스 셋팅
       this.baseStoreCombo()
	
	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
		this.paramModel.startDt = this.envService.getDateToString(date.newDate);
	}
	//달력 포멧 변경
	startDtCmp: any;
	onReadystartDt(event){
		this.startDtCmp = event.cmp;
		this.startDtCmp.getPicker().setHeaderFormat('Y년m월d일');
	}	
	//종료일 변경 이벤트
	onChangeEndDt(date){
		this.paramModel.endDt = this.envService.getDateToString(date.newDate);
	}
	//달력 포멧 변경
	endDtCmp: any;
	onReadyendtDt(event){
		this.endDtCmp = event.cmp;
		this.endDtCmp.getPicker().setHeaderFormat('Y년m월d일');
	}	
	onEndDtCheckShowing(event){					//컬럼 변수로 지정
		this.endDtCheckShowing = event.cmp;
	}

	endDtCheckbox(event){
		if (event.newValue==true){
			this.paramModel.endDtCheck='Y'
			this.endDtCheckShowing.show(true);	

		}
		else{
			this.paramModel.endDtCheck='N'
			this.endDtCheckShowing.hide(true);	
			this.paramModel.endDt 		= ""
		}
	}
	 //콤보박스 변경 이벤트
	onChangeComboBox(data){
		this.paramModel.prePayCheck = data.newValue;
		console.log(this.paramModel);
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
		if ((this.paramModel.coner ==null ||this.paramModel.coner =='' )&&(this.paramModel.prePayCheck=='N')){
			Ext.Msg.alert('Error!!', '코너를 선택하셔야됩니다.(선수금,일반외상일때 전체클래스 조회가능)');   
		}
		else{
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.TrLogConerSaleInqService.selectTrLogConerSaleInqList(this.paramModel).subscribe(
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

    
   

	
	

	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.TrLogConerSaleInqService.excelTrLogConerSaleInq(this.paramModel).subscribe(
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

	//레포트 버튼 이벤트
	onTapReport(event){
		this.TrLogConerSaleInqService.reportTrLogConerSaleInq(this.paramModel).subscribe(
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

	//도움말 버튼 이벤트
	onTapHelp(event){
		this.TrLogConerSaleInqService.helpTrLogConerSaleInq(this.paramModel).subscribe(
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
		   this.storeCd = this.comboStoreLv1[0].storeLvCd;
		   this.jumComboVal = '01';
		   this.paramModel.jum = '01';
		   this.storeCd = '01';
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
       console.log(data.newValue);
   }

   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }
  	searchconer=(event)=>{
		console.log("click")
	this.isDialogShowing3 = true;
	this.SearchConerParamModel.jum = this.storeCd;
	this.cd.detectChanges();
	event= this.paramModel.conerNm;
	console.log(this.cd);
	console.log(this.paramModel)
	}
	conerSelected=(event)=>{
		this.paramModel.coner=event.conerNo;
		this.paramModel.conerNm=event.conerName;
		console.log(event);
		console.log(this.paramModel);
	} 
	renderSign = (value, record) => {	
				var formattedValue = Ext.util.Format.number(value, '0,000');
			var col = '';
			var backCol = '';
			if (value > 0) { col = 'black'; }
			else if (value < 0) { col = 'red'; }
			
	  
			const result =  `<span style='color:${col}'>${formattedValue}</span>`;
			return result;
	} 

	closeConer(event){
		this.isDialogShowing3 = false;
		this.cd.detectChanges();
	}
	
}