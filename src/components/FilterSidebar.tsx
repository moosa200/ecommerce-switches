'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  color?: string;
}

interface FilterSection {
  title: string;
  options: FilterOption[];
}

interface FilterSidebarProps {
  selectedFilters: Record<string, string[]>;
  onFilterChange: (category: string, value: string) => void;
  onClearFilters: () => void;
}

const filterSections: FilterSection[] = [
  {
    title: 'Color Finishes',
    options: [
      { id: 'white', label: 'White', color: '#FFFFFF' },
      { id: 'gold', label: 'Gold', color: '#FFD700' },
      { id: 'grey', label: 'Grey', color: '#808080' },
      { id: 'black', label: 'Black', color: '#000000' },
      { id: 'silver', label: 'Silver', color: '#C0C0C0' },
    ]
  },
  {
    title: 'Current',
    options: [
      { id: '6a', label: '6A' },
      { id: '10a', label: '10A' },
      { id: '16a', label: '16A' },
      { id: '20a', label: '20A' },
    ]
  },
  {
    title: 'Gang',
    options: [
      { id: '1', label: '1 Gang' },
      { id: '2', label: '2 Gang' },
      { id: '3', label: '3 Gang' },
      { id: '4', label: '4 Gang' },
    ]
  },
  {
    title: 'Material',
    options: [
      { id: 'polycarbonate', label: 'Polycarbonate' },
      { id: 'glass', label: 'Glass' },
      { id: 'metal', label: 'Metal' },
      { id: 'plastic', label: 'Plastic' },
    ]
  },
  {
    title: 'Poles',
    options: [
      { id: '1pole', label: '1 Pole' },
      { id: '2pole', label: '2 Pole' },
      { id: '3pole', label: '3 Pole' },
    ]
  },
  {
    title: 'Way',
    options: [
      { id: '1way', label: '1 Way' },
      { id: '2way', label: '2 Way' },
      { id: '3way', label: '3 Way' },
    ]
  }
];

export default function FilterSidebar({ selectedFilters, onFilterChange, onClearFilters }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    filterSections.map(s => s.title)
  );

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const totalFilters = Object.values(selectedFilters).flat().length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        {totalFilters > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Clear All
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Selected Filters */}
      {totalFilters > 0 && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Selected Options</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([category, values]) =>
              values.map(value => (
                <button
                  key={`${category}-${value}`}
                  onClick={() => onFilterChange(category, value)}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1 hover:bg-blue-200"
                >
                  {value}
                  <X className="w-3 h-3" />
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Filter Sections */}
      <div className="space-y-4">
        {filterSections.map((section) => (
          <div key={section.title} className="border-b border-gray-200 pb-4 last:border-0">
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex items-center justify-between text-left mb-3"
            >
              <h3 className="font-semibold text-gray-800">{section.title}</h3>
              {expandedSections.includes(section.title) ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedSections.includes(section.title) && (
              <div className="space-y-2">
                {section.options.map((option) => {
                  const isSelected = selectedFilters[section.title]?.includes(option.id) || false;
                  
                  return (
                    <label
                      key={option.id}
                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onFilterChange(section.title, option.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      {option.color && (
                        <div
                          className="w-5 h-5 rounded-full border border-gray-300"
                          style={{ backgroundColor: option.color }}
                        />
                      )}
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}