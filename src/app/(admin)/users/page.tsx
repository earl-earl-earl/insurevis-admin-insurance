'use client';

// app/(admin)/users/page.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import Pagination from '@/components/ui/pagination';
import { useState, useEffect } from 'react';
import styles from './page.module.css'; // Import CSS Module
import { Filter, PlusCircle } from 'lucide-react';

// Update users data for insurance staff
const users = [
  { 
    id: 'USR001', 
    name: 'Maria Santos', 
    email: 'maria.santos@insurevis.com', 
    role: 'Senior Claims Adjuster', 
    department: 'Claims Processing',
    lastLogin: '2025-01-24 14:30', 
    status: 'Active',
    location: 'Iloilo Branch'
  },
  { 
    id: 'USR002', 
    name: 'Carlos Dela Cruz', 
    email: 'carlos.delacruz@insurevis.com', 
    role: 'CNN Model Specialist', 
    department: 'AI/Tech Operations',
    lastLogin: '2025-01-24 13:45', 
    status: 'Active',
    location: 'Main Office'
  },
  // Add more insurance staff...
];

export default function UsersPage() {
  // Dynamic state for search, filter, and pagination
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter users by search and status
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Reset to page 1 when filters/search change
  useEffect(() => { setCurrentPage(1); }, [search, statusFilter]);

  const handleToggleStatus = (userId: string, currentStatus: string) => {
    console.log(`Toggling status for user ${userId}. Current: ${currentStatus}`);
    // API call to update user status
  };

  const handleEditUser = (userId: string) => {
    console.log(`Editing user ${userId}`);
    // Navigate to edit user page or open modal
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm(`Are you sure you want to delete user ${userId}?`)) {
        console.log(`Deleting user ${userId}`);
        // API call to delete user
    }
  };

  const handleAddUser = () => {
    console.log('Add new user clicked');
    // Logic to add a new user
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Users</h1>
        <div className={styles.headerActions}>
          <Button onClick={handleAddUser} aria-label="Add new user" title="Add new user">
            <PlusCircle className={styles.actionButtonIcon} />
            New User
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>All Users</h3>
          <div className={styles.filterControls}>
            <div className={styles.searchWrapper}>
              <Input
                type="search"
                placeholder="Search users..."
                className={styles.searchInput}
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search users"
              />
              <i className="fa-regular fa-magnifying-glass"></i>
            </div>
            <Button
              variant="ghost"
              aria-label="Show filter options"
              title="Show filter options"
              onClick={() => setStatusFilter(statusFilter === 'All' ? 'Active' : 'All')}
            >
              <Filter className={styles.actionButtonIcon} />
              {statusFilter === 'All' ? 'Active Only' : 'Show All'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className={styles.tableContainer}>
            <Table>
              <Thead>
                <Tr>
                  <Th>User ID</Th>
                  <Th>Name/Email</Th>
                  <Th>Department</Th>
                  <Th>Location</Th>
                  <Th>Last Login</Th>
                  <Th>Status</Th>
                  <Th className={styles.actionsHeader}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginatedUsers.map(user => (
                  <Tr key={user.id}>
                    <Td className={styles.idCell}>{user.id}</Td>
                    <Td>
                      <div className={styles.userInfo}>
                        <div className={styles.userAvatar}>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className={styles.userDetails}>
                          <div className={styles.userName}>{user.name}</div>
                          <div className={styles.userEmail}>{user.email}</div>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <div className={styles.metaInfo}>
                        <div className={styles.primaryText}>{user.department}</div>
                        <div className={styles.secondaryText}>{user.role}</div>
                      </div>
                    </Td>
                    <Td>{user.location}</Td>
                    <Td>
                      <div className={styles.timeInfo}>
                        <i className="fa-regular fa-clock"></i>
                        <span>{new Date(user.lastLogin).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                    </Td>
                    <Td>
                      <span className={`
                        ${styles.statusBadge}
                        ${user.status === 'Active' ? styles.statusActive : styles.statusInactive}
                      `}>
                        <i className={`fa-regular ${user.status === 'Active' ? 'fa-circle-check' : 'fa-circle-pause'}`}></i>
                        {user.status}
                      </span>
                    </Td>
                    <Td className={styles.actionsCell}>
                      <div className={styles.actionButtons}>
                        <button 
                          className={styles.actionButton} 
                          onClick={() => handleToggleStatus(user.id, user.status)}
                          aria-label={`${user.status === 'Active' ? 'Deactivate' : 'Activate'} user`}
                          title={`${user.status === 'Active' ? 'Deactivate' : 'Activate'} user`}
                          data-tooltip={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        >
                          <i className={`fa-regular ${user.status === 'Active' ? 'fa-toggle-on' : 'fa-toggle-off'}`}></i>
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.editAction}`}
                          onClick={() => handleEditUser(user.id)}
                          aria-label="Edit user"
                          title="Edit user"
                          data-tooltip="Edit"
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.deleteAction}`}
                          onClick={() => handleDeleteUser(user.id)}
                          aria-label="Delete user"
                          title="Delete user"
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredUsers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onPrevious={handlePrevious}
            onNext={handleNext}
            itemName="users"
          />
        </CardContent>
      </Card>
    </div>
  );
}