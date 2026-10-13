// src/pages/admin/AdminPropertyForm.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addProperty, updateProperty } from '../../redux/slices/propertySlice';
import { showToast } from '../../redux/slices/uiSlice';
import { propertyFormSchema } from '../../schemas/validationSchemas';
import { generateId } from '../../utils/formatters';
import { ArrowLeft, Save, Check } from 'lucide-react';

const AVAILABLE_AMENITIES = [
  'Swimming Pool', 'Infinity Pool', 'Private Elevator', '24/7 Security & CCTV',
  'Smart Home Automation', 'Landscaped Garden', 'Gymnasium & Spa', '4+ Covered Parking',
  'Power Backup', 'Club House', 'Wine Cellar', 'Staff Quarters', 'Helipad Access',
  'Italian Marble', 'Home Theatre Room', 'Zen Garden', 'Terrace Barbecue Pergola'
];

const AdminPropertyForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const properties = useSelector((state) => state.properties.items);
  const categories = useSelector((state) => state.categories.items);
  const agents = useSelector((state) => state.agents.items);

  const existingProperty = isEditMode ? properties.find((p) => p.id === id) : null;

  const [selectedAmenities, setSelectedAmenities] = useState(
    existingProperty?.amenities || ['Swimming Pool', '24/7 Security & CCTV', 'Smart Home Automation', 'Gymnasium & Spa']
  );

  const formik = useFormik({
    initialValues: {
      title: existingProperty?.title || '',
      category: existingProperty?.category || 'Houses & Villas',
      propertyType: existingProperty?.propertyType || 'Villa',
      status: existingProperty?.status || 'For Sale',
      price: existingProperty?.price || 45000000,
      bookingAmount: existingProperty?.bookingAmount || 500000,
      bedrooms: existingProperty?.bedrooms ?? 4,
      bathrooms: existingProperty?.bathrooms ?? 4,
      area: existingProperty?.area || 4500,
      location: existingProperty?.location || 'Ahmedabad',
      address: existingProperty?.address || '',
      description: existingProperty?.description || '',
      imageUrl: existingProperty?.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      agentId: existingProperty?.agentId || (agents[0]?.id || 'agt-1')
    },
    enableReinitialize: true,
    validationSchema: propertyFormSchema,
    onSubmit: async (values) => {
      const propertyPayload = {
        id: isEditMode ? existingProperty.id : generateId('AUR'),
        slug: values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: values.title,
        category: values.category,
        propertyType: values.propertyType,
        status: values.status,
        price: Number(values.price),
        bookingAmount: Number(values.bookingAmount),
        bedrooms: Number(values.bedrooms),
        bathrooms: Number(values.bathrooms),
        area: Number(values.area),
        location: values.location,
        address: values.address,
        coordinates: existingProperty?.coordinates || { lat: 23.0338, lng: 72.585 },
        description: values.description,
        featured: existingProperty?.featured || false,
        images: [values.imageUrl, ...(existingProperty?.images?.slice(1) || [])],
        amenities: selectedAmenities,
        agentId: values.agentId,
        createdAt: existingProperty?.createdAt || new Date().toISOString()
      };

      if (isEditMode) {
        dispatch(updateProperty(propertyPayload));
        dispatch(showToast({ type: 'success', title: 'Listing Updated', message: `${values.title} updated successfully.` }));
      } else {
        dispatch(addProperty(propertyPayload));
        dispatch(showToast({ type: 'success', title: 'Property Published', message: `${values.title} added to listings.` }));
      }

      navigate('/admin/properties');
    }
  });

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            type="button"
            onClick={() => navigate('/admin/properties')}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
          >
            <ArrowLeft size={14} /> Back
          </button>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            {isEditMode ? `Edit Property: ${existingProperty?.title}` : 'Add New Property'}
          </h1>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Section 1: Basic Information */}
        <div style={{ padding: '28px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 18px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            1. Basic Information
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>
                Property Title *
              </label>
              <input 
                type="text"
                name="title"
                placeholder="e.g. Modern 4BHK Residence at Ambli"
                className="input-modern"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title && (
                <span style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{formik.errors.title}</span>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>Category *</label>
                <select 
                  name="category"
                  className="input-modern"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>Property Type *</label>
                <select 
                  name="propertyType"
                  className="input-modern"
                  value={formik.values.propertyType}
                  onChange={formik.handleChange}
                >
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Heritage Mansions">Heritage Mansions</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>Status *</label>
                <select 
                  name="status"
                  className="input-modern"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                >
                  <option value="For Sale">For Sale</option>
                  <option value="Available">Available</option>
                  <option value="For Rent">For Rent</option>
                  <option value="Sold">Sold</option>
                  <option value="Rented">Rented</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Pricing & Deposit */}
        <div style={{ padding: '28px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 18px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            2. Pricing & Booking Deposit
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>
                Full Property Price (INR ₹) *
              </label>
              <input 
                type="number"
                name="price"
                placeholder="45000000"
                className="input-modern"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.price && formik.errors.price && (
                <span style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{formik.errors.price}</span>
              )}
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>
                Online Reservation Token (INR ₹) *
              </label>
              <input 
                type="number"
                name="bookingAmount"
                placeholder="500000"
                className="input-modern"
                value={formik.values.bookingAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.bookingAmount && formik.errors.bookingAmount && (
                <span style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{formik.errors.bookingAmount}</span>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Physical Specifications */}
        <div style={{ padding: '28px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 18px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            3. Physical Specifications
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>Bedrooms *</label>
              <input 
                type="number"
                name="bedrooms"
                className="input-modern"
                value={formik.values.bedrooms}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>Bathrooms *</label>
              <input 
                type="number"
                name="bathrooms"
                className="input-modern"
                value={formik.values.bathrooms}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>Area (Sq.Ft) *</label>
              <input 
                type="number"
                name="area"
                className="input-modern"
                value={formik.values.area}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>

        {/* Section 4: Location */}
        <div style={{ padding: '28px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 18px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            4. Location
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>City *</label>
              <select 
                name="location"
                className="input-modern"
                value={formik.values.location}
                onChange={formik.handleChange}
              >
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Surat">Surat</option>
                <option value="Vadodara">Vadodara</option>
                <option value="Pune">Pune</option>
                <option value="Delhi">Delhi</option>
                <option value="Bengaluru">Bengaluru</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>Detailed Address *</label>
              <input 
                type="text"
                name="address"
                placeholder="e.g. Ambli-Bopal Avenue, Off SG Highway, Ahmedabad"
                className="input-modern"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.address && formik.errors.address && (
                <span style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{formik.errors.address}</span>
              )}
            </div>
          </div>
        </div>

        {/* Section 5: Description & Imagery */}
        <div style={{ padding: '28px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 18px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            5. Description & Photography
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>Description *</label>
              <textarea 
                name="description"
                rows={4}
                className="input-modern"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && (
                <span style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{formik.errors.description}</span>
              )}
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>Main Image URL *</label>
              <input 
                type="url"
                name="imageUrl"
                className="input-modern"
                value={formik.values.imageUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.imageUrl && formik.errors.imageUrl && (
                <span style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{formik.errors.imageUrl}</span>
              )}
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'block' }}>Assigned Agent *</label>
              <select 
                name="agentId"
                className="input-modern"
                value={formik.values.agentId}
                onChange={formik.handleChange}
              >
                {agents.map((agt) => (
                  <option key={agt.id} value={agt.id}>{agt.name} ({agt.location})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 6: Amenities Checklist */}
        <div style={{ padding: '28px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 18px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            6. Amenities Checklist
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
            {AVAILABLE_AMENITIES.map((item) => {
              const isChecked = selectedAmenities.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleAmenity(item)}
                  style={{
                    padding: '10px 14px',
                    textAlign: 'left',
                    borderRadius: '8px',
                    background: isChecked ? 'var(--bg-warm)' : '#FFFFFF',
                    border: `1px solid ${isChecked ? 'var(--text-primary)' : 'var(--border-color)'}`,
                    color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: '0.82rem',
                    fontWeight: isChecked ? 600 : 400,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  <div 
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '3px',
                      border: `1px solid ${isChecked ? 'var(--text-primary)' : 'var(--border-color)'}`,
                      background: isChecked ? 'var(--text-primary)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {isChecked && <Check size={12} color="#FFFFFF" />}
                  </div>
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit & Cancel Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', marginTop: '8px' }}>
          <button
            type="button"
            onClick={() => navigate('/admin/properties')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '10px 24px' }}
          >
            <Save size={16} /> {isEditMode ? 'Save Changes' : 'Publish Property'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPropertyForm;
