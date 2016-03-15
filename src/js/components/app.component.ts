import { Component } from 'angular2/core';

@Component({
    selector: 'my-app',
    moduleId: module.id, // commonJS standard
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public title  = 'Angular2';
}
