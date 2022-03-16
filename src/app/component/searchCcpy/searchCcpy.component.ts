/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import { SearchCcpy } from './shared/searchCcpy.model';
import { SearchCcpyService } from './shared/searchCcpy.service';
import { EnvService, ResponseModel } from '../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchCcpyParam } from './shared/searchCcpyParam.model';

@Component({
	selector: 'app-searchCcpy',
	templateUrl: './searchCcpy.component.html',
	providers: [SearchCcpyService],
	styleUrls: ['./searchCcpy.component.css'],
})
export class SearchCcpyComponent implements OnInit {

	@Input() public route: any;
	@Input() public isDialogShowing:boolean = false;
	@Input() public searchCcpyParamModel: SearchCcpyParam = <SearchCcpyParam> {};
	@Output() public sendObject: any = new EventEmitter();
	@Output() public closeCcpy = new EventEmitter();

	isPhone:boolean = Ext.os.is.Phone;

	storeCd : string;

	//param model
	public searchCcpyModel: SearchCcpy = <SearchCcpy>{};

	//grid select model
	public gridSearchCcpyModel: SearchCcpy = <SearchCcpy>{};

	//grid store
	gridSearchCcpyStore = new Ext.data.Store({});

	searchValue = new Ext.create('Ext.field.Search',{label:'Search:', value: 'query'});

	public searchCcpy: any = null;

	public ccpyCd : string;


	constructor(private searchCcpyService: SearchCcpyService, public envService: EnvService, private cd: ChangeDetectorRef ) {}


    renderSign = (value, record) => {	
		
		if (record.get('division') == "달성율" || record.get('division') == "신장율"||record.get('division') == "구성비") {
			var formattedValue = Ext.util.Format.number(value, '000.00 %');
		} else if(record.get('division') == "고객수") {
			var formattedValue = Ext.util.Format.number(value, '0,000');
		} else {			
			var formattedValue = Ext.util.Format.number(value/1000, '0,000');
		}

		var col = '';
		var backCol = '';
		if (value > 0) { col = 'black'; }
		else if (value < 0) { col = 'red'; }

		const result = `<span style='color:${col}'>${formattedValue}</span>`;
		return result;
	}

	renderSignCustom = (value, record) => {	
		
		if (record.get('division') == "구성비" ) {
			const result = null; 
			return result;
		} else {
			var formattedValue = Ext.util.Format.number(value, '0,000');
			var col = '';
			var backCol = '';
			if (value > 0) { col = 'black'; }
			else if (value < 0) { col = 'red'; }

			const result = `<span style='color:${col}'>${formattedValue}</span>`;
			return result;
		}
		
		
	}


	ngOnInit() {
		this.searchCcpyParamModel.jum =this.storeCd;
	}


	query:string = "";
	search = (event) => {
		console.log("In search : " + event.newValue);
		this.query = event.newValue;
	}
	

	//grid ready
	gridCmp : any;
	onReadyGrid(event){
		this.gridCmp = event.cmp;
	}


	showDialog = () => {
		this.isDialogShowing = true;
		this.cd.detectChanges();
	}
	
	onOk = () => {
		this.isDialogShowing = false;
		this.cd.detectChanges();
		this.closeCcpy.emit();	
	}

    onCancel = () => {
		this.isDialogShowing = false;
		this.cd.detectChanges();
		this.closeCcpy.emit();	
	}

	onHide = () => {
		this.isDialogShowing = false;
		this.cd.detectChanges();
		this.closeCcpy.emit();	
	}
	
	onChange = (event) => {
		console.log("In search : " + event.newValue);
		this.query = event.newValue;
		this.searchCcpyParamModel.searchCcpy = event.newValue;
	}

	onClick = (event) => {
		console.log("on Click event : " + event.newValue);
		this.isDialogShowing = true;
		this.cd.detectChanges();
	}

	ccpySearch = ({sender,event}) => {
		console.log("jum" + this.searchCcpyParamModel.jum);
		console.log("searchCcpy" + this.searchCcpyParamModel.searchCcpy);
		
		this.searchCcpyService.selectSearchCcpy(this.searchCcpyParamModel).subscribe(
			(res: any) => { //1-성공시
				/**
				 * @success
				 */
				let responseModel: ResponseModel = res;
				if(responseModel.code === '000') {							
					console.log(responseModel);
					this.searchCcpyModel=responseModel.data;
					this.gridSearchCcpyStore.setData(this.searchCcpyModel);				
					this.gridCmp.setMasked(false);
				} else {
					console.log(responseModel);
					Ext.Msg.alert('Error!!', responseModel.message);
				}

			  },
			  (err: HttpErrorResponse) => { //1-오류시
                console.log(err);
                if (err.error instanceof Error) {
                    console.log('An error occurred:', err.error.message);
                } else {
                    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                }
            }
		 );
	}

	//grid row 선택 이벤트
	onSelectGrid(row){
		//row 데이터 model 바인딩

		this.sendObject.emit(row.selected[0].data);
		this.isDialogShowing = false;
		this.cd.detectChanges();
		this.closeCcpy.emit();
	}

}