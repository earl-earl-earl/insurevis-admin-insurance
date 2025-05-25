'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
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
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Reports</h1>
        <div className={styles.reportControls}>
          <Button 
            variant={reportPeriod === 'monthly' ? 'primary' : 'ghost'}
            onClick={() => setReportPeriod('monthly')}
          >
            Monthly
          </Button>
          <Button 
            variant={reportPeriod === 'quarterly' ? 'primary' : 'ghost'}
            onClick={() => setReportPeriod('quarterly')}
          >
            Quarterly
          </Button>
          <Button 
            variant={reportPeriod === 'yearly' ? 'primary' : 'ghost'}
            onClick={() => setReportPeriod('yearly')}
          >
            Yearly
          </Button>
          <Button variant="secondary" className={styles.exportButton}>
            <i className="fa-regular fa-download"></i>
            <span className={styles.exportText}>Export</span>
          </Button>
        </div>
      </div>
      
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
            <h3 className={styles.cardTitle}>Monthly Claims Summary</h3>
          </CardHeader>
          <CardContent>
            <div className={styles.tableContainer}>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Month</Th>
                    <Th>Total Claims</Th>
                    <Th>Approved</Th>
                    <Th>Rejected</Th>
                    <Th>Pending</Th>
                    <Th>Avg. Processing</Th>
                    <Th>Total Payout</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {monthlyClaimsData.map((item) => (
                    <Tr key={item.month}>
                      <Td>{item.month}</Td>
                      <Td>{item.total}</Td>
                      <Td>{item.approved}</Td>
                      <Td>{item.rejected}</Td>
                      <Td>{item.pending}</Td>
                      <Td>{item.avgProcessingDays} days</Td>
                      <Td>{item.totalPayout}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className={styles.twoColumnGrid}>
          <Card>
            <CardHeader>
              <h3 className={styles.cardTitle}>Damage Type Analysis</h3>
            </CardHeader>
            <CardContent>
              <div className={styles.tableContainer}>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Damage Type</Th>
                      <Th>Count</Th>
                      <Th>Avg. Cost</Th>
                      <Th>Common Vehicle</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {damageReports.map((item) => (
                      <Tr key={item.type}>
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
              <h3 className={styles.cardTitle}>Top Insurance Agents</h3>
            </CardHeader>
            <CardContent>
              <div className={styles.tableContainer}>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Agent Name</Th>
                      <Th>Claims</Th>
                      <Th>Approval Rate</Th>
                      <Th>Processing Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {topAgents.map((agent) => (
                      <Tr key={agent.name}>
                        <Td>{agent.name}</Td>
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