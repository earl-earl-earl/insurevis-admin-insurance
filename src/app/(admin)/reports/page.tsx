'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import styles from './page.module.css';

// Insurance claims data for monthly reporting
const monthlyClaimsData = [
  { month: 'January', total: 178, approved: 142, rejected: 23, pending: 13, avgProcessingDays: 3.2, totalPayout: '₱2,845,720' },
  { month: 'February', total: 165, approved: 134, rejected: 19, pending: 12, avgProcessingDays: 3.5, totalPayout: '₱2,712,450' },
  { month: 'March', total: 203, approved: 165, rejected: 27, pending: 11, avgProcessingDays: 3.1, totalPayout: '₱3,156,820' },
  { month: 'April', total: 197, approved: 153, rejected: 31, pending: 13, avgProcessingDays: 3.4, totalPayout: '₱2,987,340' },
  { month: 'May', total: 211, approved: 172, rejected: 24, pending: 15, avgProcessingDays: 3.0, totalPayout: '₱3,245,910' },
  { month: 'June', total: 189, approved: 148, rejected: 28, pending: 13, avgProcessingDays: 3.3, totalPayout: '₱2,876,530' },
];

// Vehicle damage claim types and associated costs
const damageReports = [
  { type: 'Front Bumper Collision', count: 487, avgCost: '₱42,350', mostCommonVehicle: 'Toyota Vios' },
  { type: 'Rear-End Collision', count: 412, avgCost: '₱38,750', mostCommonVehicle: 'Honda City' },
  { type: 'Side Impact Damage', count: 356, avgCost: '₱45,200', mostCommonVehicle: 'Mitsubishi Mirage' },
  { type: 'Windshield/Glass Claims', count: 298, avgCost: '₱18,450', mostCommonVehicle: 'Toyota Innova' },
  { type: 'Hood & Engine Damage', count: 276, avgCost: '₱32,650', mostCommonVehicle: 'Ford Ranger' },
];

// Claims adjusters performance data
const topAdjusters = [
  { name: 'Maria Santos', claims: 87, approvalRate: '94.2%', avgProcessingTime: '2.7 days' },
  { name: 'Juan Cruz', claims: 73, approvalRate: '92.8%', avgProcessingTime: '2.9 days' },
  { name: 'Ana Reyes', claims: 68, approvalRate: '93.5%', avgProcessingTime: '3.0 days' },
  { name: 'Carlos Mendoza', claims: 64, approvalRate: '91.7%', avgProcessingTime: '3.2 days' },
  { name: 'Sofia Bautista', claims: 59, approvalRate: '92.3%', avgProcessingTime: '3.1 days' },
];

