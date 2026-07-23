import { Component, computed, contentChildren, ElementRef, signal, viewChild } from '@angular/core';
import { MainCard } from '../main-card/main-card';
import { LucideChevronLeft, LucideChevronRight } from '@lucide/angular';

@Component({
  selector: 'app-carousel',
  imports: [LucideChevronRight, LucideChevronLeft],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class Carousel {
  cards = contentChildren(MainCard);
  viewport = viewChild<ElementRef>('viewport');

  currentOffset = signal(0);

  cardWidth = 300;
  gap = 20;

  cardsPerMove = 2; // move 2 cards at a time

  cardStep = computed(() => this.cardsPerMove * (this.cardWidth + this.gap));

  totalWidth = computed(
    () => this.cards().length * this.cardWidth + (this.cards().length - 1) * this.gap,
  );

  maxOffset = computed(() => {
    const viewportWidth = this.viewport()?.nativeElement.offsetWidth ?? 0;

    return Math.max(0, this.totalWidth() - viewportWidth);
  });

  next() {
    this.currentOffset.update((offset) => Math.min(offset + this.cardStep(), this.maxOffset()));
  }

  previous() {
    this.currentOffset.update((offset) => Math.max(offset - this.cardStep(), 0));
  }
}
