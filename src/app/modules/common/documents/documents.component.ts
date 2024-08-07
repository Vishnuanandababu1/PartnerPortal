import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InputControlComponent } from '../../../shared/controls/input-control/input-control.component';
import { SelectControlComponent } from '../../../shared/controls/select-control/select-control.component';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, InputControlComponent, SelectControlComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent implements OnInit {

  patInfoPreview = false;
  patListAlphaSort = false;
  patListGridView = true;

  documentList = [
    { img: 'https://picsum.photos/200', type: 'Medical Document', name: 'image_processing_2021326778.png', user: 'Nithya Jerome', date: '12/02/2023' },
    { img: 'https://picsum.photos/200', type: 'Medical Document', name: '4a63694c2371828c1e6ac076c1109837.png', user: 'Nithya Jerome', date: '12/02/2023' },
    { img: 'https://picsum.photos/200', type: 'Insurance Document', name: '84b4f6aad38b1a41315cdc3425b1509e.png', user: 'Sajeev Jayakumar', date: '04/12/2022' },
    { img: 'https://picsum.photos/200', type: 'Identifying Document', name: 'image_processing_20210324.png', user: 'Nithya Jerome', date: '04/12/2022' },
    { img: 'https://picsum.photos/200', type: ' Reference Letter ', name: '4asf2425ds6dbn6sb2399837.png', user: 'Praseetha', date: '27/08/2022' }
  ]

  constructor() { }

  ngOnInit(): void {

  }

  onTogglePatPreview() {
    this.patInfoPreview = !this.patInfoPreview;
  }
  onToggleAlphaView() {
    this.patListAlphaSort = !this.patListAlphaSort;

  }
  onToggleSwitchView() {
    this.patListGridView = !this.patListGridView;
  }

}
