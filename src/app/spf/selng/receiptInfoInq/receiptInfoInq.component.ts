/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input,Output,EventEmitter,ChangeDetectorRef } from '@angular/core';
import { ReceiptInfoInq } from './shared/receiptInfoInq.model';
import { ReceiptInfoInqService } from './shared/receiptInfoInq.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EnvService } from '../../../shared/env.service';
import { SearchReceipt } from 'src/app/component/searchReceipt/shared/searchReceipt.model';

@Component({
	selector: 'app-receiptInfoInq',
	templateUrl: './receiptInfoInq.component.html',
	providers: [ReceiptInfoInqService],
})
export class ReceiptInfoInqComponent implements OnInit {

	@Input() public route: any;
	@Input() public isDialogShowing:boolean = false;
	//@Output() public sendObject: any = new EventEmitter();
	//검색 model
	public paramModel: ReceiptInfoInq = <ReceiptInfoInq>{};
	public SearchReceiptModel: SearchReceipt = <SearchReceipt> {};

	//form model
	public formModel: ReceiptInfoInq = <ReceiptInfoInq>{};
	public receiptChk: ReceiptInfoInq = <ReceiptInfoInq>{};
	//grid select model
	public gridModel: ReceiptInfoInq = <ReceiptInfoInq>{};
	public pointModel: ReceiptInfoInq = <ReceiptInfoInq>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: ReceiptInfoInq = <ReceiptInfoInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: ReceiptInfoInq = <ReceiptInfoInq>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: ReceiptInfoInq = <ReceiptInfoInq>{};

	//left grid store
	leftGridStore = new Ext.data.Store({});

	//right grid store
	centerGridStore = new Ext.data.Store({});
	allGridStore = new Ext.data.Store({});
	payGridStore = new Ext.data.Store({});
	ItemGridStore = new Ext.data.Store({});
	pointGridStore =new Ext.data.Store({});
	giftGridStore=new Ext.data.Store({});
	eventGridStore=new Ext.data.Store({});
	//comboBox Store
	public comboStore : any = [
		{comboId: 'combo1', comboNm: 'combo1'},
		{comboId: 'combo2', comboNm: 'combo2'}
	]

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	//fild disabled
	public isDisabled : boolean = true;

	//Fieldset padding
	public padding : string = '15px';
	public receiptCheck: any;
	checkReceipt:any ;

	constructor(private receiptInfoInqService: ReceiptInfoInqService, public envService: EnvService ,private cd: ChangeDetectorRef) { }
	ngOnInit() {
		this.startDt = new Date();
		this.endDt = new Date();
		this.paramModel.posNum='';
		this.paramModel.receiptNum='';
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
	searchFromDayCmp: any;
	onReadysearchFromDay(event){
		this.searchFromDayCmp = event.cmp;
		this.searchFromDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}
	//종료일 변경 이벤트
	onChangeEndDt(date){
		this.paramModel.endDt = this.envService.getDateToString(date.newDate);
	}

	//center grid row 선택 이벤트
	onSelectCenterGrid(row){
		//row 데이터 model 바인딩
		this.gridModel = row.selected[0].data;
		this.formModel = this.gridModel;
	}

	onCheckReceipt(event){					//컬럼 변수로 지정
		this.checkReceipt = event.cmp;
		console.log(this.checkReceipt)
	}
	CheckReceipt(event){
		if (event.newValue==true){
			this.receiptCheck='Y'
		}
		else if (event.newValue==false){
			this.receiptCheck='N'
		}
	}

	onTapQuery1(event){
		this.SearchReceiptModel.posNum=this.paramModel.posNum;
		this.SearchReceiptModel.receiptNum=this.paramModel.receiptNum;
		this.SearchReceiptModel.jum=this.paramModel.jum;
		this.SearchReceiptModel.startDt=this.paramModel.startDt;
		this.isDialogShowing = true;
	}
	closeSearchReceipt(event){
		this.isDialogShowing = false;
		this.cd.detectChanges();
	}

	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}

