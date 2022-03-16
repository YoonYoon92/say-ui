declare var Ext: any;
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountInput } from './shared/account.model';
import { AccountService } from './shared/account.service';
import { Router } from '@angular/router';
import { EnvService, ResponseModel } from '../shared/env.service';
import { ExtLabelComponent } from '@sencha/ext-angular-modern/src/ExtLabel';


@Component({
	selector: 'account',
	templateUrl: './account.component.html',
	providers: [AccountService],
})
export class AccountComponent implements OnInit {

	public accountInput: AccountInput = <AccountInput>{};

	constructor(private accountService: AccountService, private router: Router, public envService: EnvService ) { }
	ngOnInit() {
		//this.envService.account.storeCode = "";
		//this.envService.account.storeName = "";
      	this.envService.progData = "";
	}
	//13==엔터값
	keyUpEvent = (event) =>{
		if(event.e.keyCode == '13'){
				this.accountService.selectAccount(this.accountInput).subscribe(
					(res: any) => { //1-성공시
						let responseModel: ResponseModel = res;
						if(responseModel.code === '000') {							
							console.log(responseModel);
							this.envService.account = responseModel.data;
							if(responseModel.data.userId==responseModel.data.userPw){
								this.getEnvProgList();
							} else {
								this.getProgList();
							}
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
				this.accountService.insertlog(this.accountInput).subscribe(
					(res: any) => {
					console.log('---------------------------------');
					console.log(this.accountInput);
					},
					(err: HttpErrorResponse) => {
					}
				);
			}
	 }
	 
	accountLogin =(event) =>{
				
		this.accountService.selectAccount(this.accountInput).subscribe(
			(res: any) => { //1-성공시
				let responseModel: ResponseModel = res;
				if(responseModel.code === '000') {							
					console.log(responseModel);
					this.envService.account = responseModel.data;
					if(responseModel.data.userId==responseModel.data.userPw){
						this.getEnvProgList();
					} else {
						this.getProgList();
					}
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
		
		this.accountService.insertlog(this.accountInput).subscribe(
			(res: any) => {
			console.log('---------------------------------');
			console.log(this.accountInput);
			},
			(err: HttpErrorResponse) => {
			}
		);
		
	}

	//프로그램 목록 조회
	getEnvProgList = () =>{
		console.log(this.envService.account);
		this.envService.selectCommEnvProgList(this.envService.account).subscribe(
		  (res: any) => {
			//   if(this.envService.account.userAuth === 'S')
			//   {
				  this.envService.progData = {
					children : res
				};
			//   }
				this.router.navigate(['index']);
			},
			(err: HttpErrorResponse) => {
				console.log(err);
				if (err.error instanceof Error) {
					console.log('An error occurred:', err.error.message);
				} else {
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
		);
	}
	
	// getEnvProgList = () =>{this.envService.envMenu
	// 		this.router.navigate(['index']);}
		
	
	//프로그램 목록 조회
	getProgList = () =>{
		console.log(this.envService.account);
		this.envService.selectCommProgList(this.envService.account).subscribe(
		  (res: any) => {
			//    if(this.envService.account.userAuth === 'S')
		  	// 		{
			//	 	res.push(this.envService.adminMenu);
				//	res.push(this.envService.devMenu);
			// 		}	
			console.log(res);
				//운영용
				this.envService.progData = {
					children : res
				};
				this.router.navigate(['index']);
			},
			(err: HttpErrorResponse) => {
				console.log(err);
				if (err.error instanceof Error) {
					console.log('An error occurred:', err.error.message);
				} else {
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
		);
	}

	//ID 변경 이벤트
	onChangeId(data){
		// console.log(data);
		this.accountInput.userId = data.newValue;
	}

	//Password 변경 이벤트
	onChangePassword(data){
		// console.log(data);
		this.accountInput.userPw= data.newValue;
	}
}
