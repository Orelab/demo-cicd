import { useState, useEffect } from 'react';
import type { Feature } from '../services/featureService';

export function useFeatures(initialPage: number = 1) {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeatures = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/features?page=${currentPage}`);
      const data = await res.json();
      setFeatures(data.features);
      setTotalPages(data.pages);
    } catch (err) {
      setError('Erreur lors du chargement des fonctionnalités');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, [currentPage]);

  return {
    features,
    currentPage,
    totalPages,
    isLoading,
    error,
    setCurrentPage,
    refreshFeatures: fetchFeatures
  };
}