export default function InsuranceClaimsReportsPage() {
  const [reportPeriod, setReportPeriod] = useState('monthly');
  // Dynamic state for claims search and pagination
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 3;  // Filter insurance claims data by month search
  const filteredClaimsMonths = monthlyClaimsData.filter(item =>
    item.month.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredClaimsMonths.length / pageSize);
  const paginatedClaimsData = filteredClaimsMonths.slice((page - 1) * pageSize, page * pageSize);
  // Calculate summary totals for insurance claims data
  const summary = filteredClaimsMonths.reduce(
    (acc, item) => {
      acc.total += item.total;
      acc.approved += item.approved;
      acc.rejected += item.rejected;
      acc.pending += item.pending;
      acc.avgProcessingDays += item.avgProcessingDays;
      // Remove currency symbol and commas for calculating total payout sum
      acc.totalPayout += Number(item.totalPayout.replace(/[^\d.]/g, ''));
      return acc;
    },
    { total: 0, approved: 0, rejected: 0, pending: 0, avgProcessingDays: 0, totalPayout: 0 }
  );
  summary.avgProcessingDays = filteredClaimsMonths.length ? parseFloat((summary.avgProcessingDays / filteredClaimsMonths.length).toFixed(1)) : 0;
  const formattedTotalPayout = `₱${summary.totalPayout.toLocaleString()}`;
  // Generate avatar for claims adjuster profile display
  const getAdjusterAvatar = (name: string) => (
    <span className={styles.agentAvatar} aria-label={name}>
      <i className="fa-solid fa-user"></i>
    </span>
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Insurance Claims Reports</h1>
        <div className={styles.reportControls}>
          <Button 
            variant={reportPeriod === 'monthly' ? 'primary' : 'ghost'}
            onClick={() => setReportPeriod('monthly')}            aria-label="Show monthly claims report"
            title="Show monthly claims report"
          >
            <i className={`fa-regular fa-calendar ${styles.iconMarginRight4}`}></i> Monthly
          </Button>
          <Button 
            variant={reportPeriod === 'quarterly' ? 'primary' : 'ghost'}
            onClick={() => setReportPeriod('quarterly')}            aria-label="Show quarterly claims report"
            title="Show quarterly claims report"
          >
            <i className={`fa-regular fa-calendar-days ${styles.iconMarginRight4}`}></i> Quarterly
          </Button>
          <Button 
            variant={reportPeriod === 'yearly' ? 'primary' : 'ghost'}
            onClick={() => setReportPeriod('yearly')}            aria-label="Show yearly claims report"
            title="Show yearly claims report"
          >
            <i className={`fa-regular fa-calendar-check ${styles.iconMarginRight4}`}></i> Yearly
          </Button>
          <Button variant="secondary" className={styles.exportButton} aria-label="Export claims report" title="Export insurance claims report as CSV or PDF">
            <i className={`fa-regular fa-download ${styles.iconMarginRight4}`}></i>
            <span className={styles.exportText}>Export</span>
          </Button>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.statsGrid}>
        <Card>
          <CardContent className={styles.statCardContent}>
            <div>              <p className={styles.statInfoTitle}>Total Claims Submitted</p>
              <p className={styles.statInfoValue}>1,247</p>
              <p className={styles.statInfoDescription}>Claims this year</p>
            </div>
            <span className={styles.statIcon}><i className="fa-regular fa-file-lines"></i></span>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className={styles.statCardContent}>
            <div>              <p className={styles.statInfoTitle}>Claims Approved</p>
              <p className={styles.statInfoValue}>987</p>
              <p className={styles.statInfoDescription}>79.1% approval rate</p>
            </div>
            <span className={styles.statIcon}><i className="fa-regular fa-circle-check"></i></span>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className={styles.statCardContent}>
            <div>              <p className={styles.statInfoTitle}>Total Claim Payouts</p>
              <p className={styles.statInfoValue}>₱18.4M</p>
              <p className={styles.statInfoDescription}>Payouts this year</p>
            </div>
            <span className={styles.statIcon}><i className="fa-regular fa-peso-sign"></i></span>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className={styles.statCardContent}>
            <div>              <p className={styles.statInfoTitle}>Avg. Claims Processing</p>
              <p className={styles.statInfoValue}>3.2d</p>
              <p className={styles.statInfoDescription}>Submission to resolution</p>
            </div>
            <span className={styles.statIcon}><i className="fa-regular fa-clock"></i></span>
          </CardContent>
        </Card>
      </div>
      <div className={styles.contentGrid}>
        <Card>
          <CardHeader>            <h3 className={styles.cardTitle}><i className={`fa-regular fa-table ${styles.iconMarginRight8}`}></i>Monthly Claims Summary</h3>
            <span className={styles.sectionSubtitle}>Overview of insurance claims and payouts by month</span>
            <div className={`${styles.searchWrapper} ${styles.monthSearchWrapper}`}>
              <Input
                type="search"                placeholder="Search by month..."
                className={styles.searchInput}
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                aria-label="Search by month"
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
                  {paginatedClaimsData.map((item, idx) => (
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
            <CardHeader>              <h3 className={styles.cardTitle}><i className={`fa-regular fa-car-crash ${styles.iconMarginRight8}`}></i>Vehicle Damage Claims Analysis</h3>
              <span className={styles.sectionSubtitle}>Most common vehicle damage claim types and costs</span>
            </CardHeader>
            <CardContent>
              <div className={styles.tableContainer}>
                <Table>
                  <Thead>
                    <Tr>                      <Th><i className={`fa-regular fa-car ${styles.iconMarginRight4}`}></i>Vehicle Damage Type</Th>
                      <Th><i className={`fa-regular fa-hashtag ${styles.iconMarginRight4}`}></i>Claims Count</Th>
                      <Th><i className={`fa-regular fa-peso-sign ${styles.iconMarginRight4}`}></i>Avg. Claim Cost</Th>
                      <Th><i className={`fa-regular fa-car-side ${styles.iconMarginRight4}`}></i>Most Affected Vehicle</Th>
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
            <CardHeader>              <h3 className={styles.cardTitle}><i className={`fa-regular fa-user-tie ${styles.iconMarginRight8}`}></i>Top Claims Adjusters</h3>
              <span className={styles.sectionSubtitle}>Best performing adjusters by claims processing</span>
            </CardHeader>
            <CardContent>
              <div className={styles.tableContainer}>
                <Table>
                  <Thead>
                    <Tr>                      <Th><i className={`fa-regular fa-user ${styles.iconMarginRight4}`}></i>Adjuster Name</Th>
                      <Th><i className={`fa-regular fa-file-lines ${styles.iconMarginRight4}`}></i>Claims Handled</Th>
                      <Th><i className={`fa-regular fa-circle-check ${styles.iconMarginRight4}`}></i>Approval Rate</Th>
                      <Th><i className={`fa-regular fa-clock ${styles.iconMarginRight4}`}></i>Avg Processing Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>                    {topAdjusters.map((adjuster, idx) => (
                      <Tr key={adjuster.name} className={idx % 2 === 0 ? styles.zebraRow : ''}>
                        <Td style={{display:'flex',alignItems:'center',gap:8}}>{getAdjusterAvatar(adjuster.name)}<span>{adjuster.name}</span></Td>
                        <Td>{adjuster.claims}</Td>
                        <Td>{adjuster.approvalRate}</Td>
                        <Td>{adjuster.avgProcessingTime}</Td>
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