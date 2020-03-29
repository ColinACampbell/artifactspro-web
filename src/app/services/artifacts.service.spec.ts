import { TestBed } from '@angular/core/testing';

import { ArtifactsService } from './artifacts.service';

describe('ArtifactsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtifactsService = TestBed.get(ArtifactsService);
    expect(service).toBeTruthy();
  });
});
