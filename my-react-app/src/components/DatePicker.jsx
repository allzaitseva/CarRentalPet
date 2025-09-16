import React, { useState, useEffect, useRef } from 'react';

const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function DatePicker({ label, value, onChange, minDate }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => {
    const d = value || new Date();
    return { month: d.getMonth(), year: d.getFullYear() };
  });
  const [selected, setSelected] = useState(value || null);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (value) {
      setSelected(value);
      setView({ month: value.getMonth(), year: value.getFullYear() });
    }
  }, [value]);

  function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function buildGrid(year, month) {
    const first = new Date(year, month, 1);
    let firstWeekday = first.getDay();
    firstWeekday = firstWeekday === 0 ? 6 : firstWeekday - 1;
    const total = daysInMonth(year, month);
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevDays = daysInMonth(prevYear, prevMonth);
    const cells = [];
    // Previous month tail
    for (let i = 0; i < firstWeekday; i++) {
      cells.push({ day: prevDays - firstWeekday + 1 + i, current: false, disabled: true, type: 'prev' });
    }
    // Current month
    for (let d = 1; d <= total; d++) {
      const dateObj = new Date(year, month, d);
      const disabled = minDate ? dateObj < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()) : false;
      cells.push({ day: d, current: true, disabled, type: 'current' });
    }
    // Next month head
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    let nextDay = 1;
    while (cells.length % 7 !== 0) {
      cells.push({ day: nextDay, current: false, disabled: true, type: 'next' });
      nextDay++;
    }
    return cells;
  }

  const cells = buildGrid(view.year, view.month);
  const today = new Date();

  function applyDate(dateObj) {
    setSelected(dateObj);
    onChange?.(dateObj);
  }

  function format(date) {
    if (!date) return '';
    const d = String(date.getDate()).padStart(2,'0');
    const m = String(date.getMonth()+1).padStart(2,'0');
    const y = date.getFullYear();
    return `${d}.${m}.${y}`;
  }

  function nextMonth() {
    setView(v => ({ month: v.month === 11 ? 0 : v.month + 1, year: v.month === 11 ? v.year + 1 : v.year }));
  }
  function prevMonth() {
    setView(v => ({ month: v.month === 0 ? 11 : v.month - 1, year: v.month === 0 ? v.year - 1 : v.year }));
  }

  return (
    <div className="date-picker-container" ref={ref}>
      <input
        type="text"
        className="date-picker"
        placeholder={label}
        value={format(selected)}
        onClick={() => setOpen(o => !o)}
        readOnly
      />
      <img src="/img/calendar.svg" alt="Calendar" className="calendar-icon" />
      {open && (
        <div className="date-display">
          <div className="date-display-header">
            <button className="prev" onClick={prevMonth}>Prev</button>
            <div>
              <select className="month-select" value={view.month} onChange={e => setView(v => ({...v, month: Number(e.target.value)}))}>
                {monthNames.map((m,i) => <option key={m} value={i}>{m}</option>)}
              </select>
              <select className="year-select" value={view.year} onChange={e => setView(v => ({...v, year: Number(e.target.value)}))}>
                {Array.from({length: 6}, (_,i) => today.getFullYear()-1 + i).map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <button className="next" onClick={nextMonth}>Next</button>
          </div>
          <div className="weekdays">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <span key={d}>{d}</span>)}
          </div>
          <div className="dates">
            {cells.map((c, idx) => {
              let dateObj = null;
              if (c.type === 'current') {
                dateObj = new Date(view.year, view.month, c.day);
              } else if (c.type === 'prev') {
                dateObj = new Date(view.year, view.month - 1, c.day);
              } else if (c.type === 'next') {
                dateObj = new Date(view.year, view.month + 1, c.day);
              }
              const isToday = !!dateObj && dateObj.toDateString() === today.toDateString();
              const isSelected = !!dateObj && selected && dateObj.toDateString() === selected.toDateString();
              const isDisabled = c.disabled;
              return (
                <button
                  key={idx}
                  disabled={isDisabled}
                  className={[
                    c.current ? 'current-month' : '',
                    isToday ? 'today' : '',
                    isSelected ? 'selected' : '',
                    c.type === 'prev' ? 'prev-month' : '',
                    c.type === 'next' ? 'next-month' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => { if (dateObj && c.current && !isDisabled) applyDate(dateObj); }}
                >
                  {c.day ?? ''}
                </button>
              );
            })}
          </div>
          <div className="date-display-footer">
            <button className="cancel" onClick={() => setOpen(false)}>Cancel</button>
            <button className="apply" onClick={() => setOpen(false)}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}
