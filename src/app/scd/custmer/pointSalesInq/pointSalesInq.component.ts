/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { PointSalesInq } from './shared/pointSalesInq.model';
import { PointSalesInqService } from './shared/pointSalesInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
	selector: 'app-pointSalesInq',
	templateUrl: './pointSalesInq.component.html',
	providers: [PointSalesInqService],
})
export class PointSalesInqComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: PointSalesInq = <PointSalesInq>{};

	//grid select model
	public gridModel: PointSalesInq = <PointSalesInq>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: PointSalesInq = <PointSalesInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: PointSalesInq = <PointSalesInq>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: PointSalesInq = <PointSalesInq>{};

	//grid store
	gridStore = new Ext.data.Store({});
	public pointSaleList = new Array();
	public pointInform: PointSalesInq = <PointSalesInq>{};
	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;

	constructor(private pointSalesInqService: PointSalesInqService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date(this.envService.getBeforeDate(30));
		this.endDt = new Date();

		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(this.envService.getBeforeDate(30));
		this.paramModel.endDt 		= this.envService.getDateToString(null);
		this.paramModel.searchDt    =this.envService.getDateToString(null).substr(0,6);
		this.paramModel.searchPoint='';
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

	//년월조회
	onChangesearchDt = (data) =>{
		this.paramModel.searchDt = data.newValue;
		console.log(this.paramModel.searchDt);
	}
	//포인트
	onChangesearchPoint = (data) =>{
		this.paramModel.searchPoint = data.newValue;
		//this.paramModel.searchPoint = data.newValue.substr(0,2)+data.newValue.substr(4,6)+data.newValue.substr(8,1);
		console.log(this.paramModel.searchPoint);
	}

	//grid ready
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}

	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel.searchPoint.length);
		console.log(this.paramModel.searchPoint.substr(10,1));
		
		if(this.paramModel.searchPoint.substr(10,1)=='_'||this.paramModel.searchPoint==''){Ext.Msg.alert('Error!!', '포인트카드를 확인해주세요');}
		else{
			if(this.paramModel.searchDt.length<6){Ext.Msg.alert('Error!!', '조회년월을 확인해주세요');}
			else{
				console.log(this.paramModel);
				this.gridCmp.setMasked({
					xtype: 'loadmask',
					message: 'Loading...'
				});
				this.pointSalesInqService.selectPointSalesInqList(this.paramModel).subscribe(
					(res: any) => {
						/**
						 * @success
						 */
						this.gridStore.setData(res);
						this.gridCmp.setMasked(false);
						this.pointSaleList=[];
						for(let index in this.gridStore.getData().items){
							let checkedItem = {
								stsDiv:this.gridStore.getData().items[index].data.stsDiv,
								pointNm:this.gridStore.getData().items[index].data.pointNm,
								pointScore:this.gridStore.getData().items[index].data.pointScore,
								lostPoint:this.gridStore.getData().items[index].data.lostPoint,
								saleDt:this.gridStore.getData().items[index].data.saleDt,
								saleDiv:this.gridStore.getData().items[index].data.saleDiv,
								posNum:this.gridStore.getData().items[index].data.posNum,
								receipt:this.gridStore.getData().items[index].data.receipt,
								clsNm:this.gridStore.getData().items[index].data.clsNm,
								pointDiv:this.gridStore.getData().items[index].data.pointDiv,
								cardSale:this.gridStore.getData().items[index].data.cardSale,
								cardPoint:this.gridStore.getData().items[index].data.cardPoint,
								cashSale:this.gridStore.getData().items[index].data.cashSale,
								cashPoint:this.gridStore.getData().items[index].data.cashPoint,
								salePoint:this.gridStore.getData().items[index].data.salePoint,
								totPoint:this.gridStore.getData().items[index].data.saltotPointDiv,
								netSale:this.gridStore.getData().items[index].data.netSale,
								saleReturn:this.gridStore.getData().items[index].data.saleReturn,
								saleUpate:this.gridStore.getData().items[index].data.saleUpate
								}
								if(checkedItem.stsDiv=='A'){
									this.pointInform.pointNm=checkedItem.pointNm;
									this.pointInform.pointScore=checkedItem.pointScore;
									this.pointInform.lostPoint=checkedItem.lostPoint;
								}
								else{
									this.pointSaleList.push(checkedItem)
								}
						}
						console.log(this.pointSaleList);
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


   renderPercentCell(value) {
    var format='0,000'
    var formattedValue = Ext.util.Format.number(value, format);
    var color = "";
 
     if (value < 0) {
      color = "red";
    }
      return `
          <span style="color:${color}">
          ${formattedValue}
          </span>
      `
    }


}