/**
* 생성자       : '윤경윤' 	생성일 : '20200611' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { PcLastYearCntstIncrsrateInq } from './shared/pcLastYearCntstIncrsrateInq.model';
import { PcLastYearCntstIncrsrateInqService } from './shared/pcLastYearCntstIncrsrateInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
	selector: 'app-pcLastYearCntstIncrsrateInq',
	templateUrl: './pcLastYearCntstIncrsrateInq.component.html',
	providers: [PcLastYearCntstIncrsrateInqService],
})
export class PcLastYearCntstIncrsrateInqComponent implements OnInit {

	@Input() public route: any;

	
	//param model
	public paramModel: PcLastYearCntstIncrsrateInq = <PcLastYearCntstIncrsrateInq>{};

	//grid select model
	public gridModel: PcLastYearCntstIncrsrateInq = <PcLastYearCntstIncrsrateInq>{};

	//grid store
	gridStore = new Ext.data.Store({});


	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;
	
	//점
	public comboStoreLv1: any = null;
	public comboStoreLv1Model: PcLastYearCntstIncrsrateInq = <PcLastYearCntstIncrsrateInq>{};
		//부
		public comboStoreLv2: any = null;
		public comboStoreLv2Model: PcLastYearCntstIncrsrateInq = <PcLastYearCntstIncrsrateInq>{};
 
		//팀
		public comboStoreLv3: any = null;
		public comboStoreLv3Model: PcLastYearCntstIncrsrateInq = <PcLastYearCntstIncrsrateInq>{};
		//존
		public ZoneStore: any = null;
		public ZoneStoreModel: PcLastYearCntstIncrsrateInq = <PcLastYearCntstIncrsrateInq>{};
		//전년 작년출력
		public yeartitle: any = null;
		//출력 순서
		public inqSeq: any =null;
		public inqSeq1: any =null;
		//출력 배열저장
		public PcModel: any;
	
		//comboBox Store
	 public comboOnStore : any = [
		{onlinechk: 'ON', onlinechkNm: '온라인'},
		{onlinechk: 'OFF', onlinechkNm: '오프라인'},
		{onlinechk: 'ONF', onlinechkNm: '온라인+오프라인'},
		{onlinechk: 'ONFS', onlinechkNm: '온라인+오프라인[합산]'}
	 ]

		public Goal = [
			{
				text: '목표',
				xtype: 'column',
				dataIndex: "SaleGoal",
				align: 'right'
			}
		]
	constructor(private PcLastYearCntstIncrsrateInqService: PcLastYearCntstIncrsrateInqService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date();
		this.endDt = new Date();
		this.paramModel.checkVal="Y";

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(null);
		this.paramModel.endDt 		= this.envService.getDateToString(null);
		this.baseStoreCombo();
	}
	onTitleTap(event){
		Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
	 }
	 AchivmentrateCheckbox(event){
		if (event.newValue==true){
			this.paramModel.achivmentrateCheck="Y";
		}
		else if (event.newValue==false){
			this.paramModel.achivmentrateCheck="N";
		}
		console.log(this.paramModel.achivmentrateCheck);
	}
	 //조직(점) 기본 셋팅
	 baseStoreCombo = () =>{
		this.paramModel.jum = '01';
		this.paramModel.serchLevel = 'jum';
		this.comboStoreLv1Model.paramLvCd = '01';
		this.paramModel.onlinechk='ONF';
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
   	//점 콤보박스 선택 이벤트
	   comboStoreLv1Event = (data) =>{
		this.paramModel.jum = data.newValue;
		this.paramModel.serchLevel = 'jum';
		 //조직(부) 조회
		 this.comboStoreLv2Model.paramLvCd = data.newValue;
		 this.paramModel.bu =null;
		 this.paramModel.tim=null;
		 this.paramModel.ZoneCd=null;
		 this.ZoneStoreModel.paramLvCd = data.newValue;
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
		
		
		this.paramModel.tim=null;
		this.paramModel.ZoneCd=null;
		console.log(this.paramModel);
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
		 this.ZoneStoreModel.bu = data.newValue;
		 this.PcLastYearCntstIncrsrateInqService.selectzoneStoreList(this.ZoneStoreModel).subscribe(
			(res: any) => {
				//조직(팀) data set
				this.ZoneStore = res;
			},
			(err: HttpErrorResponse) => {
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
		);
		console.log(this.paramModel);
	}
 
	//팀 콤보박스 선택 이벤트
	comboStoreLv3Event = (data) =>{
		
		this.paramModel.ZoneCd=null;
		this.paramModel.tim = data.newValue;
		this.paramModel.serchLevel = 'tim';
	}
	//존 콤보박스 선택 이벤트
	zoneStoreEvent = (data) =>{
		this.paramModel.ZoneCd = data.newValue;
		this.paramModel.tim = null;

		console.log(this.paramModel);
		 
	}
		//달력 포멧 변경
		searchDayCmp: any;
		onReadysearchDay(event){
			this.searchDayCmp = event.cmp;
			this.searchDayCmp.getPicker().setHeaderFormat('Y년m월d일');
		}
		//달력 포멧 변경
		startDtCmp: any;
		onReadystartDt(event){
			this.startDtCmp = event.cmp;
			this.startDtCmp.getPicker().setHeaderFormat('Y년m월d일');
		}
	//시작일 변경 이벤트
	onChangeStartDt(date){
		// this.paramModel.startDt = this.envService.getDateToString(date.newDate);
		if(this.envService.getDateToString(date.newDate) >= this.paramModel.endDt)
		{
		   // console.log(date.oldDate);
		   // console.log(this.searchFromDayCmp);
		   this.startDtCmp.setValue(date.oldDate);               
		   Ext.Msg.alert('Error!!', '시작일은 종료일보다 클수 없습니다');   
	}
	else
	{         
	   this.paramModel.startDt = this.envService.getDateToString(date.newDate);
	}

}
	//달력 포멧 변경
	endDtCmp: any;
	onReadyendDt(event){
		this.endDtCmp = event.cmp;
		this.endDtCmp.getPicker().setHeaderFormat('Y년m월d일');
	}
	//종료일 변경 이벤트
	onChangeEndDt(date){
		//this.paramModel.endDt = this.envService.getDateToString(date.newDate);
		if(this.envService.getDateToString(date.newDate) < this.paramModel.startDt)
		{
		   // console.log(date.oldDate);
		   // console.log(this.searchFromDayCmp);
		   this.endDtCmp.setValue(date.oldDate);               
		   Ext.Msg.alert('Error!!', '시작일은 종료일보다 클수 없습니다');   
	}
	else
	{         
	   this.paramModel.endDt = this.envService.getDateToString(date.newDate);
	}
}
	redColor(value: number) {
	let colorValue : string; 
	if (value < 0) {
		colorValue ='red'
	}else{
		colorValue ='black'
	} 

	return colorValue;
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
		if (this.paramModel.jum ==null ||this.paramModel.jum =='' ){
			Ext.Msg.alert('Error!!', '점을 선택하셔야됩니다.');   
		}
		else{
		if (this.paramModel.onlinechk==null||this.paramModel.onlinechk==""){
			Ext.Msg.alert('Error!!', '출력구분을 선택하셔야됩니다.');   
		}
		else{
		console.log(this.paramModel);
		if (this.paramModel.checkVal=="Y"){
			this.yeartitle=['당년','전년'];
			console.log(this.yeartitle);
		}
		else if(this.paramModel.checkVal=="N"){
			this.yeartitle=['당년'];
			console.log(this.yeartitle);
		};
		this.inqSeq =['순서','클래스명','목표','실적','건수','할인','달성율','신장율']
		
		// this.gridCmp.setMasked({
		// 	xtype: 'loadmask',
		// 	message: 'Loading...'
		// });
		this.PcLastYearCntstIncrsrateInqService.selectPcLastYearCntstIncrsrateInqList(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				this.gridModel = res;
				this.PcModel=res;
				console.log(res);
			;
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
	}

	
	

	//신규 버튼 이벤트
	onTapNew(event){
	}

	//저장 버튼 이벤트
	onTapSave(event){
		Ext.Msg.confirm("저장", "데이터를 저장합니다", 
			function(){
				this.PcLastYearCntstIncrsrateInqService.savePcLastYearCntstIncrsrateInq(null).subscribe(
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
		);
	}

	//엑셀 버튼 이벤트
	onTapExcel(event){
		let url = this.PcLastYearCntstIncrsrateInqService.excelPcLastYearCntstIncrsrateInq(this.paramModel);
		console.log(url);

		let downloadLink = document.createElement('a');
		downloadLink.href = encodeURI(url);
		document.body.appendChild(downloadLink);
		downloadLink.click();
	}

	//레포트 버튼 이벤트
	onTapReport(event){
		this.PcLastYearCntstIncrsrateInqService.reportPcLastYearCntstIncrsrateInq(this.paramModel).subscribe(
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
		this.PcLastYearCntstIncrsrateInqService.helpPcLastYearCntstIncrsrateInq(this.paramModel).subscribe(
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


	//체크박스 선택 이벤트
	onChangeCheck(data){
		console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
		//선택하면 Y값을 미선택이면 N 값을 지정
		this.paramModel.checkVal = data.newValue == true ? 'Y' : 'N';
	}


	//토글 버튼 선택 이벤트
	onChangeToggle(data){
		this.paramModel.toggleVal = data.newValue;
	}

	//콤보박스 변경 이벤트
	onChangeComboBox(data){
		this.paramModel.onlinechk = data.newValue;
		console.log(this.paramModel);
	}


}