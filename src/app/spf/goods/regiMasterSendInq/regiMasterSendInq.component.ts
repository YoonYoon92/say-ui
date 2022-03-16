/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { RegiMasterSendInq } 		from './shared/regiMasterSendInq.model';
import { RegiMasterSendInqService } from './shared/regiMasterSendInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RegiMasterSendInqSearch } from './shared/regiMasterSendInq.Searchmodel';

@Component({
	selector: 'app-regiMasterSendInq',
	templateUrl: './regiMasterSendInq.component.html',
	providers: [RegiMasterSendInqService],
})
export class RegiMasterSendInqComponent implements OnInit {

	@Input() public route: any;

	public pdfUrl: string;

	//param model
	public paramModel: RegiMasterSendInq = <RegiMasterSendInq>{};

	//grid select model
	public gridModel: RegiMasterSendInq = <RegiMasterSendInq>{};

   	//점
   	public comboStoreLv1: any = null;
   	public comboStoreLv1Model: RegiMasterSendInq = <RegiMasterSendInq>{};

   	//부
   	public comboStoreLv2: any = null;
   	public comboStoreLv2Model: RegiMasterSendInq = <RegiMasterSendInq>{};

   	//팀
   	public comboStoreLv3: any = null;
   	public comboStoreLv3Model: RegiMasterSendInq = <RegiMasterSendInq>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//comboBox Store
	public comboOnStore : any = [
		{onlineChk: 'N', onlineChkNm: 'POS번호입력'}
	]

	//comboBox Store
	public comboOnStorePos : any = null;

	//행사코드
	// public poslist: any = null;
	public poslist : any = [
		{regiNo: 'POS번호', regiNm: 'POS명'}
	]
	public poslistModel : RegiMasterSendInqSearch =<RegiMasterSendInqSearch>{};
	


	//comboBox Store
	// public comboOnStoreRcptNo1 : any = [
	// 	{rcptNo1: '0001', rcptNo1Nm: '영수증시작~'},
	// ]

	// //comboBox Store
	// public comboOnStoreRcptNo2 : any = [
	// 	{rcptNo2: '9999', rcptNo2Nm: '~영수증마지막'},
	// ]

	//조회일자
	public frDate: any = null;
	public toDate: any = null;

	public thisYyCol = [
		{
			text: '기준년목표',
			xtype: 'column',
			summary:'sum',
			dataIndex: 'thisYySplan',
			align: 'right',
			width:"50%",
			formatter:'number("0,000")'
		},
		{
			text: '기준년매출',
			xtype: 'column',
			summary:'sum',
			dataIndex: 'thisYyNetsale',
			align: 'right',
			width:"50%",
			formatter:'number("0,000")'
		},
	];

	public yesterYyCol = [
		{
			text: '비교년목표',
			xtype: 'column',
			summary:'sum',
			dataIndex: "lastYySplan",
			align: 'right',
			width:"50%",
			formatter:'number("0,000")'
		},
		{
			text: '비교년매출',
			xtype: 'column',
			summary:'sum',
			dataIndex: 'lastYyNetsale',
			align: 'right',
			width:"50%",
			formatter:'number("0,000")'
		},
	];

