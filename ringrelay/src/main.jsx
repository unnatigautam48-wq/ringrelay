import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const initialEvents = [
  {
    id: 1,
    type: 'Package detected',
    location: 'Front door',
    time: '2:30 PM',
    severity: 'low',
    summary: 'A package was left outside.',
    action: 'Remind user in 30 minutes.',
    status: 'Pending',
    reason: 'Package activity is non-urgent during normal hours.'
  },
  {
    id: 2,
    type: 'Unknown visitor',
    location: 'Front door',
    time: '11:42 PM',
    severity: 'high',
    summary: 'An unknown visitor was detected during quiet hours.',
    action: 'Ask whether to notify a trusted contact.',
    status: 'Pending',
    reason: 'Unknown person + front-door activity + quiet hours.'
  }
];

const eventTemplates = {
  package: {
    type: 'Package detected', location: 'Front door', severity: 'low',
    summary: 'A package was left outside.', action: 'Remind user in 30 minutes.',
    reason: 'Package activity is non-urgent during normal hours.'
  },
  visitor: {
    type: 'Unknown visitor', location: 'Front door', severity: 'high',
    summary: 'An unknown visitor was detected during quiet hours.',
    action: 'Ask whether to notify a trusted contact.',
    reason: 'Unknown person + front-door activity + quiet hours.'
  },
  motion: {
    type: 'Repeated motion', location: 'Side entrance', severity: 'medium',
    summary: 'Repeated motion was detected near the entrance.',
    action: 'Review the event and decide whether to escalate.',
    reason: 'Multiple motion events were detected in a short period.'
  }
};

function App() {
  const [events, setEvents] = useState(initialEvents);
  const [nextId, setNextId] = useState(3);

  function simulate(kind) {
    const template = eventTemplates[kind];
    const now = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    setEvents([{ ...template, id: nextId, time: now, status: 'Pending' }, ...events]);
    setNextId(nextId + 1);
  }

  function updateStatus(id, status) {
    setEvents(events.map(event => event.id === id ? { ...event, status } : event));
  }

  const attentionCount = events.filter(event => event.status === 'Pending' && event.severity !== 'low').length;

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">R</span><div><strong>RingRelay</strong><small>Context-aware home safety</small></div></div>
        <div className="connection"><span className="dot"></span> Simulator connected</div>
      </header>

      <section className="intro">
        <div><p className="eyebrow">HOUSEHOLD OVERVIEW</p><h1>Good afternoon, Unnati.</h1><p className="muted">Understand what matters at home, without the notification overload.</p></div>
        <div className="status-pill"><span className="pulse"></span> Monitoring</div>
      </section>

      <section className="metrics">
        <div className="metric"><span className="metric-label">Today’s events</span><strong>{events.length}</strong><small>Across 2 entry points</small></div>
        <div className="metric"><span className="metric-label">Needs attention</span><strong className={attentionCount ? 'orange' : ''}>{attentionCount}</strong><small>{attentionCount ? 'Review pending alerts' : 'You are all caught up'}</small></div>
        <div className="metric"><span className="metric-label">Quiet hours</span><strong>10 PM–6 AM</strong><small>Trusted contact: Sister</small></div>
      </section>

      <section className="simulator panel">
        <div><p className="eyebrow">LOCAL EVENT SIMULATOR</p><h2>Test a household scenario</h2><p className="muted">Use these events to preview how RingRelay applies context and household preferences.</p></div>
        <div className="sim-buttons"><button onClick={() => simulate('package')}>＋ Package</button><button onClick={() => simulate('visitor')}>＋ Night visitor</button><button onClick={() => simulate('motion')}>＋ Repeated motion</button></div>
      </section>

      <section className="events-section"><div className="section-heading"><div><p className="eyebrow">EVENT TIMELINE</p><h2>Recent activity</h2></div><span className="event-count">{events.length} events</span></div>
        <div className="event-list">{events.map(event => <article className={`event-card ${event.severity}`} key={event.id}>
          <div className="event-icon">{event.severity === 'high' ? '!' : event.severity === 'medium' ? '↻' : '▣'}</div>
          <div className="event-main"><div className="event-title"><h3>{event.type}</h3><span className={`badge ${event.severity}`}>{event.severity}</span></div><p>{event.summary}</p><div className="event-meta"><span>⌖ {event.location}</span><span>◷ {event.time}</span></div></div>
          <div className="event-action"><span className="action-label">RECOMMENDED ACTION</span><p>{event.action}</p><details><summary>Why this alert?</summary><small>{event.reason}</small></details><div className="actions">{event.status === 'Pending' ? <><button className="confirm" onClick={() => updateStatus(event.id, 'Confirmed')}>Confirm</button><button className="dismiss" onClick={() => updateStatus(event.id, 'Dismissed')}>Dismiss</button></> : <span className={`status ${event.status.toLowerCase()}`}>{event.status}</span>}</div></div>
        </article>)}</div>
      </section>

      <section className="settings panel"><div><p className="eyebrow">HOUSEHOLD PREFERENCES</p><h2>Safety settings</h2></div><div className="setting-grid"><div><span>Quiet hours</span><strong>10:00 PM — 6:00 AM</strong></div><div><span>Trusted contact</span><strong>Sister</strong></div><div><span>Package reminder</span><strong>30 minutes</strong></div></div></section>
      <footer>RingRelay keeps people in control. It does not use facial recognition, unlock doors, or make emergency decisions automatically.</footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
