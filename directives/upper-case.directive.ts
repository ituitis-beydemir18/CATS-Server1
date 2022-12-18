import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[appUpperCase]",
})
export class UpperCaseDirective {
  constructor(private el: ElementRef) {}

  @HostListener("input", ["$event"]) onInput(event) {
    event.target.value = event.target.value.toUpperCase();
  }
}
