const copyBtn = () => {
  document.querySelector('#copy-area').select();
  document.querySelector('#copy-area').setSelectionRange(0, 99999); 

  navigator.clipboard.writeText(document.querySelector('#copy-area').value);

  alert('Url has been copied');
};
