// src/pages/admin/AdminProperties.jsx
import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProperty, updateProperty, deleteProperty } from '../../redux/slices/propertySlice';
import { showToast } from '../../redux/slices/uiSlice';
import { formatCurrency } from '../../utils/formatters';
import ConfirmationModal from '../../components/ConfirmationModal';
import { 
  Building, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  X, 
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ALL_AMENITIES = [
  'Swimming Pool', 'Private Elevator', 'Smart Home Automation',
  'Wine Cellar', 'Spa & Wellness', 'Concierge', 'Private Cinema',
  'Infinity Pool', 'Covered Parking', 'Hardwood Flooring',
  'Landscaped Garden', 'Fitness Center', 'Power Backup'
];

const INITIAL_FORM = {
  title: '',
  description: '',
  propertyType: 'Villa',
  status: 'For Sale',
  price: '',
  bookingAmount: '100000',
  location: 'Mumbai',
  address: '',
  bedrooms: '4',
  bathrooms: '4',
  area: '4500',
  image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  images: [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  ],
  amenities: ['Swimming Pool', 'Smart Home Automation', 'Concierge'],
  agent: 'Alexander Sterling',
  latitude: 18.922,
  longitude: 72.8346,
  isFeatured: true
};

const AdminProperties = () => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties.items);
  const agents = useSelector((state) => state.agents.items);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Filtered Properties
  const filteredProperties = useMemo(() => {
    return properties.filter((item) => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.propertyType.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'All' || item.propertyType === selectedType;
      const matchesCity = selectedCity === 'All' || item.location === selectedCity;

      return matchesSearch && matchesType && matchesCity;
    });
  }, [properties, searchTerm, selectedType, selectedCity]);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(INITIAL_FORM);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (property) => {
    setEditingId(property.id);
    setFormData({
      ...property,
      price: property.price?.toString() || '',
      bookingAmount: property.bookingAmount?.toString() || '100000',
      bedrooms: property.bedrooms?.toString() || '3',
      bathrooms: property.bathrooms?.toString() || '3',
      area: property.area?.toString() || '3000'
    });
    setIsModalOpen(true);
  };

  const handleToggleAmenity = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities?.includes(amenity);
      const nextAmenities = exists
        ? prev.amenities.filter((a) => a !== amenity)
        : [...(prev.amenities || []), amenity];
      return { ...prev, amenities: nextAmenities };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.location) {
      dispatch(showToast({ type: 'error', title: 'Validation Error', message: 'Please fill in all mandatory fields.' }));
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      bookingAmount: Number(formData.bookingAmount) || 100000,
      bedrooms: Number(formData.bedrooms) || 3,
      bathrooms: Number(formData.bathrooms) || 3,
      area: Number(formData.area) || 3000,
      images: formData.images?.length ? formData.images : [formData.image]
    };

    if (editingId) {
      dispatch(updateProperty(payload));
      dispatch(showToast({ type: 'success', title: 'Property Updated', message: `Listing "${formData.title}" was saved successfully.` }));
    } else {
      const newProperty = {
        ...payload,
        id: `prop-${Date.now()}`
      };
      dispatch(addProperty(newProperty));
      dispatch(showToast({ type: 'success', title: 'Listing Added', message: `Property "${formData.title}" has been published.` }));
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      dispatch(deleteProperty(deleteTargetId));
      dispatch(showToast({ type: 'info', title: 'Listing Removed', message: 'Property listing deleted successfully.' }));
      setDeleteTargetId(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            Properties
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Manage listings, specifications, pricing, and availability.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={16} /> Add Property
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div 
        style={{
          padding: '16px 20px',
          background: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 300px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search properties by title, location, type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-modern"
              style={{ width: '100%', paddingLeft: '38px', height: '40px', fontSize: '0.88rem' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="input-modern"
            style={{ height: '40px', fontSize: '0.88rem', padding: '0 12px' }}
          >
            <option value="All">All Categories</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Mansion">Mansion</option>
            <option value="Commercial">Commercial</option>
          </select>

          <select 
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="input-modern"
            style={{ height: '40px', fontSize: '0.88rem', padding: '0 12px' }}
          >
            <option value="All">All Locations</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Surat">Surat</option>
            <option value="Vadodara">Vadodara</option>
            <option value="Pune">Pune</option>
            <option value="Delhi">Delhi</option>
            <option value="Bengaluru">Bengaluru</option>
          </select>
        </div>
      </div>

      {/* Properties Table */}
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden'
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-warm)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Property</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Type & Location</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Price</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Specs</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No properties found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProperties.map((prop) => (
                  <tr 
                    key={prop.id}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      transition: 'background 0.2s'
                    }}
                  >
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img 
                          src={prop.image} 
                          alt={prop.title}
                          style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                        />
                        <div>
                          <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{prop.title}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={12} /> {prop.address || prop.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{prop.propertyType}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{prop.location}</div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                        {formatCurrency(prop.price)}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Booking: {formatCurrency(prop.bookingAmount || 100000)}
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                        <span>{prop.bedrooms} Bed</span>
                        <span>•</span>
                        <span>{prop.bathrooms} Bath</span>
                        <span>•</span>
                        <span>{prop.area} sq.ft</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span className={`badge-modern ${prop.status === 'Sold' ? 'badge-sold' : prop.status === 'For Rent' ? 'badge-rent' : 'badge-sale'}`}>
                        {prop.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <Link 
                          to={`/property/${prop.id}`} 
                          target="_blank"
                          title="View Live Listing"
                          style={{
                            padding: '6px 10px',
                            background: 'var(--bg-warm)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            color: 'var(--text-primary)',
                            display: 'inline-flex',
                            alignItems: 'center'
                          }}
                        >
                          <Eye size={14} />
                        </Link>
                        <button 
                          onClick={() => handleOpenEdit(prop)}
                          title="Edit Property"
                          style={{
                            padding: '6px 10px',
                            background: 'var(--bg-warm)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center'
                          }}
                        >
                          <Edit3 size={14} />
                        </button>
                        <button 
                          onClick={() => setDeleteTargetId(prop.id)}
                          title="Delete Listing"
                          style={{
                            padding: '6px 10px',
                            background: 'var(--bg-warm)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            color: '#EF4444',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Listing Modal */}
      {isModalOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <div 
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '800px',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            {/* Modal Header */}
            <div 
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.01em' }}>
                {editingId ? 'Edit Property Listing' : 'Add New Property'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body / Multi-Section Form */}
            <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Section 1: Basic Information */}
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 12px' }}>
                  1. Basic Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Property Title *</label>
                    <input 
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="input-modern"
                      placeholder="e.g., Modern 4BHK Villa at Sunset Valley"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Category *</label>
                    <select 
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="input-modern"
                    >
                      <option value="Villa">Villa</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Mansion">Mansion</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Status *</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="input-modern"
                    >
                      <option value="For Sale">For Sale</option>
                      <option value="Available">Available</option>
                      <option value="For Rent">For Rent</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Pricing & Booking */}
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 12px' }}>
                  2. Pricing & Booking Advance
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Price (INR ₹) *</label>
                    <input 
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="input-modern"
                      placeholder="e.g., 25000000"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Booking Deposit (₹)</label>
                    <input 
                      type="number"
                      value={formData.bookingAmount}
                      onChange={(e) => setFormData({ ...formData, bookingAmount: e.target.value })}
                      className="input-modern"
                      placeholder="e.g., 200000"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Managing Agent</label>
                    <select 
                      value={formData.agent}
                      onChange={(e) => setFormData({ ...formData, agent: e.target.value })}
                      className="input-modern"
                    >
                      {agents.map((ag) => (
                        <option key={ag.id} value={ag.name}>{ag.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Specs & Location */}
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 12px' }}>
                  3. Specifications & Location
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Bedrooms</label>
                    <input 
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      className="input-modern"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Bathrooms</label>
                    <input 
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      className="input-modern"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Area (Sq. Ft.)</label>
                    <input 
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="input-modern"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>City *</label>
                    <select 
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="input-modern"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Surat">Surat</option>
                      <option value="Vadodara">Vadodara</option>
                      <option value="Pune">Pune</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bengaluru">Bengaluru</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Street Address</label>
                  <input 
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="input-modern"
                    placeholder="e.g., 42 Altamount Road, Cumballa Hill, Mumbai"
                  />
                </div>
              </div>

              {/* Section 4: Imagery & Description */}
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 12px' }}>
                  4. Photography & Narrative
                </h3>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Hero Image URL</label>
                  <input 
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="input-modern"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Description</label>
                  <textarea 
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-modern"
                    placeholder="Describe the architectural design, finishes, layout, and views..."
                  ></textarea>
                </div>
              </div>

              {/* Section 5: Amenities */}
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 12px' }}>
                  5. Amenities
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
                  {ALL_AMENITIES.map((amenity) => {
                    const isSelected = formData.amenities?.includes(amenity);
                    return (
                      <div 
                        key={amenity}
                        onClick={() => handleToggleAmenity(amenity)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '6px',
                          background: isSelected ? 'var(--bg-warm)' : '#FFFFFF',
                          border: `1px solid ${isSelected ? 'var(--text-primary)' : 'var(--border-color)'}`,
                          color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.82rem',
                          fontWeight: isSelected ? 600 : 400
                        }}
                      >
                        <div 
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '3px',
                            border: `1px solid ${isSelected ? 'var(--text-primary)' : 'var(--border-color)'}`,
                            background: isSelected ? 'var(--text-primary)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {isSelected && <Check size={12} color="#FFFFFF" />}
                        </div>
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Form Buttons */}
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '12px',
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '20px',
                  marginTop: '10px'
                }}
              >
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                >
                  {editingId ? 'Save Changes' : 'Publish Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deleteTargetId)}
        title="Confirm Property Removal"
        message="Are you sure you wish to delete this property listing? This action cannot be undone."
        confirmText="Confirm Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default AdminProperties;
