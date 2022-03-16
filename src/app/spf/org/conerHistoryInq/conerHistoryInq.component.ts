/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { ConerHistoryInq } from './shared/conerHistoryInq.model';
import { ConerHistoryInqService } from './shared/conerHistoryInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-conerHistoryInq',
	templateUrl: './conerHistoryInq.component.html',
	providers: [ConerHistoryInqService],
})
export class ConerHistoryInqComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: ConerHistoryInq = <ConerHistoryInq>{};

	//grid select model
	public gridModel: ConerHistoryInq = <ConerHistoryInq>{};

	//form model
	public formModel: ConerHistoryInq = <ConerHistoryInq>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: ConerHistoryInq = <ConerHistoryInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: ConerHistoryInq = <ConerHistoryInq>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: ConerHistoryInq = <ConerHistoryInq>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//그리드의 컬럼 제어 변수
	public newCol = [];
	public oldCol = [];
	column1 : any;
	column2 : any;
	column3 : any;
	column4 : any;

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	//CheckBox 값
	public checkval1: any = null;	

	constructor(private conerHistoryInqService: ConerHistoryInqService, public envService: EnvService ) { }
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


	//달력 포멧 변경
	searchDayCmp: any;
	onReadysearchDay(event){
		this.searchDayCmp = event.cmp;
		this.searchDayCmp.getPicker().setHeaderFormat('Y년m월d일');
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


	//그리드 체크박스 선택 이벤트
	onSelectionChange = (grid, records, selecting, selection) => {				
		let checkData = selection._selected.items;
		let userIds = new Array();
		checkData.forEach(function(element){
			userIds.push(element.data.jum);
			//console.log(element); // 0 1 2 3 4 5 6 7 8 9 10
		});
	}


	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel);
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.conerHistoryInqService.selectConerHistoryInqList(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				console.log(res);
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

    
	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.conerHistoryInqService.excelConerHistoryInq(this.paramModel).subscribe(
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
		this.conerHistoryInqService.helpConerHistoryInq(this.paramModel).subscribe(
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


	//부서명 보여주기 체크박스 선택 이벤트
	onChangeCheck1(data){		
		data.newValue == true ? this.column1.show(true) : this.column1.hide(true);
		data.newValue == true ? this.column2.show(true) : this.column2.hide(true);
		data.newValue == true ? this.column3.show(true) : this.column3.hide(true);
		data.newValue == true ? this.column4.show(true) : this.column4.hide(true);
	}

   //부서명 보여주기 체크박스에 따른 컬럼 제어 이벤트
	onColumn1(event){				
		this.column1 = event.cmp;
	} 
	onColumn2(event){				
		this.column2 = event.cmp;
	} 
	onColumn3(event){				
		this.column3 = event.cmp;
	} 
	onColumn4(event){				
		this.column4 = event.cmp;
	} 

   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }
}