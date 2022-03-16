/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { NonSalesCornerByPeriodMgt } from './shared/nonSalesCornerByPeriodMgt.model';
import { NonSalesCornerByPeriodMgtList } from './shared/nonSalesCornerByPeriodMgtList.model';
import { NonSalesCornerByPeriodMgtService } from './shared/nonSalesCornerByPeriodMgt.service';
import { EnvService, ResponseModel } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NonSalesCornerByPeriodMgtCornerClosed } from './shared/nonSalesCornerByPeriodMgtCornerClosed.model';

@Component({
	selector: 'app-nonSalesCornerByPeriodMgt',
	templateUrl: './nonSalesCornerByPeriodMgt.component.html',
	providers: [NonSalesCornerByPeriodMgtService],
})
export class NonSalesCornerByPeriodMgtComponent implements OnInit {

	@Input() public route: any;

	storeCd : string;

	public pdfUrl: string;

	public checkedList = new Array();

	//param model
	public paramModel: NonSalesCornerByPeriodMgt = <NonSalesCornerByPeriodMgt>{};
	public paramCornerClosedModel: NonSalesCornerByPeriodMgtCornerClosed = <NonSalesCornerByPeriodMgtCornerClosed>{};

	//grid select model
	public gridModel: NonSalesCornerByPeriodMgtList = <NonSalesCornerByPeriodMgtList>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: NonSalesCornerByPeriodMgt = <NonSalesCornerByPeriodMgt>{};

	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	//코너폐기일
	public cornerClosedDt: any = null;

	showExportSheet: boolean =  false;



	constructor(private nonSalesCornerByPeriodMgtService: NonSalesCornerByPeriodMgtService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date(this.envService.getBeforeDate(30));
		this.endDt = new Date();
		this.storeCd = '01';

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.fromSaleDate 	= this.envService.getDateToString(this.envService.getBeforeDate(30));
		this.paramModel.toSaleDate 		= this.envService.getDateToString(null);
       	//점 콤보박스 셋팅
	   	this.baseStoreCombo()
	   	//시작점 
		this.storeCd = "01";
	
	}

