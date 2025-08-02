import { Location } from "@/data/dashboard/types";
import { LatLngTuple } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function MapView({ locations }: { locations?: Location[] }) {
  if (!locations || locations.length === 0) {
    return <div>No locations available.</div>;
  }

  // Center map on one of the locations coming in the data
  const center: LatLngTuple = [locations[3].latitude, locations[3].longitude];

  return (
    <MapContainer center={center} zoom={3} style={{ height: 400 }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((l, i) => (
        <Marker key={i} position={[l.latitude, l.longitude]}>
          <Popup>
            <div>
              <div>
                Location: <span className="font-bold">{l.label}</span>
              </div>
              <div>
                Activity: <span className="font-bold">{l.activity}</span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
