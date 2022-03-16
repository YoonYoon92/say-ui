/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { OrgnztInq } from './shared/OrgnztInq.model';
import { OrgnztInqService } from './shared/OrgnztInq.service';
import { EnvService } from '../../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ExtHiddenfieldComponent } from '@sencha/ext-angular-modern/src/ExtHiddenfield';
import { ExtComboboxComponent } from '@sencha/ext-angular-modern/src/ExtCombobox';

@Component({
	selector: 'app-OrgnztInq',
	templateUrl: './OrgnztInq.component.html',
	providers: [OrgnztInqService],
})
export class OrgnztInqComponent implements OnInit {

	@Input() public route: any;

	//param model
	public paramModel: OrgnztInq = <OrgnztInq>{};

	//grid select model
	public gridModel: OrgnztInq = <OrgnztInq>{};

    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: OrgnztInq = <OrgnztInq>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: OrgnztInq = <OrgnztInq>{};

    //팀
    public comboStoreLv3: any = null;
	public comboStoreLv3Model: OrgnztInq = <OrgnztInq>{};
	//세분류
	 public comboStoreLv4: any = null;
	 public comboStoreLv4Model: OrgnztInq = <OrgnztInq>{};
	 //존체크
	 public zoneCheck: any;
	 public ZoneStore: any = null;
	public ZoneStoreModel: OrgnztInq = <OrgnztInq>{};
	//재사용가능코너
	public recycleCheck: any;
	public recycleStore: any = null;
   public recycleStoreModel: OrgnztInq = <OrgnztInq>{};
	//타이틀
	public title: any = null;
	public title1: any = null;
	public orgStore: any ;
	//grid store
	gridStore = new Ext.data.Store({});
	ZoneShowing:any ;
	recycleCheckShowing:any ;
	zoneCheckShowing:any ;


	constructor(private OrgnztInqService: OrgnztInqService, public envService: EnvService ) { }
	ngOnInit() { 
       //점 콤보박스 셋팅
       this.baseStoreCombo()
		this.zoneCheck='N'
		this.recycleCheck='N'
	}



	//grid row 선택 이벤트
	onSelectGrid(row){
		//row 데이터 model 바인딩
		this.gridModel = row.selected[0].data;
	}
	onZoneShowing(event){						//컬럼 변수로 지정
		this.ZoneShowing = event.cmp;
	}
	onZoneCheckShowing(event){					//컬럼 변수로 지정
		this.zoneCheckShowing = event.cmp;
	}
	onRecycleShowing(event){					//컬럼 변수로 지정
		this.recycleCheckShowing = event.cmp;
	}

