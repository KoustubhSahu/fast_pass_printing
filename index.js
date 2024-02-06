//Definenig the csv file nameMAJOR
let csv_file_name = "./demoData.csv"

// Defining Column Names / Column Headers
let email = "Email";
let ucid = "UCID";
let firstName = "FirstName";
let lastName = "LastName";
let major = "Major";


document.getElementById('nameTagForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Defining Variables for Name and Major
  let FIRST_NAME = ""
  let LAST_NAME = ""
  let MAJOR = ""

  // Get the email input value
  var studentIdentifier = document.getElementById('email').value.trim();

  let test = false;

  if (test) {
    console.log("This is a test");
    FIRST_NAME = "Koustubh";
    LAST_NAME = "Sahu";
    MAJOR = "Computer Science";

    let dymo_print_xml = getXML(FIRST_NAME, LAST_NAME, MAJOR);
    printLabel(dymo_print_xml);
  }

  else { //start here 
    // Read the CSV file
    fetch(csv_file_name)
      .then(response => response.text())
      .then(data => {
        // Parse CSV data
        var rows = data.split('\n');
        var headers = rows[0].split(',');
        var emailIndex = headers.indexOf(email);
        var ucidIndex = headers.indexOf(ucid);
        var firstNameIndex = headers.indexOf(firstName);
        var lastNameIndex = headers.indexOf(lastName);
        var majorIndex = headers.indexOf(major);

        console.log(`emailIndex = ${emailIndex} & ucidIndex = ${ucidIndex}`);
        console.log(`length of the csv file is ${rows.length}`);

        // Find the row with the matching email
        var rowData;
        for (var i = 1; i < rows.length; i++) {
          var row = rows[i].split(',');
          if ((row[emailIndex].trim() === studentIdentifier) || (row[ucidIndex].trim() === studentIdentifier)) {
            rowData = row;
            break;
          }
        }

        // Print name tag if data found
        if (rowData) {
          FIRST_NAME = rowData[firstNameIndex];
          LAST_NAME = rowData[lastNameIndex];
          MAJOR = rowData[majorIndex];
          console.log(`Fname: ${FIRST_NAME}, lName: ${LAST_NAME}, major: ${MAJOR}`);
          let dymo_print_xml = getXML(FIRST_NAME, LAST_NAME, MAJOR);
          printLabel(dymo_print_xml);
        }
        else {
          alert('Identifier not found in the CSV file.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  } // ends here


});

function printLabel(xml) {
  try {
    var label = dymo.label.framework.openLabelXml(xml);
    console.log(label)
    var printers = dymo.label.framework.getPrinters();
    console.log(printers);
    if (printers.length === 0) {
      alert('No DYMO printers found.');
      return;
    }
    var printerName = printers[0].name; // Use the first printer found
    label.print(printerName, '', '');
  } catch (e) {
    console.log(e);
    alert('Error printing label: ' + e.message);
  }
}

// function getXML(FIRST_NAME, LAST_NAME, MAJOR) {
function getXML() {
  let xml =  `<?xml version="1.0" encoding="utf-8"?>
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

xml = xml.replace("FIRST_NAME", FIRST_NAME).replace("LAST_NAME", LAST_NAME).replace("MAJOR", MAJOR);

return xml;

}