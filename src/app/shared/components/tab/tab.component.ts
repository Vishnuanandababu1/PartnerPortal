// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-tab',
//   standalone: true,
//   imports: [],
//   templateUrl: './tab.component.html',
//   styleUrl: './tab.component.scss'
// })
// export class TabComponent {

// }


import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { TabContentDirective } from '../../directives/tab-content.directive';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements AfterContentInit {
  @ContentChildren(TabContentDirective) tabsContent!: QueryList<TabContentDirective>;
  @Input() customClass!: string;
  @Input() multiple: boolean = false;
  @Input() openall: boolean = false; 

  tabs: { title: string, content: TemplateRef<any> }[] = [];
  activeTabIndex: number = 0;

  ngAfterContentInit(): void {
    this.tabs = this.tabsContent.map(tab => ({
      title: tab.title,
      content: tab.template
    }));

    if (this.openall && this.tabs.length > 0) {
      this.activeTabIndex = 0; 
    }
  }

  selectTab(index: number): void {
    this.activeTabIndex = index;
  }
}
