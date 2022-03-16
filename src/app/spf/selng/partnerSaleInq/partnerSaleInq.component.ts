/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input,Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { partnerSaleInq } from './shared/partnerSaleInq.model';
import { partnerSaleInqService } from './shared/partnerSaleInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchCcpyParam } from 'src/app/component/searchCcpy/shared/searchCcpyParam.model';

@Component({
	selector: 'app-partnerSaleInq',
	templateUrl: './partnerSaleInq.component.html',
	providers: [partnerSaleInqService],
})
export class partnerSaleInqComponent implements OnInit {

	@Input() public route: any;
	@Input() public isDialogShowing2:boolean = false;
	@Output() public sendObject: any = new EventEmitter();

	//param model
	public paramModel: partnerSaleInq = <partnerSaleInq>{};

	//grid select model
	public gridModel: partnerSaleInq = <partnerSaleInq>{};
	public searchCcpyParamModel: SearchCcpyParam = <SearchCcpyParam>{};
	//점
	
    public comboStoreLv1: any = null;
	public comboStoreLv1Model: partnerSaleInq = <partnerSaleInq>{};
	//협력업체
    public partnerStore: any = null;
	public partnerStoreModel: partnerSaleInq = <partnerSaleInq>{};
	//클래스
    public clsStore: any = null;
	public clsStoreModel: partnerSaleInq = <partnerSaleInq>{};
	//품목코드
    public glsStore: any = null;
    public glsStoreModel: partnerSaleInq = <partnerSaleInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: partnerSaleInq = <partnerSaleInq>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: partnerSaleInq = <partnerSaleInq>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;
		storeCd : string;
	constructor(private partnerSaleInqService: partnerSaleInqService, public envService: EnvService ,private cd: ChangeDetectorRef) { }
	ngOnInit() { 
		this.startDt = new Date();
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(null);
		this.paramModel.endDt 		= this.envService.getDateToString(null);
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

	renderSign = (value, record) => {	
	
		var formattedValue = Ext.util.Format.number(value, '0,000');
		
		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }
  
		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
  
	}
	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel)
		if(this.paramModel.partner==null ||this.paramModel.partner==''){	
			Ext.getCmp('glspanel').show();
			Ext.getCmp('partnerpanel').hide();
		}
		else if((this.paramModel.gls==null ||this.paramModel.gls=='')){
			Ext.getCmp('glspanel').hide();
			Ext.getCmp('partnerpanel').show();
		}
		console.log(this.paramModel);
		if((this.paramModel.partner==null || this.paramModel.partner=='') && (this.paramModel.gls==null || this.paramModel.gls==''))
		{
			Ext.Msg.alert('Error!!', '협력업체 또는 품목코드 를 선택하셔야합니다.');   
		}
		else{
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.partnerSaleInqService.selectpartnerSaleInqList(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				this.gridStore.setData(res);
				this.gridCmp.setMasked(false);
				console.log(this.gridStore);
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
		this.partnerSaleInqService.excelpartnerSaleInq(this.paramModel).subscribe(
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
		this.partnerSaleInqService.reportpartnerSaleInq(this.paramModel).subscribe(
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
		this.partnerSaleInqService.helppartnerSaleInq(this.paramModel).subscribe(
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
		
		this.partnerSaleInqService.selectGlsList(this.glsStoreModel).subscribe(
		    (res: any) => {
			    //조직(부) data set
				this.glsStore = res;
				console.log(this.glsStore)
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
	    this.partnerStoreModel.jum = this.paramModel.jum
	    this.partnerSaleInqService.selectPartnerList(this.partnerStoreModel).subscribe(
		    (res: any) => {
			    //조직(부) data set
				this.partnerStore = res;
				console.log(this.partnerStore)
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
		);
		this.partnerSaleInqService.selectGlsList(this.glsStoreModel).subscribe(
		    (res: any) => {
			    //조직(부) data set
				this.glsStore = res;
				console.log(this.glsStore)
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
	    );
	
   }

	//협력업체 콤보박스 선택 이벤트
	partnerStoreEvent = (data) =>{
		this.paramModel.partner = data.newValue;
		console.log(data.newValue)
		console.log(this.paramModel)
		
		this.clsStoreModel.partner = this.paramModel.partner
	    this.partnerSaleInqService.selectClsList(this.clsStoreModel).subscribe(
		    (res: any) => {
			    //조직(부) data set
				this.clsStore = res;
				console.log(this.clsStore)
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
		);
		
		if(this.paramModel.partner!=''){
		this.glsStore  = [
			{}
			]
			this.paramModel.gls=null;
		this.partnerSaleInqService.selectGlsList(this.glsStoreModel).subscribe(
		    (res: any) => {
			    //조직(부) data set
				this.glsStore = res;
				console.log(this.glsStore)
				console.log("협력업체선택")
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
		);
		}
		
	}
	//협력업체 콤보박스 선택 이벤트
	clsStoreEvent = (data) =>{	
		this.paramModel.cls = data.newValue;
		this.paramModel.cls1= this.paramModel.cls.substr(0,5);
		this.paramModel.cls2= this.paramModel.cls.substr(5,2);
		
		console.log(data.newValue)

		if(this.paramModel.cls!=''){
		this.glsStore  = [
			{}
			]
			this.paramModel.gls=null;
		this.partnerSaleInqService.selectGlsList(this.glsStoreModel).subscribe(
		    (res: any) => {
			    //조직(부) data set
				this.glsStore = res;
				console.log("클래스선택")
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
		);
		}
		
	}

	//품목코드 콤보박스 선택 이벤트
	glsStoreEvent = (data) =>{
		this.paramModel.gls = data.newValue;
		console.log(this.paramModel)
		
		if(this.paramModel.gls!=''){
		this.partnerStore  = [
			{}
			]
			this.paramModel.partner=null;
			this.paramModel.cls=null;
			this.partnerSaleInqService.selectPartnerList(this.partnerStoreModel).subscribe(
				(res: any) => {
					//조직(부) data set
					this.partnerStore = res;
					console.log("품목코드선택")
				},
				(err: HttpErrorResponse) => {
					Ext.Msg.alert('Error!!', 'Server communication error.');
				}
			);
		}
	
	}
   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }

   searchpartner=(event)=>{
	this.isDialogShowing2 = true;
	this.searchCcpyParamModel.jum = this.storeCd;
	this.cd.detectChanges();
	event= this.paramModel.partnerNm
	}
	partnerSelected=(event)=>{
		this.paramModel.partner=event.ccpy;
		this.paramModel.partnerNm=event.cmpNm;
		console.log(event)
	}
}