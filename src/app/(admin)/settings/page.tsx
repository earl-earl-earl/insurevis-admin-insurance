'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import styles from './page.module.css';

// Insurance system settings interface
interface SystemSettings {
  notifications: {
    emailAlerts: boolean;
    smsAlerts: boolean;
    pushNotifications: boolean;
    claimUpdates: boolean;
    paymentAlerts: boolean;
  };
  claims: {
    autoApprovalLimit: string;
    processingTimeTarget: string;
    requirePhotos: boolean;
    requireWitness: boolean;
    allowSelfService: boolean;
  };
  security: {
    sessionTimeout: string;
    requireMFA: boolean;
    passwordExpiry: string;
    loginAttempts: string;
  };
  system: {
    maintenanceMode: boolean;
    debugMode: boolean;
    backupFrequency: string;
    dataRetention: string;
  };
}

export default function InsuranceSystemSettingsPage() {
  const [saveMessage, setSaveMessage] = useState('');
  const [settings, setSettings] = useState<SystemSettings>({
    notifications: {
      emailAlerts: true,
      smsAlerts: true,
      pushNotifications: false,
      claimUpdates: true,
      paymentAlerts: true,
    },
    claims: {
      autoApprovalLimit: '50000',
      processingTimeTarget: '72',
      requirePhotos: true,
      requireWitness: false,
      allowSelfService: true,
    },
    security: {
      sessionTimeout: '30',
      requireMFA: false,
      passwordExpiry: '90',
      loginAttempts: '5',
    },
    system: {
      maintenanceMode: false,
      debugMode: false,
      backupFrequency: 'daily',
      dataRetention: '7',
    },
  });

  const handleToggleChange = (section: keyof SystemSettings, key: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key as keyof typeof prev[typeof section]]
      }
    }));
  };

  const handleInputChange = (section: keyof SystemSettings, key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Simulate saving settings
    setSaveMessage('Insurance system settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleResetToDefaults = () => {
    setSettings({
      notifications: {
        emailAlerts: true,
        smsAlerts: true,
        pushNotifications: false,
        claimUpdates: true,
        paymentAlerts: true,
      },
      claims: {
        autoApprovalLimit: '50000',
        processingTimeTarget: '72',
        requirePhotos: true,
        requireWitness: false,
        allowSelfService: true,
      },
      security: {
        sessionTimeout: '30',
        requireMFA: false,
        passwordExpiry: '90',
        loginAttempts: '5',
      },
      system: {
        maintenanceMode: false,
        debugMode: false,
        backupFrequency: 'daily',
        dataRetention: '7',
      },
    });
    setSaveMessage('Settings reset to default values');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Insurance System Settings</h1>
        <div className={styles.buttonGroup}>
          <Button variant="ghost" onClick={handleResetToDefaults}>
            <i className={`fa-regular fa-rotate-left ${styles.iconMarginRight4}`}></i>
            Reset to Defaults
          </Button>
          <Button onClick={handleSaveSettings} className={styles.saveButton}>
            <i className={`fa-regular fa-floppy-disk ${styles.iconMarginRight4}`}></i>
            Save Settings
          </Button>
        </div>
      </div>
      <hr className={styles.divider} />

      {saveMessage && (
        <div className={styles.successMessage}>
          <i className="fa-regular fa-circle-check"></i>
          {saveMessage}
        </div>
      )}

      <div className={styles.settingsGrid}>
        {/* Notification Settings */}
        <div className={styles.settingsSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <i className="fa-regular fa-bell"></i>
              Notification Settings
            </h3>
            <p className={styles.sectionDescription}>
              Configure how the system sends alerts and notifications for claims processing
            </p>
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>Email Alerts</h4>
                <p className={styles.settingDescription}>Send email notifications for important claim events</p>
              </div>              <div className={styles.settingControl}>
                <input
                  type="checkbox"
                  className={styles.toggleSwitch}
                  checked={settings.notifications.emailAlerts}
                  onChange={() => handleToggleChange('notifications', 'emailAlerts')}
                  aria-label="Enable email alerts"
                />
              </div>
            </div>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>SMS Alerts</h4>
                <p className={styles.settingDescription}>Send SMS notifications for urgent claim updates</p>
              </div>              <div className={styles.settingControl}>
                <input
                  type="checkbox"
                  className={styles.toggleSwitch}
                  checked={settings.notifications.smsAlerts}
                  onChange={() => handleToggleChange('notifications', 'smsAlerts')}
                  aria-label="Enable SMS alerts"
                />
              </div>
            </div>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>Push Notifications</h4>
                <p className={styles.settingDescription}>Enable browser push notifications</p>
              </div>              <div className={styles.settingControl}>
                <input
                  type="checkbox"
                  className={styles.toggleSwitch}
                  checked={settings.notifications.pushNotifications}
                  onChange={() => handleToggleChange('notifications', 'pushNotifications')}
                  aria-label="Enable push notifications"
                />
              </div>
            </div>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>Claim Status Updates</h4>
                <p className={styles.settingDescription}>Notify when claim status changes</p>
              </div>              <div className={styles.settingControl}>
                <input
                  type="checkbox"
                  className={styles.toggleSwitch}
                  checked={settings.notifications.claimUpdates}
                  onChange={() => handleToggleChange('notifications', 'claimUpdates')}
                  aria-label="Enable claim status updates"
                />
              </div>
            </div>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>Payment Alerts</h4>
                <p className={styles.settingDescription}>Notify when payments are processed</p>
              </div>              <div className={styles.settingControl}>
                <input
                  type="checkbox"
                  className={styles.toggleSwitch}
                  checked={settings.notifications.paymentAlerts}
                  onChange={() => handleToggleChange('notifications', 'paymentAlerts')}
                  aria-label="Enable payment alerts"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Claims Processing Settings */}
        <div className={styles.settingsSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <i className="fa-regular fa-file-lines"></i>
              Claims Processing
            </h3>
            <p className={styles.sectionDescription}>
              Configure claim processing rules and requirements
            </p>
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>Auto-Approval Limit</h4>
                <p className={styles.settingDescription}>Maximum claim amount for automatic approval (₱)</p>
              </div>
              <div className={styles.settingControl}>
                <div className={styles.inputGroup}>                  <input
                    type="number"
                    className={styles.input}
                    value={settings.claims.autoApprovalLimit}
                    onChange={(e) => handleInputChange('claims', 'autoApprovalLimit', e.target.value)}
                    placeholder="50000"
                    aria-label="Auto-approval limit in Philippine Pesos"
                  />
                </div>
              </div>
            </div>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>Processing Time Target</h4>
                <p className={styles.settingDescription}>Target processing time in hours</p>
              </div>
              <div className={styles.settingControl}>
                <div className={styles.inputGroup}>                  <input
                    type="number"
                    className={styles.input}
                    value={settings.claims.processingTimeTarget}
                    onChange={(e) => handleInputChange('claims', 'processingTimeTarget', e.target.value)}
                    placeholder="72"
                    aria-label="Processing time target in hours"
                  />
                </div>
              </div>
            </div>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>Require Photos</h4>
                <p className={styles.settingDescription}>Require damage photos for all claims</p>
              </div>
              <div className={styles.settingControl}>                <input
                  type="checkbox"
                  className={styles.toggleSwitch}
                  checked={settings.claims.requirePhotos}
                  onChange={() => handleToggleChange('claims', 'requirePhotos')}
                  aria-label="Require damage photos for all claims"
                />
              </div>
            </div>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>Require Witness Statement</h4>
                <p className={styles.settingDescription}>Require witness statements for claims</p>
              </div>
              <div className={styles.settingControl}>                <input
                  type="checkbox"
                  className={styles.toggleSwitch}
                  checked={settings.claims.requireWitness}
                  onChange={() => handleToggleChange('claims', 'requireWitness')}
                  aria-label="Require witness statements for claims"
                />
              </div>
            </div>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>Allow Self-Service Claims</h4>
                <p className={styles.settingDescription}>Allow customers to submit claims online</p>
              </div>
              <div className={styles.settingControl}>                <input
                  type="checkbox"
                  className={styles.toggleSwitch}
                  checked={settings.claims.allowSelfService}
                  onChange={() => handleToggleChange('claims', 'allowSelfService')}
                  aria-label="Allow customers to submit claims online"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className={styles.settingsSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <i className="fa-regular fa-shield-halved"></i>
              Security Settings
            </h3>
            <p className={styles.sectionDescription}>
              Configure security policies and access controls
            </p>
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>Session Timeout</h4>
                <p className={styles.settingDescription}>Session timeout in minutes</p>
              </div>
              <div className={styles.settingControl}>
                <div className={styles.inputGroup}>                  <input
                    type="number"
                    className={styles.input}
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleInputChange('security', 'sessionTimeout', e.target.value)}
                    placeholder="30"
                    aria-label="Session timeout in minutes"
                  />
                </div>
              </div>
            </div>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>Require Multi-Factor Authentication</h4>
                <p className={styles.settingDescription}>Require MFA for all admin users</p>
              </div>
              <div className={styles.settingControl}>                <input
                  type="checkbox"
                  className={styles.toggleSwitch}
                  checked={settings.security.requireMFA}
                  onChange={() => handleToggleChange('security', 'requireMFA')}
                  aria-label="Require multi-factor authentication for all admin users"
                />
              </div>
            </div>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>Password Expiry</h4>
                <p className={styles.settingDescription}>Password expiry in days</p>
              </div>
              <div className={styles.settingControl}>
                <div className={styles.inputGroup}>                  <input
                    type="number"
                    className={styles.input}
                    value={settings.security.passwordExpiry}
                    onChange={(e) => handleInputChange('security', 'passwordExpiry', e.target.value)}
                    placeholder="90"
                    aria-label="Password expiry in days"
                  />
                </div>
              </div>
            </div>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>Max Login Attempts</h4>
                <p className={styles.settingDescription}>Maximum failed login attempts before lockout</p>
              </div>
              <div className={styles.settingControl}>
                <div className={styles.inputGroup}>                  <input
                    type="number"
                    className={styles.input}
                    value={settings.security.loginAttempts}
                    onChange={(e) => handleInputChange('security', 'loginAttempts', e.target.value)}
                    placeholder="5"
                    aria-label="Maximum failed login attempts before lockout"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className={styles.settingsSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <i className="fa-regular fa-server"></i>
              System Configuration
            </h3>
            <p className={styles.sectionDescription}>
              Configure system-wide settings and maintenance options
            </p>
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>Backup Frequency</h4>
                <p className={styles.settingDescription}>How often to backup system data</p>
              </div>
              <div className={styles.settingControl}>                <select
                  className={styles.selectInput}
                  value={settings.system.backupFrequency}
                  onChange={(e) => handleInputChange('system', 'backupFrequency', e.target.value)}
                  aria-label="Backup frequency selection"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>Data Retention</h4>
                <p className={styles.settingDescription}>Data retention period in years</p>
              </div>
              <div className={styles.settingControl}>
                <div className={styles.inputGroup}>                  <input
                    type="number"
                    className={styles.input}
                    value={settings.system.dataRetention}
                    onChange={(e) => handleInputChange('system', 'dataRetention', e.target.value)}
                    placeholder="7"
                    aria-label="Data retention period in years"
                  />
                </div>
              </div>
            </div>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>Debug Mode</h4>
                <p className={styles.settingDescription}>Enable detailed system logging</p>
              </div>
              <div className={styles.settingControl}>                <input
                  type="checkbox"
                  className={styles.toggleSwitch}
                  checked={settings.system.debugMode}
                  onChange={() => handleToggleChange('system', 'debugMode')}
                  aria-label="Enable detailed system logging"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className={`${styles.settingsSection} ${styles.dangerZone} ${styles.fullWidth}`}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <i className="fa-regular fa-triangle-exclamation"></i>
              Danger Zone
            </h3>
            <p className={styles.sectionDescription}>
              Critical system settings that may affect service availability
            </p>
          </div>
          <div className={styles.sectionContent}>
            {settings.system.maintenanceMode && (
              <div className={styles.warningMessage}>
                <i className="fa-regular fa-triangle-exclamation"></i>
                Maintenance mode is currently enabled. Claims processing may be limited.
              </div>
            )}
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4 className={styles.settingLabel}>Maintenance Mode</h4>
                <p className={styles.settingDescription}>
                  Enable maintenance mode to restrict system access during updates
                </p>
              </div>
              <div className={styles.settingControl}>                <input
                  type="checkbox"
                  className={styles.toggleSwitch}
                  checked={settings.system.maintenanceMode}
                  onChange={() => handleToggleChange('system', 'maintenanceMode')}
                  aria-label="Enable maintenance mode to restrict system access during updates"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
