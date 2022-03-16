/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input,Output,ChangeDetectorRef,EventEmitter} from '@angular/core';
import { SearchReceipt } from './shared/searchReceipt.model';
import { SearchReceiptService } from './shared/searchReceipt.service';
import { EnvService } from '../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-searchReceipt',
	templateUrl: './searchReceipt.component.html',
	providers: [SearchReceiptService],
})
export class SearchReceiptComponent implements OnInit {

	@Input() public route: any;
	@Input() public isDialogShowing:boolean = false;
	@Input() public SearchReceiptModel: SearchReceipt = <SearchReceipt> {};
	@Input() public reccceiptInq: any = new EventEmitter();
	@Output() public sendObject: any = new EventEmitter();
	@Output() public closeReceipt = new EventEmitter();	
	
	public paramModel: SearchReceipt = <SearchReceipt>{};

	//form model
	public formModel: SearchReceipt = <SearchReceipt>{};
	public receiptChk: SearchReceipt = <SearchReceipt>{};
	//grid select model
	public gridModel: SearchReceipt = <SearchReceipt>{};
	public pointModel: SearchReceipt = <SearchReceipt>{};
	public dialog : any;
    //점
    public comboStoreLv1: any = null;
    public comboStoreLv1Model: SearchReceipt = <SearchReceipt>{};

    //부
    public comboStoreLv2: any = null;
    public comboStoreLv2Model: SearchReceipt = <SearchReceipt>{};

    //팀
    public comboStoreLv3: any = null;
    public comboStoreLv3Model: SearchReceipt = <SearchReceipt>{};

	checkReceipt:any ;
	public receiptCheck: any;
	centerGridStore = new Ext.data.Store({});
	allGridStore = new Ext.data.Store({});
	payGridStore = new Ext.data.Store({});
	ItemGridStore = new Ext.data.Store({});
	pointGridStore =new Ext.data.Store({});
	giftGridStore=new Ext.data.Store({});
	eventGridStore=new Ext.data.Store({});

	constructor(private searchReceiptService: SearchReceiptService, public envService: EnvService ,private cd: ChangeDetectorRef ) { }
	ngOnInit() { 
		
	}

	ngOnChanges(){
	
		if(this.isDialogShowing==true)
			{
			this.gridCmp.setMasked({
				xtype: 'loadmask',
				message: 'Loading...'
			});

			this.searchReceiptService.selectSearchReceiptList(this.SearchReceiptModel).subscribe(
				(res: any) => {
					/**
					 * @success
					 */
					this.allGridStore.setData(res);
					console.log("1"+this.allGridStore);
					this.payGridStore=[];
					this.ItemGridStore=[];
					this.pointGridStore=[];
					this.giftGridStore=[];
					this.eventGridStore=[];
					this.pointModel.pointNum='';
					this.pointModel.totPoint='';
					this.pointModel.cashNum='';
					this.pointModel.cashApp='';
					for(let index in this.allGridStore.getData().items){
						console.log("2"+this.allGridStore);
						// if(this.allGridStore.getData().item[index].data.stsDiv=='1')
						let checkedItem = {
							stsDiv:this.allGridStore.getData().items[index].data.stsDiv,
						
							chit:this.allGridStore.getData().items[index].data.chit,
							payDiv:this.allGridStore.getData().items[index].data.payDiv,
							payPrice:this.allGridStore.getData().items[index].data.payPrice,
							cardNo:this.allGridStore.getData().items[index].data.cardNo,
							appNo:this.allGridStore.getData().items[index].data.appNo,
							van:this.allGridStore.getData().items[index].data.van,
							cls:this.allGridStore.getData().items[index].data.cls,
							clsNm:this.allGridStore.getData().items[index].data.clsNm,
							num:this.allGridStore.getData().items[index].data.num,
							price:this.allGridStore.getData().items[index].data.price,
							totPrice:this.allGridStore.getData().items[index].data.totPrice,
							itemDiscount:this.allGridStore.getData().items[index].data.itemDiscount,
							netsales:this.allGridStore.getData().items[index].data.netsales,
							pointNum:this.allGridStore.getData().items[index].data.pointNum,
							totPoint:this.allGridStore.getData().items[index].data.totPoint,
							couponCd:this.allGridStore.getData().items[index].data.couponCd,
							couponNm:this.allGridStore.getData().items[index].data.couponNm,
							couponDiscount:this.allGridStore.getData().items[index].data.couponDiscount,
							cashNum:this.allGridStore.getData().items[index].data.cashNum,
							cashApp:this.allGridStore.getData().items[index].data.cashApp,
							giftNum:this.allGridStore.getData().items[index].data.giftNum,
							giftNm:this.allGridStore.getData().items[index].data.giftNm,
							eventNm:this.allGridStore.getData().items[index].data.eventNm,
							eventCd:this.allGridStore.getData().items[index].data.eventCd,
							eventGiftNm:this.allGridStore.getData().items[index].data.eventGiftNm,
							eventGift:this.allGridStore.getData().items[index].data.eventGift,
							eventAcceptAmount:this.allGridStore.getData().items[index].data.eventAcceptAmount
							
							};
							if(checkedItem.stsDiv=='1'){
							this.ItemGridStore.push(checkedItem);
							}
							else if(checkedItem.stsDiv=='6'){
								this.pointModel.pointNum=checkedItem.pointNum;
								this.pointModel.totPoint=checkedItem.totPoint;
							}
							else if(checkedItem.stsDiv=='K'){
								this.pointGridStore.push(checkedItem);
							}
							else if(checkedItem.stsDiv=='B'){
								this.pointModel.cashNum=checkedItem.cashNum;
								this.pointModel.cashApp=checkedItem.cashApp;
								
							}
							else if(checkedItem.stsDiv=='2'){
								this.giftGridStore.push(checkedItem);
							}
							else if(checkedItem.stsDiv=='E'){
								this.eventGridStore.push(checkedItem);
							}
							else if(checkedItem.stsDiv=='A'){
								this.payGridStore.push(checkedItem);
							}
							console.log(this.eventGridStore);
							
					}
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
	onHide = () => {
		this.isDialogShowing = false;
		this.cd.detectChanges();
		this.closeReceipt.emit();	
	}
	onShow = () => {
		
		console.log("됐다");
	}
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}
	
	onisDialogShowing(event){
		this.dialog = event.cmp;
	}

	onCancel = () => {
		this.isDialogShowing = false;
		this.cd.detectChanges();
		this.closeReceipt.emit();	
	}

	closeSearchReceipt(event){
		this.isDialogShowing = false;
		this.cd.detectChanges();
	}


		
}

