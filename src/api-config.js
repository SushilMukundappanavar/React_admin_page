let backendHost;
const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

if(hostname === 'https://admin.gold.autodesk.com') {
  backendHost = 'https://api-admin.gold.autodesk.com';
} else if(hostname === 'https://admin.goldstg.autodesk.com') {
  backendHost = 'https://api-admin.goldstg.autodesk.com';
} else {
    backendHost = process.env.REACT_APP_BACKEND_HOST || 'https://api-admin.gold.autodesk.com';
}

export const API_ROOT = `${backendHost}`;



