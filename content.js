function enableReattemptMode() {
  document.querySelectorAll('.qt-feedback').forEach(div => (div.style.display = 'none'));
document.querySelectorAll('.qt-choices input[type="radio"]').forEach(input => {
  input.disabled = false;
  input.checked = false;
});

  if (!document.querySelector('#reattempt-submit-all')) {
    const submitBtn = document.createElement('button');
    submitBtn.id = 'reattempt-submit-all';
    submitBtn.textContent = 'Submit All';
    Object.assign(submitBtn.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: '9999',
      background: '#007bff',
      color: 'white',
      padding: '10px 16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    });

    submitBtn.onclick = showResults;
    document.body.appendChild(submitBtn);
  }

  alert('✅ Reattempt mode enabled! You can now select answers and click Submit All.');
}

function showResults() {
  let total = 0, correct = 0;

  document.querySelectorAll('.qt-choices').forEach(choiceDiv => {
    const feedbackDiv = choiceDiv.nextElementSibling;
    const correctText = feedbackDiv?.querySelector('.faculty-answer label')?.innerText.trim();
    const selected = choiceDiv.querySelector('input[type="radio"]:checked');
    const selectedLabel = selected
      ? choiceDiv.querySelector(`label[for="${selected.id}"]`)?.innerText.trim()
      : null;

    // Clear old feedback content
    feedbackDiv.innerHTML = '';
    feedbackDiv.style.display = 'block';
    feedbackDiv.style.padding = '10px';
    feedbackDiv.style.borderRadius = '6px';
    feedbackDiv.style.marginTop = '8px';

    if (correctText) {
      total++;
      if (selectedLabel === correctText) {
        correct++;
        feedbackDiv.style.background = '#d4edda';
        feedbackDiv.style.border = '1px solid #28a745';
        feedbackDiv.innerHTML = `<strong>✅ Correct!</strong> You chose <b>${selectedLabel}</b>.`;
      } else {
        feedbackDiv.style.background = '#f8d7da';
        feedbackDiv.style.border = '1px solid #dc3545';
        feedbackDiv.innerHTML = `<strong>❌ Wrong!</strong><br>
          You chose <b>${selectedLabel || 'No answer'}</b><br>
          Correct answer: <b>${correctText}</b>`;
      }
    }
  });

  const scoreBox = document.createElement('div');
  scoreBox.id = 'reattempt-scorebox';
  scoreBox.innerHTML = `<h3 style="margin:0;">Your Score: ${correct} / ${total}</h3>`;
  Object.assign(scoreBox.style, {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    zIndex: '9999',
    background: 'white',
    border: '2px solid #007bff',
    padding: '10px 16px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  });

  document.body.appendChild(scoreBox);
}

function toggleReattemptMode() {
  if (document.querySelector('#reattempt-toggle')) return;

  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'reattempt-toggle';
  toggleBtn.textContent = 'Enable Reattempt Mode';
  Object.assign(toggleBtn.style, {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    zIndex: '9999',
    background: '#28a745',
    color: 'white',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  });

  toggleBtn.onclick = () => {
    enableReattemptMode();
    toggleBtn.remove();
  };

  document.body.appendChild(toggleBtn);
}

window.addEventListener('load', toggleReattemptMode);
