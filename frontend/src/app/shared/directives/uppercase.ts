import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appUppercase]',
  standalone: true,
})
export class UppercaseDirective {
  private readonly input = inject(ElementRef<HTMLInputElement>);

  @HostListener('input')
  onInput(): void {
    const element = this.input.nativeElement;
    const value = element.value;
    const upper = value.toUpperCase();
    // Ha a felhasználó eleve nagybetűt használ, nincs szükség a további műveletekre
    if (value === upper) {
      return;
    }

    // Kurzor pozicójának elmentése
    const start = element.selectionStart;
    const end = element.selectionEnd;

    // A nagbetűssé alakított érték beírása az input elembe
    element.value = upper;

    // Kurzor beállítása az eredeti pozicíóba
    element.setSelectionRange(start, end);

    element.dispatchEvent(new Event('input', { bubbles: true }));
  }
}
