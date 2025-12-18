document.addEventListener('DOMContentLoaded', () => {
    const locationInfo = document.getElementById('location-info');
    const farmerForm = document.getElementById('farmer-form');
    const cropForm = document.getElementById('crop-form');
    const cropsContainer = document.getElementById('crops-container');
    const addCropBtn = document.getElementById('add-crop');
    const saveVisitBtn = document.getElementById('save-visit');
    const summaryDiv = document.getElementById('summary');
    const offlineIndicator = document.getElementById('offline-indicator');

    let crops = [];
    let autoSaveInterval;

    // Get GPS location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                locationInfo.textContent = `Current Location: ${position.coords.latitude}, ${position.coords.longitude} (Timestamp: ${new Date().toLocaleString()})`;
            },
            (error) => {
                locationInfo.textContent = 'GPS unavailable. Enter manually.';
                console.error(error);
            }
        );
    } else {
        locationInfo.textContent = 'Geolocation not supported.';
    }

    // Add crop dynamically
    addCropBtn.addEventListener('click', () => {
        const cropIndex = crops.length;
        const cropSection = document.createElement('div');
        cropSection.classList.add('crop-section');
        cropSection.innerHTML = `
            <select id="crop-name-${cropIndex}" required>
                <option value="">Crop Name*</option>
                <option value="Wheat">Wheat</option>
                <option value="Rice">Rice</option>
                <option value="Corn">Corn</option>
                <!-- Add more from PRD -->
            </select>
            <input type="number" id="area-${cropIndex}" placeholder="Area (acres)*" required min="0.1" step="0.1">
            <input type="number" id="duration-${cropIndex}" placeholder="Duration (days)*" required min="1">
            <input type="number" id="yield-${cropIndex}" placeholder="Yield Estimate (tons/acre)*" required min="0.1" step="0.1">
            <input type="date" id="planting-date-${cropIndex}" placeholder="Planting Date (Optional)">
            <input type="date" id="harvest-date-${cropIndex}" placeholder="="Harvest Date (Optional)">
            <select id="irrigation-${cropIndex}">
                <option value="">Irrigation Type (Optional)</option>
                <option value="Drip">Drip</option>
                <option value="Flood">Flood</option>
            </select>
            <select id="soil-${cropIndex}">
                <option value="">Soil Type (Optional)</option>
                <option value="Loamy">Loamy</option>
                <option value="Sandy">Sandy</option>
            </select>
            <input type="file" id="crop-media-${cropIndex}" accept="image/*,video/*" multiple>
            <div class="crop-photo-preview" id="crop-preview-${cropIndex}"></div>
            <button type="button" onclick="removeCrop(${cropIndex})">Remove Crop</button>
        `;
        cropsContainer.appendChild(cropSection);
        crops.push(cropSection);

        // Media preview
        const mediaInput = document.getElementById(`crop-media-${cropIndex}`);
        const previewDiv = document.getElementById(`crop-preview-${cropIndex}`);
        mediaInput.addEventListener('change', (e) => {
            previewDiv.innerHTML = '';
            Array.from(e.target.files).forEach(file => {
                if (file.size > 10 * 1024 * 1024) return alert('File too large (max 10MB)');
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.style.maxWidth = '100px';
                previewDiv.appendChild(img);
            });
        });
    });

    // Remove crop
    window.removeCrop = (index) => {
        cropsContainer.removeChild(crops[index]);
        crops.splice(index, 1);
    };

    // Farmer photo preview
    const photoInput = document.getElementById('farmer-photo');
    const photoPreview = document.getElementById('photo-preview');
    photoInput.addEventListener('change', (e) => {
        if (e.target.files[0].size > 5 * 1024 * 1024) return alert('Photo too large (max 5MB)');
        const img = document.createElement('img');
        img.src = URL.createObjectURL(e.target.files[0]);
        photoPreview.innerHTML = '';
        photoPreview.appendChild(img);
    });

    // Auto-save every 30s (offline mode with localStorage)
    autoSaveInterval = setInterval(() => {
        const data = {
            farmer: getFormData(farmerForm),
            crops: crops.map((_, i) => getFormData(cropForm, i))
        };
        localStorage.setItem('cropVisitData', JSON.stringify(data));
        offlineIndicator.textContent = 'Offline Mode: Progress auto-saved.';
    }, 30000);

    function getFormData(form, index = null) {
        const data = {};
        form.querySelectorAll('input, select, textarea').forEach(el => {
            if (index !== null && !el.id.includes(`-${index}`)) return;
            data[el.id] = el.value;
        });
        return data;
    }

    // Save and generate summary (mock PDF export)
    saveVisitBtn.addEventListener('click', () => {
        if (!farmerForm.checkValidity() || !cropForm.checkValidity()) return alert('Please fill required fields.');
        clearInterval(autoSaveInterval); // Stop auto-save

        const data = JSON.parse(localStorage.getItem('cropVisitData') || '{}');
        summaryDiv.innerHTML = `
            <h3>Visit Summary</h3>
            <p>Farmer: ${data.farmer['farmer-name']} (ID: ${data.farmer['farmer-id']})</p>
            <p>Location: ${locationInfo.textContent}</p>
            <h4>Crops:</h4>
            ${data.crops.map(c => `<p>${c[`crop-name-${data.crops.indexOf(c)}`]} - Area: ${c[`area-${data.crops.indexOf(c)}`]} acres</p>`).join('')}
            <p>Export: <a href="#" onclick="alert('Mock PDF generated!')">Download PDF</a> / <a href="#" onclick="alert('Mock CSV generated!')">Download CSV</a></p>
        `;
        summaryDiv.style.display = 'block';

        // Clear localStorage after "sync"
        localStorage.removeItem('cropVisitData');
    });

    // Load unfinished visit if exists
    if (localStorage.getItem('cropVisitData')) {
        alert('Unfinished visit found. Resuming...');
        // TODO: Populate forms from storage (expand as needed)
    }
});