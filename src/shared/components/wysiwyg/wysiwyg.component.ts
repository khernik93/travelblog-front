import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Quill from 'quill';
import ImageUploader from 'quill-image-uploader';
import { ContentClient } from '../../clients/content/content.client';

@Component({
  selector: 'wysiwyg-component',
  templateUrl: './wysiwyg.component.html'
})
export class WysiwygComponent implements OnInit, OnDestroy {

  @Output() onContentChanged = new EventEmitter<string>();
  @Input() placeholder$: Observable<string>;

  content: string = '';
  quillModules: any = { 
    imageUploader: { 
      upload: this.upload.bind(this)
    }
  };
  
  private destroy$ = new Subject();

  constructor(
    private contentClient: ContentClient
  ) { }

  ngOnInit() {
    this.registerQuillModules();
    if (this.placeholder$) {
      this.loadPlaceholder();
    }
  }

  private registerQuillModules() {
    Quill.register("modules/imageUploader", ImageUploader);
  }

  private loadPlaceholder() {
    this.placeholder$
      .pipe(takeUntil(this.destroy$))
      .subscribe(placeholder => this.content = placeholder);
  }

  changeContent(content) {
    this.onContentChanged.emit(content.html);
  }

  upload(file: HTMLInputElement): Promise<String> {
    return this.contentClient.uploadFile(file).toPromise()
      .catch(() => '')
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
