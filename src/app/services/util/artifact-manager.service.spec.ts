import { TestBed } from '@angular/core/testing';

import { ArtifactManagerService } from './artifact-manager.service';

describe('ArtifactManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtifactManagerService = TestBed.get(ArtifactManagerService);
    expect(service).toBeTruthy();
  });
});
