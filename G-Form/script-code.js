// open script editor in the tools section in the google sheets
// spread sheet id can be found in the url https://docs.google.com/spreadsheets/d/spreadsheetID/edit

// adding firebase app in the script editor: go to Resources > Libraries > paste MYeP8ZEEt1ylVDxS7uyg9plDOcoke7-2l in add library and add it.
// select version 30 and you are done

function writeDataToFirebase() {
    var firebaseUrl = "https://makerqr.firebaseio.com";
    var secret = "the firebase database secret here";
    var base = FirebaseApp.getDatabaseByUrl(firebaseUrl, secret);
    var mySheet = SpreadsheetApp.openById("the id of your spreadsheet");
    var dataSheet = mySheet.getSheets()[1];
    var lastRow = mySheet.getLastRow();
    var lastColumn = mySheet.getLastColumn();
    var data = mySheet.getSheetValues(1, 1, lastRow, lastColumn);
    var dataToImport = {};
    for (var i = 1; i < data.length; i++) {
        dataToImport[i] = {
            stamp: data[i][0],
            name: data[i][1],
            email: data[i][2],
            address: data[i][3],
            phone: data[i][4],
            comment: data[i][5]
        };
    }
    base.setData("maker", dataToImport);
}
function addNewData() {
    writeDataToFirebase();
}

