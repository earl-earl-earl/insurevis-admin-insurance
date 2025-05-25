'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  itemName?: string; // e.g., "users", "clients", "submissions"
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onPrevious,
  onNext,
  itemName = 'items'
}: PaginationProps) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInfo}>
        Showing {startIndex + 1}-{endIndex} of {totalItems} {itemName}
      </div>
      <div className={styles.paginationControls}>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onPrevious}
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          <ChevronLeft className={styles.paginationIcon} />
          Previous
        </Button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "primary" : "ghost"}
            size="sm"
            onClick={() => onPageChange(page)}
            className={styles.paginationButton}
          >
            {page}
          </Button>
        ))}
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onNext}
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
        >
          Next
          <ChevronRight className={styles.paginationIcon} />
        </Button>
      </div>
    </div>
  );
}