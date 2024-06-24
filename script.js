document.getElementById('file-converter-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const formatSelect = document.getElementById('formatSelect');
    const resultDiv = document.getElementById('result');

    if (fileInput.files.length === 0) {
        alert('Please select a file to convert');
        return;
    }

    const file = fileInput.files[0];
    const format = formatSelect.value;

    resultDiv.innerHTML = `<p>Converting file...</p>`;

    setTimeout(() => {
        const blob = new Blob([file], { type: getMimeType(format) });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `converted.${format}`;
        downloadLink.textContent = 'Download File';
        
        resultDiv.innerHTML = `
            <p>File converted to ${format.toUpperCase()} successfully!</p>
        `;
        resultDiv.appendChild(downloadLink);
    }, 2000);
});

function getMimeType(format) {
    switch (format) {
        case 'pdf':
            return 'application/pdf';
        case 'word':
        case 'docx':
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        default:
            return 'application/octet-stream';
    }
}
