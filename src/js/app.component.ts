import { Component } from 'angular2/core';

@Component({
    selector: 'app',
    template: '<div>Yay! {{title}} works!</div>'
})
export class AppComponent {
    public title  = 'Angular2';
}
