// app/(admin)/submissions/page.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import { Filter, PlusCircle } from 'lucide-react';
import Link from 'next/link';
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
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>        <h1 className={styles.pageTitle}>Claims Management</h1>
        <Button>
          <PlusCircle className={styles.actionButtonIcon} />
          New Claim {/* Updated for insurance context */}
        </Button>
      </div>

      <Card>
        <CardHeader className={styles.cardHeader}>          <h3 className={styles.cardTitle}>All Claims</h3>
          <div className={styles.filterControls}>
            <Input type="search" placeholder="Search claims..." className={styles.searchInput} />
            <Button variant="ghost">
              <Filter className={styles.actionButtonIcon} />
              Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <Thead>              <Tr>
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
              {submissions.map((submission) => (
                <Tr key={submission.id}>                  <Td>{submission.id}</Td>
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
                      <Button variant="ghost" size="sm">View Details</Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {/* Placeholder for Pagination */}
          <div className={styles.paginationPlaceholder}>
            Pagination placeholder
          </div>
        </CardContent>
      </Card>
    </div>
  );
}