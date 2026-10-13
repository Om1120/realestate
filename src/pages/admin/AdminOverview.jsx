// src/pages/admin/AdminOverview.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardCard from '../../components/DashboardCard';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { 
  Building, 
  Users, 
  MessageSquare, 
  CreditCard, 
  ArrowRight,
  Plus
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminOverview = () => {
  const properties = useSelector((state) => state.properties.items);
  const agents = useSelector((state) => state.agents.items);
  const customers = useSelector((state) => state.customers.items);
  const inquiries = useSelector((state) => state.inquiries.items);
  const appointments = useSelector((state) => state.appointments.items);
  const transactions = useSelector((state) => state.transactions.items);

  const availableCount = properties.filter((p) => p.status === 'Available' || p.status === 'For Sale').length;
  const soldCount = properties.filter((p) => p.status === 'Sold').length;
  const rentedCount = properties.filter((p) => p.status === 'For Rent' || p.status === 'Rented').length;

  const totalTransactionVolume = transactions.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  // Chart 1 Data: Status Breakdown
  const statusDoughnutData = {
    labels: ['Available / For Sale', 'Sold', 'For Rent'],
    datasets: [
      {
        data: [availableCount, soldCount, rentedCount],
        backgroundColor: ['#111418', '#6B7280', '#D1D5DB'],
        borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
        borderWidth: 2
      }
    ]
  };

  // Chart 2 Data: Monthly Inquiries vs Appointments
  const barChartData = {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Inquiries',
        data: [14, 22, 19, 28, 35, 42],
        backgroundColor: '#111418',
        borderRadius: 4
      },
      {
        label: 'Viewing Tours',
        data: [8, 12, 11, 16, 20, 26],
        backgroundColor: '#9CA3AF',
        borderRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#4B5563',
          font: { family: "'Plus Jakarta Sans', sans-serif", size: 12 }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#6B7280' },
        grid: { color: '#F3F4F6' }
      },
      y: {
        ticks: { color: '#6B7280' },
        grid: { color: '#F3F4F6' }
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            Overview
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Here's what's happening across your property portfolio today.
          </p>
        </div>

        <Link to="/admin/properties" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={16} /> Add Property
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px'
        }}
      >
        <DashboardCard 
          title="Total Properties" 
          value={properties.length} 
          subtitle={`${availableCount} Available • ${soldCount} Sold`} 
          icon={Building}
          trend="+12% this quarter"
        />
        <DashboardCard 
          title="Simulated Volume" 
          value={formatCurrency(totalTransactionVolume)} 
          subtitle="Token deposits received" 
          icon={CreditCard}
          trend="+28% growth"
        />
        <DashboardCard 
          title="Registered Clients" 
          value={customers.length} 
          subtitle="Active client accounts" 
          icon={Users}
        />
        <DashboardCard 
          title="Inquiries" 
          value={inquiries.length} 
          subtitle={`${inquiries.filter((i) => i.status === 'New').length} pending response`} 
          icon={MessageSquare}
        />
      </div>

      {/* Interactive Charts Suite */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 0.7fr',
          gap: '24px'
        }}
        className="analytics-charts-grid"
      >
        {/* Bar Chart: Lead Volume */}
        <div 
          style={{
            padding: '24px',
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            height: '360px'
          }}
        >
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 16px' }}>
            Inquiry & Tour Activity
          </h3>
          <div style={{ height: '270px' }}>
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        {/* Doughnut Chart: Status Breakdown */}
        <div 
          style={{
            padding: '24px',
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            height: '360px'
          }}
        >
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 16px' }}>
            Portfolio Status
          </h3>
          <div style={{ height: '270px' }}>
            <Doughnut 
              data={statusDoughnutData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { color: '#4B5563', font: { size: 12 } }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Recent Inquiries & Transactions Tables */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px'
        }}
        className="analytics-tables-grid"
      >
        {/* Recent Inquiries */}
        <div 
          style={{
            padding: '24px',
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Recent Inquiries
            </h3>
            <Link to="/admin/inquiries" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {inquiries.slice(0, 4).map((inq) => (
              <div 
                key={inq.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  background: 'var(--bg-warm)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600 }}>{inq.customerName}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{inq.propertyTitle}</div>
                </div>
                <span className="badge-modern badge-sale" style={{ fontSize: '0.7rem' }}>
                  {inq.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div 
          style={{
            padding: '24px',
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Recent Transactions
            </h3>
            <Link to="/admin/transactions" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {transactions.slice(0, 4).map((txn) => (
              <div 
                key={txn.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  background: 'var(--bg-warm)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600 }}>{txn.customerName}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{txn.id} • {txn.paymentMethod}</div>
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  {formatCurrency(txn.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .analytics-charts-grid, .analytics-tables-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminOverview;
