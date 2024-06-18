const { execFile } = require('child_process');
pythonPath = "C:\\Users\\Asus\\AppData\\Local\\Programs\\Python\\Python311\\python.exe";
scriptPath = "C:\\Users\\Asus\\Desktop\\Ognjen\\III god\\drugi sem\\IT\\projekatIT\\projekatIT\\backend\\fajl.py";

arr = ["nesto"]

execFile(pythonPath, [scriptPath,...arr], (error, stdout, stderr) => {
    if (error) {
        console.error('Error executing Python script:', error);
        return;
    }
    if (stderr) {
        console.error('Python stderr:', stderr);
        return;
    }
    console.log('Python stdout:', stdout);
});
