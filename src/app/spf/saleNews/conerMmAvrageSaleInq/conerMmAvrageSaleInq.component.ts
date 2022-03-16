/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { ConerMmAvrageSaleInq } from './shared/conerMmAvrageSaleInq.model';
import { ConerMmAvrageSaleInqService } from './shared/conerMmAvrageSaleInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-conerMmAvrageSaleInq',
	templateUrl: './conerMmAvrageSaleInq.component.html',
	providers: [ConerMmAvrageSaleInqService],
})
export class ConerMmAvrageSaleInqComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: ConerMmAvrageSaleInq = <ConerMmAvrageSaleInq>{};

	//grid select model
	public gridModel: ConerMmAvrageSaleInq = <ConerMmAvrageSaleInq>{};

	//시작일
	public frDate: any = null;

	//종료일
	public toDate: any = null;

   	//점
   	public comboStoreLv1: any = null;
   	public comboStoreLv1Model: ConerMmAvrageSaleInq = <ConerMmAvrageSaleInq>{};

   	//부
   	public comboStoreLv2: any = null;
   	public comboStoreLv2Model: ConerMmAvrageSaleInq = <ConerMmAvrageSaleInq>{};

   	//팀
   	public comboStoreLv3: any = null;
   	public comboStoreLv3Model: ConerMmAvrageSaleInq = <ConerMmAvrageSaleInq>{};

	//grid store
	gridStore = new Ext.data.Store({});


	//전년 당년 으로 그리드 헤드 컬럼 2단구조 위한 변수
	public yearColumns = [];

	constructor(private conerMmAvrageSaleInqService: ConerMmAvrageSaleInqService, public envService: EnvService ) { }
	ngOnInit() { 
		this.frDate = new Date(this.envService.getBeforeDate(30));
		this.toDate = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.frDate 	= this.envService.getDateToString(this.envService.getBeforeDate(30));
		this.paramModel.toDate 		= this.envService.getDateToString(null);

		//점 콤보박스 셋팅
		this.baseStoreCombo();	
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
		if(this.envService.getDateToString(date.newDate) > this.paramModel.toDate)
		{
			// console.log(date.oldDate);
			// console.log(this.searchFromDayCmp);
			this.searchFromDayCmp.setValue(date.oldDate);					
			Ext.Msg.alert('Error!!', '시작일은 종료일보다 클수 없습니다');	
		}	
		else
		{			
			this.paramModel.frDate = this.envService.getDateToString(date.newDate);
		}
		
	}

	//종료일 변경 이벤트
	onChangeEndDt(date){
		//에러체크
		if(this.envService.getDateToString(date.newDate) < this.paramModel.frDate)
		{
			// console.log(date.oldDate);
			// console.log(this.searchFromDayCmp);
			this.searchToDayCmp.setValue(date.oldDate);			
			Ext.Msg.alert('Error!!', '종료일은 시작일보다 커야 합니다');
		}
		else
		{
			this.paramModel.toDate = this.envService.getDateToString(date.newDate);
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

	onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
	}

	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel);
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});

		//입력 에러 체크
		if(this.paramModel.serchLevel != 'tim')
		{
			Ext.Msg.alert('Error!!', '부와 팀을 선택하시고 조회 해야 합니다');
			this.gridCmp.setMasked(false);
		}
		else
		{
			this.conerMmAvrageSaleInqService.selectConerMmAvrageSaleInqList(this.paramModel).subscribe(
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
		this.conerMmAvrageSaleInqService.excelConerMmAvrageSaleInq(this.paramModel).subscribe(
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
		this.conerMmAvrageSaleInqService.helpConerMmAvrageSaleInq(this.paramModel).subscribe(
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
			this.jumComboVal 	= this.comboStoreLv1[0].storeLvCd;
			this.paramModel.jum = this.comboStoreLv1[0].storeLvCd;
			this.paramModel.serchLevel = 'jum';
		},
		(err: HttpErrorResponse) => {
			Ext.Msg.alert('Error!!', 'Server communication error.');
		}
	);
}

	//점 콤보박스 선택 이벤트
	comboStoreLv1Event = (data) =>{
		this.paramModel.jum = data.newValue;
		this.paramModel.serchLevel = 'jum';
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
		this.paramModel.serchLevel = 'bu';
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
		this.paramModel.serchLevel = 'tim';
	}



}