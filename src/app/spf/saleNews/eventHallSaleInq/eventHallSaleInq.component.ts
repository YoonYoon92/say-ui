/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { EventHallSaleInq } from './shared/eventHallSaleInq.model';
import { EventHallSaleInqService } from './shared/eventHallSaleInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NullTemplateVisitor } from '@angular/compiler';
import { EventHallSaleInqSearch } from './shared/eventHallSaleInq.Searchmodel';

@Component({
	selector: 'app-eventHallSaleInq',
	templateUrl: './eventHallSaleInq.component.html',
	providers: [EventHallSaleInqService],
})
export class EventHallSaleInqComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: EventHallSaleInq = <EventHallSaleInq>{};

	//grid select model
	public gridModel: EventHallSaleInq = <EventHallSaleInq>{};

	//행사코드
	public eventlist: any = null;
	public eventlistModel : EventHallSaleInqSearch =<EventHallSaleInqSearch>{};
   //점
   public comboStoreLv1: any = null;
   public comboStoreLv1Model: EventHallSaleInq = <EventHallSaleInq>{};

   //부
   public comboStoreLv2: any = null;
   public comboStoreLv2Model: EventHallSaleInq = <EventHallSaleInq>{};

   //PC
   public PcListStore: any = null;
   public PcListStoreModel: EventHallSaleInqSearch = <EventHallSaleInqSearch>{};

	//grid store
	gridStore = new Ext.data.Store({});


	//시작일
	public startDt: any = null;

	constructor(private eventHallSaleInqService: EventHallSaleInqService, public envService: EnvService ) { }
	
	
	renderSign = (value, record) => {	
		if (record.get('division') == "달성율" || record.get('division') == "누계달성율"){
		var formattedValue = Ext.util.Format.number(value, '000.00%');
		}
		else{
			var formattedValue = Ext.util.Format.number(value, '0,000');
		}
		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }
  
		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
  
	}
	
	
	ngOnInit() { 
		this.startDt = new Date();
		
		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(null);
		this.eventlistModel.startDt 	= this.envService.getDateToString(null);
       //점 콤보박스 셋팅
       this.baseStoreCombo()
	
	}
	onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
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
		this.eventlistModel.startDt = this.envService.getDateToString(date.newDate);
		this.PcListStoreModel.startDt=this.envService.getDateToString(date.newDate);
		this.paramModel.eventNm=null;
		this.paramModel.eventcd1=null;
		this.paramModel.eventcd2=null;
		this.paramModel.bu=null;
		this.paramModel.pc=null;
		
		
		this.eventHallSaleInqService.selectEventHallSaleInqSearchList(this.eventlistModel).subscribe(
			(res: any) => {
				//이벤트행사
				this.eventlist = res;
				this.comboStoreLv2=res;
				
				//부목록제거 후 다시 불러오기위해
				this.envService.selectStoreComboLv2List(this.comboStoreLv2Model).subscribe(
					(res: any) => {
					this.comboStoreLv2 = res;
				},
					(err: HttpErrorResponse) => {
						Ext.Msg.alert('Error!!', 'Server communication error.');
				}
				);
			},
			(err: HttpErrorResponse) => {
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		);
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
		if (this.paramModel.eventcd1 ==null){
			Ext.Msg.alert('Error!!', '행사를 선택하셔야됩니다.');   
		}
		else{
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.eventHallSaleInqService.selectEventHallSaleInqList(this.paramModel).subscribe(
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

  //조직(점) 기본 셋팅
  baseStoreCombo = () =>{
	this.paramModel.jum = '01';
	this.eventlistModel.jum='01';
	this.PcListStoreModel.jum='01';
	this.paramModel.serchLevel = 'jum';
	this.comboStoreLv1Model.paramLvCd = '01';
	this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
		(res: any) => {
		this.comboStoreLv1 = res;
		},
		(err: HttpErrorResponse) => {
			Ext.Msg.alert('Error!!', 'Server communication error.');
		}
	);
		this.comboStoreLv2Model.paramLvCd = '01';
		this.envService.selectStoreComboLv2List(this.comboStoreLv2Model).subscribe(
		    (res: any) => {
			this.comboStoreLv2 = res;
		},
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		}
		);
  }

  //행사목록 선택 이벤트
  eventlistEvent = (data) =>{
	this.paramModel.alleventcd=data.newValue;
	this.paramModel.eventcd1=this.paramModel.alleventcd.substring(0,2);
	this.paramModel.eventcd2=this.paramModel.alleventcd.substring(2,4);
	this.paramModel.eventstartDt=this.paramModel.alleventcd.substring(4,12);
	this.paramModel.eventendDt=this.paramModel.alleventcd.substring(12,20);
	
	console.log(this.paramModel);
  }
     //점 콤보박스 선택 이벤트
	 comboStoreLv1Event = (data) =>{
		this.paramModel.jum = data.newValue;
		this.paramModel.serchLevel = 'jum';
		 //조직(부) 조회
		 this.comboStoreLv2Model.paramLvCd = data.newValue;
		 this.envService.selectStoreComboLv2List(this.comboStoreLv2Model).subscribe(
			(res: any) => {
			  
			   //조직(부) data set
			   this.comboStoreLv2 = res;
			},
			(err: HttpErrorResponse) => {
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		);
		
		if(this.paramModel.jum == '' || this.paramModel.jum == null)
		{
		   Ext.Msg.alert('Error!!', '점은 필수로 선택해야 합니다.');   
		}
	 }

   //부 콤보박스 선택 이벤트
	comboStoreLv2Event = (data) =>{
		this.paramModel.bu = data.newValue;
		this.paramModel.serchLevel = 'bu';
		this.PcListStoreModel.bu= data.newValue;
		console.log(this.PcListStoreModel);
	    this.eventHallSaleInqService.selectPcListStoreList(this.PcListStoreModel).subscribe(
		    (res: any) => {
		
			    //조직(PC) data set
			    this.PcListStore = res;
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
	    );
	}
	PcListStoreEvent = (data) =>{
		this.paramModel.pc = data.newValue;
		this.paramModel.serchLevel = 'PC';
	}


}
