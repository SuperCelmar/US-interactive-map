import React, { useState } from "react";
import USMap from "./USMap";
import { cities } from "./cities";
import { MapPin, Info, ChevronRight, Navigation, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [selectedStateName, setSelectedStateName] = useState<string | null>(null);

  const handleStateClick = (stateId: string, stateName: string) => {
    if (selectedStateId === stateId) {
      setSelectedStateId(null);
      setSelectedStateName(null);
    } else {
      setSelectedStateId(stateId);
      setSelectedStateName(stateName);
    }
  };

  const stateCities = selectedStateId ? cities.filter(c => c.stateId === selectedStateId) : [];

  return (
    <div className="min-h-screen bg-light-gray font-sans flex flex-col text-slate">
      {/* Header */}
      <header className="bg-navy text-white p-4 shadow-md flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="bg-gold p-2 rounded-lg">
            <MapPin size={20} className="text-navy" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">US Interactive Map</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-light-slate opacity-80">
          <Info size={16} />
          <span>Select a state to view cities</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Map Area */}
        <div className="flex-1 bg-light-slate relative p-4 lg:p-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.05)_0%,transparent_100%)] pointer-events-none" />
          <div className="w-full h-full max-w-5xl mx-auto rounded-2xl bg-white shadow-sm border border-slate/5 p-4 relative overflow-hidden flex items-center justify-center">
            {selectedStateId && (
              <button
                onClick={() => {
                  setSelectedStateId(null);
                  setSelectedStateName(null);
                }}
                className="absolute top-6 left-6 z-20 bg-white border border-slate/10 shadow-sm px-4 py-2 rounded-lg text-sm font-medium text-navy hover:bg-light-slate transition-colors flex items-center gap-2"
              >
                <ChevronLeft size={16} />
                Back to US Map
              </button>
            )}
            <USMap onStateClick={handleStateClick} selectedStateId={selectedStateId} />
          </div>
        </div>

        {/* Sidebar Panel */}
        <AnimatePresence>
          {selectedStateId && (
            <motion.aside
              initial={{ width: 0, opacity: 0, x: 50 }}
              animate={{ width: 380, opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white border-l border-slate/10 shadow-[-4px_0_24px_rgba(0,0,0,0.02)] flex flex-col z-10 overflow-hidden shrink-0"
            >
              <div className="p-6 border-b border-slate/10 bg-slate text-white">
                <div className="flex items-center gap-3 mb-1">
                  <Navigation size={18} className="text-gold" />
                  <h2 className="text-2xl font-semibold tracking-tight">{selectedStateName}</h2>
                </div>
                <p className="text-sm text-light-slate/70">
                  {stateCities.length > 0 
                    ? `Found ${stateCities.length} major cities` 
                    : "No major cities listed in our database"}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-light-gray">
                {stateCities.length > 0 ? (
                  <div className="space-y-3">
                    {stateCities.map((city, i) => (
                      <motion.div
                        key={city.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 + 0.2 }}
                        className="bg-white p-4 rounded-xl shadow-sm border border-slate/5 hover:border-gold/50 transition-colors group cursor-default"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-navy">{city.name}</h3>
                          <ChevronRight size={16} className="text-slate/30 group-hover:text-gold transition-colors" />
                        </div>
                        {city.population && (
                          <p className="text-xs text-slate/60 mt-1 font-mono">
                            Pop: {city.population.toLocaleString()}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate/40 space-y-3">
                    <MapPin size={32} />
                    <p className="text-sm text-center">Select another state to explore</p>
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-white border-t border-slate/10">
                <button 
                  onClick={() => {
                    setSelectedStateId(null);
                    setSelectedStateName(null);
                  }}
                  className="w-full py-2.5 rounded-lg bg-light-slate text-navy font-medium text-sm hover:bg-slate hover:text-white transition-colors"
                >
                  Close Panel
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
