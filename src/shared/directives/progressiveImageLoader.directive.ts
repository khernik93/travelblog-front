import { AfterContentInit, Directive, ElementRef, OnDestroy, Renderer2 } from "@angular/core";

@Directive({
  selector: '[image-loader]'
})
export class ProgressiveImageLoaderDirective implements AfterContentInit, OnDestroy {

  private nativeElement: HTMLElement;
  private cancelOnError: Function;
  private cancelOnLoad: Function;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterContentInit(){
    this.registerEvents();
  }

  registerEvents(){
    this.nativeElement = this.el.nativeElement;
    this.onLoad = this.onLoad.bind(this);
    this.cancelOnLoad = this.renderer.listen(this.nativeElement, 'load', this.onLoad);
  }

  loadLargeImage(src){
    const largeImage = new Image();
    largeImage.src = src;
    largeImage.onload = () => {
      this.renderer.setAttribute(this.nativeElement, 'src', largeImage.src);
    }
  }

  private onLoad(){
    this.removeOnLoadEvent();
    let src = this.nativeElement.getAttribute('src');
    let srcSplit = src.split(/_thumb.jpg/);
    this.loadLargeImage(srcSplit[0]);
  }

  private removeErrorEvent() {
    if (this.cancelOnError) {
      this.cancelOnError();
    }
  }

  private removeOnLoadEvent() {
    if (this.cancelOnLoad) {
      this.cancelOnLoad();
    }
  }

  ngOnDestroy(){
    this.removeErrorEvent();
    this.removeOnLoadEvent();
  }

}
