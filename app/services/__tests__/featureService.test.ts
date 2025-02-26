import { Feature } from '../featureService';
import { createFeature, getAllFeatures, deleteFeature } from '../featureService';

describe('Feature Service', () => {
  let mockFeatures: Feature[] = [];

  beforeEach(() => {
    global.fetch = jest.fn();
    mockFeatures = [
      {
        id: '1', // Changé en string pour correspondre au type Feature
        name: 'Test Feature',
        description: 'Test Description',
        resourceUrl: 'https://test.com',
        createdAt: new Date().toISOString(), // Changé pour correspondre au modèle
      }
    ];
  });

  describe('getAllFeatures', () => {
    it('should fetch all features', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockFeatures,
      });

      const features = await getAllFeatures();
      expect(features).toEqual(mockFeatures);
      expect(global.fetch).toHaveBeenCalledWith('/api/features');
    });

    it('should handle errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));
      await expect(getAllFeatures()).rejects.toThrow('Failed to fetch');
    });
  });

  describe('createFeature', () => {
    const newFeature = {
      name: 'New Feature',
      description: 'New Description',
      resourceUrl: 'https://new.com',
    };

    it('should create a new feature', async () => {
      const createdFeature = {
        id: '2',
        ...newFeature,
        createdAt: new Date().toISOString(),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => createdFeature,
      });

      const feature = await createFeature(newFeature);
      expect(feature).toHaveProperty('id');
      expect(feature.name).toBe(newFeature.name);
      expect(feature).toHaveProperty('createdAt');
    });
  });

  describe('deleteFeature', () => {
    it('should delete a feature', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      await deleteFeature('1');
      expect(global.fetch).toHaveBeenCalledWith('/api/features/1', {
        method: 'DELETE',
      });
    });
  });
});
