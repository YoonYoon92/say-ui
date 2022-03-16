/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { DayAggregation } from './shared/dayAggregation.model';
import { DayAggregationService } from './shared/dayAggregation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EnvService } from '../../../shared/env.service';

@Component({
	selector: 'app-dayAggregation',
	templateUrl: './dayAggregation.component.html',
	providers: [DayAggregationService],
})
export class DayAggregationComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: DayAggregation = <DayAggregation>{};

	//form model
	public formModel: DayAggregation = <DayAggregation>{};

	//grid select model
	public gridModel: DayAggregation = <DayAggregation>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: DayAggregation = <DayAggregation>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: DayAggregation = <DayAggregation>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: DayAggregation = <DayAggregation>{};

	gridStore = new Ext.data.Store({});

	//comboBox Store
	public comboStore : any = [
		{comboId: 'combo1', comboNm: 'combo1'},
		{comboId: 'combo2', comboNm: 'combo2'}
	]

	//fild disabled
	public isDisabled : boolean = true;

	//Fieldset padding
	public padding : string = '15px';

	//시작일
	public startDt: any = null;
	public mmDt: any = null; //월1일
	public mmEndDt: any = null;
	public yyDt: any = null;
	public monthcheck: any = null;


	//종료일
	public endDt: any = null;

	constructor(private dayAggregationService: DayAggregationService, public envService: EnvService ) { }
	ngOnInit() {
		this.startDt = new Date();
		this.endDt = new Date();
		this.mmDt =new Date();
		this.mmDt.setDate('01');
		this.mmEndDt =new Date();
		this.mmEndDt.setDate('','',0);
		this.yyDt=new Date();
		this.yyDt.setMonth('00');
		this.yyDt.setDate('01');

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(null);
		this.paramModel.endDt 		= this.envService.getDateToString(this.envService.getBeforeDate(30));
		this.mmEndDt=new Date(parseInt(this.paramModel.startDt.substr(0,4)),parseInt(this.paramModel.startDt.substr(4,2)),0);

		this.paramModel.mmDt		= this.envService.getDateToString(this.mmDt);
		this.paramModel.mmEndDt		= this.envService.getDateToString(this.mmEndDt);
		this.paramModel.yyDt		= this.envService.getDateToString(this.yyDt);
       //점 콤보박스 셋팅
       this.baseStoreCombo()
	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
		this.paramModel.startDt = this.envService.getDateToString(date.newDate);
		this.mmDt=new Date(date.newDate);
		this.mmDt.setDate('01');
		this.mmEndDt=new Date(parseInt(this.paramModel.startDt.substr(0,4)),parseInt(this.paramModel.startDt.substr(4,2)),0);
		this.paramModel.mmDt=this.envService.getDateToString(this.mmDt);
		this.paramModel.mmEndDt		= this.envService.getDateToString(this.mmEndDt);
		this.yyDt.setMonth('00');
		this.yyDt.setDate('01');
		this.paramModel.yyDt=this.envService.getDateToString(this.yyDt);
		console.log(this.paramModel);
	
	}
	startDtCmp: any;
		onReadystartDt(event){
			this.startDtCmp = event.cmp;
			this.startDtCmp.getPicker().setHeaderFormat('Y년m월d일');
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
		this.dayAggregationService.selectDayAggregationList(this.paramModel).subscribe(
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
					this.dayAggregationService.deleteDayAggregation(this.formModel).subscribe(
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
		this.formModel = <DayAggregation>{};
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
					this.dayAggregationService.saveDayAggregation(this.formModel).subscribe(
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
	onTapExcel1(event){      
		//let url = `http://localhost:8000/api/report/excel?param=${JSON.stringify(this.paramModel)}`;
		if (this.paramModel.tim!=''){
		let url = this.dayAggregationService.excelDayAggregation(this.paramModel);
	    console.log(this.paramModel);
		console.log(url);
  
		let downloadLink = document.createElement('a');
		downloadLink.href = encodeURI(url);
		document.body.appendChild(downloadLink);
		downloadLink.click();
		}
		else 
		Ext.Msg.alert('Error!!', '팀을선택하셔야합니다.');
		
	 }
	 //엑셀 버튼 이벤트
	onTapExcel2(event){      
		//let url = `http://localhost:8000/api/report/excel?param=${JSON.stringify(this.paramModel)}`;
		
		if (this.paramModel.tim!=''){
		let url = this.dayAggregationService.excelDayAggregation2(this.paramModel);
	    console.log(this.paramModel);
		console.log(url);
  
		let downloadLink = document.createElement('a');
		downloadLink.href = encodeURI(url);
		document.body.appendChild(downloadLink);
		downloadLink.click();
		}
		else 
		Ext.Msg.alert('Error!!', '팀을선택하셔야합니다.');
	 }
	  //엑셀 버튼 이벤트
	onTapExcel3(event){      
		//let url = `http://localhost:8000/api/report/excel?param=${JSON.stringify(this.paramModel)}`;
		
		if (this.paramModel.tim!=''){
		let url = this.dayAggregationService.excelDayAggregation3(this.paramModel);
	    console.log(this.paramModel);
		console.log(url);
  
		let downloadLink = document.createElement('a');
		downloadLink.href = encodeURI(url);
		document.body.appendChild(downloadLink);
		downloadLink.click();
		}
		else 
		Ext.Msg.alert('Error!!', '팀을선택하셔야합니다.');
	 }

	//레포트 버튼 이벤트
	onTapReport(event){
		this.dayAggregationService.reportDayAggregation(this.paramModel).subscribe(
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
		this.dayAggregationService.helpDayAggregation(this.paramModel).subscribe(
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
		   this.paramModel.bu = '';
		   this.paramModel.tim = '';
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
		this.paramModel.tim = '';
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