/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import { SearchClass } from './shared/searchClass.model';
import { SearchClassService } from './shared/searchClass.service';
import { EnvService, ResponseModel } from '../../shared/env.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchClassParam } from './shared/searchClassParam.model';

@Component({
	selector: 'app-searchClass',
	templateUrl: './searchClass.component.html',
	providers: [SearchClassService],
	styleUrls: ['./searchClass.component.css'],
})
export class SearchClassComponent implements OnInit {

	@Input() public route: any;
	@Input() public isDialogShowing:boolean = false;
	@Input() public searchClassParamModel: SearchClassParam = <SearchClassParam> {};
	@Output() public sendObject: any = new EventEmitter();
	@Output() public closeClass = new EventEmitter();

	isPhone:boolean = Ext.os.is.Phone;

	storeCd : string;

	//시작일
	public startDt: any = Date();

	//param model
	public searchClassModel: SearchClass = <SearchClass>{};
	
	//종료일
	public endDt: any = null;


	//grid select model
	public gridSearchClassModel: SearchClass = <SearchClass>{};

	//grid store
	gridSearchClassStore = new Ext.data.Store({});

	searchValue = new Ext.create('Ext.field.Search',{label:'Search:', value: 'query'});

	public searchClass: any = null;

	public classCd : string;


	constructor(private searchClassService: SearchClassService, public envService: EnvService, private cd: ChangeDetectorRef ) {}


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
		this.searchClassParamModel.jum = this.storeCd;
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
		this.closeClass.emit();	
	}
	
	onOk = () => {
		this.isDialogShowing = false;
		this.cd.detectChanges();
		this.closeClass.emit();	
	}

    onCancel = () => {
		this.isDialogShowing = false;
		this.cd.detectChanges();
		this.closeClass.emit();	
	}

	onHide = () => {
		this.isDialogShowing = false;
		this.cd.detectChanges();
		this.closeClass.emit();	
	}
	
	onChange = (event) => {
		console.log("In search : " + event.newValue);
		this.query = event.newValue;
		this.searchClassParamModel.searchClass = event.newValue;
	}

	onClick = (event) => {
		console.log("on Click event : " + event.newValue);
		this.isDialogShowing = true;
		this.cd.detectChanges();
	}

	classSearch = ({sender,event}) => {
		console.log("jum" + this.searchClassParamModel.jum);
		console.log("searchClass" + this.searchClassParamModel.searchClass);
		
		this.searchClassService.selectSearchClass(this.searchClassParamModel).subscribe(
			(res: any) => { //1-성공시
				/**
				 * @success
				 */
				let responseModel: ResponseModel = res;
				if(responseModel.code === '000') {							
					console.log(responseModel);
					this.searchClassModel=responseModel.data;
					this.gridSearchClassStore.setData(this.searchClassModel);				
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
		this.closeClass.emit();	
	}

}