'use client';
import React from 'react';
import Feature from './components/Feature';
import FeatureForm from './components/FeatureForm';
import { useFeatures } from './hooks/useFeatures';

export default function Home() {
  const {
    features,
    currentPage,
    totalPages,
    isLoading,
    error,
    setCurrentPage,
    refreshFeatures
  } = useFeatures();

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container py-4">
      <header className="text-center mb-5">
        <h1 className="display-4">Gestionnaire de Fonctionnalités</h1>
      </header>

      <section className="mb-5">
        <h2 className="mb-4">Ajouter une nouvelle fonctionnalité</h2>
        <FeatureForm onSuccess={refreshFeatures} />
      </section>

      <section>
        <h2 className="mb-4">Liste des fonctionnalités</h2>
        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
              {features.map((feature) => (
                <div className="col" key={feature.id}>
                  <Feature {...feature} />
                </div>
              ))}
            </div>

            <nav aria-label="Navigation des pages">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link"
                    onClick={() => setCurrentPage(p => p - 1)}
                    disabled={currentPage === 1}
                  >
                    Précédent
                  </button>
                </li>
                <li className="page-item">
                  <span className="page-link">
                    Page {currentPage} sur {totalPages}
                  </span>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link"
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Suivant
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </section>
    </div>
  );
}
