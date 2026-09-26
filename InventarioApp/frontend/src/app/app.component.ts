import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { BACKDROP_FRAG } from './shared/gl/backdrop.frag';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly frag = BACKDROP_FRAG;
  constructor(readonly auth: AuthService) {}
}