	renderSignRate = (value, record) => {	
		
		var formattedValue = Ext.util.Format.number(value, '000.00 %');

		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }

		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	}

	renderSignNormal = (value, record) => {	
		
		var formattedValue = Ext.util.Format.number(value, '0,000');
	
		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }

		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	}

	// constructor(public datepipe: DatePipe){}

	constructor(private regiMasterSendInqService: RegiMasterSendInqService, public envService: EnvService ) { }
	ngOnInit() { 
		//시작일자---
		this.frDate = new Date(this.envService.getBeforeDate(null));

		//조회일자 셋팅
		this.paramModel.frDate 	= this.envService.getDateToString(this.envService.getBeforeDate(null));

		//종료일자---
		this.toDate = new Date(this.envService.getBeforeDate(null));

		//조회일자 셋팅
		this.paramModel.toDate 	= this.envService.getDateToString(this.envService.getBeforeDate(null));

		//test
		//  this.frDate = '05/10/2020'
		//  this.paramModel.frDate = '20200510'		
		//  this.toDate = '05/11/2020'
		//  this.paramModel.toDate = '20200511'

       //점 콤보박스 셋팅
	   this.baseStoreCombo();

	   //점 기본값 세팅
	   //this.comboStoreLv1 = '01'
	  
  
	   this.poslistModel.frDate = this.paramModel.frDate;
		//    this.paramModel.eventNm=null;
		//    this.paramModel.eventcd1=null;
		//    this.paramModel.eventcd2=null;
		//    this.paramModel.bu=null;
		//    this.paramModel.pc=null;
		this.paramModel.regiNo = '';
		this.paramModel.bu = '';

	}

	//행사목록 선택 이벤트
	eventlistPos = (data) =>{

	if(data.newValue == null){
		this.paramModel.regiNo = '';	
		console.log('"null처리"');
	}
	else{
	this.paramModel.regiNo = data.newValue;
	}
	// console.log(this.paramModel);
	console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
	}


	
	//달력 포멧 변경
	searchfrDayCmp: any;
	onReadysearchfrDay(event){
		this.searchfrDayCmp = event.cmp;
		this.searchfrDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}
	//달력 포멧 변경
	searchtoDayCmp: any;
	onReadysearchtoDay(event){
		this.searchtoDayCmp = event.cmp;
		this.searchtoDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//시작일 변경 이벤트
	// onChangeStartDt(date){
	// 	this.paramModel.frDate = this.envService.getDateToString(date.newDate);
	// }

	   //시작일 변경 이벤트
	   onChangeStartDt(date){
		//에러체크
		if(this.envService.getDateToString(date.newDate) > this.paramModel.toDate)
		{
		   // console.log(date.oldDate);
		   // console.log(this.searchFromDayCmp);
		   this.searchfrDayCmp.setValue(date.oldDate);               
		   Ext.Msg.alert('Error!!', '시작일은 종료일보다 클수 없습니다');   
		}   
		else
		{         
		   this.paramModel.frDate   = this.envService.getDateToString(date.newDate);
		   this.poslistModel.frDate = this.envService.getDateToString(date.newDate);
		   this.regiMasterSendInqService.selectRegiMasterSendInqSearchList(this.poslistModel).subscribe(
			(res: any) => {
				//이벤트행사
				this.poslist = res;
			},
			(err: HttpErrorResponse) => {
				Ext.Msg.alert('Error!!', 'Server communication error.');
			}
			);
		   console.log(this.paramModel);
		}
		
	 }

	//종료일 변경 이벤트
	onChangeStartDtTo(date){
	//종료일이 시작일보다 클때
		// this.toDate.setvalue = date.oldDate
		  if (this.envService.getDateToString(date.newDate) < this.paramModel.frDate )
		 {
			Ext.Msg.alert('Error!!', '종료일은 시작일보다 커야 합니다');
			// this.frDate 			= this.toDate
			// this.frDate = '03/10/2020' + this.paramModel.toDate.substring(1,2) 20200310
			// this.frDate = this.paramModel.toDate.substring(5,2) + '/'
            //             + this.paramModel.toDate.substring(7,2) + '/'
			// 			+ this.paramModel.toDate.substring(1,4)
			
			this.searchtoDayCmp.setValue(this.toDate);
			this.paramModel.frDate	= this.paramModel.toDate;
			
			// this.searchfrDayCmp.setValue(this.toDate);
			// this.frDate = this.toDate(date.oldDate);
			// this.frDate = '03/10/2020'
			
		// 	this.paramModel.frDate = this.envService.getDateToString(date.newDate);
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
		// 
		// if(this.paramModel.bu == '' || this.paramModel.bu == null)
		// {
		//    Ext.Msg.alert('Error!!', '부서를 선택하세요.');   
		// }   
		// else
		// {    
		// 
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.regiMasterSendInqService.selectRegiMasterSendInqList(this.paramModel).subscribe(
			(res: any) => {
				console.log(res);
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
				console.log(err);
				Ext.Msg.alert('Error!!', 'Server communication error.');
				this.gridCmp.setMasked(false);
			}
		);
		// 
		// }
	}

	//수정 버튼 이벤트
	onTapModify(event){
		
	}

	//삭제 버튼 이벤트
	onTapDelete(event){
		Ext.Msg.confirm("삭제", "데이터를 삭제합니다", 
			function(){
				this.regiMasterSendInqService.deleteRegiMasterSendInq(null).subscribe(
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

	//신규 버튼 이벤트
	onTapNew(event){
	}

	//저장 버튼 이벤트
	onTapSave(event){
		Ext.Msg.confirm("저장", "데이터를 저장합니다", 
			function(){
				this.regiMasterSendInqService.saveRegiMasterSendInq(null).subscribe(
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

	// //엑셀 버튼 이벤트
	onTapExcel(event){
		let url = this.regiMasterSendInqService.excelRegiMasterSendInq(this.paramModel);
		console.log(url);

		let downloadLink = document.createElement('a');
		downloadLink.href = encodeURI(url);
		document.body.appendChild(downloadLink);
		downloadLink.click();
 	}

	//레포트 버튼 이벤트
	onTapPdfQuery(event){
		// this.pdfUrl = `http://localhost:8000/api/buRtnSaleNewz/selectReport?param=${JSON.stringify(this.paramModel)}`;
		this.pdfUrl = this.regiMasterSendInqService.reportRegiMasterSendInq(this.paramModel);
		$('#pdfFrame').attr('src', encodeURI(this.pdfUrl));            //set url
		console.log(this.pdfUrl);
		//iframe hide/show
		Ext.getCmp('pdfpanel').show();
		Ext.getCmp('schpanel').hide();
	}

	//도움말 버튼 이벤트
	onTapHelp(event){
		this.regiMasterSendInqService.helpRegiMasterSendInq(this.paramModel).subscribe(
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
//    baseStoreCombo = () =>{
// 	this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
// 		(res: any) => {
// 			this.comboStoreLv1 = res;
// 			this.comboStoreLv1 = '01'
// 		},
// 		(err: HttpErrorResponse) => {
// 			Ext.Msg.alert('Error!!', 'Server communication error.');
// 		}
// 	);
// }
	
//조직(점) 기본 셋팅
	baseStoreCombo = () =>{
		this.comboStoreLv1Model.paramLvCd = '01';
		this.paramModel.jum = '01';
		// this.paramModel.serchLevel = 'jum';
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
	//    this.paramModel.serchLevel = 'jum';
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
		
		if(this.paramModel.jum == '' || this.paramModel.jum == null)
		{
			Ext.Msg.alert('Error!!', '점은 필수로 선택해야 합니다.');   
		}
   }

   //부 콤보박스 선택 이벤트
   comboStoreLv2Event = (data) =>{
	   this.paramModel.bu = data.newValue;
	//    this.paramModel.serchLevel = 'bu';
	    //조직(팀) 조회
	    this.comboStoreLv3Model.paramLvCd = data.newValue;
	    this.envService.selectStoreComboLv3List(this.comboStoreLv3Model).subscribe(
		    (res: any) => {
			    //조직(팀) data set
			    this.comboStoreLv3 = res;
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', '부서 조회 실패');
		    }
	    );
		this.poslistModel.jum = this.paramModel.jum
		this.poslistModel.bu  = this.paramModel.bu
		this.regiMasterSendInqService.selectRegiMasterSendInqSearchList(this.poslistModel).subscribe(
			(res: any) => {
				//포스목록
				this.poslist = res;
			},
			(err: HttpErrorResponse) => {
				// Ext.Msg.alert('Error!!', '포스목록 불러오기 실패');
			}
			);
			if(data.newValue == null){
				this.paramModel.bu = '';	
				console.log('"null처리"');
			}
			// if(this.paramModel.bu == '' || this.paramModel.bu == null)
			// {
			// 	Ext.Msg.alert('Error!!', '부서는 필수로 선택해야 합니다.');   
			// }
	   
	   console.log(this.paramModel);
   }

   //팀 콤보박스 선택 이벤트
   comboStoreLv3Event = (data) =>{
	   this.paramModel.tim = data.newValue;
	//    this.paramModel.serchLevel = 'tim';
   }

   //콤보박스 변경 이벤트
   onChangeComboBox(data){
	console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
	//this.paramModel.comboVal = data.newValue;
	}
   //콤보박스 변경 이벤트
   onChangeComboBoxPosNo(data){
	console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
	this.paramModel.regiNo = data.newValue;
	}
   //콤보박스 변경 이벤트
   onChangeComboBoxrcptNo1(data){
	console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
	this.paramModel.rcptNo1 = data.newValue;
	}
   //콤보박스 변경 이벤트
   onChangeComboBoxrcptNo2(data){
	console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
	this.paramModel.rcptNo2 = data.newValue;
	}	
}