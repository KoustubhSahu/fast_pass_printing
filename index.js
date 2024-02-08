// Defining the Google Sheet URL, Range and Sheet Name
let sheet_url = "https://docs.google.com/spreadsheets/d/1faXLXqZoizdMj6OAFkfDBDecdk7a7Zci1mJHCKONKJ0/edit#gid=0";
let sheet_name = "Sheet1";
let range;
let total_row, total_column;

// Google Sheet API Key
const apiKey = "AIzaSyBfP4Nrdke4EMy-snQK3aFcAJMMhkRU6KU";

// Defining Column Names (Column Headers)
let email = "Email Address";
let ucid = "Username";
let firstName = "First Name";
let lastName = "Last Name";
let major = "Majors";

var rows, headers, emailIndex, ucidIndex, firstNameIndex, lastNameIndex, majorIndex;

window.onload = async function () {
  // Extract the spreadsheetId and sheetId from the URL
  spreadsheetId = extractSheetInfo(sheet_url);

  const baseUrl = `https://sheets.googleapis.com/v4/spreadsheets`; // Base URL for the Google Sheets API

  const general_url = `${baseUrl}/${spreadsheetId}?key=${apiKey}`;

  try {
    // Requesting general data to get the number of rows and columns
    const range_data = await SheetDataFetch(general_url);

    // Getting the number of rows and columns from the sheet name
    range_data.sheets.forEach((sheet) => {
      if (sheet.properties.title === sheet_name) {
        total_row = sheet.properties.gridProperties.rowCount;
        total_column = sheet.properties.gridProperties.columnCount;
        return;
      }
    });

    // Geting the range of the sheet
    range = getSheetRange(total_row, total_column);

    // Requesting the data from the sheet
    const requestUrl = `${baseUrl}/${spreadsheetId}/values/${sheet_name}!${range}?key=${apiKey}`;
    // Fetching the data from the sheet
    let data = await SheetDataFetch(requestUrl);

    // Reading the sheet to get the student data
    rows = data.values;
    headers = rows[0];
    emailIndex = headers.indexOf(email);
    ucidIndex = headers.indexOf(ucid);
    firstNameIndex = headers.indexOf(firstName);
    lastNameIndex = headers.indexOf(lastName);
    majorIndex = headers.indexOf(major);
  } catch (error) {
    console.error("Error loading data:", error);
  }
};


// Called when the user Clicks the Print button abnd submit the form
// Checking if student data is found and then printing the name tag
document
  .getElementById("nameTagForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Defining Variables for Name and Major
    let FIRST_NAME = "";
    let LAST_NAME = "";
    let MAJOR = "";

    // Get the email input value
    var studentIdentifier = document.getElementById("email").value.trim();
    let rowData = null;
    // Chekcing if the studentIdentifier is in the sheet
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      if (
        row[emailIndex].trim() === studentIdentifier ||
        row[ucidIndex].trim() === studentIdentifier
      ) {
        rowData = row;
        console.log(rowData);
        console.log(studentIdentifier);
        break;
      }
    }

    // Print name tag if data found
    if (rowData) {
      FIRST_NAME = rowData[firstNameIndex];
      LAST_NAME = rowData[lastNameIndex];
      MAJOR = rowData[majorIndex];
      // console.log(`Fname: ${FIRST_NAME}, lName: ${LAST_NAME}, major: ${MAJOR}`);
      let dymo_print_xml = getXML(FIRST_NAME, LAST_NAME, MAJOR); // getting the xml
      printLabel(dymo_print_xml); // Printing the label
      document.getElementById("email").value = ""; // Cleraring the Input field after a successfull print

    }
    // Alert if data not found
    else {
      alert("The student does not qualify for a Fast-Pass. \nPlease check the Email Address or UCID and try again");
    }
  });


// Function to print the name tag
function printLabel(xml) {
  try {
    var label = dymo.label.framework.openLabelXml(xml);
    console.log(label);
    var printers = dymo.label.framework.getPrinters();
    console.log(printers);
    if (printers.length === 0) {
      alert("No DYMO printers found.");
      return;
    }
    var printerName = printers[0].name; // Use the first printer found
    label.print(printerName, "", "");
  } catch (e) {
    console.log(e);
    alert("Error printing label: " + e.message);
  }
}

