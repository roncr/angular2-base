import { Component } from 'angular2/core';

@Component({
    selector: 'my-app',
    template: '<div>Yay! {{title}} works!</div>'
})
export class AppComponent {
    public title  = 'Angular2';

    constructor() {
        console.log('AppComponent');
    }
}
