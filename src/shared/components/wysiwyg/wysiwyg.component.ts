import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';

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
export class WysiwygComponent implements OnInit {

  editorConfig: any;
  content: string;
  @Output() onContentChanged = new EventEmitter<string>();
  @Input() placeholder: string = '';
  @Input() contentInitial$: Observable<string>;

  constructor() {
    //nothing here :-(
  }

  ngOnInit() {
    if (this.contentInitial$) {
      this.contentInitial$.subscribe(content => this.content = content);
    }
    this.editorConfig = EDITOR_CONFIG;
  }

  onChange() {
    this.onContentChanged.emit(this.content);
  }

}

const EDITOR_CONFIG = {
  "editable": true,
  "spellcheck": true,
  "height": "300px",
  "minHeight": "0",
  "enableToolbar": true,
  "showToolbar": true,
  "imageEndPoint": "",
  "toolbar": [
      ["bold", "italic", "underline", "strikeThrough"],
      ["fontName", "fontSize", "color"],
      ["justifyLeft", "justifyCenter", "justifyRight"],
      ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
      ["link", "unlink", "image"]
  ]
};
