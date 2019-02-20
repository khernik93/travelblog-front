import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as QuillNamespace from 'quill';
import ImageUploader from 'quill-image-uploader';
import { ApiClient } from '../../clients/api/api.client';
let Quill: any = QuillNamespace;

@Component({
  selector: 'wysiwyg-component',
  templateUrl: './wysiwyg.component.html'
})
export class WysiwygComponent implements OnInit, OnDestroy {

  @Output() onContentChanged = new EventEmitter<string>();
  @Input() placeholder$: Observable<string>;

  content: string = '';
  
  private destroy$ = new Subject();

  constructor(
    private apiClient: ApiClient
  ) { }

  ngOnInit() {
    Quill.register("modules/imageUploader", ImageUploader);
    if (this.placeholder$) {
      this.loadPlaceholder();
    }
  }

  private loadPlaceholder() {
    this.placeholder$
      .pipe(takeUntil(this.destroy$))
      .subscribe(placeholder => this.content = placeholder);
  }

  changeContent() {
    this.onContentChanged.emit(this.content);
  }

  upload(file: HTMLInputElement): Promise<String> {
    return this.apiClient.uploadFile(file).toPromise();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
