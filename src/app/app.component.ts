import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileUploadComponent } from "./components/file-upload/file-upload.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FileUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'file-upload-app';
}
