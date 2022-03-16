/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { ConerPlanCntstPerfomSts } from './shared/conerPlanCntstPerfomSts.model';
import { ConerPlanCntstPerfomStsService } from './shared/conerPlanCntstPerfomSts.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-conerPlanCntstPerfomSts',
	templateUrl: './conerPlanCntstPerfomSts.component.html',
	providers: [ConerPlanCntstPerfomStsService],
})
export class ConerPlanCntstPerfomStsComponent implements OnInit {

	@Input() public route: any;

	public pdfUrl: string;

	//param model
	public paramModel: ConerPlanCntstPerfomSts = <ConerPlanCntstPerfomSts>{};

	//grid select model
	public gridModel: ConerPlanCntstPerfomSts = <ConerPlanCntstPerfomSts>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: ConerPlanCntstPerfomSts = <ConerPlanCntstPerfomSts>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: ConerPlanCntstPerfomSts = <ConerPlanCntstPerfomSts>{};

    //팀
    public comboStoreLv3: any = null;
	public comboStoreLv3Model: ConerPlanCntstPerfomSts = <ConerPlanCntstPerfomSts>{};
	
	 //PC
	 public PcListStore: any = null;
	 public PcListStoreModel: ConerPlanCntstPerfomSts = <ConerPlanCntstPerfomSts>{};
  

	//grid store
	gridStore = new Ext.data.Store({});
	public days = [];

	//시작일
	public startDt: any = null;
	public mmDt: any = null;
	public yyDt: any = null;
	//종료일
	public endDt: any = null;

	constructor(private conerPlanCntstPerfomStsService: ConerPlanCntstPerfomStsService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date();
		this.mmDt =new Date();
		this.mmDt.setDate('01');
		this.yyDt=new Date();
		this.yyDt.setMonth('00');
		this.yyDt.setDate('01');
		this.endDt = new Date();

		console.log(this.mmDt);
		console.log(this.yyDt);

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(null);
		this.paramModel.endDt 		= this.envService.getDateToString(null);
		this.paramModel.mmDt		= this.mmDt;
		this.paramModel.yyDt		= this.yyDt;
		this.paramModel.mmDt		= this.envService.getDateToString(this.mmDt);
		this.paramModel.yyDt		= this.envService.getDateToString(this.yyDt);
       //점 콤보박스 셋팅
       this.baseStoreCombo()
	
	}

	//시작일 변경 이벤트	
	onChangeStartDt(date){
		this.paramModel.startDt = this.envService.getDateToString(date.newDate);
		console.log(this.paramModel.startDt)
		this.mmDt=new Date(date.newDate);
		this.mmDt.setDate('01');
		this.yyDt.setDate('01');
		this.paramModel.mmDt=this.envService.getDateToString(this.mmDt);
		console.log(this.paramModel.startDt)
		console.log(this.paramModel.mmDt)
		console.log('변환후')
		this.yyDt.setMonth('00');
		this.yyDt.setDate('01');
		this.paramModel.yyDt=this.envService.getDateToString(this.yyDt);
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

	renderSign = (value, record) => {	
		if (record.get('division') == "달성율"){
			var formattedValue = Ext.util.Format.number(value, '000.00%');
			}
			else{
				var formattedValue = Ext.util.Format.number(value, '0,000');
			}
			var col = '';
			var backCol = '';
			if (value > 0) { col = 'black'; }
			else if (value < 0) { col = 'red'; }
			
	  
			const result =  `<span style='color:${col}'>${formattedValue}</span>`;
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
	//grid ready
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}

	//조회 버튼 이벤트(pdf조회용)
	// onTapQuery(event){
	// 	this.pdfUrl = `http://localhost:8000/api/conerPlanCntstPerfomSts/selectReport?param=${JSON.stringify(this.paramModel)}`;
	// 	console.log(this.pdfUrl);
	// 	$('#pdfFrame').attr('src', encodeURI(this.pdfUrl));				//set url	
	// 	}

    	//조회 버튼 이벤트(화면조회용)
	onTapQuery(event){
		console.log(this.paramModel);
		// Ext.getCmp('pdfpanel').hide();
      	// Ext.getCmp('schpanel').show();
		if (this.paramModel.tim ==null ||this.paramModel.tim =='' ){
				Ext.Msg.alert('Error!!', '팀을 선택하셔야됩니다.');   
		}
		else{
		this.gridCmp.setMasked({
			xtype: 'loadmask',
			message: 'Loading...'
		});
		this.conerPlanCntstPerfomStsService.selectConerPlanCntstPerfomStsList(this.paramModel).subscribe(
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

   




	onTapExcel(event){      
		//let url = `http://localhost:8000/api/report/excel?param=${JSON.stringify(this.paramModel)}`;
		let url = this.conerPlanCntstPerfomStsService.excelConerPlanCntstPerfomSts(this.paramModel);
	     
		console.log(url);
  
		let downloadLink = document.createElement('a');
		downloadLink.href = encodeURI(url);
		document.body.appendChild(downloadLink);
		downloadLink.click();
	 }

	

	//레포트 버튼 이벤트
	onTapReport(event){
		if (this.paramModel.jum ==null ||this.paramModel.jum =='' ){
			Ext.Msg.alert('Error!!', '점을 선택하셔야됩니다.');   
		}
		else 		
		{
		if (this.paramModel.bu ==null ||this.paramModel.bu =='' ){
				Ext.Msg.alert('Error!!', '부을 선택하셔야됩니다.');   
			}
		else{
			if (this.paramModel.tim ==null ||this.paramModel.tim =='' ){
				Ext.Msg.alert('Error!!', '팀을 선택하셔야됩니다.');   
			}
			else{
		//this.pdfUrl = `http://localhost:8000/api/conerPlanCntstPerfomSts/selectReport?param=${JSON.stringify(this.paramModel)}`;
		this.pdfUrl = this.conerPlanCntstPerfomStsService.reportConerPlanCntstPerfomSts(this.paramModel);
		
		console.log(this.pdfUrl);

		$('#pdfFrame').attr('src', encodeURI(this.pdfUrl));				//set url
		Ext.getCmp('pdfpanel').show();
     	 Ext.getCmp('schpanel').hide();
				}
			}
		}
	}
	//도움말 버튼 이벤트
	onTapHelp(event){
		let url = this.conerPlanCntstPerfomStsService.helpConerPlanCntstPerfomSts();
      console.log(url);

      window.open(url, '한글 PDF');
	}

   //조직(점) 기본 셋팅
   public jumComboVal: string;
   baseStoreCombo = () =>{
		this.paramModel.jum = '01';
		this.PcListStoreModel.jum='01';
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
	this.paramModel.serchLevel = 'bu';
	
	
	this.paramModel.tim=null;
	
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
	console.log(this.paramModel);
   }
	PcListStoreEvent = (data) =>{
		this.paramModel.pc = data.newValue;
		console.log(this.paramModel);
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