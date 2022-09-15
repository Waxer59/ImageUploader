//selecting all required elements
const dropArea = document.querySelector('.drag-area'),
  dragText = dropArea.querySelector('header'),
  button = document.querySelector('button'),
  input = dropArea.querySelector('input');
const sendBtn = document.querySelector('#send');
const main = document.querySelector('#main');
let file; //this is a global variable and we'll use it inside multiple functions

button.addEventListener('click', () => {
  input.click(); //if user click on the button then the input also clicked
});

const inputClick = () => {
  input.click();
};

input.addEventListener('change', function () {
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add('active');
  showFile(); //calling function
});

//If user Drag File Over DropArea
dropArea.addEventListener('dragover', (event) => {
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add('active');
  dragText.textContent = 'Release to Upload File';
});

//If user leave dragged File from DropArea
dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('active');
  dragText.textContent = 'Drag & Drop to Upload File';
});

//If user drop File on DropArea
dropArea.addEventListener('drop', (event) => {
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});

function showFile() {
  let fileType = file.type; //getting selected file type
  let validExtensions = ['image/jpeg', 'image/jpg', 'image/png']; //adding some valid image extensions in array
  if (validExtensions.includes(fileType)) {
    //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = () => {
      let fileURL = fileReader.result; //passing user file source in fileURL variable
      let imgTag = `
      <img src="${fileURL}" alt="image" id="image">
      <button type="button" class="close" id="close"><i class="fa-solid fa-xmark"></i></button>
      `; //creating an img tag and passing user selected file source inside src attribute
      const upload = `
      <div class="icon"><i class="fa-solid fa-cloud-arrow-up"></i></div>
      <header>Drag & Drop to Upload Image</header>
      <span>OR</span>
      <button id="browse-file" onclick="inputClick()" >Browse File</button>
      <input type="file" hidden>
      `;
      dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
      document.querySelector('#close').addEventListener('click', () => {
        dropArea.innerHTML = upload;
        dropArea.classList.remove('active');
      });
    };
    fileReader.readAsDataURL(file);
  } else {
    alert('This is not an Image File!');
    dropArea.classList.remove('active');
    dragText.textContent = 'Drag & Drop to Upload File';
  }
}

sendBtn.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!file) {
    alert('Please upload a file to continue');
    return;
  }
  main.innerHTML = '<div class="lds-ripple"><div></div><div></div></div>';
  main.classList.remove('main');

  var data = new FormData();
  data.append('file', file);

  fetch('/api/upload', {
    method: 'POST',
    body: data
  })
    .then((res) => res.json())
    .then(({ code }) => {
      const html = `
      <div class="image">
            <img src="${window.location.href}api/upload/${code}" alt="Uploaded image">
            <div class="copy-url">
                <input type="text" value="${window.location.href}${code}" id="copy-area" class="copy-area" readonly>
                <button id="copy" class="copy" type="button" onclick="copyBtn()"><i class="fa-regular fa-copy"></i></button>
            </div>
        </div>
      `;
      main.classList.add('main');
      main.innerHTML = html;
    })
    .catch((error) => console.error('Error:', error));
});
