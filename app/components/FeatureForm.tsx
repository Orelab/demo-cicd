'use client';
import React, { useState } from 'react';
import type { FeatureInput } from '../services/featureService';

interface FeatureFormProps {
  onSuccess: () => Promise<void>;
}

const FeatureForm: React.FC<FeatureFormProps> = ({ onSuccess }) => {
  const [feature, setFeature] = useState<FeatureInput>({
    name: '',
    description: '',
    resourceUrl: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/features', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feature)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await onSuccess();
      
      // Réinitialiser le formulaire
      setFeature({
        name: '',
        description: '',
        resourceUrl: ''
      });

    } catch (error: any) {
      console.error("Could not add feature", error);
      setError("Échec de l'ajout de la fonctionnalité");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeature(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
      {error && (
        <div className="alert alert-danger mb-3">
          {error}
        </div>
      )}
      
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nom de la fonctionnalité *</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={feature.name}
          onChange={handleChange}
          required
          placeholder="Entrez le nom de la fonctionnalité"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description *</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={feature.description}
          onChange={handleChange}
          required
          rows={3}
          placeholder="Décrivez la fonctionnalité"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="resourceUrl" className="form-label">URL de la ressource *</label>
        <input
          type="url"
          className="form-control"
          id="resourceUrl"
          name="resourceUrl"
          value={feature.resourceUrl}
          onChange={handleChange}
          required
          placeholder="https://..."
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Ajouter la fonctionnalité
      </button>
    </form>
  );
};

export default FeatureForm;
