/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { ClsDanPumCdInq } 		from './shared/clsDanPumCdInq.model';
import { ClsDanPumCdInqService } from './shared/clsDanPumCdInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-clsDanPumCdInq',
	templateUrl: './clsDanPumCdInq.component.html',
	providers: [ClsDanPumCdInqService],
})
export class ClsDanPumCdInqComponent implements OnInit {

	@Input() public route: any;

	public pdfUrl: string;

	//param model
	public paramModel: ClsDanPumCdInq = <ClsDanPumCdInq>{};

	//grid select model
	public gridModel: ClsDanPumCdInq = <ClsDanPumCdInq>{};

   	//점
   	public comboStoreLv1: any = null;
   	public comboStoreLv1Model: ClsDanPumCdInq = <ClsDanPumCdInq>{};

   	//부
   	public comboStoreLv2: any = null;
   	public comboStoreLv2Model: ClsDanPumCdInq = <ClsDanPumCdInq>{};

   	//팀
   	public comboStoreLv3: any = null;
   	public comboStoreLv3Model: ClsDanPumCdInq = <ClsDanPumCdInq>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//comboBox Store
	public comboOnStore : any = [
		{onlineChk: 'A', onlineChkNm: '000000******0000'},
		{onlineChk: 'N', onlineChkNm: '마스킹 포함된 번호 입력'}
	]
	//comboBox Store
	public comboOnStoreClsNo1 : any = [
		{clsNo1: 'N', clsNm1: 'cls 앞 5자리 입력'}
	]
	//comboBox Store
	public comboOnStoreClsNo2 : any = [
		{clsNo2: 'N', clsNm2: 'cls 뒤 2자리 입력'}
	]
	//comboBox Store
	public comboOnStoreDanPumNo : any = [
		{danPumNo: 'N', danPumNm: '단품번호 입력'}
	]
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

	// constructor(public datepipe: DatePipe){}

	constructor(private clsDanPumCdInqService: ClsDanPumCdInqService, public envService: EnvService ) { }
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
		   this.paramModel.frDate = this.envService.getDateToString(date.newDate);
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
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.clsDanPumCdInqService.selectClsDanPumCdInqList(this.paramModel).subscribe(
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
	}

	//수정 버튼 이벤트
	onTapModify(event){
		
	}

	//삭제 버튼 이벤트
	onTapDelete(event){
		Ext.Msg.confirm("삭제", "데이터를 삭제합니다", 
			function(){
				this.clsDanPumCdInqService.deleteClsDanPumCdInq(null).subscribe(
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
				this.clsDanPumCdInqService.saveClsDanPumCdInq(null).subscribe(
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
		let url = this.clsDanPumCdInqService.excelClsDanPumCdInq(this.paramModel);
		console.log(url);

		let downloadLink = document.createElement('a');
		downloadLink.href = encodeURI(url);
		document.body.appendChild(downloadLink);
		downloadLink.click();
 	}

	//레포트 버튼 이벤트
	onTapPdfQuery(event){
		// this.pdfUrl = `http://localhost:8000/api/buRtnSaleNewz/selectReport?param=${JSON.stringify(this.paramModel)}`;
		this.pdfUrl = this.clsDanPumCdInqService.reportClsDanPumCdInq(this.paramModel);
		$('#pdfFrame').attr('src', encodeURI(this.pdfUrl));            //set url
		console.log(this.pdfUrl);
		//iframe hide/show
		Ext.getCmp('pdfpanel').show();
		Ext.getCmp('schpanel').hide();
	}

	//도움말 버튼 이벤트
	onTapHelp(event){
		this.clsDanPumCdInqService.helpClsDanPumCdInq(this.paramModel).subscribe(
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
		this.paramModel.serchLevel = 'jum';
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

   //콤보박스 변경 이벤트
	onChangeComboBox(data){
		console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
		//this.paramModel.comboVal = data.newValue;
	}
	//콤보박스 변경 이벤트
	onChangeComboBoxClsNo1(data){
		console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
		this.paramModel.clsNo1 = data.newValue;
	}
	//콤보박스 변경 이벤트
	onChangeComboBoxClsNo2(data){
		console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
		this.paramModel.clsNo2 = data.newValue;
	}
	//콤보박스 변경 이벤트
	onChangeComboBoxDanPumNo(data){
		console.log(`newValue : ${data.newValue} / oldValue : ${data.oldValue}`);
		this.paramModel.danPumNo = data.newValue;
	}
}