import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { SectionContentDirective } from '../../directives/section-content.directive';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements AfterContentInit {
  @ContentChildren(SectionContentDirective) sectionsContent!: QueryList<SectionContentDirective>;
  @Input() multiple: boolean = false; // Renamed input property

  sections: { title: string, content: TemplateRef<any> }[] = [];
  expandedSections: Set<number> = new Set<number>();

  ngAfterContentInit(): void {
    this.sections = this.sectionsContent.map(section => ({
      title: section.title,
      content: section.template
    }));
  }

  toggleSection(index: number): void {
    if (this.multiple) {
      if (this.expandedSections.has(index)) {
        this.expandedSections.delete(index);
      } else {
        this.expandedSections.add(index);
      }
    } else {
      if (this.expandedSections.has(index)) {
        this.expandedSections.delete(index);
      } else {
        this.expandedSections.clear();
        this.expandedSections.add(index);
      }
    }
  }
}
