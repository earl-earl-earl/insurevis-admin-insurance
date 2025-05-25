/* eslint-disable @typescript-eslint/no-unused-vars */
// app/(admin)/submissions/[id]/page.tsx
'use client'; // For onClick handlers and potential useState

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Download, Edit3, MessageSquare, Paperclip, RotateCcw, Save } from 'lucide-react';
import { useParams } from 'next/navigation'; // To get the ID
import styles from './page.module.css'; // Import CSS Module

// Update the mock data to reflect car damage assessment
// Update the mock data to reflect car damage assessment
const mockSubmissionDetail = {
  id: 'CLM-2025-001234',
  claimant: 'Sarah Johnson',
  claimantEmail: 'sarah.johnson@email.com',
  claimantPhone: '(555) 987-6543',
  policyNumber: 'POL-2025-789456',
  incidentDate: '2025-01-10',
  incidentLocation: 'Main St & 5th Ave, Downtown',
  type: 'Vehicle Damage',
  claimAmount: '$2,850',
  vehicleInfo: {
    make: 'Toyota',
    model: 'Camry',
    year: '2020',
    plateNumber: 'ABC-1234',
    chassisNumber: 'JT2BF1FK5L0123456'
  },
  submissionDate: '2025-01-15 2:45 PM',
  status: 'CNN Analysis Complete',
  formData: [
    { label: 'Incident Description', value: 'Collision with stationary object' },
    { label: 'Weather Conditions', value: 'Clear' },
    { label: 'Driver Status', value: 'At fault' }
  ],
  attachedFiles: [
    { name: 'front-damage.jpg', size: '2.1 MB', url: '/files/front-damage.jpg' },
    { name: 'side-damage.jpg', size: '1.8 MB', url: '/files/side-damage.jpg' },
    { name: 'headlight-crack.jpg', size: '1.5 MB', url: '/files/headlight-crack.jpg' }
  ],
  systemAnalysis: {
    score: 85,
    summary: 'High confidence damage assessment with moderate repair costs',
    checks: [
      { name: 'Image Quality Check', status: 'Passed' },
      { name: 'Vehicle Recognition', status: 'Passed' },
      { name: 'Damage Detection', status: 'Passed' },
      { name: 'Cost Estimation', status: 'Warning' }
    ]
  },
  damageAssessment: {
    detectedDamages: [
      { type: 'Dent', location: 'Front Bumper', severity: 'Moderate', confidence: '94.2%' },
      { type: 'Scratch', location: 'Right Door', severity: 'Minor', confidence: '87.8%' },
      { type: 'Crack', location: 'Headlight', severity: 'Severe', confidence: '96.1%' }
    ],
    totalEstimatedCost: '$2,850',
    maskRCNNConfidence: '92.3%',
    processingTime: '3.2 seconds'
  },
  uploadedImages: [
    'front-damage.jpg',
    'side-damage.jpg',
    'headlight-crack.jpg'
  ],
  documents: [
    'insurance-policy.pdf',
    'police-report.pdf',
    'drivers-license.pdf'
  ],
  cnnAnalysis: {
    modelVersion: 'Mask R-CNN v2.1',
    analysisDate: '2025-01-15 2:48 PM',
    summary: 'Multiple damage types detected with high confidence. Recommended for manual adjuster review.',
    checks: [
      { name: 'Image Quality Check', status: 'Passed' },
      { name: 'Vehicle Recognition', status: 'Passed' },
      { name: 'Damage Detection', status: 'Passed' },
      { name: 'Cost Estimation', status: 'Warning - Manual review recommended' }
    ]
  },
  notes: [
    {
      author: 'Claims Adjuster Maria Santos',
      date: '2025-01-15 3:15 PM',
      text: 'CNN analysis shows consistent results. Scheduling physical inspection to verify headlight damage severity.'
    }
  ]
};
export default function SubmissionDetailPage() {
  const params = useParams();
  const submissionId = params.id; // e.g., 'sub001'

  // In a real app, fetch submission data using submissionId
  const submission = mockSubmissionDetail; // Using mock data

  const handleStatusChange = (newStatus: string) => {
    console.log(`Changing status of ${submissionId} to ${newStatus}`);
    // API call to update status
  };

  const handleAddNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const noteText = (e.currentTarget.elements.namedItem('noteText') as HTMLTextAreaElement).value;
    console.log(`Adding note to ${submissionId}: ${noteText}`);
    // API call to add note
    (e.currentTarget.elements.namedItem('noteText') as HTMLTextAreaElement).value = ''; // Clear textarea
  };

  if (!submission) {
    return <div className={styles.loadingMessage}>Loading submission details or submission not found...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>
          Submission Details: <span className={styles.submissionIdText}>{submission.id.toUpperCase()}</span>
        </h1>
        <div className={styles.headerActions}>
            {/* Placeholder for status change dropdown */}
            <select
                aria-label='Change Claim Status' 
                defaultValue={submission.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className={styles.statusDropdown}
            >
                <option value="Under Review">Under Review</option>
                <option value="Pending Investigation">Pending Investigation</option>
                <option value="Approved">Approved</option>
                <option value="Denied">Denied</option>
                <option value="Closed">Closed</option>
                <option value="Requires Additional Info">Requires Additional Info</option>
            </select>
            <Button variant="primary" onClick={() => console.log('Saving status change...')}>
                <Save className={styles.buttonIcon} /> Save Status
            </Button>
        </div>
      </div>

      <div className={styles.gridContainer}>
        {/* Main Content Column */}
        <div className={styles.mainContentColumn}>
          <Card>
            <CardHeader>
              <h3 className={styles.cardTitle}>Claim Information</h3>
            </CardHeader>
            <CardContent>
              <p><strong>Claimant:</strong> {submission.claimant}</p>
              <p><strong>Email:</strong> {submission.claimantEmail}</p>
              <p><strong>Phone:</strong> {submission.claimantPhone}</p>
              <p><strong>Policy Number:</strong> {submission.policyNumber}</p>
              <p><strong>Date Submitted:</strong> {submission.submissionDate}</p>
              <p><strong>Date of Loss:</strong> {submission.incidentDate}</p>
              <p><strong>Loss Location:</strong> {submission.incidentLocation}</p>
              <p><strong>Claim Type:</strong> {submission.type}</p>
              <p><strong>Claimed Amount:</strong> {submission.claimAmount}</p>
              <p><strong>Current Status:</strong> 
                <span className={`${styles.statusBadge} ${styles.statusRejected}`}>
                  {submission.status}
                </span>
              </p>
              <hr className={styles.divider}/>
              <h4 className={styles.subHeading}>Loss Details:</h4>
              <ul className={styles.list}>
                {submission.formData.map(data => (
                  <li key={data.label}><strong>{data.label}:</strong> {data.value}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className={styles.cardTitle}>Supporting Documentation</h3>
            </CardHeader>
            <CardContent>
              {submission.attachedFiles.length > 0 ? (
                <ul className={styles.fileList}>
                  {submission.attachedFiles.map(file => (
                    <li key={file.name} className={styles.fileListItem}>
                      <div className={styles.fileInfo}>
                        <Paperclip className={styles.fileIcon} />
                        <span>{file.name} ({file.size})</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className={styles.buttonIcon} />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.noFilesMessage}>No files attached.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className={styles.cardTitle}>System Analysis</h3>
            </CardHeader>
            <CardContent>
              <p><strong>Overall Score:</strong> {submission.systemAnalysis.score}/100</p>
              <p><strong>Summary:</strong> {submission.systemAnalysis.summary}</p>
              <h4 className={`${styles.subHeading} ${styles.marginTop}`}>Checks:</h4>
              <ul className={styles.list}>
                {submission.systemAnalysis.checks.map(check => (
                  <li key={check.name} className={
                    `${check.status === 'Passed' ? styles.checkPassed : 
                    check.status === 'Warning' ? styles.checkWarning : styles.checkFailed}`
                  }>
                    <strong>{check.name}:</strong> {check.status}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" size="sm" className={styles.rerunButton} onClick={() => console.log('Re-running automated assessment...')}>
                <RotateCcw className={styles.buttonIcon} /> Re-run Assessment
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column for Notes/Actions */}
        <div className={styles.sidebarColumn}>
          <Card>
            <CardHeader>
              <h3 className={styles.cardTitle}>Adjuster Notes</h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddNote} className={styles.notesForm}>
                <textarea
                  name="noteText"
                  rows={4}
                  placeholder="Add adjuster note (investigation updates, decisions, next steps)..."
                  className={styles.notesTextarea}
                ></textarea>
                <Button type="submit" className={styles.addNoteButton}>
                  <MessageSquare className={styles.buttonIcon} /> Add Note
                </Button>
              </form>
            </CardContent>
            <CardFooter className={styles.notesLogContainer}>
                <h4 className={styles.subHeading}>Notes History:</h4>
                {submission.notes.length > 0 ? (
                    submission.notes.map((note, index) => (
                        <div key={index} className={styles.noteItem}>
                            <p className={styles.noteAuthor}>{note.author} <span className={styles.noteDate}>({note.date})</span></p>
                            <p>{note.text}</p>
                        </div>
                    ))
                ) : (
                    <p className={styles.noNotesMessage}>No adjuster notes recorded.</p>
                )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}