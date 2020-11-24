import { TestBed } from '@angular/core/testing';

import { WorkspaceManagerService } from './workspace-manager.service';

describe('WorkspaceManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkspaceManagerService = TestBed.get(WorkspaceManagerService);
    expect(service).toBeTruthy();
  });
});
