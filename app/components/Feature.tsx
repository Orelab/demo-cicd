import React from 'react';
import type { Feature as FeatureType } from '../services/featureService';

interface FeatureProps extends FeatureType {
  onError?: (error: Error) => void;
}

const Feature: React.FC<FeatureProps> = ({ name, description, resourceUrl, addedAt, onError }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!resourceUrl.startsWith('http')) {
      e.preventDefault();
      onError?.(new Error('URL invalide'));
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title h5">{name}</h3>
        <p className="card-text">{description}</p>
        <a href={resourceUrl} 
           target="_blank" 
           rel="noopener noreferrer"
           className="btn btn-primary btn-sm"
           onClick={handleClick}>
          En savoir plus
        </a>
        <p className="card-text">
          <small className="text-muted">
            Ajouté le : {new Date(addedAt).toLocaleDateString()}
          </small>
        </p>
      </div>
    </div>
  );
};

export default Feature;
