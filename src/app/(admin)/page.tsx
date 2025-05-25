"use client"

// app/(admin)/page.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useState } from 'react';
import {
  AreaChart, Area,
  LineChart, Line,
  PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip
} from 'recharts';
import styles from './page.module.css';

// Mock data for charts
const claimsData = [
  { name: 'Jan', claims: 76 },
  { name: 'Feb', claims: 85 },
  { name: 'Mar', claims: 101 },
  { name: 'Apr', claims: 98 },
  { name: 'May', claims: 110 },
  { name: 'Jun', claims: 125 },
  { name: 'Jul', claims: 132 },
];

const accuracyData = [
  { name: 'Week 1', value: 91.5 },
  { name: 'Week 2', value: 92.3 },
  { name: 'Week 3', value: 93.7 },
  { name: 'Week 4', value: 94.2 },
];

const processingData = [
  { name: 'Jan', time: 5.8 },
  { name: 'Feb', time: 5.2 },
  { name: 'Mar', time: 4.9 },
  { name: 'Apr', time: 4.7 },
  { name: 'May', time: 4.5 },
  { name: 'Jun', time: 4.3 },
];

const savingsData = [
  { name: 'Personnel', value: 1.2 },
  { name: 'Processing', value: 0.8 },
  { name: 'Time', value: 0.4 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

// Update dashboard statistics
const stats = [
    {
        title: 'Total Claims Processed',
        value: '1,247',
        description: 'Claims processed this month',
        icon: <i className="fa-regular fa-file-chart-column"></i>,
        chartType: 'area',
        data: claimsData,
        dataKey: 'claims',
    },
    {
        title: 'Approval Rate',
        value: '79.1%',
        description: 'Claims approved this month',
        icon: <i className="fa-regular fa-chart-line-up"></i>,
        chartType: 'line',
        data: [
            { name: 'Week 1', value: 76.8 },
            { name: 'Week 2', value: 77.5 },
            { name: 'Week 3', value: 78.3 },
            { name: 'Week 4', value: 79.1 },
        ],
        dataKey: 'value',
    },
    {
        title: 'Average Processing Time',
        value: '4.3 min',
        description: 'From upload to assessment',
        icon: <i className="fa-regular fa-clock"></i>,
        chartType: 'line',
        data: processingData,
        dataKey: 'time',
    },
    {
        title: 'Cost Savings',
        value: '₱2.4M',
        description: 'Saved through automation',
        icon: <i className="fa-regular fa-sack-dollar"></i>,
        chartType: 'pie',
        data: savingsData,
    },
];

export default function DashboardPage() {
    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Insurance Claims Dashboard</h1>

            <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <Card key={stat.title}>
                        <CardContent className={styles.statCardContent}>
                            <div className={styles.statInfo}>
                                <div className={styles.statHeader}>
                                    <div>
                                        <p className={styles.statInfoTitle}>{stat.title}</p>
                                        <p className={styles.statInfoValue}>{stat.value}</p>
                                        <p className={styles.statInfoDescription}>{stat.description}</p>
                                    </div>
                                    <span className={styles.statIcon}>{stat.icon}</span>
                                </div>
                                
                                <div className={styles.chartContainer}>
                                    {stat.chartType === 'area' && stat.dataKey && (
                                        <ResponsiveContainer width="100%" height={80}>
                                            <AreaChart 
                                                data={stat.data}
                                                margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
                                            >
                                                <defs>
                                                    <linearGradient id={`colorClaims-${index}`} x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#0D6EFD" stopOpacity={0.8}/>
                                                        <stop offset="95%" stopColor="#0D6EFD" stopOpacity={0.1}/>
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="name" hide />
                                                <YAxis hide />
                                                <Tooltip 
                                                    contentStyle={{ fontSize: '0.75rem', background: '#fff', border: '1px solid #e5e7eb' }} 
                                                    formatter={(value) => [`${value} claims`, 'Claims']} 
                                                />
                                                <Area 
                                                    type="monotone" 
                                                    dataKey={stat.dataKey} 
                                                    stroke="#0D6EFD" 
                                                    strokeWidth={2} 
                                                    fill={`url(#colorClaims-${index})`} 
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    )}
                                    
                                    {stat.chartType === 'line' && stat.title.includes('Approval') && stat.dataKey && (
                                        <ResponsiveContainer width="100%" height={80}>
                                            <LineChart data={stat.data}
                                                margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                                                <XAxis dataKey="name" hide={true} />
                                                <YAxis hide={true} domain={['dataMin - 1', 'dataMax + 1']} />
                                                <Tooltip 
                                                    contentStyle={{ fontSize: '0.75rem', background: '#fff', border: '1px solid #e5e7eb' }} 
                                                    formatter={(value) => [`${value}%`, 'Approval Rate']} 
                                                />
                                                <Line type="monotone" dataKey={stat.dataKey} stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    )}
                                    
                                    {stat.chartType === 'line' && stat.title.includes('Processing') && stat.dataKey && (
                                        <ResponsiveContainer width="100%" height={80}>
                                            <LineChart data={stat.data}
                                                margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                                                <XAxis dataKey="name" hide={true} />
                                                <YAxis hide={true} />
                                                <Tooltip 
                                                    contentStyle={{ fontSize: '0.75rem', background: '#fff', border: '1px solid #e5e7eb' }} 
                                                    formatter={(value) => [`${value} min`, 'Processing Time']} 
                                                />
                                                <Line type="monotone" dataKey={stat.dataKey} stroke="#0D6EFD" strokeWidth={2} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    )}
                                    
                                    {stat.chartType === 'pie' && stat.data && stat.data.length > 0 && (
                                        <ResponsiveContainer width="100%" height={80}>
                                            <PieChart>
                                                <Pie
                                                    data={stat.data}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={20}
                                                    outerRadius={35}
                                                    paddingAngle={3}
                                                    dataKey="value"
                                                >
                                                    {stat.data.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip 
                                                    contentStyle={{ fontSize: '0.75rem', background: '#fff', border: '1px solid #e5e7eb' }} 
                                                    formatter={(value) => [`₱${value}M`, 'Savings']} 
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className={styles.contentGrid}>
              <Card>
                <CardHeader>
                  <h3 className={styles.cardHeaderTitle}>Recent Claims Activity</h3>
                </CardHeader>
                <CardContent>
                  <div className={styles.modernList}>
                    <div className={styles.listItem}>
                      <div className={styles.listItemLeft}>
                        <i className="fa-regular fa-file-lines"></i>
                      </div>
                      <div className={styles.listItemContent}>
                        <div className={styles.listItemHeader}>
                          <span className={styles.listItemTitle}>Claim #CLM7890</span>
                          <span className={`${styles.statusBadge} ${styles.statusPending}`}>Pending Review</span>
                        </div>
                        <div className={styles.listItemDesc}>Michael Scott - Toyota Camry - Front Bumper Damage</div>
                        <div className={styles.listItemFooter}>
                          <span className={styles.listItemTime}><i className="fa-regular fa-clock"></i> Today, 2:45 PM</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.listItem}>
                      <div className={styles.listItemLeft}>
                        <i className="fa-regular fa-file-check"></i>
                      </div>
                      <div className={styles.listItemContent}>
                        <div className={styles.listItemHeader}>
                          <span className={styles.listItemTitle}>Claim #CLM7889</span>
                          <span className={`${styles.statusBadge} ${styles.statusConfirmed}`}>Approved</span>
                        </div>
                        <div className={styles.listItemDesc}>Pam Beesly - Honda City - Side Panel Dent</div>
                        <div className={styles.listItemFooter}>
                          <span className={styles.listItemTime}><i className="fa-regular fa-clock"></i> Today, 11:23 AM</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.listItem}>
                      <div className={styles.listItemLeft}>
                        <i className="fa-regular fa-file-xmark"></i>
                      </div>
                      <div className={styles.listItemContent}>
                        <div className={styles.listItemHeader}>
                          <span className={styles.listItemTitle}>Claim #CLM7888</span>
                          <span className={`${styles.statusBadge} ${styles.statusCancelled}`}>Rejected</span>
                        </div>
                        <div className={styles.listItemDesc}>Jim Halpert - Mitsubishi Mirage - Windshield Crack</div>
                        <div className={styles.listItemFooter}>
                          <span className={styles.listItemTime}><i className="fa-regular fa-clock"></i> Yesterday, 4:15 PM</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.listItem}>
                      <div className={styles.listItemLeft}>
                        <i className="fa-regular fa-file-check"></i>
                      </div>
                      <div className={styles.listItemContent}>
                        <div className={styles.listItemHeader}>
                          <span className={styles.listItemTitle}>Claim #CLM7887</span>
                          <span className={`${styles.statusBadge} ${styles.statusConfirmed}`}>Approved</span>
                        </div>
                        <div className={styles.listItemDesc}>Dwight Schrute - Ford Ranger - Rear Bumper Damage</div>
                        <div className={styles.listItemFooter}>
                          <span className={styles.listItemTime}><i className="fa-regular fa-clock"></i> Yesterday, 10:30 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className={styles.cardHeaderTitle}>System Alerts & Notifications</h3>
                </CardHeader>
                <CardContent>
                  <div className={styles.modernList}>
                    <div className={styles.listItem}>
                      <div className={styles.listItemLeft}>
                        <i className="fa-regular fa-calendar-exclamation"></i>
                      </div>
                      <div className={styles.listItemContent}>
                        <div className={styles.listItemHeader}>
                          <span className={styles.listItemTitle}>Policy Renewal</span>
                          <span className={`${styles.statusBadge} ${styles.statusWarning}`}>Action Required</span>
                        </div>
                        <div className={styles.listItemDesc}>Policy #POL4567 due for renewal in 7 days.</div>
                        <div className={styles.listItemFooter}>
                          <span className={styles.listItemTime}><i className="fa-regular fa-clock"></i> Today, 9:05 AM</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.listItem}>
                      <div className={styles.listItemLeft}>
                        <i className="fa-regular fa-triangle-exclamation"></i>
                      </div>
                      <div className={styles.listItemContent}>
                        <div className={styles.listItemHeader}>
                          <span className={styles.listItemTitle}>Potential Fraud Alert</span>
                          <span className={`${styles.statusBadge} ${styles.statusDanger}`}>Investigation Needed</span>
                        </div>
                        <div className={styles.listItemDesc}>Claim #CLM7885 (Kevin Malone) flagged for potential fraud.</div>
                        <div className={styles.listItemFooter}>
                          <span className={styles.listItemTime}><i className="fa-regular fa-clock"></i> Yesterday, 3:42 PM</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.listItem}>
                      <div className={styles.listItemLeft}>
                        <i className="fa-regular fa-user-plus"></i>
                      </div>
                      <div className={styles.listItemContent}>
                        <div className={styles.listItemHeader}>
                          <span className={styles.listItemTitle}>New User Account</span>
                          <span className={`${styles.statusBadge} ${styles.statusInfo}`}>System Update</span>
                        </div>
                        <div className={styles.listItemDesc}>New adjuster account &apos;Oscar M.&apos; created.</div>
                        <div className={styles.listItemFooter}>
                          <span className={styles.listItemTime}><i className="fa-regular fa-clock"></i> Yesterday, 11:30 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
        </div>
    );
}