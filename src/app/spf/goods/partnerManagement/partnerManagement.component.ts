/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { PartnerManagement } from './shared/partnerManagement.model';
import { PartnerManagementService } from './shared/partnerManagement.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { timeHours } from 'd3-time';

@Component({
	selector: 'app-partnerManagement',
	templateUrl: './partnerManagement.component.html',
	providers: [PartnerManagementService],
})
export class PartnerManagementComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: PartnerManagement = <PartnerManagement>{};
	public num1 : number;
	public num2 : number;
	public num3 : number;
	public num4 : number;
	public num5 : number;
	public num6 : number;


	public sa1 : number;
	public sa2 : number;
	public sa3 : number;
	public sa4 : number;
	public sa5 : number;
	public sa6 : number;
	public sa7 : number;
	public sa8 : number;
	public sa9 : number;
	public sa10 : number;
	public sa11 : number;
	public sa12 : number;
	public sa13 : number;
	public sa10length : string;
	public sa11check : string;

	//grid select model
	public gridModel: PartnerManagement = <PartnerManagement>{};
	//결과저장 
	public processResult :any =null;
    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: PartnerManagement = <PartnerManagement>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: PartnerManagement = <PartnerManagement>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: PartnerManagement = <PartnerManagement>{};

	//클래스상세
	public detailPartnerModel: PartnerManagement = <PartnerManagement>{};
	public resultDetail: PartnerManagement = <PartnerManagement>{};
	
	//grid store
	gridStore = new Ext.data.Store({});

	//시작일
	public startDt: any = null;

	//종료일
	public endDt: any = null;
	partner:any ;
	public imprestStore : any = [
		{imprest: ' ', imprestNm:'선택안함'},
		{imprest: '1', imprestNm:'1.정육'},
		{imprest: '2', imprestNm:'2.선어'},
		{imprest: '3', imprestNm:'3.청과'},
		{imprest: '4', imprestNm:'4.양곡'},
		{imprest: '5', imprestNm:'5.인삼'},
		
	 ]
	
	 public paymentStore : any = [
		{payment: ' ', paymentNm:'선택안함'},
		{payment: '1', paymentNm:'1.30일마감(일반매입)'},
		{payment: '2', paymentNm:'2.30일마감(특정,수수료)'},
		{payment: '3', paymentNm:'3.15,30일마감(특정,수수료)'},
		{payment: '4', paymentNm:'4.15,30일마감(일반매입)'},
		{payment: '5', paymentNm:'5.수시지불'},
		{payment: '6', paymentNm:'6.10,20,30일마감(일반매입)'},
		{payment: '7', paymentNm:'7.10,20,30일마감(특정,수수료)'},
		
	 ]
	 
	 public areaDivStore : any = [
		{areaDiv: '1', paymentNm:'1.서울,경인'},
		{areaDiv: '2', paymentNm:'2.대전,충청'},
		{areaDiv: '3', paymentNm:'3.기타 지역'},
	 ]

	 
	 public paymentCdStore : any = [
		{paymentCd: '10', paymentCdNm:'1.기간중 매입전액결제'},
		{paymentCd: '20', paymentCdNm:'2.기간중 매입허용범위내 전액결제'},
		{paymentCd: '31', paymentCdNm:'3.잔고의 10%결제'},
		{paymentCd: '32', paymentCdNm:'3.잔고의 20%결제'},
		{paymentCd: '33', paymentCdNm:'3.잔고의 30%결제'},
		{paymentCd: '34', paymentCdNm:'3.잔고의 40%결제'},
		{paymentCd: '35', paymentCdNm:'3.잔고의 50%결제'},
		{paymentCd: '36', paymentCdNm:'3.잔고의 60%결제'},
		{paymentCd: '37', paymentCdNm:'3.잔고의 70%결제'},
		{paymentCd: '38', paymentCdNm:'3.잔고의 80%결제'},
		{paymentCd: '39', paymentCdNm:'3.잔고의 90%결제'},
		
	 ]
	

	 public endCdStore : any = [
		{endCd: '1', endCdNm:'1.반올림'},
		{endCd: '2', endCdNm:'2.절상'},
		{endCd: '3', endCdNm:'3.절하'},
		{endCd: '4', endCdNm:'4.합계반올림'},
		{endCd: '5', endCdNm:'5.합계 절상'},
		{endCd: '6', endCdNm:'6.합계 절하'},	
	 ]

	  public paymentLateCdStore : any = [
		{paymentLateCd: '1', paymentLateCdNm:'1.익익월 5일'},
		{paymentLateCd: '2', paymentLateCdNm:'2.익익월 10일'},
		{paymentLateCd: '5', paymentLateCdNm:'3.익월 10일'},
		{paymentLateCd: '6', paymentLateCdNm:'4.익월 15일'},
		{paymentLateCd: '7', paymentLateCdNm:'5.익월 20일'},
		{paymentLateCd: '8', paymentLateCdNm:'6.익월 25일'},
		{paymentLateCd: '9', paymentLateCdNm:'7.수시'},	
	 ]
	 
	 public calcdivStore : any = [
		{calcdiv: ' ', calcdivNm:'미첨부'},
		{calcdiv: '1', calcdivNm:'1.세금계산서'},
		{calcdiv: '2', calcdivNm:'2.간이계산서'},
		{calcdiv: '3', calcdivNm:'3.수입계산서'},
		
	 ]
	 
	  public billDtStore : any = [
		{billDt: ' ', billDtNm:'없음'},
		{billDt: '01', billDtNm:'45일'},
		{billDt: '02', billDtNm:'60일'},
		{billDt: '03', billDtNm:'90일'},
		{billDt: '04', billDtNm:'105일'},
		{billDt: '05', billDtNm:'40일'},
	 ]
	 public paymentConditionStore : any = [
		{paymentCondition: '00', paymentConditionNm:'1.현금'},
		{paymentCondition: '99', paymentConditionNm:'2.어음'},

	 ]
	 
	  public tradeStopStore : any = [
		{tradeStop: '*', tradeStopNm:'중지'},
		{tradeStop: ' ', tradeStopNm:'정상'},

	 ]

	constructor(private partnerManagementService: PartnerManagementService, public envService: EnvService ) { }
	ngOnInit() { 
		this.startDt = new Date();
		this.endDt = new Date();
		this.paramModel.userId = this.envService.account.userId;
		//조회 모델에 시작일과 종료일 기본값 셋팅
		this.paramModel.startDt 	= this.envService.getDateToString(null);
		this.paramModel.endDt 		= this.envService.getDateToString(null);
		this.paramModel.busiNum=' ';
		this.paramModel.busiNm=' ';
		this.paramModel.owner=' ';
		this.paramModel.jumin=' ';
		this.paramModel.address=' ';
		this.paramModel.addressNm=' ';
		this.paramModel.serviceSect=' ';
		this.paramModel.imprest=' ';
		this.paramModel.manageBu=' ';
		this.paramModel.openDt = ' ';
		this.paramModel.contractDt =' ';
		this.paramModel.bankCd = ' ';
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
	readyPartner(event){
		this.partner = event.cmp
			if(this.partner.substr(4,1)!='')
			{
				this.num1=parseInt(this.partner.substr(0,1));
				this.num2=parseInt(this.partner.substr(1,1));
				this.num3=parseInt(this.partner.substr(2,1));
				this.num4=parseInt(this.partner.substr(3,1));
				this.num5=parseInt(this.partner.substr(4,1));
				this.num6=this.num1+this.num2*3+this.num3*7+this.num4+this.num5*3;
				console.log("num1:"+this.num1);
				console.log("num2:"+this.num2);
				console.log("num3:"+this.num3);
				console.log("num4:"+this.num4);
				console.log("num5:"+this.num5);
				console.log("num6:"+this.num6);

			}
		
	}
	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel);
		this.partnerManagementService.selectPartnerManagement(this.paramModel).subscribe(
			(res: any) => {
				this.resultDetail=res;
				if(this.resultDetail!=null)
				{
					this.detailPartnerModel=this.resultDetail;
					console.log(this.detailPartnerModel);
				}
				console.log(this.detailPartnerModel);

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

    
   //삭제 버튼 이벤트
	onTapDelete(event){
		Ext.Msg.confirm("폐기", "협력업체를 폐기합니다", 
			(e)=>{
				if( e == 'yes' ){
					console.log(this.paramModel);
					this.partnerManagementService.deletePartnerManagement(this.paramModel).subscribe(
						(res: any) => {
							/**
							 * @success
							 */
							 this.processResult=res;

							 if(this.processResult==1){
								Ext.Msg.alert('폐기완료!!','폐기되었습니다.');  
							}
							else{
								Ext.Msg.alert('폐기오류!!','폐기하지 못했습니다.');  
							}
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
		// this.formModel = <PartnerManagement>{};
		// this.isDisabled = false;
	}

	//수정 버튼 이벤트
	onTapModify(event){
		//this.isDisabled = false;
	}

	//저장 버튼 이벤트
	onTapSave(event){
		console.log("사업자번호길이"+this.paramModel.busiNum.length);
		if(this.paramModel.busiNum.length!=10||this.paramModel.busiNum==null){Ext.Msg.alert("error","사업자번호를 확인해주세요");}
		else
		{	this.sa1=parseInt(this.paramModel.busiNum.substr(0,1));
			this.sa2=parseInt(this.paramModel.busiNum.substr(1,1))*3;
			this.sa3=parseInt(this.paramModel.busiNum.substr(2,1))*7;
			this.sa4=parseInt(this.paramModel.busiNum.substr(3,1))
			this.sa5=parseInt(this.paramModel.busiNum.substr(4,1))*3;
			this.sa6=parseInt(this.paramModel.busiNum.substr(5,1))*7;
			this.sa7=parseInt(this.paramModel.busiNum.substr(6,1))
			this.sa8=parseInt(this.paramModel.busiNum.substr(7,1))*3;
			this.sa9=parseInt(this.paramModel.busiNum.substr(8,1))*3;
			this.sa10=parseInt(this.paramModel.busiNum.substr(9,1))*3;
			this.sa11=this.sa1+this.sa2+this.sa3+this.sa4+this.sa5+this.sa6+this.sa7+this.sa8+this.sa9;
			this.sa12=this.sa10%10;
			this.sa13=10-this.sa12;

			if(this.sa12!=this.sa10){Ext.Msg.alert("error","사업자번호를 확인해주세요");}	
			else{
				if(this.paramModel.busiNm==' '){Ext.Msg.alert("error","상호명을 확인해주세요");}
				else{
					if(this.paramModel.owner==' '){Ext.Msg.alert("error","대표자를 확인해주세요");}
					else{
						if(this.paramModel.jumin.length!=13){Ext.Msg.alert("error","법인번호를 확인해주세요");}
						else{
							if(this.paramModel.address.length!=6){Ext.Msg.alert("error","우편번호를 확인해주세요");}
							else{console.log(this.paramModel.address.length);
								if(this.paramModel.addressNm==' '){Ext.Msg.alert("error","우편주소를 확인해주세요");}
								else{console.log(this.paramModel.addressNm);
									if(this.paramModel.serviceSect==' '||this.paramModel.service==' '){Ext.Msg.alert("error","업태,업종을 확인해주세요");}
									else{
										if(this.paramModel.imprest==null){Ext.Msg.alert("error","전도금 거래선을 선택해주세요");}
										else{
											if(this.paramModel.payment==null){Ext.Msg.alert("error","지불방법을 선택해주세요");}
											else{
												if(
													(this.paramModel.partner.substr(0,1)=='1'||this.paramModel.partner.substr(0,1)=='2')
													//1,2,3,4,5,6,7,' '
													&&(this.paramModel.payment=='2'||this.paramModel.payment=='3'||this.paramModel.payment=='5'||this.paramModel.payment=='7'||this.paramModel.payment==' ')
													){Ext.Msg.alert("error","지불방법이 잘못선택됐습니다");}
												else{
													if(
														(this.paramModel.partner.substr(0,1)=='3'||this.paramModel.partner.substr(0,1)=='4'||this.paramModel.partner.substr(0,1)=='5'||this.paramModel.partner.substr(0,1)=='9')
														//1,2,3,4,5,6,7,' '
														&&(this.paramModel.payment=='1'||this.paramModel.payment=='4'||this.paramModel.payment=='5'||this.paramModel.payment=='6'||this.paramModel.payment==' ')
														){Ext.Msg.alert("error","지불방법이 잘못선택됐습니다");}
													else{

														if(this.paramModel.paymentCd==null){Ext.Msg.alert("error","지불산정을 선택해주세요");}
														else{
															if(this.paramModel.paymentLateCd==null){Ext.Msg.alert("error","지불연착을 선택해주세요");}
															else{
																if(this.paramModel.paymentCondition==null){Ext.Msg.alert("error","지급조건을 선택해주세요");}
																else{
																	if(this.paramModel.billDt==null){Ext.Msg.alert("error","어음일자를 선택해주세요");}
																	else{
																		if(this.paramModel.calcdiv==null){Ext.Msg.alert("error","계산서구분을 선택해주세요");}
																		else{
																			if(this.paramModel.endCd==null){Ext.Msg.alert("error","끝전을 선택해주세요");}
																			else{
																				if(this.paramModel.areaDiv==null){Ext.Msg.alert("error","지역구분을 선택해주세요");}
																				else{
																					if(this.paramModel.manageBu==' '){Ext.Msg.alert("error","관리부서를 선택해주세요");}
																					else{
																						if(this.paramModel.tradeStop==null){Ext.Msg.alert("error","거래정지구분을 선택해주세요");}
																						else{
																							console.log(this.paramModel);
																							Ext.Msg.confirm("저장", "데이터를 저장합니다", 
																							(e)=>{
																								if( e == 'yes' ){
																								 
																									this.partnerManagementService.savePartnerManagement(this.paramModel).subscribe(
																										(res: any) => {
																											/**
																											 * @success
																											 */
																											 this.processResult=res;

																											 if(this.processResult==1){
																												Ext.Msg.alert('저장완료!!','추가되었습니다.');  
																											}
																											else if(this.processResult==2){
																												Ext.Msg.alert('저장완료!!','수정되었습니다.');  
																											}
																											else{
																												Ext.Msg.alert('저장오류!!','저장하지 못했습니다.');  
																											}
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
																				}
																			}
																		}
																	}
																}
															}
														}
													}	
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
	
	}

	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.partnerManagementService.excelPartnerManagement(this.paramModel).subscribe(
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

	//레포트 버튼 이벤트
	onTapReport(event){
		this.partnerManagementService.reportPartnerManagement(this.paramModel).subscribe(
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
		this.partnerManagementService.helpPartnerManagement(this.paramModel).subscribe(
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
	   console.log(this.paramModel.jum);
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
   partnerEvent = (data) =>{
	this.paramModel.partner = data.newValue.substr(0,5)+data.newValue.substr(6,1);
	
	console.log(data.newValue)
}
   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }
   imprestEvent = (data) =>{
	if(data!=null){
	this.paramModel.imprest = data.newValue;
	console.log(data.newValue)
		}
	}

	busiNumEvent = (data) =>{
	if(data!=null){
	this.paramModel.busiNum = data.newValue.substr(0,3)+data.newValue.substr(4,2)+data.newValue.substr(7,5);
	console.log(data.newValue)
		}
	}
	juminEvent = (data) =>{
		if(data!=null){
		this.paramModel.jumin = data.newValue.substr(0,6)+data.newValue.substr(8,7);
		console.log(data.newValue)
			}
		}
	ownerEvent = (data) =>{
		if(data!=null){
		this.paramModel.owner = data.newValue;
		console.log(data.newValue)
			}
		}
	busiNmEvent = (data) =>{
		if(data!=null){
		this.paramModel.busiNm = data.newValue;
		console.log(data.newValue)
			}
		}
	addressEvent = (data) =>{
			if(data!=null){
			this.paramModel.address = data.newValue.substr(0,3)+data.newValue.substr(4,3);
			console.log(data.newValue)
				}
			}
	addressNmEvent = (data) =>{
			if(data!=null){
			this.paramModel.addressNm = data.newValue;
			console.log(data.newValue)
				}
			}
	telEvent = (data) =>{
			if(data!=null){
			this.paramModel.tel = data.newValue.substr(0,3)+data.newValue.substr(4,3)+data.newValue.substr(8,4);
			console.log(data.newValue)
				}
			}
	faxEvent = (data) =>{
			if(data!=null){
				this.paramModel.fax = data.newValue.substr(0,4)+data.newValue.substr(5,4);
				this.paramModel.fax=this.paramModel.fax.replace('________',' ');
				}
				console.log(data.newValue)
			}
		
			
	emailEvent = (data) =>{
			if(data!=null){
			this.paramModel.email = data.newValue;
			console.log(data.newValue)
				}
			}

	managerEvent = (data) =>{
			if(data!=null){
			this.paramModel.manager = data.newValue;
			console.log(data.newValue)
				}
		}

	serviceSectEvent = (data) =>{
			if(data!=null){
			this.paramModel.serviceSect = data.newValue;
			console.log(data.newValue)
				}
		}
	
		serviceEvent = (data) =>{
			if(data!=null){
			this.paramModel.service = data.newValue;
			console.log(data.newValue)
				}
		}

		bankCdEvent = (data) =>{
			if(data!=null){
			this.paramModel.bankCd = data.newValue;
			console.log(data.newValue)
				}
				else{
					this.paramModel.bankCd = ' ';
				}
		}
		contractDtEvent = (data) =>{
			if(data!=null){
			this.paramModel.contractDt = data.newValue;
			console.log(data.newValue)
				}
			else{
				this.paramModel.contractDt = ' ';
			}
		}
		openDtEvent = (data) =>{
			if(data!=null){
			this.paramModel.openDt = data.newValue;
			console.log(data.newValue)
				}
				else{
					this.paramModel.openDt = ' ';
				}
		}
		manageBuEvent = (data) =>{
			if(data!=null){
			this.paramModel.manageBu = data.newValue;
			console.log(data.newValue)
				}
		}
		ParterdelDt = (data) =>{
			if(data!=null){
			this.paramModel.ParterdelDt = data.newValue;
			console.log(data.newValue)
				}
		}
	
	
	paymentEvent = (data) =>{
		if(data!=null){
		this.paramModel.payment = data.newValue;
		console.log(data.newValue)
		}
	}
	paymentCdEvent = (data) =>{
		if(data!=null){
		this.paramModel.paymentCd = data.newValue;
		console.log(data.newValue)
		}
	}
	areaDivEvent = (data) =>{
		if(data!=null){
		this.paramModel.areaDiv = data.newValue;
		console.log(data.newValue)
		}
	}
	endCdEvent = (data) =>{
		if(data!=null){
		this.paramModel.endCd = data.newValue;
		console.log(data.newValue)
		}
	}
	paymentLateCdEvent = (data) =>{
		if(data!=null){
		this.paramModel.paymentLateCd = data.newValue;
		console.log(data.newValue)
		}
	}
	calcdivEvent= (data) =>{
		if(data!=null){
		this.paramModel.calcdiv = data.newValue;
		console.log(data.newValue)
		}
	}
	billDtEvent= (data) =>{
		if(data!=null){
		this.paramModel.billDt = data.newValue;
		console.log(data.newValue)
		}
	}
	paymentConditionEvent= (data) =>{
		if(data!=null){
		this.paramModel.paymentCondition = data.newValue;
		console.log(data.newValue)
		}
	}
	tradeStopEvent= (data) =>{
		if(data!=null){
		this.paramModel.tradeStop = data.newValue;
		console.log(data.newValue)
		}
	}

	onTapClear(event){
		this.resultDetail.busiNum='';
		this.resultDetail.busiNm='';
		this.resultDetail.owner='';
		this.resultDetail.jumin='';
		this.resultDetail.address='';
		this.resultDetail.addressNm='';
		this.resultDetail.serviceSect=' ';
		this.resultDetail.service=' ';
		this.resultDetail.fax='';
		this.resultDetail.email='';
		this.resultDetail.tel='';
		this.resultDetail.manager='';
		this.resultDetail.payment='';
		this.resultDetail.paymentCd='';
		this.resultDetail.paymentLateCd='';
		this.resultDetail.paymentCondition='';
		this.resultDetail.calcdiv='';
		this.resultDetail.endCd='';
		this.resultDetail.areaDiv=' ';
		this.resultDetail.contractDt=' ';
		this.resultDetail.openDt='';
		this.resultDetail.manageBu='';
		this.resultDetail.tradeStop=' ';
		this.resultDetail.ParterdelDt='';

		this.paramModel.userId = this.envService.account.userId;
		console.log("resultDetail:"+this.resultDetail);
	}
}
