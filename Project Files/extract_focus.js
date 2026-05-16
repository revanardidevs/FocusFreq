const fs = require('fs');
const content = fs.readFileSync('d:/FocusFreq/Project Files/UI_utf8.html', 'utf8');
const focusMatch = content.match(/"focus"\s*:\s*"(.*?)"\s*,\s*"history"/);
if (focusMatch) {
  fs.writeFileSync('d:/FocusFreq/Project Files/focus.html', focusMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"'), 'utf8');
  console.log('Extracted focus.html');
} else {
  // Let's just find the first HTML looking string
  const docMatch = content.match(/"(<!doctype html>.*?)"/);
  if (docMatch) {
    fs.writeFileSync('d:/FocusFreq/Project Files/focus.html', docMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"'), 'utf8');
    console.log('Extracted first doctype html string as focus.html');
  } else {
    console.log('No HTML found');
  }
}
