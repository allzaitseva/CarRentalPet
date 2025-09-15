const navLinks = document.querySelectorAll('.tabcontent a');

navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.fontWeight = '900';
  });
  link.addEventListener('mouseleave', () => {
    link.style.fontWeight = '500';
  });
    link.addEventListener('click', () => {
    window.location.href = '/';
  });
});

const logo = document.querySelector('.logo');
if (logo) {
  logo.style.cursor = 'pointer';
  logo.addEventListener('mouseenter', () => {
    logo.style.transform = 'scale(1.05)';
  });
  logo.addEventListener('mouseleave', () => {
    logo.style.transform = 'scale(1)';
  });
  logo.addEventListener('click', () => {
    window.location.href = '/';
  });
}

const dateDisplay = document.querySelectorAll('.date-display');
const datePicker = document.querySelectorAll('.date-picker');
datePicker.forEach(picker => {
  picker.addEventListener('click', () => {

    document.querySelectorAll('.date-display').forEach(display => {
      display.hidden = true;
    });

    const container = picker.closest('.date-picker-container');
    const calendar = container.querySelector('.date-display');
    if (calendar) calendar.hidden = false;
  });
});

const cancelButtons = document.querySelectorAll('.cancel');

cancelButtons.forEach(button => {
  button.addEventListener('click', () => {
    dateDisplay.forEach(display => {
      display.hidden = true;
    });
  });
});

window.addEventListener('click', (event) => {
  if (!event.target.closest('.date-picker-container')) {
    dateDisplay.forEach(display => {
      display.hidden = true;
    });
  }
});

const now = new Date();
const monthSelects = document.querySelectorAll('.month-select');
const yearInputs = document.querySelectorAll('.year-input, .year-select');
monthSelects.forEach(select => {
  select.selectedIndex = now.getMonth();
});
yearInputs.forEach(input => {
  if (input.tagName === 'INPUT') {
    input.value = now.getFullYear();
  } else {
    let found = false;
    for (let i = 0; i < input.options.length; i++) {
      if (parseInt(input.options[i].textContent, 10) === now.getFullYear()) {
        input.selectedIndex = i;
        found = true;
        break;
      }
    }
    if (!found) input.selectedIndex = 0;
  }
});

function highlightToday() {
  const now = new Date();
  const todayDate = now.getDate();
  const todayMonth = now.getMonth();
  const todayYear = now.getFullYear();
  document.querySelectorAll('.date-display').forEach(display => {
    const header = display.querySelector('.date-display-header');
    const monthSelect = header.querySelector('.month-select');
    let yearInput = header.querySelector('.year-select');
    if (!yearInput) yearInput = header.querySelector('.year-select');
    let year = yearInput.tagName === 'INPUT' ? Number(yearInput.value) : Number(yearInput.options[yearInput.selectedIndex].textContent);
    let month = Number(monthSelect.value);
    const datesContainer = display.querySelector('.dates');
    if (month === todayMonth && year === todayYear) {
      datesContainer.querySelectorAll('button.current-month').forEach(dayBtn => {
        if (parseInt(dayBtn.textContent, 10) === todayDate) {
          dayBtn.classList.add('today');
        } else {
          dayBtn.classList.remove('today');
        }
      });
    } else {
      datesContainer.querySelectorAll('button.current-month').forEach(dayBtn => {
        dayBtn.classList.remove('today');
      });
    }
  });
}

const next = document.querySelectorAll('.next'),
      prev = document.querySelectorAll('.prev');

next.forEach(button => {
  button.addEventListener('click', () => {
    const header = button.closest('.date-display-header');
    const monthSelect = header.querySelector('.month-select');
    let yearInput = header.querySelector('.year-select');
    if (!yearInput) yearInput = header.querySelector('.year-select');
    if (monthSelect && yearInput) {
      let currentYear = yearInput.tagName === 'INPUT' ? Number(yearInput.value) : Number(yearInput.options[yearInput.selectedIndex].textContent);

      if (monthSelect.selectedIndex < monthSelect.options.length - 1) {
        monthSelect.selectedIndex += 1;
      } else {
        monthSelect.selectedIndex = 0;
        if (yearInput.tagName === 'INPUT') {
          yearInput.value = currentYear + 1;
        } else {
          if (yearInput.selectedIndex < yearInput.options.length - 1) {
            yearInput.selectedIndex += 1;
          }
        }
      }
      updateCalendars();
      button.disabled = false;
    }
  });
});

