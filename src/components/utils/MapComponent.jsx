import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { toast } from 'react-toastify';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster'; // Import Cluster Component
import L from 'leaflet';
import { MapPin, Library } from 'lucide-react';
import api from '../../api/axiosInstance';
import 'leaflet/dist/leaflet.css';

/**
 * REUSABLE TEARDROP PIN COMPONENT
 */
const createCustomPin = (color) => {
  const iconHTML = renderToStaticMarkup(
    <div style={{
      backgroundColor: color,
      borderRadius: '50% 50% 50% 0',
      transform: 'rotate(-45deg)',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid white',
      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    }}>
      <div style={{ 
        transform: 'rotate(45deg)',
        width: '14px',
        height: '14px',
        backgroundColor: 'white',
        borderRadius: '50%'
      }}></div>
    </div>
  );

  return L.divIcon({
    html: iconHTML,
    className: 'custom-leaflet-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

export const MapComponent = () => {
  const location = useLocation();
  const { propertyLocation, propertyName } = location.state || {};
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(false)

  // Leaflet uses [Lat, Lon]
  const propertyCenter = propertyLocation 
    ? [propertyLocation.coordinates[1], propertyLocation.coordinates[0]] 
    : null;

  useEffect(() => {
    if (propertyLocation) fetchNearby();
  }, [propertyName]);

  const fetchNearby = async () => {
    try {
      const data = {
        longitude: propertyLocation.coordinates[0],
        latitude: propertyLocation.coordinates[1],
        propertyName
      };
      setLoading(true)
      const res = await api.post('/property/nearbyAmenities', data);
      if (res.status === 200) {
        setMapData(res.data?.data?.nearbyAminites?.features || []);
      }
    } catch (err) {
      toast.error("Error fetching neighborhood data");
    } finally {
      setLoading(false)
    }
  };

  if (!propertyCenter) return <div className="flex h-screen items-center justify-center">No location found...</div>;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <style>{`
        .custom-leaflet-icon { background: transparent !important; border: none !important; }
        /* Style for the cluster circles */
        .marker-cluster-small, .marker-cluster-medium, .marker-cluster-large {
          background-color: rgba(239, 68, 68, 0.6) !important;
        }
        .marker-cluster-small div, .marker-cluster-medium div, .marker-cluster-large div {
          background-color: rgba(239, 68, 68, 1) !important;
          color: white !important;
          font-weight: bold;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Neighborhood Explorer</h1>
            <p className="text-gray-500">Viewing area near <span className="font-semibold text-blue-600">{propertyName}</span></p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative">
            <MapContainer center={propertyCenter} zoom={15} className="h-full w-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {/* PROPERTY CENTER (Blue) - Kept outside the cluster so it's always distinct */}
              <Marker position={propertyCenter} icon={createCustomPin("#3B82F6")}>
                <Popup>
                  <div className="text-center">
                    <p className="font-bold text-blue-700">{propertyName}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">Property Center</p>
                  </div>
                </Popup>
              </Marker>

              {/* AMENITIES CLUSTER (Red) */}
              <MarkerClusterGroup chunkedLoading>
                {mapData.map((amenity, i) => {
                  const displayCategory = amenity.properties.categories?.[0]?.split('.').pop()?.replace(/_/g, ' ');
                  return (
                    <Marker 
                      key={i} 
                      position={[amenity.geometry.coordinates[1], amenity.geometry.coordinates[0]]}
                      icon={createCustomPin("#EF4444")}
                    >
                      <Popup>
                        <div className="p-1 min-w-[140px]">
                          <p className="font-bold text-gray-800 leading-tight">{amenity.properties.name || "Facility"}</p>
                          <div className="mt-1 mb-2">
                             <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter border border-red-100">
                                {displayCategory || 'General'}
                             </span>
                          </div>
                          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                             <span className="text-xs text-gray-500 font-medium">{amenity.properties.distance}m away</span>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MarkerClusterGroup>
            </MapContainer>
          </div>

          {/* LIST SECTION */}
          <div className="bg-white rounded-3xl shadow-xl p-5 flex flex-col h-[600px] border border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
               <Library size={20} className="text-blue-500" />
               Nearby Places
            </h3>
            {loading && (
              <div className="flex flex-col items-center justify-center w-full py-10">
                <span className="text-gray-400 text-sm font-medium animate-pulse">
                  loading nearby amenities...
                </span>
              </div>
            )}

            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {mapData.map((amenity, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
                   <div className="flex justify-between items-start">
                     <div>
                        <span className="font-bold text-gray-800 text-sm block">{amenity.properties.name || "Unnamed"}</span>
                        <span className="text-[10px] text-gray-400 capitalize">
                           {amenity.properties.categories?.[0]?.split('.').pop()?.replace(/_/g, ' ')}
                        </span>
                     </div>
                     <span className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-1 rounded-lg">
                        {amenity.properties.distance}m
                     </span>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
