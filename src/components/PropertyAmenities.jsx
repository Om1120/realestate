// src/components/PropertyAmenities.jsx
import React from 'react';
import { 
  Waves, 
  ArrowUpCircle, 
  ShieldCheck, 
  Cpu, 
  Trees, 
  Dumbbell, 
  Car, 
  Zap, 
  Building2, 
  Wine, 
  Users, 
  Eye, 
  Plane, 
  Film, 
  CheckCircle2 
} from 'lucide-react';

const getAmenityIcon = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes('pool') || lower.includes('water')) return <Waves size={16} color="#111418" />;
  if (lower.includes('elevator') || lower.includes('lift')) return <ArrowUpCircle size={16} color="#111418" />;
  if (lower.includes('security') || lower.includes('cctv') || lower.includes('guard')) return <ShieldCheck size={16} color="#111418" />;
  if (lower.includes('smart') || lower.includes('automation')) return <Cpu size={16} color="#111418" />;
  if (lower.includes('garden') || lower.includes('lawn') || lower.includes('zen')) return <Trees size={16} color="#111418" />;
  if (lower.includes('gym') || lower.includes('spa') || lower.includes('wellness')) return <Dumbbell size={16} color="#111418" />;
  if (lower.includes('parking') || lower.includes('garage') || lower.includes('valet')) return <Car size={16} color="#111418" />;
  if (lower.includes('power') || lower.includes('backup') || lower.includes('solar')) return <Zap size={16} color="#111418" />;
  if (lower.includes('club') || lower.includes('banquet')) return <Building2 size={16} color="#111418" />;
  if (lower.includes('wine') || lower.includes('cellar')) return <Wine size={16} color="#111418" />;
  if (lower.includes('staff') || lower.includes('quarters') || lower.includes('concierge')) return <Users size={16} color="#111418" />;
  if (lower.includes('helipad')) return <Plane size={16} color="#111418" />;
  if (lower.includes('theatre') || lower.includes('cinema')) return <Film size={16} color="#111418" />;
  if (lower.includes('sea') || lower.includes('view')) return <Eye size={16} color="#111418" />;
  return <CheckCircle2 size={16} color="#111418" />;
};

const PropertyAmenities = ({ amenities = [] }) => {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '12px'
      }}
    >
      {amenities.map((amenity, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            background: '#F9FAFB',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            color: '#111418',
            fontSize: '0.86rem',
            fontWeight: 500
          }}
        >
          <div 
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            {getAmenityIcon(amenity)}
          </div>
          <span>{amenity}</span>
        </div>
      ))}
    </div>
  );
};

export default PropertyAmenities;
