
import React, { useState, useCallback } from 'react';
import { generateReport } from './services/geminiService';
import type { Report, Competitor, Trend, Audience, Creative, PlacementBudget, ActionPlan, ProTip } from './types';
import { InputForm } from './components/InputForm';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ReportSection } from './components/ReportSection';
import { TargetIcon, LightbulbIcon, UsersIcon, CameraIcon, DollarSignIcon, CalendarIcon, StarIcon } from './components/icons';

const App: React.FC = () => {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = useCallback(async (niche: string, cityState: string) => {
    setIsLoading(true);
    setError(null);
    setReport(null);
    try {
      const generatedReport = await generateReport(niche, cityState);
      setReport(generatedReport);
    } catch (err) {
      setError(err instanceof Error ? `Failed to generate report: ${err.message}` : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderCompetitors = (competitors: Competitor[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {competitors.map((c, i) => (
        <div key={i} className="bg-slate-100 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-800">{c.name}</h4>
          <p className="text-sm text-slate-600 mt-1"><strong>Products:</strong> {c.products}</p>
          <p className="text-sm text-slate-600 mt-1"><strong>Audience:</strong> {c.audience}</p>
          <p className="text-sm text-slate-600 mt-1"><strong>Ad Style:</strong> {c.adStyle}</p>
        </div>
      ))}
    </div>
  );
  
  const renderTrends = (trends: Trend[]) => (
    <ul className="space-y-3">
      {trends.map((t, i) => (
        <li key={i} className="flex items-start">
          <span className="text-indigo-500 mr-3 mt-1">&#10003;</span>
          <p className="text-slate-700"><strong>{t.insight}:</strong> {t.explanation}</p>
        </li>
      ))}
    </ul>
  );

  const renderAudience = (audience: Audience) => (
    <div className="space-y-4">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        <li className="bg-slate-100 p-3 rounded-md"><strong>Location:</strong> {audience.location}</li>
        <li className="bg-slate-100 p-3 rounded-md"><strong>Age Ranges:</strong> {audience.ageRanges.join(', ')}</li>
        <li className="bg-slate-100 p-3 rounded-md"><strong>Gender:</strong> {audience.gender}</li>
        <li className="bg-slate-100 p-3 rounded-md"><strong>Languages:</strong> {audience.languages.join(', ')}</li>
      </ul>
      <div>
        <h4 className="font-semibold text-slate-800 mb-2">Detailed Interests & Behaviors</h4>
        <div className="flex flex-wrap gap-2">
          {[...audience.interests, ...audience.behaviors].map((item, i) => (
            <span key={i} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1.5 rounded-full">{item}</span>
          ))}
        </div>
      </div>
      <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-r-lg">
        <h4 className="font-bold text-indigo-800">Rationale</h4>
        <p className="text-indigo-700 text-sm mt-1">{audience.rationale}</p>
      </div>
    </div>
  );

  const renderCreatives = (creatives: Creative[]) => (
    <div className="space-y-6">
      {creatives.map((c, i) => (
        <div key={i} className="border border-slate-200 p-4 rounded-lg">
          <h4 className="font-semibold text-slate-800 text-lg mb-2">{c.direction}</h4>
          <div className="space-y-2 text-sm">
             <p><strong>Hook (3s):</strong> <span className="text-slate-600">{c.hook}</span></p>
             <p><strong>Ad Copy:</strong> <span className="text-slate-600">{c.adCopy}</span></p>
             <p><strong>CTA:</strong> <span className="font-bold text-indigo-600">{c.cta}</span></p>
             <p><strong>Visual:</strong> <span className="text-slate-600">{c.visualSuggestion}</span></p>
          </div>
        </div>
      ))}
      {creatives.length > 0 && creatives[0].trendingStyles && (
         <p className="text-sm mt-4 text-slate-600"><strong>Trending Creative Styles: </strong>{creatives[0].trendingStyles}</p>
      )}
    </div>
  );

  const renderPlacementBudget = (pb: PlacementBudget) => (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-slate-800 mb-2">Recommended Placements</h4>
        <p className="text-slate-700">{pb.placements}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-100 p-4 rounded-lg">
          <h5 className="font-semibold text-slate-800">Starting Daily Budget</h5>
          <p className="text-2xl font-bold text-indigo-600 mt-1">₹{pb.dailyBudgetINR}</p>
          <p className="text-xs text-slate-500">for initial testing</p>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg">
          <h5 className="font-semibold text-slate-800">Scaling Strategy</h5>
          <p className="text-slate-700 text-sm mt-1">{pb.scalingStrategy}</p>
        </div>
      </div>
    </div>
  );

  const renderActionPlan = (plan: ActionPlan) => (
    <ol className="relative border-l border-slate-200 ml-2">
      <li className="mb-6 ml-6">
          <span className="absolute flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full -left-3 ring-8 ring-white">
              <CalendarIcon className="w-3 h-3 text-indigo-800" />
          </span>
          <h3 className="flex items-center mb-1 text-md font-semibold text-slate-900">Days 1-3</h3>
          <p className="block mb-2 text-sm font-normal leading-none text-slate-500">Testing Phase</p>
          <p className="text-base font-normal text-slate-600">{plan.days1_3}</p>
      </li>
      <li className="mb-6 ml-6">
          <span className="absolute flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full -left-3 ring-8 ring-white">
              <CalendarIcon className="w-3 h-3 text-indigo-800" />
          </span>
          <h3 className="mb-1 text-md font-semibold text-slate-900">Days 4-5</h3>
          <p className="block mb-2 text-sm font-normal leading-none text-slate-500">Monitoring & Optimization</p>
          <p className="text-base font-normal text-slate-600">{plan.days4_5}</p>
      </li>
      <li className="ml-6">
          <span className="absolute flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full -left-3 ring-8 ring-white">
              <CalendarIcon className="w-3 h-3 text-indigo-800" />
          </span>
          <h3 className="mb-1 text-md font-semibold text-slate-900">Days 6-7</h3>
          <p className="block mb-2 text-sm font-normal leading-none text-slate-500">Scaling & Retargeting</p>
          <p className="text-base font-normal text-slate-600">{plan.days6_7}</p>
      </li>
    </ol>
  );

  const renderProTips = (tips: ProTip[]) => (
    <ul className="space-y-3">
      {tips.map((tip, i) => (
        <li key={i} className="flex items-start bg-slate-100 p-4 rounded-lg">
            <StarIcon className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700">{tip.tip}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-slate-900">Meta Ads Strategy Generator</h1>
          <p className="mt-1 text-slate-500">AI-powered insights for your next winning campaign.</p>
        </div>
      </header>
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <InputForm onGenerate={handleGenerateReport} isLoading={isLoading} />
          </div>

          {isLoading && <LoadingSpinner />}
          
          {error && (
            <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {report && (
            <div className="mt-12 space-y-10">
              <ReportSection title="Competitor Research" icon={<TargetIcon />}>
                {renderCompetitors(report.competitorResearch)}
              </ReportSection>
              <ReportSection title="Trend Insights" icon={<LightbulbIcon />}>
                {renderTrends(report.trendInsights)}
              </ReportSection>
              <ReportSection title="Target Audience" icon={<UsersIcon />}>
                {renderAudience(report.targetAudience)}
              </ReportSection>
              <ReportSection title="Creative Recommendations" icon={<CameraIcon />}>
                {renderCreatives(report.creativeRecommendations)}
              </ReportSection>
              <ReportSection title="Placements & Budget" icon={<DollarSignIcon />}>
                {renderPlacementBudget(report.placementsAndBudget)}
              </ReportSection>
              <ReportSection title="7-Day Action Plan" icon={<CalendarIcon />}>
                {renderActionPlan(report.actionPlan)}
              </ReportSection>
              <ReportSection title="Pro Tips" icon={<StarIcon />}>
                {renderProTips(report.proTips)}
              </ReportSection>
            </div>
          )}
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-slate-400">
        <p>Powered by AI. Always review and test strategies before scaling.</p>
      </footer>
    </div>
  );
};

export default App;