prev.forEach(button => {
  button.addEventListener('click', () => {
    const header = button.closest('.date-display-header');
    const monthSelect = header.querySelector('.month-select');
    let yearInput = header.querySelector('.year-input');
    if (!yearInput) yearInput = header.querySelector('.year-select');
    if (monthSelect && yearInput) {
      let currentYear = yearInput.tagName === 'INPUT' ? Number(yearInput.value) : Number(yearInput.options[yearInput.selectedIndex].textContent);
      let currentMonth = Number(monthSelect.value);
      const now = new Date();

      let prevMonth = currentMonth - 1;
      let prevYear = currentYear;
      if (prevMonth < 0) {
        prevMonth = 11;
        prevYear -= 1;
      }
      const prevDate = new Date(prevYear, prevMonth, 1);
      if (prevDate < new Date(now.getFullYear(), now.getMonth(), 1)) {
        return button.disabled = true;
      } else {
        button.disabled = false;
      }
      button.disabled = false;

      if (monthSelect.selectedIndex > 0) {
        monthSelect.selectedIndex -= 1;
      } else {
        monthSelect.selectedIndex = 11;
        if (yearInput.tagName === 'INPUT') {
          yearInput.value = currentYear - 1;
        } else {
          if (yearInput.selectedIndex > 0) {
            yearInput.selectedIndex -= 1;
          }
        }
      }
      updateCalendars();
    }
  });
});

function generateCalendar(year, month, datesContainer) {
  datesContainer.innerHTML = '';

  let firstDay = new Date(year, month, 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1; 
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
  for (let i = 0; i < firstDay; i++) {
    const btn = document.createElement('button');
    btn.textContent = daysInPrevMonth - firstDay + 1 + i;
    btn.disabled = true;
    btn.classList.add('prev-month');
    datesContainer.appendChild(btn);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayBtn = document.createElement('button');
    dayBtn.textContent = d;
    dayBtn.classList.add('current-month');
    datesContainer.appendChild(dayBtn);
  }

  const totalCells = firstDay + daysInMonth;
  const cellsToAdd = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= cellsToAdd; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.classList.add('next-month');
    btn.disabled = true;
    datesContainer.appendChild(btn);
  }
}


function updateCalendars() {
  document.querySelectorAll('.date-display').forEach(display => {
    const header = display.querySelector('.date-display-header');
    const monthSelect = header.querySelector('.month-select');
    let yearInput = header.querySelector('.year-input');
    if (!yearInput) yearInput = header.querySelector('.year-select');
    const datesContainer = display.querySelector('.dates');
    if (monthSelect && yearInput && datesContainer) {
      let year = yearInput.tagName === 'INPUT' ? Number(yearInput.value) : Number(yearInput.options[yearInput.selectedIndex].textContent);
      let month = Number(monthSelect.value);
      generateCalendar(year, month, datesContainer);
    }
  });
  highlightToday();
}

function addCalendarListeners() {
  document.querySelectorAll('.date-display').forEach(display => {
    const header = display.querySelector('.date-display-header');
    const monthSelect = header.querySelector('.month-select');
    let yearInput = header.querySelector('.year-input');
    if (!yearInput) yearInput = header.querySelector('.year-select');
    if (monthSelect) {
      monthSelect.addEventListener('change', updateCalendars);
    }
    if (yearInput) {
      yearInput.addEventListener('change', updateCalendars);
      yearInput.addEventListener('input', updateCalendars);
    }
  });
}

addCalendarListeners();
updateCalendars();

document.querySelectorAll('.date-picker-container').forEach(container => {
  const input = container.querySelector('.date-picker');
  const dates = container.querySelector('.dates');
  const monthSelect = container.querySelector('.month-select');
  const apply = container.querySelector('.apply');
  let yearInput = container.querySelector('.year-input');
  if (!yearInput) yearInput = container.querySelector('.year-select');
  const dateDisplay = container.querySelector('.date-display');

  if (dates && input && monthSelect && yearInput) {
    dates.addEventListener('click', e => {
      const btn = e.target;
      if (btn.classList.contains('current-month') && !btn.disabled) {

        dates.querySelectorAll('.selected').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        const day = btn.textContent.padStart(2, '0');
        const month = (Number(monthSelect.value) + 1).toString().padStart(2, '0');
        const year = yearInput.tagName === 'INPUT' ? yearInput.value : yearInput.options[yearInput.selectedIndex].textContent;
        input.value = `${day}.${month}.${year}`;
      }
    });
  }
  if (apply && dateDisplay) {
    apply.addEventListener('click', () => {
      dateDisplay.hidden = true;
    });
  }
});



