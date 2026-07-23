import { Component } from '@angular/core';
import { Carousel } from '../../components/carousel/carousel';
import { MainCard } from '../../components/main-card/main-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MainCard, Carousel],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
