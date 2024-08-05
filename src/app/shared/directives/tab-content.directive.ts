import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[tabContent]'
})
export class TabContentDirective {
    @Input() title!: string;

    constructor(public template: TemplateRef<any>) { }
}