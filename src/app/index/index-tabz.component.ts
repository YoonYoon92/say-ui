import { Component, OnInit, Input, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    selector: 'app-index-tabz',
    template: `<ng-template #container></ng-template>`
})
export class IndexTabzComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() public node: any;
    @ViewChild('container', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
    private tabComponents: TabComponents = new TabComponents();

    constructor(private router: Router, 
                private ar: ActivatedRoute,
                private _componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
        
    }

    ngOnDestroy() {
    }

    ngAfterViewInit() {
        const tabzItem = this.getTabzItem(this.node);
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(tabzItem.component);
        this.viewContainerRef.clear();
        const componentRef = this.viewContainerRef.createComponent(componentFactory);

        componentRef.instance.route = this.node;
        // Component에 사용 방법
        // @Input() public route: any;
    }

    getTabzItem(node) {
        // console.log('%c route name => ', 'background: #222; color: yellow', route);

        for( let i in this.tabComponents.tabzList ){
            if (this.tabComponents.tabzList[i].id == node.id) {
                return new TabzItem(this.tabComponents.tabzList[i].component, {node: node});
            }
        }

        // return new TabzItem(ContentRoutingComponent, null);

    }
}
