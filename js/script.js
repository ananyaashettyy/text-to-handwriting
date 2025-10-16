const convertBtn = document.getElementById('convertBtn');
const downloadBtn = document.getElementById('downloadBtn');
const outputDiv = document.getElementById('output');

convertBtn.addEventListener('click', () => {
    const text = document.getElementById('textInput').value.trim();
    if (!text) {
        outputDiv.textContent = "Please enter some text!";
        return;
    }

    // Style options
    const font = document.getElementById('fontSelect').value;
    const fontSize = document.getElementById('fontSize').value + 'px';
    const color = document.getElementById('inkColor').value;
    const shadow = document.getElementById('shadowEffect').checked ? '2px 2px 2px gray' : 'none';
    const lineHeight = document.getElementById('lineSpacing').value;
    const letterSpacing = document.getElementById('letterSpacing').value + 'px';

    outputDiv.style.fontFamily = font;
    outputDiv.style.fontSize = fontSize;
    outputDiv.style.color = color;
    outputDiv.style.textShadow = shadow;
    outputDiv.style.lineHeight = lineHeight;
    outputDiv.style.letterSpacing = letterSpacing;

    // Page background
    const pageBgInput = document.getElementById('pageBg');
    if (pageBgInput.files && pageBgInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            outputDiv.style.backgroundImage = `url('${e.target.result}')`;
        }
        reader.readAsDataURL(pageBgInput.files[0]);
    } else {
        outputDiv.style.backgroundImage = 'none';
    }

    outputDiv.textContent = text;
});

// Download output as image or PDF
downloadBtn.addEventListener('click', () => {
    html2canvas(outputDiv).then(canvas => {
        // Download as PNG
        const link = document.createElement('a');
        link.download = 'handwriting.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Download as JPG
        const jpgLink = document.createElement('a');
        jpgLink.download = 'handwriting.jpg';
        jpgLink.href = canvas.toDataURL('image/jpeg', 0.9);
        jpgLink.click();

        // Download as PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0); // Auto scale width
        pdf.save('handwriting.pdf');

        // DOCX download is more complex, can be done with docx.js library
    });
});
