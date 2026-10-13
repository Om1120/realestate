// src/hooks/usePropertyFilter.js
import { useMemo } from 'react';

/**
 * Custom hook optimizing property filtering using useMemo
 * Handles location search, category/type, price range, bedrooms, area, and status.
 */
export const usePropertyFilter = (properties, filters, sortBy) => {
  const filteredAndSortedProperties = useMemo(() => {
    if (!Array.isArray(properties)) return [];

    let result = properties.filter((property) => {
      // 1. Search query (partial matching against title, location, address, category, type)
      if (filters.searchQuery && filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesTitle = property.title?.toLowerCase().includes(query);
        const matchesLocation = property.location?.toLowerCase().includes(query);
        const matchesAddress = property.address?.toLowerCase().includes(query);
        const matchesCategory = property.category?.toLowerCase().includes(query);
        const matchesType = property.propertyType?.toLowerCase().includes(query);
        const matchesDesc = property.description?.toLowerCase().includes(query);

        if (!matchesTitle && !matchesLocation && !matchesAddress && !matchesCategory && !matchesType && !matchesDesc) {
          return false;
        }
      }

      // 2. Location filter
      if (filters.location && filters.location !== 'All') {
        if (property.location?.toLowerCase() !== filters.location.toLowerCase()) {
          return false;
        }
      }

      // 3. Category filter
      if (filters.category && filters.category !== 'All') {
        if (property.category?.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }
      }

      // 4. Property Type filter
      if (filters.propertyType && filters.propertyType !== 'All') {
        if (property.propertyType?.toLowerCase() !== filters.propertyType.toLowerCase()) {
          return false;
        }
      }

      // 5. Property Status filter
      if (filters.status && filters.status !== 'All') {
        if (property.status?.toLowerCase() !== filters.status.toLowerCase()) {
          return false;
        }
      }

      // 6. Price Range
      const effectivePrice = property.status === 'For Rent' || property.status === 'Rented' 
        ? (property.rentPrice || property.price) 
        : property.price;

      if (filters.minPrice !== undefined && filters.minPrice > 0) {
        if (effectivePrice < Number(filters.minPrice)) return false;
      }
      if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
        if (effectivePrice > Number(filters.maxPrice)) return false;
      }

      // 7. Bedrooms filter
      if (filters.bedrooms && filters.bedrooms !== 'All') {
        const bedFilter = String(filters.bedrooms);
        if (bedFilter === '5+' || bedFilter === '5') {
          if (Number(property.bedrooms) < 5) return false;
        } else {
          if (Number(property.bedrooms) !== Number(bedFilter)) return false;
        }
      }

      // 8. Area filter
      if (filters.minArea !== undefined && filters.minArea > 0) {
        if (Number(property.area) < Number(filters.minArea)) return false;
      }
      if (filters.maxArea !== undefined && filters.maxArea > 0 && filters.maxArea < 30000) {
        if (Number(property.area) > Number(filters.maxArea)) return false;
      }

      return true;
    });

    // Sort optimization
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result = [...result].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else if (sortBy === 'area-high') {
      result = [...result].sort((a, b) => b.area - a.area);
    } else if (sortBy === 'bedrooms') {
      result = [...result].sort((a, b) => b.bedrooms - a.bedrooms);
    }

    return result;
  }, [properties, filters, sortBy]);

  return filteredAndSortedProperties;
};
