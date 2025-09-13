
import React, { useState } from 'react';

interface InputFormProps {
  onGenerate: (niche: string, cityState: string) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [niche, setNiche] = useState('Ethnic Kurtas for women');
  const [cityState, setCityState] = useState('Patna, Bihar');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim() || !cityState.trim()) {
      setError('Both fields are required.');
      return;
    }
    setError('');
    onGenerate(niche, cityState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-slate-800">Create Your Ad Strategy</h2>
        <p className="text-slate-500 mt-1">Enter your business details below to get started.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="niche" className="block text-sm font-medium text-slate-700 mb-1">
            Niche / Product
          </label>
          <input
            type="text"
            id="niche"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g., Handcrafted leather bags"
            className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="cityState" className="block text-sm font-medium text-slate-700 mb-1">
            City, State
          </label>
          <input
            type="text"
            id="cityState"
            value={cityState}
            onChange={(e) => setCityState(e.target.value)}
            placeholder="e.g., Jaipur, Rajasthan"
            className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            disabled={isLoading}
          />
        </div>
      </div>
       {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <div className="text-center">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Generating...' : 'Generate Report'}
        </button>
      </div>
    </form>
  );
};
