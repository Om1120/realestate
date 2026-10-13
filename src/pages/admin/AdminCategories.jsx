// src/pages/admin/AdminCategories.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory, updateCategory, deleteCategory } from '../../redux/slices/categorySlice';
import { showToast } from '../../redux/slices/uiSlice';
import ConfirmationModal from '../../components/ConfirmationModal';
import { Plus, Edit3, Trash2, Search, X } from 'lucide-react';

const INITIAL_CATEGORY_FORM = {
  name: '',
  slug: '',
  description: '',
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
  status: 'Active'
};

const AdminCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const properties = useSelector((state) => state.properties.items);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_CATEGORY_FORM);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(INITIAL_CATEGORY_FORM);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingId(cat.id);
    setFormData(cat);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      dispatch(showToast({ type: 'error', title: 'Validation Error', message: 'Category name is required.' }));
      return;
    }

    const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-');
    const payload = {
      ...formData,
      slug,
      propertyCount: formData.propertyCount || 0
    };

    if (editingId) {
      dispatch(updateCategory(payload));
      dispatch(showToast({ type: 'success', title: 'Category Updated', message: `Category "${formData.name}" saved successfully.` }));
    } else {
      const newCategory = {
        ...payload,
        id: `cat-${Date.now()}`
      };
      dispatch(addCategory(newCategory));
      dispatch(showToast({ type: 'success', title: 'Category Created', message: `Category "${formData.name}" created.` }));
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      dispatch(deleteCategory(deleteTargetId));
      dispatch(showToast({ type: 'info', title: 'Category Deleted', message: 'Category removed successfully.' }));
      setDeleteTargetId(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            Categories
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Curate property typologies (Villas, Mansions, Penthouses, Commercial).
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Toolbar */}
      <div 
        style={{
          padding: '16px 20px',
          background: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-modern"
            style={{ width: '100%', paddingLeft: '38px', height: '40px', fontSize: '0.88rem' }}
          />
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Total Categories: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{categories.length}</span>
        </div>
      </div>

      {/* Categories Grid / Cards */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px'
        }}
      >
        {filteredCategories.map((cat) => {
          const count = properties.filter((p) => p.propertyType?.toLowerCase() === cat.slug?.toLowerCase() || p.propertyType?.toLowerCase().includes(cat.name.toLowerCase().split(' ')[0])).length || cat.propertyCount || 0;

          return (
            <div 
              key={cat.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ height: '160px', position: 'relative' }}>
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)'
                  }}
                />
                <div style={{ position: 'absolute', bottom: '14px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: 700, margin: '0 0 2px' }}>
                      {cat.name}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: '#E5E7EB', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Slug: {cat.slug}
                    </span>
                  </div>
                  <span 
                    style={{
                      background: cat.status === 'Active' ? '#FFFFFF' : '#F3F4F6',
                      color: cat.status === 'Active' ? '#111418' : '#6B7280',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '12px'
                    }}
                  >
                    {cat.status || 'Active'}
                  </span>
                </div>
              </div>

              <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', margin: '0 0 16px' }}>
                  {cat.description}
                </p>

                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border-color)'
                  }}
                >
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{count}</strong> Properties
                  </span>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleOpenEdit(cat)}
                      style={{
                        padding: '6px 10px',
                        background: 'var(--bg-warm)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        color: 'var(--text-primary)',
                        cursor: 'pointer'
                      }}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button 
                      onClick={() => setDeleteTargetId(cat.id)}
                      style={{
                        padding: '6px 10px',
                        background: 'var(--bg-warm)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        color: '#EF4444',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
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
              maxWidth: '520px',
              padding: '24px',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {editingId ? 'Edit Category' : 'New Category'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Category Name *</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-modern"
                  placeholder="e.g., Waterfront Villas"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>URL Slug</label>
                <input 
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="input-modern"
                  placeholder="e.g., waterfront-villas"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Image URL</label>
                <input 
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="input-modern"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Description</label>
                <textarea 
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-modern"
                  placeholder="Category narrative for buyers..."
                ></textarea>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px' }}>Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="input-modern"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingId ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Category"
        message="Are you sure you want to remove this category? Existing property records will be preserved."
        confirmText="Confirm Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};

export default AdminCategories;
