'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import styles from './page.module.css';

// Sample data for reports
const monthlyClaimsData = [
  { month: 'January', total: 178, approved: 142, rejected: 23, pending: 13, avgProcessingDays: 3.2, totalPayout: '₱2,845,720' },
  { month: 'February', total: 165, approved: 134, rejected: 19, pending: 12, avgProcessingDays: 3.5, totalPayout: '₱2,712,450' },
  { month: 'March', total: 203, approved: 165, rejected: 27, pending: 11, avgProcessingDays: 3.1, totalPayout: '₱3,156,820' },
  { month: 'April', total: 197, approved: 153, rejected: 31, pending: 13, avgProcessingDays: 3.4, totalPayout: '₱2,987,340' },
  { month: 'May', total: 211, approved: 172, rejected: 24, pending: 15, avgProcessingDays: 3.0, totalPayout: '₱3,245,910' },
  { month: 'June', total: 189, approved: 148, rejected: 28, pending: 13, avgProcessingDays: 3.3, totalPayout: '₱2,876,530' },
];

const damageReports = [
  { type: 'Front Bumper Damage', count: 487, avgCost: '₱42,350', mostCommonVehicle: 'Toyota Vios' },
  { type: 'Rear Bumper Damage', count: 412, avgCost: '₱38,750', mostCommonVehicle: 'Honda City' },
  { type: 'Side Panel Damage', count: 356, avgCost: '₱45,200', mostCommonVehicle: 'Mitsubishi Mirage' },
  { type: 'Windshield/Glass Damage', count: 298, avgCost: '₱18,450', mostCommonVehicle: 'Toyota Innova' },
  { type: 'Hood Damage', count: 276, avgCost: '₱32,650', mostCommonVehicle: 'Ford Ranger' },
];

// Top insurance agents data
const topAgents = [
  { name: 'Maria Santos', claims: 87, approvalRate: '94.2%', avgProcessingTime: '2.7 days' },
  { name: 'Juan Cruz', claims: 73, approvalRate: '92.8%', avgProcessingTime: '2.9 days' },
  { name: 'Ana Reyes', claims: 68, approvalRate: '93.5%', avgProcessingTime: '3.0 days' },
  { name: 'Carlos Mendoza', claims: 64, approvalRate: '91.7%', avgProcessingTime: '3.2 days' },
  { name: 'Sofia Bautista', claims: 59, approvalRate: '92.3%', avgProcessingTime: '3.1 days' },
];

