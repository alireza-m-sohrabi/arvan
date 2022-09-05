import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'arvan/config-provider.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private tagsEndPoint!: string;

  constructor(configService: ConfigService, private httpClient: HttpClient) {
    this.tagsEndPoint = `${configService.environment?.api.core}/tags`;
  }

  search() {
    return this.httpClient
      .get<{ tags: string[] }>(`${this.tagsEndPoint}`)
      .pipe(map(({ tags }) => tags));
  }
}
