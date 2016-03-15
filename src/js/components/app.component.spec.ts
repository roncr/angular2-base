import {
    TestComponentBuilder,
    describe,
    expect,
    injectAsync,
    it
} from 'angular2/testing';
import { Component } from 'angular2/core';
import { AppComponent } from './app.component';

export function main() {
    describe('App component', () => {
        it('should work',
            injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
                return tcb.createAsync(TestComponent)
                    .then(() => {
                        expect(1).toEqual(1);
                    });
            }));
    });
}

@Component({
    selector: 'test-cmp',
    directives: [AppComponent],
    template: '<my-app></my-app>'
})
class TestComponent {}
