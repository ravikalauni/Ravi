function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  const newRow = [
    new Date(),
    data.sender,
    data.message,
    "" // Empty reply column
  ];
  
  sheet.appendRow(newRow);
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const messages = [];
  
  // Skip header row
  for (let i = 1; i < data.length; i++) {
    messages.push({
      timestamp: data[i][0],
      sender: data[i][1],
      message: data[i][2],
      reply: data[i][3]
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify(messages))
    .setMimeType(ContentService.MimeType.JSON);
}