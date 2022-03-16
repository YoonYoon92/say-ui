import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-content-routing',
    template: ``,
})
export class ContentRoutingComponent implements OnInit {
    @Input() public route: any;

    constructor(private router: Router, private ar: ActivatedRoute) { }

    ngOnInit() {
        if (this.route === undefined) {
            console.log('%c route => ', 'background: #222; color: red', 'undefined');
        } else {
            console.log('%c route => ', 'background: #222; color: red', this.route);
            //this.router.navigate([this.route], { relativeTo: this.ar });
        }
    }
}
