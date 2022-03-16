/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { CloseBefZoneSale } from './shared/closeBefZoneSale.model';
import { CloseBefZoneSaleService } from './shared/closeBefZoneSale.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-closeBefZoneSale',
	templateUrl: './closeBefZoneSale.component.html',
	providers: [CloseBefZoneSaleService],
})
export class CloseBefZoneSaleComponent implements OnInit {

	@Input() public route: any;

	public pdfUrl: string;

	//param model
	public paramModel: CloseBefZoneSale = <CloseBefZoneSale>{};

	//grid select model
	public gridModel: CloseBefZoneSale = <CloseBefZoneSale>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: CloseBefZoneSale = <CloseBefZoneSale>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: CloseBefZoneSale = <CloseBefZoneSale>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: CloseBefZoneSale = <CloseBefZoneSale>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;


	//fild disabled
	public isDisabled : boolean = true;

	//Fieldset padding
	public padding : string = '15px';

	constructor(private closeBefZoneSaleService: CloseBefZoneSaleService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date(this.envService.getBeforeDate(30));
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(this.envService.getBeforeDate(30));
		this.paramModel.endDt 		= this.envService.getDateToString(null);
       //점 콤보박스 셋팅
       this.baseStoreCombo()
	
	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
		this.paramModel.startDt = this.envService.getDateToString(date.newDate);
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
		/*
		console.log(this.paramModel);
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});*/
		
		this.pdfUrl = `http://localhost:8000/api/closeBefZoneSale/reportCloseBefZoneSaleList?param=${JSON.stringify(this.paramModel)}`;
		$('#pdfFrame').attr('src', encodeURI(this.pdfUrl));				//set url
		console.log(this.pdfUrl);
		/*
		this.closeBefZoneSaleService.selectCloseBefZoneSaleList(this.paramModel).subscribe(
			(res: any) => {
				
				this.pdfUrl = `http://localhost:8000/api/report/selectReport?param=${JSON.stringify(this.paramModel)}`;
				$('#pdfFrame').attr('src', encodeURI(this.pdfUrl));				//set url
				console.log(this.pdfUrl);
			},
			(err: HttpErrorResponse) => {

				Ext.Msg.alert('Error!!', 'Server communication error.');
				this.gridCmp.setMasked(false);
			}
		);*/
	}

    
 	//엑셀 버튼 이벤트
	 onTapExcel(event){


	}

	//도움말 버튼 이벤트
	onTapHelp(event){
		this.closeBefZoneSaleService.helpCloseBefZoneSale(this.paramModel).subscribe(
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