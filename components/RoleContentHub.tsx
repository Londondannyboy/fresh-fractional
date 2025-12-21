import React from 'react';
import Link from 'next/link';

interface RoleContentHubProps {
  currentRole: 'cfo' | 'cto' | 'cmo' | 'coo' | 'ceo' | 'chro' | 'ciso';
}

interface RoleLink {
  role: string;
  path: string;
  label: string;
}

const RoleContentHub: React.FC<RoleContentHubProps> = ({ currentRole }) => {
  const executiveRoles: RoleLink[] = [
    { role: 'cfo', path: '/fractional-cfo-jobs-uk', label: 'CFO Jobs' },
    { role: 'cto', path: '/fractional-cto-jobs-uk', label: 'CTO Jobs' },
    { role: 'cmo', path: '/fractional-cmo-jobs-uk', label: 'CMO Jobs' },
    { role: 'coo', path: '/fractional-coo-jobs-uk', label: 'COO Jobs' },
    { role: 'ceo', path: '/fractional-ceo-jobs-uk', label: 'CEO Jobs' },
    { role: 'chro', path: '/fractional-chro-jobs-uk', label: 'CHRO Jobs' },
    { role: 'ciso', path: '/fractional-ciso-jobs-uk', label: 'CISO Jobs' },
  ];

  const roleGuides: RoleLink[] = [
    { role: 'cfo', path: '/fractional-cfo', label: 'What is a Fractional CFO' },
    { role: 'cto', path: '/fractional-cto', label: 'What is a Fractional CTO' },
    { role: 'cmo', path: '/fractional-cmo', label: 'What is a Fractional CMO' },
    { role: 'coo', path: '/fractional-coo', label: 'What is a Fractional COO' },
    { role: 'chro', path: '/fractional-chro', label: 'What is a Fractional CHRO' },
    { role: 'ciso', path: '/fractional-ciso', label: 'What is a Fractional CISO' },
  ];

  const salaryGuides: RoleLink[] = [
    { role: 'cfo', path: '/fractional-cfo-salary', label: 'CFO Salary' },
    { role: 'cto', path: '/fractional-cto-salary', label: 'CTO Salary' },
    { role: 'cmo', path: '/fractional-cmo-salary', label: 'CMO Salary' },
    { role: 'coo', path: '/fractional-coo-salary', label: 'COO Salary' },
  ];

  const services: RoleLink[] = [
    { role: 'cfo', path: '/fractional-cfo-services', label: 'CFO Services' },
    { role: 'cto', path: '/fractional-cto-services', label: 'CTO Services' },
    { role: 'cmo', path: '/fractional-cmo-services', label: 'CMO Services' },
    { role: 'coo', path: '/fractional-coo-services', label: 'COO Services' },
    { role: 'chro', path: '/fractional-chro-services', label: 'CHRO Services' },
    { role: 'ciso', path: '/fractional-ciso-services', label: 'CISO Services' },
  ];

  const interimRoles: RoleLink[] = [
    { role: 'cfo', path: '/interim-cfo', label: 'Interim CFO' },
    { role: 'cto', path: '/interim-cto', label: 'Interim CTO' },
    { role: 'cmo', path: '/interim-cmo', label: 'Interim CMO' },
    { role: 'coo', path: '/interim-coo', label: 'Interim COO' },
    { role: 'ceo', path: '/interim-ceo', label: 'Interim CEO' },
    { role: 'chro', path: '/interim-chro', label: 'Interim CHRO' },
    { role: 'ciso', path: '/interim-ciso', label: 'Interim CISO' },
  ];

  const renderRoleLink = (roleLink: RoleLink) => {
    const isCurrentRole = roleLink.role === currentRole;

    if (isCurrentRole) {
      return (
        <span
          key={roleLink.path}
          className="block px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-md border-2 border-blue-200"
        >
          {roleLink.label}
        </span>
      );
    }

    return (
      <Link
        key={roleLink.path}
        href={roleLink.path}
        className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-150 border border-gray-200 hover:border-blue-300"
      >
        {roleLink.label}
      </Link>
    );
  };

  return (
    <section className="mt-16 mb-12 bg-gray-50 rounded-lg p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Explore More Fractional Roles
        </h2>

        <div className="space-y-8">
          {/* Executive Roles */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Executive Roles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {executiveRoles.map(renderRoleLink)}
            </div>
          </div>

          {/* Role Guides */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Role Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {roleGuides.map(renderRoleLink)}
            </div>
          </div>

          {/* Salary & Cost Guides */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Salary & Cost Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {salaryGuides.map(renderRoleLink)}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {services.map(renderRoleLink)}
            </div>
          </div>

          {/* Interim Roles */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Interim Roles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {interimRoles.map(renderRoleLink)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleContentHub;
