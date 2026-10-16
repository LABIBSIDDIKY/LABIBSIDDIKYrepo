// Sends the contact form to Web3Forms without leaving the page.
// Runs in the capture phase so it takes over from any older submit handler in main.js.

const form = document.querySelector('[data-contact-form]');
const status = document.querySelector('[data-form-status]');

if (form) {
  const button = form.querySelector('button[type="submit"]');
  const endpoint = form.getAttribute('action') || 'https://api.web3forms.com/submit';

  const setStatus = (message, state) => {
    if (!status) return;
    status.textContent = message;
    status.dataset.state = state || '';
    status.style.color = state === 'success' ? '#00f0ff'
                       : state === 'error'   ? '#ff6b6b'
                       : '';
  };

  document.addEventListener('submit', async (e) => {
    if (e.target !== form) return;
    e.preventDefault();
    e.stopImmediatePropagation();

    const data = new FormData(form);

    if (data.get('access_key') === 'YOUR_ACCESS_KEY_HERE') {
      setStatus('The form is not set up yet: add your Web3Forms access key.', 'error');
      return;
    }

    const originalLabel = button ? button.innerHTML : '';
    if (button) { button.disabled = true; button.textContent = 'Sending…'; }
    setStatus('Sending your message…', 'pending');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(data))
      });
      const result = await response.json();

      if (response.ok && result.success) {
        form.reset();
        setStatus('Thanks! Your message was sent. I will get back to you soon.', 'success');
      } else {
        setStatus(result.message || 'Something went wrong. Please try again.', 'error');
      }
    } catch (err) {
      setStatus('Network error. Please check your connection and try again.', 'error');
    } finally {
      if (button) { button.disabled = false; button.innerHTML = originalLabel; }
    }
  }, true);
}