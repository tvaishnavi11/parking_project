import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { Link } from "react-router-dom";
import ParkingPuneWizard from "../pages/ValetPage";
//import DashboardNavbar from "../Dashbord_Section/DashbordNavbar";



// Premium Marker Icon
const parkingIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2991/2991231.png",
  iconSize: [45, 45],
  iconAnchor: [22, 45],
});

const punePlaces = [
  {
    id: 1,
    name: "Shivaji Nagar",
    lat: 18.5308,
    lng: 73.8475,
    slots: 12,
    distance: "0.8 km",
  },
  {
    id: 2,
    name: "Hinjewadi",
    lat: 18.5913,
    lng: 73.7389,
    slots: 45,
    distance: "12 km",
  },
  {
    id: 3,
    name: "Kothrud",
    lat: 18.5074,
    lng: 73.8077,
    slots: 5,
    distance: "4.2 km",
  },
  {
    id: 4,
    name: "Baner",
    lat: 18.559,
    lng: 73.7868,
    slots: 28,
    distance: "6.5 km",
  },
  {
    id: 5,
    name: "Viman Nagar",
    lat: 18.5679,
    lng: 73.9143,
    slots: 18,
    distance: "9.1 km",
  },
];

function MapController({ center }) {
  const map = useMap();
  map.flyTo(center, 15, { duration: 1.5 }); // Smooth "flying" animation
  return null;
}

const SmartTouchParking = () => {
  const [activeSite, setActiveSite] = useState(punePlaces[0]);

  const [openBooking, setOpenBooking] = useState(false);

  return (
    <div className="relative h-screen w-full bg-slate-900 overflow-hidden font-sans">
      {/* 1. TOP STATUS BAR (Floating) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-md">
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-2xl flex justify-between items-center border border-white/20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              P
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-800">
                SmartPark Pune
              </h2>
              <p className="text-[10px] text-green-600 font-bold uppercase">
                System Online
              </p>
            </div>
          </div>
          <button className="bg-slate-100 p-2 rounded-full">
            <svg
              className="w-5 h-5 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 2. FULL SCREEN MAP */}
      <MapContainer
        center={[activeSite.lat, activeSite.lng]}
        zoom={14}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png" />
        {punePlaces.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={parkingIcon}
            eventHandlers={{ click: () => setActiveSite(place) }}
          />
        ))}
        <MapController center={[activeSite.lat, activeSite.lng]} />
      </MapContainer>

      {/* 3. BOTTOM TOUCH CARD (Swipeable Concept) */}
      <div className="absolute bottom-0 left-0 right-0 z-[1000] p-6 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent">
        {/* Horizontal Scroller for Areas */}
        <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
          {punePlaces.map((place) => (
            <div
              key={place.id}
              onClick={() => setActiveSite(place)}
              className={`flex-shrink-0 snap-center w-40 p-4 rounded-3xl transition-all duration-300 cursor-pointer ${
                activeSite.id === place.id
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-500/40 scale-105"
                  : "bg-white/90 text-slate-800 backdrop-blur-md"
              }`}
            >
              <p className="text-[10px] opacity-70 font-bold uppercase tracking-wider">
                {place.distance}
              </p>
              <h3 className="font-bold text-sm truncate">{place.name}</h3>
              <p
                className={`text-xs mt-2 font-black ${
                  activeSite.id === place.id ? "text-blue-100" : "text-blue-600"
                }`}
              >
                {place.slots} Slots
              </p>
            </div>
          ))}
        </div>

        {/* Selected Area Booking Action */}
        <div className="bg-white rounded-[2.5rem] p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900">
                {activeSite.name}
              </h1>
              <p className="text-slate-500 text-sm font-medium">
                Main Parking Plaza • Pune
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 block uppercase">
                Price
              </span>
              <span className="text-xl font-black text-slate-900">
                ₹40<small className="text-sm text-slate-400">/hr</small>
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setOpenBooking(true)}
              className="flex-1 bg-slate-900 text-white py-5 rounded-3xl font-black tracking-wide hover:bg-black transition-all active:scale-95 shadow-xl shadow-slate-900/20"
            >
              TAP TO PARK
            </button>

            <button className="bg-blue-50 text-blue-600 px-6 rounded-3xl active:scale-95">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {openBooking && (
        <ParkingPuneWizard
          selectedSite={activeSite}
          onClose={() => setOpenBooking(false)}
          onBooked={() => {
            setPlaces((prev) =>
              prev.map((p) =>
                p.id === activeSite.id ? { ...p, slots: p.slots - 1 } : p
              )
            );
            setActiveSite((prev) => ({ ...prev, slots: prev.slots - 1 }));
          }}
        />
      )}
    </div>
  );
};

export default SmartTouchParking;
