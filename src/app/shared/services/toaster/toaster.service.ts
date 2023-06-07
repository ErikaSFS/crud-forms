import { Injectable, TemplateRef } from '@angular/core';

@Injectable()
export class ToasterService {
  public toasts: any[] = [];

  private show(textOrTpl: string | TemplateRef<any>, options: any = {}): void {
    this.toasts.push({ textOrTpl, ...options });
  }

  public remove(toast: any): void {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  private clear(): void {
    this.toasts.splice(0, this.toasts.length);
  }

  public showStandard(message: string | TemplateRef<any>): void {
    this.show(message, { delay: 3000 });
  }

  public showSuccess(message: string | TemplateRef<any>): void {
    this.show(message, { classname: 'bg-success text-light', delay: 3000 });
  }

  public showDanger(message: string | TemplateRef<any>): void {
    this.show(message, { classname: 'bg-danger text-light', delay: 3000 });
  }

  public ngOnDestroy(): void {
    this.clear();
  }
}