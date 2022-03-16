declare var Ext: any;
declare var $: JQuery | any;

import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Index } from './shared/index.model';
import { IndexService } from './shared/index.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { VERSION } from "@angular/core";
import { EnvService } from '../shared/env.service';
import { AccountInput } from '../account/shared/account.model';
import { TabComponents } from './shared/tab-components';

Ext.require([
  'Ext.MessageBox'
]);

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [IndexService],
})
export class IndexComponent implements OnInit {

  @Input() public route: any;

  isCollapse: boolean = true;

  public nowMenuNode: any;  //마지막에 선택한 메뉴 node 정보

  //tree store
  public treeStore: any;

  //tab 메뉴 컴포넌트
  private tabComponents: TabComponents = new TabComponents();

  onTabSetting(event){
    this.isCollapse = !this.isCollapse;
  }

  constructor(private router: Router, private ar: ActivatedRoute, private indexService: IndexService, public envService: EnvService, private changeDetectorRef: ChangeDetectorRef) {
    /* 접속자 정보가 없으면 로그인 화면으로 이동 로그인 만들어지면 주석 해제*/
    //  if( this.envService.account.userCode == null || this.envService.progData == null ) this.router.navigate(['account']);
    if( this.envService.progData == null ) this.router.navigate(['account']);

  }
  ngOnInit() {

    //tree menu create
    this.treeStore = new Ext.data.TreeStore({
      root: this.envService.progData
    });

    //뒤로가기 막기
    history.pushState(null, null, location.href);
      window.onpopstate = function () {
        Ext.toast('뒤로가기는 지원하지 않습니다.');
        history.go(1);
    };

    //새로고침 막기
    $(function () {  
      $(document).keydown(function (e) {  
        if (e.which === 116) {
          if (typeof event == "object") {
            e.keyCode = 0;
          }
            Ext.toast('새로고침은 지원하지 않습니다.');
            return false;
          }else if (e.which === 82 && e.ctrlKey) {
            Ext.toast('새로고침은 지원하지 않습니다.');
            return false;
          }
      });  
    }); 
   
  }

  //메뉴 선택 이벤트
  selectionchangeNavTreeList(event) {
    let node = event.record;
    this.viewMenuController(node.data);
    
    if(node.data.leaf == true) {
      //프로그램 heating count add
      this.envService.updateHitCount(node.data).subscribe(
        (res: any) => { //1-성공시				
        },
        (err: HttpErrorResponse) => { //1-오류시                
        }
      );
    }
  }

  //선택된 메뉴 재선택
  onItemClickTreeList(event){
    let node = event.info.node;
    this.viewMenuController(node.data);
    
 
  }

  //메뉴 표시 제어
  viewMenuController(node){
    this.nowMenuNode = node;
    if( this.envService.Setting.view === 'tab' ){
      //tab 메뉴 생성
      if( node.leaf ) this.createTabMenu(node);
    }else{
      this.router.navigate([node.id], { relativeTo: this.ar });
    }
  }

  /**
   * 메뉴 표시 이벤트
   */
  hideAppMenu: boolean = false;
  toggleAppMenu(event){
    this.hideAppMenu = !this.hideAppMenu;
  };

    /**
   * tab compnent
   */
  tabPanel: any;
  tabPanelReady(event) {
    this.tabPanel = event.cmp;
  }

  /**
   * 탭 선택
   */
  tabPanelAdded(event) {
    if (this.tabPanel != undefined) {
      this.tabPanel.setActiveItem(this.tabs.indexOf(this.tabs.length - 1));
    }
  }

  //tab menu 생성
  public tabs: Array<any> = new Array<any>();
  createTabMenu(node) {

    //선택한 메뉴가 정의되어 있는 메뉴인지 확인
    let isSame = false;
    for(let check in this.tabComponents.tabzList){
      if( this.tabComponents.tabzList[check].id == node.id ){
        isSame = true;
        break;
      }
    }

    if( isSame ){
      let isAdd = true; //[true] 탭추가, [false]탭추가 x
      for (let i = 0; i < this.tabs.length; i++) {

        //이미 탭에 생성 되어 있는 메뉴니까 해당 탭만 활성화 시킴
        if( this.tabs[i].id == node.id ){
          isAdd = false;
          this.tabPanel.setActiveItem(i+1);
          break;
        }
      }

      //신규 탭 추가
      if(isAdd){
        this.tabs = [...this.tabs, node];
        this.changeDetectorRef.detectChanges();
        this.tabPanel.setActiveItem(this.tabs.length+1);
      }
    }else{
      Ext.toast('미등록 프로그램입니다<br>전산 담당자에게 문의하세요.');
    }
  }

  /**
   * 탭 닫기
   */
  closeTab(tab, delId) {
    let closeItem = this.tabs.filter(t => t !== tab);
    for (let i = 0; i < this.tabs.length; i++) {

      if( this.tabs[i].id == delId ){
        //tab 페널이 가지고 있을 배열과 내부적으로 가지고 있는 배열에서 닫힌 탭 메뉴를 삭제한다
        closeItem.splice(i,1);
        this.tabs.splice(i, 1);
        this.tabs = closeItem;
        break;
      }
    }
  }

  /**
   * 로그아웃
   */
  onConfirmLogout = () =>{
    Ext.Msg.confirm("확인", "접속을 종료합니다.?", this.onConfirmResult.bind(this));
  }

  onConfirmResult(buttonId, value, opt) {

    if( buttonId == 'yes' ){
      
      this.router.navigate(['account']);
    }

    // Ext.toast(`User clicked ${buttonId} button.`);
  }
  
}