	//grid ready
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}
	recycleCheckbox(event){
		if (event.newValue==true){
			this.recycleCheck='Y'
			this.zoneCheckShowing.reset();
			console.log("recylce:"+this.recycleCheck)
			console.log("zonechk:"+this.zoneCheck)
		}
		else if (event.newValue==false){
			this.recycleCheck='N'
		}
	}

	zoneCheckbox(event){
		if (event.newValue==true){
			this.zoneCheck='Y'
			this.ZoneShowing.show(true);	
			this.recycleCheckShowing.reset();
			console.log("recylce:"+this.recycleCheck)
			console.log("zonechk:"+this.zoneCheck)
		
	  
		}
		else if (event.newValue==false){
				this.zoneCheck='N'
				this.ZoneShowing.hide(true);	
				
		}
		console.log(this.zoneCheck);
	}

		//존 콤보박스 선택 이벤트
		zoneStoreEvent = (data) =>{
			this.paramModel.zone = data.newValue;
			console.log(this.paramModel);
			 
		}
	//조회 버튼 이벤트
	onTapQuery(event){
		console.log(this.paramModel);
		console.log(this.recycleCheck);
		console.log(this.zoneCheck);
		if (this.recycleCheck=='N'){
			if (this.paramModel.jum ==null ||this.paramModel.jum =='' ){
				//Ext.Msg.alert('Error!!', '점을 선택하셔야됩니다.');   
				this.title=['점']
					this.title1=['점코드','점명','사업자번호','대표자명','주소']
			}
			//-------------------------------------------존체크안했을때--------------------------------
			//-------------------------------------------점포만선택--------------------------------
			if (this.paramModel.jum!=''
				&&(this.paramModel.bu==''||this.paramModel.bu==null)
				&&(this.paramModel.tim==''||this.paramModel.tim==null)
				&&(this.paramModel.pc==''||this.paramModel.pc==null)&&this.zoneCheck=='N'
				)
			{
					console.log(this.paramModel);
					this.title=['점포']
					this.title1=['부서코드','부서명','팀','PC','코너','총평수','직영','판촉','삭제일']
			}
			//-------------------------------------------부서선택--------------------------------
			else if(this.paramModel.jum!=''
			&&(this.paramModel.bu!=''||this.paramModel.bu!=null)
			&&(this.paramModel.tim==''||this.paramModel.tim==null)
			&&(this.paramModel.pc==''||this.paramModel.pc==null)&&this.zoneCheck=='N'
			)
			{
			this.title=['부서']
			this.title1=['팀코드','팀명','팀내부코드','PC','코너','총평수','직영','판촉','삭제일']
			}
			//-------------------------------------------팀선택--------------------------------
			else if(this.paramModel.jum!=''
			&&(this.paramModel.bu!=''||this.paramModel.bu!=null)
			&&(this.paramModel.tim!=''||this.paramModel.tim!=null)
			&&(this.paramModel.pc==''||this.paramModel.pc==null)&&this.zoneCheck=='N'
			)
			{
				this.title=['팀']
				this.title1=['세분류코드','세분류명','직영','판촉','평수','층','팀장명','폐기일']
			}
			//-------------------------------------------세분류선택--------------------------------
			else if(this.paramModel.jum!=''
			&&(this.paramModel.bu!=''||this.paramModel.bu!=null)
			&&(this.paramModel.tim!=''||this.paramModel.tim!=null)
			&&(this.paramModel.pc!==''||this.paramModel.pc!==null)&&this.zoneCheck=='N'
			)
			{
				this.title=['코너']
				this.title1=['코너번호','코너명','존','직영','판촉','평수','평가대상','폐기일']
			}
			//-------------------------------------------존체크했을때--------------------------------
			else if(this.zoneCheck=='Y' && (this.paramModel.zone==null||this.paramModel.zone==''))
			{
				this.title=['존']
				this.title1=['존코드','존명','p/c번호','직영','판촉','전용','공유']
			}
			//-------------------------------------------존체크+존선택했을때--------------------------------
			else if(this.zoneCheck=='Y' && (this.paramModel.zone!=null||this.paramModel.zone!=''))
			{
				this.title=['코너']
				this.title1=['코너번호','코너명','존','직영','판촉','평수','평가대상','폐기일']
			}
		//존체크=N일경우
		if(this.zoneCheck=='N'){
		this.OrgnztInqService.selectOrgnztInqList(this.paramModel).subscribe(
			(res: any) => {
				/**
				 * @success
				 */
				this.orgStore=res;
				console.log(res);
				console.log(this.orgStore);
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
		//존체크=Y일경우
		else if(this.zoneCheck=='Y'){
			this.OrgnztInqService.zoneStoreList(this.paramModel).subscribe(
				(res: any) => {
					/**
					 * @success
					 */
					this.orgStore=res;
					console.log(res);
					console.log(this.orgStore);
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
	if (this.recycleCheck=='Y'){
		if (this.paramModel.pc ==null ||this.paramModel.pc =='' ){
			Ext.Msg.alert('Error!!','팀을 선택하셔야됩니다.');   
		}
		else if(this.paramModel.jum!=''
			)
			{
				this.title=['재사용가능코너']
				this.title1=['코너번호','코너명','등록일자','폐기일자','클래스 개수','마진변경 횟수']
				this.OrgnztInqService.recycleStoreList(this.paramModel).subscribe(
					(res: any) => {
						/**
						 * @success
						 */
						this.orgStore=res;
						console.log(res);
						console.log(this.orgStore);
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

   





	//엑셀 버튼 이벤트
	onTapExcel(event){
		this.OrgnztInqService.excelOrgnztInq(this.paramModel).subscribe(
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
		this.OrgnztInqService.helpOrgnztInq(this.paramModel).subscribe(
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
    //조직(점) 기본 셋팅
	 baseStoreCombo = () =>{
		// this.paramModel.jum = '01';	
		// this.comboStoreLv1Model.paramLvCd = '01';
		
	    this.envService.selectStoreComboLv1List(this.comboStoreLv1Model).subscribe(
		    (res: any) => {
		    this.comboStoreLv1 = res;
		    },
		    (err: HttpErrorResponse) => {
		        Ext.Msg.alert('Error!!', 'Server communication error.');
		    }
		);

		// this.comboStoreLv2Model.paramLvCd = '01';
		// this.envService.selectStoreComboLv2List(this.comboStoreLv2Model).subscribe(
		//     (res: any) => {
		// 	this.comboStoreLv2 = res;
		// },
		//     (err: HttpErrorResponse) => {
		//         Ext.Msg.alert('Error!!', 'Server communication error.');
		//     }
	    // );
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
		this.ZoneStoreModel.bu = data.newValue;
		console.log(this.ZoneStoreModel);
		this.OrgnztInqService.selectzoneStoreList(this.ZoneStoreModel).subscribe(
		   (res: any) => {
			   //조직(팀) data set
			   this.ZoneStore = res;
			   console.log(this.ZoneStore);
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
	   this.comboStoreLv4Model.paramLvCd = data.newValue;
	   this.envService.selectStoreComboLv4List(this.comboStoreLv4Model).subscribe(
		   (res: any) => {
			   //조직(팀) data set
			   this.comboStoreLv4 = res;
		   },
		   (err: HttpErrorResponse) => {
			   Ext.Msg.alert('Error!!', 'Server communication error.');
		   }
	   );
	   this.ZoneStoreModel.tim = data.newValue;
		console.log(this.ZoneStoreModel);
		this.OrgnztInqService.selectzoneStoreList(this.ZoneStoreModel).subscribe(
		   (res: any) => {
			   //조직(팀) data set
			   this.ZoneStore = res;
			   console.log(this.ZoneStore);
		   },
		   (err: HttpErrorResponse) => {
			   Ext.Msg.alert('Error!!', 'Server communication error.');
		   }
	   );
   }

      //팀 콤보박스 선택 이벤트
	  comboStoreLv4Event = (data) =>{
		this.paramModel.pc = data.newValue;	
		this.ZoneStoreModel.pc = data.newValue;
		console.log(this.ZoneStoreModel);
		this.OrgnztInqService.selectzoneStoreList(this.ZoneStoreModel).subscribe(
		   (res: any) => {
			   //조직(팀) data set
			   this.ZoneStore = res;
			   console.log(this.ZoneStore);
		   },
		   (err: HttpErrorResponse) => {
			   Ext.Msg.alert('Error!!', 'Server communication error.');
		   }
	   );
	}

   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }
}