import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  selectedImage: File | null = null
  imagePreview: string | ArrayBuffer | null = null
  isUploading: boolean = false
  progress: number = 0

  http = inject(HttpClient)

  onFileSelect(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.selectedImage = file

      const reader = new FileReader()
      reader.onload = () => {
        this.imagePreview = reader.result
      }
      reader.readAsDataURL(file)
    }
  }

  uploadFile() {
    if (!this.selectedImage) return

    this.isUploading = true
    this.progress = 0

    const formData = new FormData()
    formData.append('file', this.selectedImage)

    this.http.post('https://jsonplaceholder.typicode.com/posts', formData, {
      headers: new HttpHeaders(),
      observe: 'events',
      reportProgress: true,
    }).subscribe({
      next: (event: any) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if (event.total) {
              this.progress = Math.round((100 * event.loaded) / event.total)
            }
            break
          case HttpEventType.Response:
            if (event instanceof HttpResponse) {
              console.log('Upload Success', event);
            }
            break
        }
      },
      error: (error) => {
        console.error('Error uploading file', error);
      },
      complete: () => {
        this.isUploading = false;
        this.selectedImage = null
        const fileInput: HTMLInputElement = document.querySelector('input[type="file"]')!;
        if (fileInput) {
          fileInput.value = '';
        }
      }
    })
  }

}
