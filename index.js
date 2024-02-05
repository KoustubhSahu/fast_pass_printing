//Definenig the csv file name
let csv_file_name = "./demoData.csv"

// Defining Variables for Name and Major
let FIRST_NAME = ""
let LAST_NAME = ""
let MAJOR = ""

document.getElementById('nameTagForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the email input value
  var studentIdentifier = document.getElementById('email').value.trim();

  // Read the CSV file
  fetch(csv_file_name)
    .then(response => response.text())
    .then(data => {
      // Parse CSV data
      var rows = data.split('\n');
      var headers = rows[0].split(',');
      var emailIndex = headers.indexOf('Email');
      var ucidIndex = headers.indexOf('UCID');
      var firstNameIndex = headers.indexOf('FirstName');
      var lastNameIndex = headers.indexOf('LastName');
      var majorIndex = headers.indexOf('Major');

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
        var firstName = rowData[firstNameIndex];
        var lastName = rowData[lastNameIndex];
        var major = rowData[majorIndex];

        // // Replace placeholders in XML template with data
        // var nameTagXML = document.getElementById('nameTagTemplate').value
        //   .replace('{{FIRST_NAME}}', firstName)
        //   .replace('{{LAST_NAME}}', lastName)
        //   .replace('{{MAJOR}}', major);

        // Appending the xml code for printing
        var nameTagXML = document.getElementById('nameTagTemplate')
        nameTagXML.innerHTML = dymo_print_xml;

        printLabel(dymo_print_xml);

        // // Create a new window to display the name tag
        // var nameTagWindow = window.open('', '_blank');
        // nameTagWindow.document.write(nameTagXML);
        // nameTagWindow.document.close();

        // // Print the name tag
        // nameTagWindow.print();
      } else {
        alert('Email not found in the CSV file.');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

function printLabel(xml) {
  try {
    var label = dymo.label.framework.openLabelXml(xml);
    var printers = dymo.label.framework.getPrinters();
    if (printers.length === 0) {
      alert('No DYMO printers found.');
      return;
    }
    var printerName = printers[0].name; // Use the first printer found
    label.print(printerName);
  } catch (e) {
    alert('Error printing label: ' + e.message);
  }
}

var dymo_print_xml = `
<?xml version="1.0" encoding="utf-8"?>
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
          <Name>Fast-Pass</Name>
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
                <Color A="1" R="1" G="1" B="1"></Color>
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
                  <FontName>Helvetica</FontName>
                  <FontSize>21.7</FontSize>
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
              <X>0.2533333</X>
              <Y>0.1388889</Y>
            </DYMOPoint>
            <Size>
              <Width>1.319444</Width>
              <Height>0.4166667</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
        <TextObject>
          <Name>FirstName</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="0" R="1" G="1" B="1"></Color>
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
                <Text>${FIRST_NAME}</Text>
                <FontInfo>
                  <FontName>Helvetica</FontName>
                  <FontSize>40</FontSize>
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
              <X>0.2533333</X>
              <Y>0.5555556</Y>
            </DYMOPoint>
            <Size>
              <Width>3.569444</Width>
              <Height>0.743056</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
        <TextObject>
          <Name>LastName</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="0" R="1" G="1" B="1"></Color>
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
                <Text>${LAST_NAME}</Text>
                <FontInfo>
                  <FontName>Helvetica</FontName>
                  <FontSize>20.2</FontSize>
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
              <X>0.2533333</X>
              <Y>1.220104</Y>
            </DYMOPoint>
            <Size>
              <Width>3.569444</Width>
              <Height>0.3750002</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
        <TextObject>
          <Name>Major</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="0" R="1" G="1" B="1"></Color>
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
                <Text>${MAJOR}</Text>
                <FontInfo>
                  <FontName>Helvetica</FontName>
                  <FontSize>30.6</FontSize>
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
              <X>0.2433333</X>
              <Y>1.5625</Y>
            </DYMOPoint>
            <Size>
              <Width>3.607911</Width>
              <Height>0.5694445</Height>
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
</DesktopLabel>
`