// Function to get the range of the sheet
function getSheetRange(row, column) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let columnLetter = '';
  let quotient = column;

  while (quotient > 0) {
    let remainder = (quotient - 1) % 26;
    columnLetter = alphabet[remainder] + columnLetter;
    quotient = Math.floor((quotient - 1) / 26);
  }

  return `A1:${columnLetter}${row}`;
}

// Function to extract the spreadsheetId and sheetId from the URL
function extractSheetInfo(url) {
  // Extract the spreadsheetId
  const spreadsheetIdMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  const spreadsheetId = spreadsheetIdMatch ? spreadsheetIdMatch[1] : null;

  // // Extract the sheetId
  // const sheetIdMatch = url.match(/#gid=([0-9]+)/);
  // const sheetId = sheetIdMatch ? sheetIdMatch[1] : null;

  return spreadsheetId;

}

// Function to fetch the data from the Google Sheet
async function SheetDataFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // console.log("Data received:", data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}


function getXML(FIRST_NAME, LAST_NAME, MAJOR) {
  let xml = `<?xml version="1.0" encoding="utf-8"?>
<DesktopLabel Version="1">
  <DYMOLabel Version="3">
    <Description>DYMO Label</Description>
    <Orientation>Landscape</Orientation>
    <LabelName>NameBadgeCard 1760756</LabelName>
    <InitialLength>0</InitialLength>
    <BorderStyle>SolidLine</BorderStyle>
    <DYMORect>
      <DYMOPoint>
        <X>0.2333333</X>
        <Y>0.05666666</Y>
      </DYMOPoint>
      <Size>
        <Width>3.706667</Width>
        <Height>2.216667</Height>
      </Size>
    </DYMORect>
    <BorderColor>
      <SolidColorBrush>
        <Color A="1" R="0" G="0" B="0"></Color>
      </SolidColorBrush>
    </BorderColor>
    <BorderThickness>1</BorderThickness>
    <Show_Border>False</Show_Border>
    <DynamicLayoutManager>
      <RotationBehavior>ClearObjects</RotationBehavior>
      <LabelObjects>
        <TextObject>
          <Name>TextObject0</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BackgroundBrush>
            <BorderBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BorderBrush>
            <StrokeBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </StrokeBrush>
            <FillBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </FillBrush>
          </Brushes>
          <Rotation>Rotation0</Rotation>
          <OutlineThickness>1</OutlineThickness>
          <IsOutlined>False</IsOutlined>
          <BorderStyle>SolidLine</BorderStyle>
          <Margin>
            <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
          </Margin>
          <HorizontalAlignment>Center</HorizontalAlignment>
          <VerticalAlignment>Middle</VerticalAlignment>
          <FitMode>AlwaysFit</FitMode>
          <IsVertical>False</IsVertical>
          <FormattedText>
            <FitMode>AlwaysFit</FitMode>
            <HorizontalAlignment>Center</HorizontalAlignment>
            <VerticalAlignment>Middle</VerticalAlignment>
            <IsVertical>False</IsVertical>
            <LineTextSpan>
              <TextSpan>
                <Text>Fast-Pass</Text>
                <FontInfo>
                  <FontName>Segoe UI</FontName>
                  <FontSize>21.8</FontSize>
                  <IsBold>True</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>True</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="1" G="1" B="1"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
          </FormattedText>
          <ObjectLayout>
            <DYMOPoint>
              <X>0.2433333</X>
              <Y>0.06666666</Y>
            </DYMOPoint>
            <Size>
              <Width>1.322084</Width>
              <Height>0.4312501</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
        <TextObject>
          <Name>TextObject1</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BackgroundBrush>
            <BorderBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BorderBrush>
            <StrokeBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </StrokeBrush>
            <FillBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </FillBrush>
          </Brushes>
          <Rotation>Rotation0</Rotation>
          <OutlineThickness>1</OutlineThickness>
          <IsOutlined>False</IsOutlined>
          <BorderStyle>SolidLine</BorderStyle>
          <Margin>
            <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
          </Margin>
          <HorizontalAlignment>Center</HorizontalAlignment>
          <VerticalAlignment>Middle</VerticalAlignment>
          <FitMode>AlwaysFit</FitMode>
          <IsVertical>False</IsVertical>
          <FormattedText>
            <FitMode>AlwaysFit</FitMode>
            <HorizontalAlignment>Center</HorizontalAlignment>
            <VerticalAlignment>Middle</VerticalAlignment>
            <IsVertical>False</IsVertical>
            <LineTextSpan>
              <TextSpan>
                <Text>FIRST_NAME</Text>
                <FontInfo>
                  <FontName>Segoe UI</FontName>
                  <FontSize>40.7</FontSize>
                  <IsBold>True</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
          </FormattedText>
          <ObjectLayout>
            <DYMOPoint>
              <X>0.2433333</X>
              <Y>0.4529158</Y>
            </DYMOPoint>
            <Size>
              <Width>3.696667</Width>
              <Height>0.7541674</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
        <TextObject>
          <Name>TextObject2</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BackgroundBrush>
            <BorderBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BorderBrush>
            <StrokeBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </StrokeBrush>
            <FillBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </FillBrush>
          </Brushes>
          <Rotation>Rotation0</Rotation>
          <OutlineThickness>1</OutlineThickness>
          <IsOutlined>False</IsOutlined>
          <BorderStyle>SolidLine</BorderStyle>
          <Margin>
            <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
          </Margin>
          <HorizontalAlignment>Center</HorizontalAlignment>
          <VerticalAlignment>Middle</VerticalAlignment>
          <FitMode>AlwaysFit</FitMode>
          <IsVertical>False</IsVertical>
          <FormattedText>
            <FitMode>AlwaysFit</FitMode>
            <HorizontalAlignment>Center</HorizontalAlignment>
            <VerticalAlignment>Middle</VerticalAlignment>
            <IsVertical>False</IsVertical>
            <LineTextSpan>
              <TextSpan>
                <Text>LAST_NAME</Text>
                <FontInfo>
                  <FontName>Segoe UI</FontName>
                  <FontSize>22.8</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
          </FormattedText>
          <ObjectLayout>
            <DYMOPoint>
              <X>0.2333333</X>
              <Y>1.102917</Y>
            </DYMOPoint>
            <Size>
              <Width>3.676667</Width>
              <Height>0.4233346</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
        <TextObject>
          <Name>TextObject3</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BackgroundBrush>
            <BorderBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BorderBrush>
            <StrokeBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </StrokeBrush>
            <FillBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </FillBrush>
          </Brushes>
          <Rotation>Rotation0</Rotation>
          <OutlineThickness>1</OutlineThickness>
          <IsOutlined>False</IsOutlined>
          <BorderStyle>SolidLine</BorderStyle>
          <Margin>
            <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
          </Margin>
          <HorizontalAlignment>Center</HorizontalAlignment>
          <VerticalAlignment>Middle</VerticalAlignment>
          <FitMode>AlwaysFit</FitMode>
          <IsVertical>False</IsVertical>
          <FormattedText>
            <FitMode>AlwaysFit</FitMode>
            <HorizontalAlignment>Center</HorizontalAlignment>
            <VerticalAlignment>Middle</VerticalAlignment>
            <IsVertical>False</IsVertical>
            <LineTextSpan>
              <TextSpan>
                <Text>MAJOR</Text>
                <FontInfo>
                  <FontName>Segoe UI</FontName>
                  <FontSize>30</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
          </FormattedText>
          <ObjectLayout>
            <DYMOPoint>
              <X>0.2333333</X>
              <Y>1.519584</Y>
            </DYMOPoint>
            <Size>
              <Width>3.706668</Width>
              <Height>0.5604162</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
      </LabelObjects>
    </DynamicLayoutManager>
  </DYMOLabel>
  <LabelApplication>Blank</LabelApplication>
  <DataTable>
    <Columns></Columns>
    <Rows></Rows>
  </DataTable>
</DesktopLabel>`;

  MAJOR = MAJOR.replace(/&/g, "&amp;"); // Escape ampersand in MAJOR variable to avoid xml error
  xml = xml
    .replace("FIRST_NAME", FIRST_NAME)
    .replace("LAST_NAME", LAST_NAME)
    .replace("MAJOR", MAJOR);

  return xml;
}
