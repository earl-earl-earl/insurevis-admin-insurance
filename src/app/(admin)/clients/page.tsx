'use client';

// app/(admin)/clients/page.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import Pagination from '@/components/ui/pagination';
import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// Update the clients data to reflect vehicle owners
const clients = [
  { 
    id: 'POL001', 
    name: 'John Smith', 
    email: 'john.smith@email.com', 
    phone: '(555) 123-4567', 
    vehicleCount: 2,
    policyNumber: 'INS-2024-001', 
    policyType: 'Comprehensive Auto Insurance',
    status: 'Active', 
    joinDate: '2023-03-15',
    location: 'Iloilo City'
  },
  { 
    id: 'POL002', 
    name: 'Sarah Wilson', 
    email: 'sarah.wilson@email.com', 
    phone: '(555) 234-5678', 
    vehicleCount: 1,
    policyNumber: 'INS-2024-002', 
    policyType: 'Third Party Only',
    status: 'Active', 
    joinDate: '2023-06-20',
    location: 'Cebu City'
  },
  { 
    id: 'POL003', 
    name: 'Mike Johnson', 
    email: 'mike.johnson@email.com', 
    phone: '(555) 345-6789', 
    vehicleCount: 3,
    policyNumber: 'INS-2024-003', 
    policyType: 'Comprehensive Auto Insurance',
    status: 'Active', 
    joinDate: '2023-01-10',
    location: 'Davao City'
  },
  { 
    id: 'POL004', 
    name: 'Emily Davis', 
    email: 'emily.davis@email.com', 
    phone: '(555) 456-7890', 
    vehicleCount: 2,
    policyNumber: 'INS-2024-004', 
    policyType: 'Collision Coverage',
    status: 'Inactive', 
    joinDate: '2023-08-05',
    location: 'Zamboanga City'
  },
  { 
    id: 'POL005', 
    name: 'Robert Brown', 
    email: 'robert.brown@email.com', 
    phone: '(555) 567-8901', 
    vehicleCount: 1,
    policyNumber: 'INS-2024-005', 
    policyType: 'Liability Coverage',
    status: 'Active', 
    joinDate: '2023-02-28',
    location: 'Iloilo City'
  },
  { 
    id: 'POL006', 
    name: 'Lisa Garcia', 
    email: 'lisa.garcia@email.com', 
    phone: '(555) 678-9012', 
    vehicleCount: 2,
    policyNumber: 'INS-2024-006', 
    policyType: 'Comprehensive Auto Insurance',
    status: 'Active', 
    joinDate: '2023-04-12',
    location: 'Cebu City'
  },
  { 
    id: 'POL007', 
    name: 'David Thompson', 
    email: 'david.thompson@email.com', 
    phone: '(555) 789-0123', 
    vehicleCount: 1,
    policyNumber: 'INS-2024-007', 
    policyType: 'Third Party Only',
    status: 'Active', 
    joinDate: '2023-07-18',
    location: 'Davao City'
  },
  { 
    id: 'POL008', 
    name: 'Jennifer Lee', 
    email: 'jennifer.lee@email.com', 
    phone: '(555) 890-1234', 
    vehicleCount: 3,
    policyNumber: 'INS-2024-008', 
    policyType: 'Comprehensive Auto Insurance',
    status: 'Active', 
    joinDate: '2023-05-30',
    location: 'Zamboanga City'
  },
  { 
    id: 'POL009', 
    name: 'Kevin Miller', 
    email: 'kevin.miller@email.com', 
    phone: '(555) 901-2345', 
    vehicleCount: 2,
    policyNumber: 'INS-2024-009', 
    policyType: 'Collision Coverage',
    status: 'Suspended', 
    joinDate: '2023-09-14',
    location: 'Iloilo City'
  },
  { 
    id: 'POL010', 
    name: 'Amanda Wilson', 
    email: 'amanda.wilson@email.com', 
    phone: '(555) 012-3456', 
    vehicleCount: 1,
    policyNumber: 'INS-2024-010', 
    policyType: 'Liability Coverage',
    status: 'Active', 
    joinDate: '2023-11-22',
    location: 'Cebu City'
  },
  { 
    id: 'POL011', 
    name: 'Christopher Davis', 
    email: 'chris.davis@email.com', 
    phone: '(555) 123-5678', 
    vehicleCount: 2,
    policyNumber: 'INS-2024-011', 
    policyType: 'Comprehensive Auto Insurance',
    status: 'Active', 
    joinDate: '2023-10-08',
    location: 'Davao City'
  },
  { 
    id: 'POL012', 
    name: 'Emma Taylor', 
    email: 'emma.taylor@email.com', 
    phone: '(555) 234-6789', 
    vehicleCount: 1,
    policyNumber: 'INS-2024-012', 
    policyType: 'Third Party Only',
    status: 'Active', 
    joinDate: '2023-12-03',
    location: 'Zamboanga City'
  },
];