export default function ReportsPage() {
  const [reportPeriod, setReportPeriod] = useState('monthly');
  // Dynamic state for search and pagination
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 3;

  // Filter months by search
  const filteredMonths = monthlyClaimsData.filter(item =>
    item.month.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredMonths.length / pageSize);
  const paginatedData = filteredMonths.slice((page - 1) * pageSize, page * pageSize);

  // Calculate summary row for monthly claims
  const summary = filteredMonths.reduce(
    (acc, item) => {
      acc.total += item.total;
      acc.approved += item.approved;
      acc.rejected += item.rejected;
      acc.pending += item.pending;
      acc.avgProcessingDays += item.avgProcessingDays;
      // Remove currency symbol and commas for sum
      acc.totalPayout += Number(item.totalPayout.replace(/[^\d.]/g, ''));
      return acc;
    },
    { total: 0, approved: 0, rejected: 0, pending: 0, avgProcessingDays: 0, totalPayout: 0 }
  );
  summary.avgProcessingDays = filteredMonths.length ? parseFloat((summary.avgProcessingDays / filteredMonths.length).toFixed(1)) : 0;
  const formattedTotalPayout = `₱${summary.totalPayout.toLocaleString()}`;

  // Agent avatar generator (placeholder)
  const getAvatar = (name: string) => (
    <span className={styles.agentAvatar} aria-label={name}>
      <i className="fa-solid fa-user"></i>
    </span>
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Reports</h1>
        <div className={styles.reportControls}>
          <Button 
            variant={reportPeriod === 'monthly' ? 'primary' : 'ghost'}
            onClick={() => setReportPeriod('monthly')}
            aria-label="Show monthly report"
            title="Show monthly report"
          >
            <i className={`fa-regular fa-calendar ${styles.iconMarginRight4}`}></i> Monthly
          </Button>
          <Button 
            variant={reportPeriod === 'quarterly' ? 'primary' : 'ghost'}
            onClick={() => setReportPeriod('quarterly')}
            aria-label="Show quarterly report"
            title="Show quarterly report"
          >
            <i className={`fa-regular fa-calendar-days ${styles.iconMarginRight4}`}></i> Quarterly
          </Button>
          <Button 
            variant={reportPeriod === 'yearly' ? 'primary' : 'ghost'}
            onClick={() => setReportPeriod('yearly')}
            aria-label="Show yearly report"
            title="Show yearly report"
          >
            <i className={`fa-regular fa-calendar-check ${styles.iconMarginRight4}`}></i> Yearly
          </Button>
          <Button variant="secondary" className={styles.exportButton} aria-label="Export report" title="Export report as CSV or PDF">
            <i className={`fa-regular fa-download ${styles.iconMarginRight4}`}></i>
            <span className={styles.exportText}>Export</span>
          </Button>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.statsGrid}>
        <Card>
          <CardContent className={styles.statCardContent}>
            <div>
              <p className={styles.statInfoTitle}>Total Claims</p>
              <p className={styles.statInfoValue}>1,247</p>
              <p className={styles.statInfoDescription}>This year</p>
            </div>
            <span className={styles.statIcon}><i className="fa-regular fa-file-lines"></i></span>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className={styles.statCardContent}>
            <div>
              <p className={styles.statInfoTitle}>Approved Claims</p>
              <p className={styles.statInfoValue}>987</p>
              <p className={styles.statInfoDescription}>79.1% approval rate</p>
            </div>
            <span className={styles.statIcon}><i className="fa-regular fa-circle-check"></i></span>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className={styles.statCardContent}>
            <div>
              <p className={styles.statInfoTitle}>Total Payouts</p>
              <p className={styles.statInfoValue}>₱18.4M</p>
              <p className={styles.statInfoDescription}>This year</p>
            </div>
            <span className={styles.statIcon}><i className="fa-regular fa-peso-sign"></i></span>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className={styles.statCardContent}>
            <div>
              <p className={styles.statInfoTitle}>Avg. Processing Time</p>
              <p className={styles.statInfoValue}>3.2d</p>
              <p className={styles.statInfoDescription}>Claim to resolution</p>
            </div>
            <span className={styles.statIcon}><i className="fa-regular fa-clock"></i></span>
          </CardContent>
        </Card>
      </div>
      <div className={styles.contentGrid}>
        <Card>
          <CardHeader>
            <h3 className={styles.cardTitle}><i className={`fa-regular fa-table ${styles.iconMarginRight8}`}></i>Monthly Claims Summary</h3>
            <span className={styles.sectionSubtitle}>Overview of claims and payouts by month</span>
            <div className={`${styles.searchWrapper} ${styles.monthSearchWrapper}`}>
              <Input
                type="search"
                placeholder="Search month..."
                className={styles.searchInput}
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                aria-label="Search month"
              />
              <i className="fa-regular fa-magnifying-glass"></i>
            </div>
          </CardHeader>
          <CardContent>
            <div className={styles.tableContainer}>
              <Table>
                <Thead>
                  <Tr>
                    <Th><i className={`fa-regular fa-calendar ${styles.iconMarginRight4}`}></i>Month</Th>
                    <Th><i className={`fa-regular fa-file-lines ${styles.iconMarginRight4}`}></i>Total Claims</Th>
                    <Th><i className={`fa-regular fa-circle-check ${styles.iconMarginRight4}`}></i>Approved</Th>
                    <Th><i className={`fa-regular fa-circle-xmark ${styles.iconMarginRight4}`}></i>Rejected</Th>
                    <Th><i className={`fa-regular fa-clock ${styles.iconMarginRight4}`}></i>Pending</Th>
                    <Th><i className={`fa-regular fa-hourglass-half ${styles.iconMarginRight4}`}></i>Avg. Processing</Th>
                    <Th><i className={`fa-regular fa-peso-sign ${styles.iconMarginRight4}`}></i>Total Payout</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {paginatedData.map((item, idx) => (
                    <Tr key={item.month} className={idx % 2 === 0 ? styles.zebraRow : ''}>
                      <Td>{item.month}</Td>
                      <Td>{item.total}</Td>
                      <Td>{item.approved}</Td>
                      <Td>{item.rejected}</Td>
                      <Td>{item.pending}</Td>
                      <Td>{item.avgProcessingDays} days</Td>
                      <Td>{item.totalPayout}</Td>
                    </Tr>
                  ))}
                  <Tr className={styles.summaryRow}>
                    <Td><b>Total</b></Td>
                    <Td><b>{summary.total}</b></Td>
                    <Td><b>{summary.approved}</b></Td>
                    <Td><b>{summary.rejected}</b></Td>
                    <Td><b>{summary.pending}</b></Td>
                    <Td><b>{summary.avgProcessingDays} days</b></Td>
                    <Td><b>{formattedTotalPayout}</b></Td>
                  </Tr>
                </Tbody>
              </Table>
              {/* Pagination controls */}
              <div className={styles.paginationContainer}>
                <Button
                  variant="ghost"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </Button>
                <span className={styles.paginationInfo}>
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="ghost"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  aria-label="Next page"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className={styles.twoColumnGrid}>
          <Card>
            <CardHeader>
              <h3 className={styles.cardTitle}><i className={`fa-regular fa-car-crash ${styles.iconMarginRight8}`}></i>Damage Type Analysis</h3>
              <span className={styles.sectionSubtitle}>Most common claim types and vehicles</span>
            </CardHeader>
            <CardContent>
              <div className={styles.tableContainer}>
                <Table>
                  <Thead>
                    <Tr>
                      <Th><i className={`fa-regular fa-car ${styles.iconMarginRight4}`}></i>Damage Type</Th>
                      <Th><i className={`fa-regular fa-hashtag ${styles.iconMarginRight4}`}></i>Count</Th>
                      <Th><i className={`fa-regular fa-peso-sign ${styles.iconMarginRight4}`}></i>Avg. Cost</Th>
                      <Th><i className={`fa-regular fa-car-side ${styles.iconMarginRight4}`}></i>Common Vehicle</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {damageReports.map((item, idx) => (
                      <Tr key={item.type} className={idx % 2 === 0 ? styles.zebraRow : ''}>
                        <Td>{item.type}</Td>
                        <Td>{item.count}</Td>
                        <Td>{item.avgCost}</Td>
                        <Td>{item.mostCommonVehicle}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className={styles.cardTitle}><i className={`fa-regular fa-user-tie ${styles.iconMarginRight8}`}></i>Top Insurance Agents</h3>
              <span className={styles.sectionSubtitle}>Best performing agents by claims</span>
            </CardHeader>
            <CardContent>
              <div className={styles.tableContainer}>
                <Table>
                  <Thead>
                    <Tr>
                      <Th><i className={`fa-regular fa-user ${styles.iconMarginRight4}`}></i>Agent Name</Th>
                      <Th><i className={`fa-regular fa-file-lines ${styles.iconMarginRight4}`}></i>Claims</Th>
                      <Th><i className={`fa-regular fa-circle-check ${styles.iconMarginRight4}`}></i>Approval Rate</Th>
                      <Th><i className={`fa-regular fa-clock ${styles.iconMarginRight4}`}></i>Processing Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {topAgents.map((agent, idx) => (
                      <Tr key={agent.name} className={idx % 2 === 0 ? styles.zebraRow : ''}>
                        <Td style={{display:'flex',alignItems:'center',gap:8}}>{getAvatar(agent.name)}<span>{agent.name}</span></Td>
                        <Td>{agent.claims}</Td>
                        <Td>{agent.approvalRate}</Td>
                        <Td>{agent.avgProcessingTime}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}