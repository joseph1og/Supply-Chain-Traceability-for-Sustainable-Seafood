import { describe, it, expect, beforeEach } from 'vitest';

// Mock implementation for testing
const mockVesselRegistration = {
  lastVesselId: 0,
  vessels: new Map(),
  
  getVessel(vesselId) {
    return this.vessels.get(vesselId);
  },
  
  registerVessel(name, owner) {
    const newId = ++this.lastVesselId;
    this.vessels.set(newId, {
      name,
      owner,
      registrationDate: Date.now(),
      isActive: true
    });
    return newId;
  },
  
  updateVesselStatus(vesselId, isActive, sender) {
    const vessel = this.vessels.get(vesselId);
    if (!vessel) return { error: 404 };
    if (vessel.owner !== sender) return { error: 403 };
    
    vessel.isActive = isActive;
    this.vessels.set(vesselId, vessel);
    return { success: true };
  },
  
  transferVessel(vesselId, newOwner, sender) {
    const vessel = this.vessels.get(vesselId);
    if (!vessel) return { error: 404 };
    if (vessel.owner !== sender) return { error: 403 };
    
    vessel.owner = newOwner;
    this.vessels.set(vesselId, vessel);
    return { success: true };
  }
};

describe('Vessel Registration Contract', () => {
  beforeEach(() => {
    // Reset the mock state
    mockVesselRegistration.lastVesselId = 0;
    mockVesselRegistration.vessels = new Map();
  });
  
  it('should register a new vessel', () => {
    const vesselId = mockVesselRegistration.registerVessel('Fishing Boat 1', 'owner1');
    expect(vesselId).toBe(1);
    
    const vessel = mockVesselRegistration.getVessel(vesselId);
    expect(vessel).toBeDefined();
    expect(vessel.name).toBe('Fishing Boat 1');
    expect(vessel.owner).toBe('owner1');
    expect(vessel.isActive).toBe(true);
  });
  
  it('should update vessel status', () => {
    const vesselId = mockVesselRegistration.registerVessel('Fishing Boat 1', 'owner1');
    
    const result = mockVesselRegistration.updateVesselStatus(vesselId, false, 'owner1');
    expect(result.success).toBe(true);
    
    const vessel = mockVesselRegistration.getVessel(vesselId);
    expect(vessel.isActive).toBe(false);
  });
  
  it('should not allow unauthorized status update', () => {
    const vesselId = mockVesselRegistration.registerVessel('Fishing Boat 1', 'owner1');
    
    const result = mockVesselRegistration.updateVesselStatus(vesselId, false, 'unauthorized');
    expect(result.error).toBe(403);
    
    const vessel = mockVesselRegistration.getVessel(vesselId);
    expect(vessel.isActive).toBe(true); // Unchanged
  });
  
  it('should transfer vessel ownership', () => {
    const vesselId = mockVesselRegistration.registerVessel('Fishing Boat 1', 'owner1');
    
    const result = mockVesselRegistration.transferVessel(vesselId, 'owner2', 'owner1');
    expect(result.success).toBe(true);
    
    const vessel = mockVesselRegistration.getVessel(vesselId);
    expect(vessel.owner).toBe('owner2');
  });
  
  it('should not allow unauthorized transfer', () => {
    const vesselId = mockVesselRegistration.registerVessel('Fishing Boat 1', 'owner1');
    
    const result = mockVesselRegistration.transferVessel(vesselId, 'owner2', 'unauthorized');
    expect(result.error).toBe(403);
    
    const vessel = mockVesselRegistration.getVessel(vesselId);
    expect(vessel.owner).toBe('owner1'); // Unchanged
  });
});
