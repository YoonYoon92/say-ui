import { Component, OnInit, Input, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnvService } from '../shared/env.service';

import { TabzItem } from './tabz-item';

/**
 *  해당 위치로 가서 사용할 각 메뉴의 모듈을 import 해야한다 안하면 오류발생
 */
import { TabModules } from './shared/tab-modules';

/**
 * tab 메뉴에 보여질 컴포넌트들 정의
 */
import { TabComponents } from './shared/tab-components';

@Component({
    selector: 'app-index-dashboard',
    template: `<ng-template #container></ng-template>`
})
export class IndexDashboardComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() public node: any;
    @ViewChild('container', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
    private tabComponents: TabComponents = new TabComponents();

    constructor(private router: Router, 
                private ar: ActivatedRoute,
                private _componentFactoryResolver: ComponentFactoryResolver,
                private envService: EnvService ) { 
                    //기본값
                    this.node =  {
                        id: "TypeA"
                        //id: "TypeB"
                      };
                }

    ngOnInit() {}

    ngOnDestroy() {}

    ngAfterViewInit() {
        const dashboardItem = this.getDashboardItem(this.node);
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(dashboardItem.component);
        this.viewContainerRef.clear();
        const componentRef = this.viewContainerRef.createComponent(componentFactory);

        componentRef.instance.route = this.node;
        // Component에 사용 방법
        // @Input() public route: any;
    }

    getDashboardItem(node) {
        // console.log('%c route name => ', 'background: #222; color: yellow', route);

        for( let i in this.tabComponents.dashboardList ){
            if (this.tabComponents.dashboardList[i].id == node.id) {
                return new TabzItem(this.tabComponents.dashboardList[i].component, {node: node});
            }
        }

        // return new TabzItem(ContentRoutingComponent, null);

    }
}