/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import { SearchConer } from './shared/SearchConer.model';
import { SearchConerService } from './shared/SearchConer.service';
import { EnvService, ResponseModel } from '../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchConerParam } from './shared/SearchConerParam.model';

@Component({
	selector: 'app-SearchConer',
	templateUrl: './SearchConer.component.html',
	providers: [SearchConerService],
	styleUrls: ['./SearchConer.component.css'],
})
export class SearchConerComponent implements OnInit {

	@Input() public route: any;
	@Input() public isDialogShowing:boolean = false;
	@Input() public SearchConerParamModel: SearchConerParam = <SearchConerParam> {};
	@Output() public sendObject: any = new EventEmitter();
	@Output() public closeConer = new EventEmitter();	

	isPhone:boolean = Ext.os.is.Phone;

	storeCd : string;

	//param model
	public SearchConerModel: SearchConer = <SearchConer>{};

	//grid select model
	public gridSearchConerModel: SearchConer = <SearchConer>{};

	//grid store
	gridSearchConerStore = new Ext.data.Store({});

	searchValue1 = new Ext.create('Ext.field.Search',{label:'Search:', value: 'query'});

	public SearchConer: any = null;

	public ConerCd : string;


	constructor(private SearchConerService: SearchConerService, public envService: EnvService, private cd: ChangeDetectorRef ) {}


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
		this.SearchConerParamModel.jum =this.storeCd;
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
		this.closeConer.emit();	
	}
	
	onOk = () => {
		this.isDialogShowing = false;
		this.cd.detectChanges();
		this.closeConer.emit();	
	}

    onCancel = () => {
		this.isDialogShowing = false;
		this.cd.detectChanges();
		this.closeConer.emit();	
	
	}

	onHide = () => {
		this.isDialogShowing = false;
		this.cd.detectChanges();
		this.closeConer.emit();	
	}
	
	onChange = (event) => {
		console.log("In search : " + event.newValue);
		this.query = event.newValue;
		this.SearchConerParamModel.searchConer = event.newValue;
	}

	onClick = (event) => {
		console.log("on Click event : " + event.newValue);
		this.isDialogShowing = true;
		this.cd.detectChanges();
	}

	ConerSearch = ({sender,event}) => {
		console.log("jum:" + this.SearchConerParamModel.jum);
		console.log("SearchConer:" + this.SearchConerParamModel.searchConer);
		
		this.SearchConerService.selectSearchConer(this.SearchConerParamModel).subscribe(
			(res: any) => { //1-성공시
				/**
				 * @success
				 */
				let responseModel: ResponseModel = res;
				if(responseModel.code === '000') {							
					console.log(responseModel);
					this.SearchConerModel=responseModel.data;
					this.gridSearchConerStore.setData(this.SearchConerModel);				
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
		this.closeConer.emit();	
	}

}