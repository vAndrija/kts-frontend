import { Component, OnInit } from '@angular/core';
import { AzureBlogStorageService } from 'src/modules/shared/services/azure-blog-storage/azure-blog-storage.service';
@Component({
  selector: 'app-test-picture-upload',
  templateUrl: './test-picture-upload.component.html',
  styleUrls: ['./test-picture-upload.component.scss']
})
export class TestPictureUploadComponent {

  constructor(private blobService: AzureBlogStorageService) { }

  imageSelected(event:Event){
    const target= event.target as HTMLInputElement;
    console.log(target)
    const file: File = (target.files as FileList)[0];
    console.log(file)
    this.blobService.uploadImage(file, file.name, ()=>{
      console.log("Success")
    })
  }

}