	renderSign = (value, record) => {	
		
		var formattedValue = Ext.util.Format.number(value/1000, '0,000');

		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }

		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	}

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

	//점 초기 01 세팅
	onReadyJum(event){
		this.comboStoreLv1.storeLvCd ='01';
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

	//달력 포멧 한글로 변경
	cornerClosedDayCmp: any;
	onReadyCornerClosedDay(event){
		this.cornerClosedDayCmp = event.cmp;
		this.cornerClosedDayCmp.getPicker().setHeaderFormat('Y년m월d일');
	}

	//시작일 변경 이벤트
	onChangeStartDt(date){
	   //에러체크
	   if(this.envService.getDateToString(date.newDate) > this.paramModel.toSaleDate)
	   {
		  // console.log(date.oldDate);
		  // console.log(this.searchFromDayCmp);
		  this.searchFromDayCmp.setValue(date.oldDate);               
		  Ext.Msg.alert('Error!!', '시작일은 종료일보다 클 수 없습니다');   
	   }   
	   else
	   {         
		  this.paramModel.fromSaleDate = this.envService.getDateToString(date.newDate);
	   }
	   
	}
 
	//종료일 변경 이벤트
	onChangeEndDt(date){
	   //에러체크
	   if(this.envService.getDateToString(date.newDate) < this.paramModel.fromSaleDate)
	   {
		  // console.log(date.oldDate);
		  // console.log(this.searchFromDayCmp);
		  this.searchToDayCmp.setValue(date.oldDate);         
		  Ext.Msg.alert('Error!!', '종료일은 시작일보다 커야 합니다');
	   }
	   else
	   {
		  this.paramModel.toSaleDate = this.envService.getDateToString(date.newDate);
	   }
	}

	//코너폐기일자 변경 이벤트
	onChangeCornerClosedDate(date){
		let today = new Date();

		console.log(this.envService.getDateToString(date.newDate));
		console.log(date);
		//this.cornerClosedDt = date.newDate; 
		//에러체크
		if(date.newDate <=  today || date.newDate == null)
		{
		   this.cornerClosedDayCmp.setValue(date.oldDate); 
		   this.cornerClosedDt = date.oldDate;             
		   Ext.Msg.alert('Error!!', '오늘 이후의 일자를 선택하세요.');   
		}   
		else
		{        
			this.cornerClosedDt = date.newDate; 
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

	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel);
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});

		this.nonSalesCornerByPeriodMgtService.selectNonSalesCornerByPeriodList(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */

				console.log("점:" + this.paramModel.jum);
				console.log('res:'+ res);
				let responseModel: ResponseModel = res;			

				if(responseModel.code === '000') {	
					
					console.log(responseModel);
					this.gridModel=responseModel.data
					this.gridStore.setData(responseModel.data);
					this.gridCmp.setMasked(false);
				} else {
					console.log(responseModel);
					Ext.Msg.alert('Error!!', responseModel.message);
				}
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
	onSelectionChange = (grid, records, selecting, selection) => {

		let checkItem = selection._selected.items;
		console.log(checkItem);

		checkItem.forEach(function(element){
			let checkedItem = {
				jum: this.storeCd,
				cornerNo: element.data.cornorNo,
				cornerClosedDate: this.cornerClosedDate
			};
			console.log(checkedItem);
			this.paramCornerClosedModel.push(checkedItem);
		});
	}

	
  	//코너 폐기 버튼 이벤트
	onTapCornerClosed(event){

		//checkedList array 초기화
		this.checkedList = [];

		//grid의 checked 코너의 갯수 확인
		for(let index in this.gridStore.getData().items) {
			if(this.gridStore.getData().items[index].data.cornerClosed == true) {
				
				let checkedItem = {
					jum : this.gridStore.getData().items[index].data.jumNo,
					cornerNo : this.gridStore.getData().items[index].data.cornerNo,
					cornerClosedDate : this.envService.getDateToString(this.cornerClosedDt),
					updateDate : this.envService.getDateToString(null)
				};

				this.checkedList.push(checkedItem);
				console.log(this.checkedList);
				
			}
		}

		//폐기일자 선택 및 폐기해야할 코너를 체크한 경우 작업이 가능
		if (this.cornerClosedDt == null) {

			/**
						 * @error
						 */
			 Ext.Msg.alert('Error!!', '폐기일자를 선택후 작업을 진행하세요!!');		
	
		} else if(this.gridStore.getData().length <= 0 || this.checkedList.length <= 0) {
			/**
						 * @error
						 */
			 Ext.Msg.alert('Error!!', '폐기해야할 코너를 Check후 작업을 진행하세요!!');
			
		} else {			
			
			Ext.Msg.confirm("코너 폐기", "선택하신 코너를 폐기하시겠습니까?", 
			(e)=>{
				if( e == 'yes' ){
					console.log(this.checkedList);
					this.nonSalesCornerByPeriodMgtService.updateNonSalesCornerClosed(this.checkedList).subscribe(
						(res: any) => {
							/**
							 * @success시 재조회.... 폐기된 코너 조회목록에서 제외하기 위해 재 조회 및 폐기된 코너의 Excel List 생성
							 */
							 
							// 폐기된 코너의 엑셀파일 생성
							this.excelCornerClosed(this.checkedList);

							// 폐기된 코너를 제외한 조회 grid 재생성 
							this.onTapQuery(event);
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
	}

	//폐기코너 엑셀 List
	excelCornerClosed(request:any){
		let url = this.nonSalesCornerByPeriodMgtService.excelNonSalesCornerClosed(request);
  
		let downloadLink = document.createElement('a');
		downloadLink.href = encodeURI(url);
		document.body.appendChild(downloadLink);
		downloadLink.click();
	}

	//PDF 버튼 이벤트
	onTapPdf(event){
		this.pdfUrl = this.nonSalesCornerByPeriodMgtService.pdfNonSalesCornerByPeriod(this.paramModel);		
		
		$('#pdfFrame').attr('src', encodeURI(this.pdfUrl));				//set url
		Ext.getCmp('gridPanel').hide();
     	Ext.getCmp('pdfPanel').show();
		
	}

	//csv 버튼 이벤트
	onTapCsv(event){
		let url = this.nonSalesCornerByPeriodMgtService.csvNonSalesCornerByPeriod(this.paramModel);
  
		let downloadLink = document.createElement('a');
		downloadLink.href = encodeURI(url);
		document.body.appendChild(downloadLink);
		downloadLink.click();
	}

	//엑셀 버튼 이벤트
	onTapExcel(event){
		let url = this.nonSalesCornerByPeriodMgtService.excelNonSalesCornerByPeriod(this.paramModel);
  
		let downloadLink = document.createElement('a');
		downloadLink.href = encodeURI(url);
		document.body.appendChild(downloadLink);
		downloadLink.click();
	}

	//help 버튼 이벤트
	onTapHelp(event){
		let url = this.nonSalesCornerByPeriodMgtService.helpNonSalesCornerByPeriod();

      	window.open(url, '매출 미발생 코너 help');
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
		console.log("점:" + this.paramModel.jum);
	}
   

    //Title 버튼 이벤트
    onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
    }

}