import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToasterService } from '../../services/toaster/toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnInit {
  constructor(public toastService: ToasterService) {}

  ngOnInit() {}

  public isTemplate(toast: any): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }
}