	//조회 버튼 이벤트
	onTapQuery(event){
		if(this.paramModel.jum==''){Ext.Msg.alert('Error!!', '점포를 입력하세요');}
		else{
		if(this.paramModel.posNum==''){Ext.Msg.alert('Error!!', '포스번호를 입력하세요');}
		else{
			if(this.paramModel.posNum.length!=4){Ext.Msg.alert('Error!!', '포스번호를 확인하세요');}
			else{
				if(this.paramModel.receiptNum==''){Ext.Msg.alert('Error!!', '영수증번호를 입력하세요');}
				else{
		console.log(this.paramModel);
		//영수증 유무체크
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.receiptInfoInqService.selectReceiptInfoInq(this.paramModel).subscribe(
			(res: any) => {
				this.receiptChk=res;
				if(this.receiptChk.stsDiv=='Y'){
				//영수증조회
				
				this.receiptInfoInqService.selectReceiptInfoInqList3(this.paramModel).subscribe(
					(res: any) => {
						/**
						 * @success
						 */
						this.allGridStore.setData(res);
						console.log("1"+this.allGridStore);
						this.payGridStore=[];
						this.ItemGridStore=[];
						this.pointGridStore=[];
						this.giftGridStore=[];
						this.eventGridStore=[];
						this.pointModel.pointNum='';
						this.pointModel.totPoint='';
						this.pointModel.cashNum='';
						this.pointModel.cashApp='';
						for(let index in this.allGridStore.getData().items){
							console.log("2"+this.allGridStore);
							// if(this.allGridStore.getData().item[index].data.stsDiv=='1')
							let checkedItem = {
								stsDiv:this.allGridStore.getData().items[index].data.stsDiv,
							
								chit:this.allGridStore.getData().items[index].data.chit,
								payDiv:this.allGridStore.getData().items[index].data.payDiv,
								payPrice:this.allGridStore.getData().items[index].data.payPrice,
								cardNo:this.allGridStore.getData().items[index].data.cardNo,
								appNo:this.allGridStore.getData().items[index].data.appNo,
								van:this.allGridStore.getData().items[index].data.van,
								cls:this.allGridStore.getData().items[index].data.cls,
								clsNm:this.allGridStore.getData().items[index].data.clsNm,
								num:this.allGridStore.getData().items[index].data.num,
								price:this.allGridStore.getData().items[index].data.price,
								totPrice:this.allGridStore.getData().items[index].data.totPrice,
								itemDiscount:this.allGridStore.getData().items[index].data.itemDiscount,
								netsales:this.allGridStore.getData().items[index].data.netsales,
								pointNum:this.allGridStore.getData().items[index].data.pointNum,
								totPoint:this.allGridStore.getData().items[index].data.totPoint,
								couponCd:this.allGridStore.getData().items[index].data.couponCd,
								couponNm:this.allGridStore.getData().items[index].data.couponNm,
								couponDiscount:this.allGridStore.getData().items[index].data.couponDiscount,
								cashNum:this.allGridStore.getData().items[index].data.cashNum,
								cashApp:this.allGridStore.getData().items[index].data.cashApp,
								giftNum:this.allGridStore.getData().items[index].data.giftNum,
								giftNm:this.allGridStore.getData().items[index].data.giftNm,
								eventNm:this.allGridStore.getData().items[index].data.eventNm,
								eventCd:this.allGridStore.getData().items[index].data.eventCd,
								eventGiftNm:this.allGridStore.getData().items[index].data.eventGiftNm,
								eventGift:this.allGridStore.getData().items[index].data.eventGift,
								eventAcceptAmount:this.allGridStore.getData().items[index].data.eventAcceptAmount
								
								};
								if(checkedItem.stsDiv=='1'){
								this.ItemGridStore.push(checkedItem);
								}
								else if(checkedItem.stsDiv=='6'){
									this.pointModel.pointNum=checkedItem.pointNum;
									this.pointModel.totPoint=checkedItem.totPoint;
								}
								else if(checkedItem.stsDiv=='K'){
									this.pointGridStore.push(checkedItem);
								}
								else if(checkedItem.stsDiv=='B'){
									this.pointModel.cashNum=checkedItem.cashNum;
									this.pointModel.cashApp=checkedItem.cashApp;
									
								}
								else if(checkedItem.stsDiv=='2'){
									this.giftGridStore.push(checkedItem);
								}
								else if(checkedItem.stsDiv=='E'){
									this.eventGridStore.push(checkedItem);
								}
								else if(checkedItem.stsDiv=='A'){
									this.payGridStore.push(checkedItem);
								}
								console.log("지금통신성공");
									if(this.payGridStore!=[]){this.gridCmp.setMasked(false);console.log("작동됨");}
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
				else{Ext.Msg.alert('Error!!', '없는영수증입니다.');this.gridCmp.setMasked(false);}
				
						this.payGridStore=[];
						this.ItemGridStore=[];
						this.pointGridStore=[];
						this.giftGridStore=[];
						this.eventGridStore=[];
						this.pointModel.pointNum='';
						this.pointModel.totPoint='';
						this.pointModel.cashNum='';
						this.pointModel.cashApp='';
			},
			(err: HttpErrorResponse) => {
				/**
				 * @error
				 */
				Ext.Msg.alert('Error!!', 'Server communication error.');
				this.gridCmp.setMasked(false);
				console.log("작동됨3");
			}
		);
		}}}}
		
	}

	//체크박스 선택 이벤트
	onChangeCheck(data){
		//선택하면 Y값을 미선택이면 N 값을 지정
		this.paramModel.checkVal = data.newValue == true ? 'Y' : 'N';
	}

	//토글 버튼 선택 이벤트
	onChangeToggle(data){
		this.paramModel.toggleVal = data.newValue;
	}

	//콤보박스 변경 이벤트
	onChangeComboBox(data){
		this.paramModel.comboVal = data.newValue;
	}
    
   //삭제 버튼 이벤트
	onTapDelete(event){
		Ext.Msg.confirm("삭제", "데이터를 삭제합니다", 
			(e)=>{
				if( e == 'yes' ){
					console.log(this.formModel);
					this.receiptInfoInqService.deleteReceiptInfoInq(this.formModel).subscribe(
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
			}
		);
	}

	//신규 버튼 이벤트
	onTapNew(event){
		this.formModel = <ReceiptInfoInq>{};
		this.isDisabled = false;
	}

	//수정 버튼 이벤트
	onTapModify(event){
		this.isDisabled = false;
	}

	//저장 버튼 이벤트
	onTapSave(event){
		Ext.Msg.confirm("저장", "데이터를 저장합니다", 
			(e)=>{
				if( e == 'yes' ){
					console.log(this.formModel);
					this.receiptInfoInqService.saveReceiptInfoInq(this.formModel).subscribe(
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
			}
		);
	}

	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.receiptInfoInqService.excelReceiptInfoInq(this.paramModel).subscribe(
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
		this.receiptInfoInqService.reportReceiptInfoInq(this.paramModel).subscribe(
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
		this.receiptInfoInqService.helpReceiptInfoInq(this.paramModel).subscribe(
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

   posNumEvent = (data) =>{
		this.paramModel.posNum = String(data.newValue);
		console.log(data.newValue)
	}
	receiptNumEvent = (data) =>{
		this.paramModel.receiptNum =  String(data.newValue);
		console.log(data.newValue)
	}
	
	//다이얼로그 통신 결과값
	sendObject(event){
		console.log(event);
	}
}