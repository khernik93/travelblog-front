import { Injectable } from '@angular/core';

@Injectable()
export class WysiwygService {

  config = {
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

}
