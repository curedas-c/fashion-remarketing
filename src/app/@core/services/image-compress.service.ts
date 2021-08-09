import { Injectable } from '@angular/core';
import Compressor from 'compressorjs';

@Injectable({
  providedIn: 'root',
})
export class ImageCompressService {
  constructor() {}

  async compressFile(file: File) {
    const size = file.size;

    if (size <= 200000) {
      return await this.compress(file, 90);
    } else if (size <= 300000) {
      const minified = await this.compress(file, 80);
      return minified;
    } else if (size <= 600000) {
      const minified = await this.compress(file, 70);
      return minified;
    } else if (size <= 1500000) {
      const minified = await this.compress(file, 60);
      return minified;
    } else {
      const minified = await this.compress(file, 50);
      return minified;
    }
  }

  private async compress(file: File, quality): Promise<File> {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality,
        mimeType: 'image/jpeg',
        success(res: Blob) {
          resolve(
            new File([res], file.name, {
              lastModified: new Date().getTime(),
              type: 'image/jpeg',
            })
          );
        },
        error(e) {
          reject(e);
        },
      });
    });
  }
}
