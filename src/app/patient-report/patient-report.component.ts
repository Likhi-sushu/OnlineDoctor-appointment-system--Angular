import { Component, OnInit } from '@angular/core';
import { PatientReportService } from '../patient-report.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-patient-report',
  templateUrl: './patient-report.component.html',
  styleUrls: ['./patient-report.component.css']
})
export class PatientReportComponent implements OnInit {
    reports: any[] = [];
    filteredReports: any[] = []; // This will hold the filtered reports
  searchTerm: any;
    constructor(private reportService: PatientReportService) { }
  
    ngOnInit(): void {
      this.reportService.getPatientReports().subscribe(data => {
        this.reports = data;
        this.filteredReports = this.reports;  
      });
    }
    filterReports() {
    if (!this.searchTerm) {
        this.filteredReports = this.reports; // If no search term is provided, show all reports
    } else {
        this.filteredReports = this.reports.filter(report =>
            (report.name && report.name.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
            (report.age && report.age.toString().includes(this.searchTerm)) ||
            (report.diagnosis && report.diagnosis.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
            (report.notes && report.notes.toLowerCase().includes(this.searchTerm.toLowerCase()))
        );
    }
}

  //   newReport = {
  //     name: '',
  //     age: '',
  //     diagnosis: '',
  //     notes: ''
  // };
//   addReport() {
//     this.reportService.createPatientReport(this.newReport).subscribe(data => {
//         this.reports.push(data); // assuming the server returns the created report
//         this.newReport = { name: '', age: '', diagnosis: '', notes: '' }; // reset the form data
//     });
// }
    addReport() {
      const newReport = {
        name: 'Sample Name', // Replace with dynamic data or form data
        age: 28,
        diagnosis: 'Sample Diagnosis',
        notes: 'Sample Notes'
      };
  
      this.reportService.createPatientReport(newReport).subscribe(data => {
        this.reports.push(data); // assuming the server returns the created report
      });
    }
    editMode(report: any, isEditing: boolean) {
      report.isEditing = isEditing; 
      // ife turning off edit mode, then save changes
      if (!isEditing) {
        this.saveChanges(report);
      }
    }
    
    saveChanges(report: any) {
      this.reportService.updatePatientReport(report.id, report).subscribe(data => {
        // Handle the successful update.
        // If the backend returns the updated report, update the local state.
        const index = this.reports.findIndex(r => r.id === report.id);
        this.reports[index] = data;
      });
    }
    
    
    removeReport(id: number) {
      this.reportService.deletePatientReport(id).subscribe(data => {
        // Remove the report from the list
        this.reports = this.reports.filter(report => report.id !== id);
        this.filteredReports = this.filteredReports.filter(report => report.id !== id);
      });
    }
    downloadPDF(report: any) {
      const hospitalName = "Apollo";
      const hospitalLogoUrl = "https://th.bing.com/th/id/OIP.n4BNR5cQpPAN_gM2xZaUHAAAAA?pid=ImgDet&w=203&h=175&c=7&dpr=1.5";
  
      // Function to convert an image URL to a dataURL
      const urlToDataUrl = async (url: string): Promise<string> => {
          const response = await fetch(url);
          const blob = await response.blob();
          return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
          });
      };
  
      // Generate the PDF once the image is converted to dataURL
      urlToDataUrl(hospitalLogoUrl).then((logoDataUrl) => {
          const documentDefinition = {
              content: [
                  {
                      table: {
                          widths: ['auto', '*'],
                          body: [
                              [
                                  { 
                                      image: logoDataUrl, 
                                      width: 100,
                                      alignment: 'center',
                                      margin: [0, 10, 0, 0] // Top-center
                                  },
                                  { 
                                      text: hospitalName, 
                                      style: 'hospitalName',
                                      alignment: 'center',
                                      margin: [0, 10, 0, 0] // Center
                                  }
                              ]
                          ]
                      },
                      layout: 'noBorders'
                  },
                  { 
                      text: 'Patient Report', 
                      style: 'header',
                      margin: [0, 10, 0, 10]
                  },
                  {
                      table: {
                          widths: ['auto', '*'],
                          body: [
                              ['ID:', report.id],
                              ['Name:', report.name],
                              ['Age:', report.age],
                              ['Diagnosis:', report.diagnosis],
                              ['Notes:', report.notes]
                          ]
                      },
                      margin: [0, 0, 0, 20],
                      layout: 'lightHorizontalLines'
                  }
              ],
              styles: {
                  header: {
                      fontSize: 22,
                      bold: true,
                      margin: [0, 0, 0, 10]
                  },
                  hospitalName: {
                      fontSize: 16, // Adjust the font size for the hospital name
                      bold: true
                  }
              }
          };
  
          pdfMake.createPdf(documentDefinition as any).download(`PatientReport_${report.id}.pdf`);
      });
  }
  
  
  }
  
  

