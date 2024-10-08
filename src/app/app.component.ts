  import { Component } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import { LoginComponent } from "./views/login/login.component";
  import { FooterComponent } from "./components/footer/footer.component";



  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, LoginComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
  })
  export class AppComponent {
    title = 'inbarber';
  }
