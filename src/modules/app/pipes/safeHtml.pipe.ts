import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * This pipe is used to avoid angular stripping of HTML tags (used mostly 
 * for wysiwyg operations)
 */
@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(
    protected sanitizer: DomSanitizer
  ) { }
 
	public transform(value: any): SafeHtml {
  	return this.sanitizer.bypassSecurityTrustHtml(value);
	}

}
