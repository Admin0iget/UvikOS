// Show the Start Menu
document.getElementById('start-button').addEventListener('click', function() {
    const startMenu = document.getElementById('start-menu');
    startMenu.style.display = startMenu.style.display === 'none' ? 'block' : 'none';
});

// Close the Start Menu
function closeMenu() {
    document.getElementById('start-menu').style.display = 'none';
}

// Open Applications
function openApp(appId) {
    closeMenu();
    document.getElementById(appId).style.display = 'flex';
}

// Close Applications
function closeApp(appId) {
    document.getElementById(appId).style.display = 'none';
}

// Show Date and Time
function updateDateTime() {
    const now = new Date();
    const datetime = now.toLocaleString();
    document.getElementById('datetime').textContent = datetime;
}
setInterval(updateDateTime, 1000);

// Handle wallpaper settings
const wallpaperOptions = document.getElementsByName('wallpaper');
wallpaperOptions.forEach(option => {
    option.addEventListener('change', function() {
        if (this.value === 'custom') {
            document.getElementById('custom-wallpaper').style.display = 'block';
        } else {
            document.getElementById('custom-wallpaper').style.display = 'none';
            fetchBingWallpaper();
        }
    });
});

document.getElementById('custom-wallpaper').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('background-image').src = e.target.result;
    };
    reader.readAsDataURL(file);
});

// Fetch Bing Wallpaper
function fetchBingWallpaper() {
    const url = 'https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=en-US';
    document.getElementById('background-image').src = url;
}

// Initial Setup
fetchBingWallpaper();
updateDateTime();

// Make windows draggable
document.querySelectorAll('.window-header').forEach(header => {
    header.addEventListener('mousedown', function(e) {
        const windowElement = header.parentElement;
        let shiftX = e.clientX - windowElement.getBoundingClientRect().left;
        let shiftY = e.clientY - windowElement.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            windowElement.style.left = pageX - shiftX + 'px';
            windowElement.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        windowElement.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            windowElement.onmouseup = null;
        };
    });

    header.ondragstart = function() {
        return false;
    };
});

// Make windows resizable
document.querySelectorAll('.app-window').forEach(windowElement => {
    windowElement.style.resize = 'both';
    windowElement.style.overflow = 'auto';
});

// Open Settings
document.getElementById('settings-button').addEventListener('click', function() {
    openApp('settings');
});
