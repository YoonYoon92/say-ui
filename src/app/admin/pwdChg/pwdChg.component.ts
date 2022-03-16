/**
* 생성자       : '' 	생성일 : '' 
* 수정자 	    : ''	수정일 : '' 
* @수정내용     : '' 
*/

declare var Ext: any;
import { Component, OnInit, Input } from '@angular/core';
import { PwdChg } from './shared/pwdChg.model';
import { PwdChgService } from './shared/pwdChg.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EnvService, ResponseModel } from '../../shared/env.service';
import { Router } from '@angular/router';
import { env } from 'process';


@Component({
	selector: 'app-pwdChg',
	templateUrl: './pwdChg.component.html',
	providers: [PwdChgService],
})
export class PwdChgComponent implements OnInit {

	@Input() public route: any;

	constructor(private pwdChgService: PwdChgService, private router: Router, public envService: EnvService ) { }
	ngOnInit() {
		//this.envService.account.storeCode = "";
		//this.envService.account.storeName = "";
      	//this.envService.progData = "";
	}

	//param model
	public paramModel: PwdChg = <PwdChg>{};


	//fild disabled
	public isDisabled : boolean = true;

	//Fieldset padding
	public padding : string = '15px';


   //Title 버튼 이벤트
   onTitleTap(event){
       Ext.Msg.alert("확인", this.route.text + " : " + this.route.id);
   }

   	//기존 비밀번호 입력 이벤트
	onChangePassword0(data){
		//console.log(data);
		this.paramModel.password= data.newValue;		
	}

   	//새 비밀번호 입력 이벤트
	onChangePassword1(data){
		//console.log(data);
		this.paramModel.chgPw= data.newValue;		
	}

   	//새 비밀번호확인 입력 이벤트
	   onChangePassword2(data2){
		//console.log(data);
	   	this.paramModel.chgPw2= data2.newValue;		
   }	   

	//로그인
	passwordSave =(event) =>{
		console.log('saveButton Event Start');
		this.paramModel.userId=this.envService.account.userId;

		if(this.paramModel.userId == this.paramModel.chgPw){
			Ext.Msg.alert('입력 오류', '비밀번호는 아이디와 같을 수 없습니다.');
		}
		else if(this.paramModel.chgPw == this.paramModel.chgPw2){
			//정상
			console.log(this.envService.account.userId);
			this.pwdChgService.updatePwdChg(this.paramModel).subscribe(
				(res: any) => { //1-성공시
					if(res == '1'){
						Ext.Msg.alert('변경 완료', '변경 되었습니다. 다시 로그인 해주세요');
						this.router.navigate(['account']);
						//Ext.Msg.confirm("변경 완료", "변경 되었습니다. 다시 로그인 해주세요", this.onConfirmResult.bind(this));
					}
					else{
						Ext.Msg.alert('비밀번호 오류', '기존 비밀번호가 다릅니다. 다시 입력하세요');
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
		else{
			//입력한 패스워드가 다릅니다
			console.log(this.paramModel.chgPw + '///' + this.paramModel.chgPw2);			
			Ext.Msg.alert('Error!!', '입력 비밀번호를 다시 확인해 주세요.');
		}		

				

	}
	


	//로그아웃 이벤트
	onConfirmResult(buttonId, value, opt) {

		if( buttonId == 'yes' ){
		  
		  this.router.navigate(['account']);
		}
	
		// Ext.toast(`User clicked ${buttonId} button.`);
	  }



}