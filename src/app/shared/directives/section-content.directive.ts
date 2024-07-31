import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[sectionContent]'
})
export class SectionContentDirective {
    @Input() title!: string;

    constructor(public template: TemplateRef<any>) { }
}
