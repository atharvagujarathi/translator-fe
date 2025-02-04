import { Component } from '@angular/core';
import { TranslationService } from '../translation.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css'],
})
export class TranslationComponent {
  content: { pairs: { original: SafeHtml; translated: SafeHtml }[] } | null = null;
  isLoading = false;

  constructor(
    private translationService: TranslationService,
    private sanitizer: DomSanitizer
  ) {}

  loadTranslation(): void {
    this.isLoading = true; 
    this.translationService.fetchTranslation().subscribe({
      next: (data) => {
        this.content = {
          pairs: data.pairs.map((pair: { original: string; translated: string }) => ({
            original: this.sanitizer.bypassSecurityTrustHtml(pair.original),
            translated: this.sanitizer.bypassSecurityTrustHtml(pair.translated),
          })),
        };
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoading = false;
      },
    });
  }
}