export default function ClientsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Calculate pagination
  const totalPages = Math.ceil(clients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = clients.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleToggleStatus = (clientId: string, currentStatus: string) => {
    console.log(`Toggling status for client ${clientId}. Current: ${currentStatus}`);
    // API call to update client status
  };

  const handleEditClient = (clientId: string) => {
    console.log(`Editing client ${clientId}`);
    // Navigate to edit client page or open modal
  };

  const handleDeleteClient = (clientId: string) => {
    if (confirm(`Are you sure you want to delete client ${clientId}?`)) {
        console.log(`Deleting client ${clientId}`);
        // API call to delete client
    }
  };

  const handleContactClient = (clientId: string, method: 'phone' | 'email') => {
    console.log(`Contacting client ${clientId} via ${method}`);
    // Implement contact functionality
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Policyholders</h1>
        <Button onClick={() => console.log('Add new client clicked')}>
          <i className="fa-regular fa-circle-plus"></i>
          <span className={styles.buttonText}>Add New Policyholder</span>
        </Button>
      </div>

      <Card>
        <CardHeader className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>All Policyholders</h3>
          <div className={styles.filterControls}>
            <div className={styles.searchWrapper}>
              <i className="fa-regular fa-magnifying-glass"></i>
              <Input type="search" placeholder="Search policyholders..." className={styles.searchInput} />
            </div>
            <Button variant="ghost" className={styles.filterButton}>
              <i className="fa-regular fa-filter mr-2"></i>
              Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className={styles.tableCardContent}>
          <div className={styles.tableContainer}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Policy Info</Th>
                  <Th>Policyholder</Th>
                  <Th>Location</Th>
                  <Th>Vehicles</Th>
                  <Th>Status</Th>
                  <Th className={styles.actionsHeader}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentClients.map((client) => (
                  <Tr key={client.id}>
                    <Td>
                      <div className={styles.policyInfo}>
                        <div className={styles.policyId}>{client.policyNumber}</div>
                        <div className={styles.policyType}>{client.policyType}</div>
                        <div className={styles.policyDate}>
                          <i className="fa-regular fa-calendar mr-1"></i>
                          Since {new Date(client.joinDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <div className={styles.clientInfo}>
                        <div className={styles.clientAvatar}>
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className={styles.clientDetails}>
                          <div className={styles.clientName}>{client.name}</div>
                          <div className={styles.clientEmail}>
                            <i className="fa-regular fa-envelope"></i>
                            {client.email}
                          </div>

                          <div className={styles.clientPhone}>
                            <i className="fa-regular fa-phone"></i>
                            {client.phone}
                          </div>
                        </div>
                      </div>
                    </Td>
                    <Td>{client.location}</Td>
                    <Td>
                      <div className={styles.vehicleBadge}>
                        <i className="fa-regular fa-cars mr-1"></i>
                        {client.vehicleCount} {client.vehicleCount === 1 ? 'vehicle' : 'vehicles'}
                      </div>
                    </Td>
                    <Td>
                      <span className={`
                        ${styles.statusBadge}
                        ${client.status === 'Active' ? styles.statusActive : 
                          client.status === 'Inactive' ? styles.statusInactive : 
                          styles.statusSuspended}
                      `}>
                        <i className={`fa-regular ${
                          client.status === 'Active' ? 'fa-circle-check' : 
                          client.status === 'Inactive' ? 'fa-circle-pause' : 
                          'fa-circle-exclamation'
                        } mr-1`}></i>
                        {client.status}
                      </span>
                    </Td>
                    <Td className={styles.actionsCell}>
                      <div className={styles.actionButtons}>
                        <Link href={`/clients/${client.id}`}>
                          <button aria-label='button' className={styles.actionButton} data-tooltip="View Details">
                            <i className="fa-regular fa-eye"></i>
                          </button>
                        </Link>
                        <button aria-label='button'
                          className={styles.actionButton} 
                          onClick={() => handleContactClient(client.id, 'phone')}
                          data-tooltip="Call"
                        >
                          <i className="fa-regular fa-phone"></i>
                        </button>
                        <button aria-label='button'
                          className={styles.actionButton} 
                          onClick={() => handleContactClient(client.id, 'email')}
                          data-tooltip="Email"
                        >
                          <i className="fa-regular fa-envelope"></i>
                        </button>
                        <button aria-label='button'
                          className={styles.actionButton} 
                          onClick={() => handleEditClient(client.id)}
                          data-tooltip="Edit"
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button aria-label='button'
                          className={`${styles.actionButton} ${styles.deleteAction}`}
                          onClick={() => handleDeleteClient(client.id)}
                          data-tooltip="Delete"
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
          
          {/* Pagination Component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={clients.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onPrevious={handlePrevious}
            onNext={handleNext}
            itemName="policyholders"
          />
        </CardContent>
      </Card>
    </div>
  );
}