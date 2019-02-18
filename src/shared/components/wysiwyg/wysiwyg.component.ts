import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WysiwygService } from './wysiwyg.service';

@Component({
  selector: 'wysiwyg-component',
  template: `
    <app-ngx-editor [config]="editorConfig" 
                    [(ngModel)]="content" 
                    (ngModelChange)="onChange()"
                    [placeholder]="placeholder"
    ></app-ngx-editor>
  `
})
export class WysiwygComponent implements OnInit, OnDestroy {

  @Output() onContentChanged = new EventEmitter<string>();
  @Input() placeholder: string = '';
  @Input() placeholder$: Observable<string>;

  editorConfig = this.wysiwygService.config;
  content: string;

  private destroy$ = new Subject();

  constructor(
    private wysiwygService: WysiwygService
  ) { }

  ngOnInit() {
    if (this.placeholder$) {
      this.loadPlaceholder();
    }
  }

  private loadPlaceholder() {
    this.placeholder$
      .pipe(takeUntil(this.destroy$))
      .subscribe(content => this.content = content);
  }

  onChange() {
    this.onContentChanged.emit(this.content);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
