// src/pages/public/AgentsPage.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AgentCard from '../../components/AgentCard';
import { Search } from 'lucide-react';

const AgentsPage = () => {
  const agents = useSelector((state) => state.agents.items);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = agents.filter((agent) => {
    const q = searchTerm.toLowerCase();
    return (
      agent.name.toLowerCase().includes(q) ||
      agent.location.toLowerCase().includes(q) ||
      agent.specialization.toLowerCase().includes(q) ||
      agent.role.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ minHeight: '100vh', background: '#FBFBFA', paddingBottom: '90px' }}>
      <div 
        style={{
          background: 'linear-gradient(180deg, #F4F5F7 0%, #FBFBFA 100%)',
          borderBottom: '1px solid #E5E7EB',
          padding: '60px 24px 40px',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            Our Team
          </div>
          <h1 
            style={{ 
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              color: '#111418', 
              margin: '0 0 12px',
              fontWeight: 500
            }}
          >
            Property advisors & consultants
          </h1>
          <p style={{ color: '#4B5563', maxWidth: '540px', margin: '0 auto 28px', fontSize: '0.95rem' }}>
            Work with knowledgeable property advisors dedicated to helping you discover exceptional real estate.
          </p>

          <div style={{ maxWidth: '440px', margin: '0 auto', position: 'relative' }}>
            <Search size={18} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by advisor name, location..."
              className="input-luxury"
              style={{ paddingLeft: '44px', height: '46px', borderRadius: '10px' }}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1360px', margin: '36px auto 0', padding: '0 24px' }}>
        <div style={{ marginBottom: '24px', color: '#4B5563', fontSize: '0.88rem' }}>
          Showing <span style={{ color: '#111418', fontWeight: 700 }}>{filteredAgents.length}</span> advisors
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;
