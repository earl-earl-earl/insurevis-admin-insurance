// app/(admin)/submissions/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import { Filter, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Pagination from '@/components/ui/pagination';
import styles from './page.module.css'; // Import CSS Module

// Replace the placeholder data with car damage claim data
const submissions = [
  { 
    id: 'CLM-2025-001', 
    claimant: 'John Smith', 
    vehicleModel: '2020 Toyota Camry',
    date: '2025-01-24', 
    status: 'Under Review', 
    damageType: 'Front Bumper Dent', 
    estimatedCost: '$1,200',
    location: 'Iloilo City'
  },
  { 
    id: 'CLM-2025-002', 
    claimant: 'Sarah Wilson', 
    vehicleModel: '2019 Honda Civic',
    date: '2025-01-23', 
    status: 'CNN Analysis Complete', 
    damageType: 'Side Door Scratch', 
    estimatedCost: '$800',
    location: 'Bacolod City'
  },
  { 
    id: 'CLM-2025-003', 
    claimant: 'Mike Johnson', 
    vehicleModel: '2021 Nissan Sentra',
    date: '2025-01-22', 
    status: 'Approved', 
    damageType: 'Rear Panel Crack', 
    estimatedCost: '$950',
    location: 'Roxas City'
  },
  // Add more car damage claims...
];

export default function SubmissionsPage() {
  // Dynamic state for search, filter, and pagination
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter submissions by search and status
  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch =
      sub.id.toLowerCase().includes(search.toLowerCase()) ||
      sub.claimant.toLowerCase().includes(search.toLowerCase()) ||
      sub.vehicleModel.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const paginatedSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Reset to page 1 when filters/search change
  useEffect(() => { setCurrentPage(1); }, [search, statusFilter]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Claims Management</h1>
        <Button aria-label="Add new claim" title="Add new claim">
          <PlusCircle className={styles.actionButtonIcon} />
          New Claim {/* Updated for insurance context */}
        </Button>
      </div>
      <Card>
        <CardHeader className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>All Claims</h3>
          <div className={styles.filterControls}>
            <div className={styles.searchWrapper}>
              <Input
                type="search"
                placeholder="Search claims..."
                className={styles.searchInput}
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search claims"
              />
              <i className="fa-regular fa-magnifying-glass"></i>
            </div>
            <Button
              variant="ghost"
              aria-label="Show filter options"
              title="Show filter options"
              onClick={() => setStatusFilter(statusFilter === 'All' ? 'Approved' : 'All')}
            >
              <Filter className={styles.actionButtonIcon} />
              {statusFilter === 'All' ? 'Approved Only' : 'Show All'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <Thead>
              <Tr>
                <Th>Claim ID</Th>
                <Th>Claimant</Th>
                <Th>Vehicle Model</Th>
                <Th>Date Submitted</Th>
                <Th>Damage Type</Th>
                <Th>Est. Cost</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedSubmissions.map((submission) => (
                <Tr key={submission.id}>
                  <Td>{submission.id}</Td>
                  <Td>{submission.claimant}</Td>
                  <Td>{submission.vehicleModel}</Td>
                  <Td>{submission.date}</Td>
                  <Td>{submission.damageType}</Td>
                  <Td>{submission.estimatedCost}</Td>
                  <Td>
                    <span className={`
                      ${styles.statusBadge}
                      ${submission.status === 'Pending' ? styles.statusPending :
                        submission.status === 'Approved' ? styles.statusApproved :
                        submission.status === 'Under Review' ? styles.statusPending :
                        styles.statusRejected}
                    `}>
                      {submission.status}
                    </span>
                  </Td>
                  <Td>
                    <Link href={`/submissions/${submission.id.toLowerCase()}`}>
                      <Button variant="ghost" size="sm" aria-label="View claim details" title="View claim details">
                        View Details
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredSubmissions.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onPrevious={handlePrevious}
            onNext={handleNext}
            itemName="claims"
          />
        </CardContent>
      </Card>
    </div>
  );
}