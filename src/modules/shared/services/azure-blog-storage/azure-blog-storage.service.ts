import { Injectable } from '@angular/core';
import { BlobServiceClient,ContainerClient } from '@azure/storage-blob';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AzureBlogStorageService {
  
  private readonly accountName: string = "storagekts"
  private readonly containerName: string = "pictures"
  


  public uploadImage(content: Blob, name: string, handler : () => void) {
    const blockBlobClient = this.containerClient().getBlockBlobClient(name);
    blockBlobClient.
    uploadData(content,{blobHTTPHeaders:{blobContentType: content.type}}).
    then(()=>{handler()})
  }

  private containerClient(): ContainerClient {
    return new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net?${environment.sas_token}`)
            .getContainerClient(this.containerName);
  }
}
