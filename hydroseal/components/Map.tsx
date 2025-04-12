'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from '../styles/map.module.scss';

// Fix marker icon issues in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

const position: [number, number] = [-1.286389, 36.817223]; // Nairobi coordinates

const Map = () => {
  return (
    <div className={styles.mapWrapper}>
      <MapContainer center={position} zoom={15} scrollWheelZoom={false} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Hydroseal Innovations<br />Gatakaini House 2, Nairobi.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
