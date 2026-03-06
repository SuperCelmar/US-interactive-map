import React, { useEffect, useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { feature } from "topojson-client";
import { geoAlbersUsa, geoMercator } from "d3-geo";
import { cities } from "./cities";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface USMapProps {
  onStateClick: (stateId: string, stateName: string) => void;
  selectedStateId: string | null;
}

export default function USMap({ onStateClick, selectedStateId }: USMapProps) {
  const [geographies, setGeographies] = useState<any[]>([]);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  useEffect(() => {
    fetch(geoUrl)
      .then(res => res.json())
      .then(topoData => {
        const feats = (feature(topoData, topoData.objects.states as any) as any).features;
        setGeographies(feats);
      });
  }, []);

  const selectedFeature = useMemo(() => {
    if (!selectedStateId || geographies.length === 0) return null;
    return geographies.find(g => g.id === selectedStateId);
  }, [selectedStateId, geographies]);

  const projection = useMemo(() => {
    if (selectedFeature) {
      // Create a custom projection fitted to the selected state
      // react-simple-maps v3 expects the projection object directly, but @types/react-simple-maps is outdated
      const proj = geoMercator();
      
      // Alaska (FIPS 02) crosses the antimeridian. We must rotate the projection 
      // so that it doesn't get split across the map, which causes a tiny zoom 
      // and pieces of the state on opposite sides of the screen.
      if (selectedFeature.id === "02") {
        proj.rotate([154, 0]);
      }
      
      return proj.fitSize([800, 600], selectedFeature) as any;
    }
    // Default US projection
    return "geoAlbersUsa";
  }, [selectedFeature]);

  if (geographies.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-slate/50">
        <div className="animate-pulse flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Loading map data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <ComposableMap projection={projection} className="w-full h-full max-h-[600px]">
        <Geographies geography={selectedFeature ? [selectedFeature] : geographies}>
          {({ geographies: mappedGeos }) => (
            <>
              {mappedGeos.map(geo => {
                const isSelected = selectedStateId === geo.id;
                const isHovered = hoveredState === geo.id;

                return (
                  <Geography
                    key={geo.id || geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => setHoveredState(geo.id)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => {
                      if (!isSelected) {
                        onStateClick(geo.id, geo.properties.name);
                      }
                    }}
                    style={{
                      default: {
                        fill: selectedFeature ? "#F8FAFC" : "#F1F5F9",
                        stroke: selectedFeature ? "#94A3B8" : "#CBD5E1",
                        strokeWidth: selectedFeature ? 1.5 : 0.75,
                        outline: "none",
                        transition: "all 250ms"
                      },
                      hover: {
                        fill: selectedFeature ? "#F8FAFC" : "#e5a212",
                        stroke: selectedFeature ? "#94A3B8" : "#CBD5E1",
                        strokeWidth: selectedFeature ? 1.5 : 1,
                        outline: "none",
                        cursor: selectedFeature ? "default" : "pointer",
                        transition: "all 250ms"
                      },
                      pressed: {
                        fill: selectedFeature ? "#F8FAFC" : "#f4af25",
                        stroke: selectedFeature ? "#94A3B8" : "#CBD5E1",
                        strokeWidth: selectedFeature ? 1.5 : 1,
                        outline: "none",
                      }
                    }}
                  />
                );
              })}
            </>
          )}
        </Geographies>

        {cities.map(city => {
          if (selectedStateId !== city.stateId) return null;
          
          return (
            <Marker key={city.name} coordinates={city.coordinates}>
              <g className="animate-in zoom-in duration-300">
                <circle r={6} fill="#0F172A" stroke="#FFFFFF" strokeWidth={2} />
                <text
                  textAnchor="middle"
                  y={-15}
                  style={{ 
                    fontFamily: "Inter, sans-serif", 
                    fontSize: "14px", 
                    fill: "#0F172A", 
                    fontWeight: 600, 
                    textShadow: "0px 1px 3px rgba(255,255,255,0.9), 0px -1px 3px rgba(255,255,255,0.9), 1px 0px 3px rgba(255,255,255,0.9), -1px 0px 3px rgba(255,255,255,0.9)" 
                  }}
                >
                  {city.name}
                </text>
              </g>
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
}
