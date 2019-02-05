import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

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

  constructor() {
    //nothing here :-(
  }

  ngOnInit() {
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
      ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
      ["fontName", "fontSize", "color"],
      ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
      ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
      ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
      ["link", "unlink", "image", "video"]
  ]
};
