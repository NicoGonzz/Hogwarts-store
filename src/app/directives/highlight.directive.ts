import { Directive , ElementRef} from '@angular/core';


@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(
    private element: ElementRef //A la directiva que le apliquemos esta directiva tendremos su acceso
  ) {
    this.element.nativeElement.style.backgroundColor = 'red';
  }

}
