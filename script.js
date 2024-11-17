// Convert Images to PDF (langsung download)
async function convertImagesToPDF() {
    const { jsPDF } = window.jspdf;
    const imgInput = document.getElementById('imgInput').files;

    if (imgInput.length === 0) {
        alert('Please select at least one image!');
        return;
    }

    const pdf = new jsPDF();
    for (let i = 0; i < imgInput.length; i++) {
        const file = imgInput[i];
        const imgData = await getImageDataURL(file);
        pdf.addImage(imgData, 'JPEG', 15, 15, 180, 160);
        if (i < imgInput.length - 1) {
            pdf.addPage(); // Add new page for each image
        }
    }

    // Download the PDF
    pdf.save('images-to-pdf.pdf');
}

// Helper function to read image as Data URL
function getImageDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// Convert Text to PDF (langsung download)
function convertTextToPDF() {
    const { jsPDF } = window.jspdf;
    const textInput = document.getElementById('textInput').value;

    if (textInput.trim() === '') {
        alert('Please enter some text!');
        return;
    }

    const pdf = new jsPDF();
    const lines = pdf.splitTextToSize(textInput, 180); // Automatically splits long text
    pdf.text(lines, 10, 20);
    pdf.save('text-to-pdf.pdf');
}