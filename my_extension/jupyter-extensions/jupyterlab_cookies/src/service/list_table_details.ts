import { ServerConnection } from '@jupyterlab/services';
import { URLExt } from '@jupyterlab/coreutils';

export interface TableDetailsObject {
  id: string;
  display_name: string;
  description: string;
  labels: string;
  date_created: string;
  expires: string;
  location: string;
  last_modified: string;
  project: string;
  dataset: string;
  link: string;
  num_rows: number;
  num_bytes: number;
  schema: Field[];
}

interface Field {
  name: string;
  type: string;
}

// interface TablePreview {
//   preview: Preview;
// }

interface Preview {
  fields: string[];
  rows: any[];
}

export interface TableDetails {
  details: TableDetailsObject;
  preview: Preview;
}

export class TableDetailsService {
  async listTableDetails(table_id: string): Promise<TableDetails> {
    return new Promise((resolve, reject) => {
      let serverSettings = ServerConnection.makeSettings();
      const requestUrl = URLExt.join(
        serverSettings.baseUrl,
        'cookies/v1/tabledetails'
      );
      const body = { table_id: table_id };
      const requestInit: RequestInit = {
        body: JSON.stringify(body),
        method: 'POST',
      };
      ServerConnection.makeRequest(
        requestUrl,
        requestInit,
        serverSettings
      ).then(response => {
        response.json().then(content => {
          if (content.error) {
            console.error(content.error);
            reject(content.error);
            return [];
          }
          resolve({
            details: content.details,
            preview: content.preview,
          });
        });
      });
    });
  }

  // async getTablePreview(table_id: string): Promise<TablePreview> {
  //   return new Promise((resolve, reject) => {
  //     let serverSettings = ServerConnection.makeSettings();
  //     const requestUrl = URLExt.join(
  //       serverSettings.baseUrl,
  //       'cookies/v1/tabledetails'
  //     );
  //     const body = { table_id: table_id };
  //     const requestInit: RequestInit = {
  //       body: JSON.stringify(body),
  //       method: 'POST',
  //     };
  //     ServerConnection.makeRequest(
  //       requestUrl,
  //       requestInit,
  //       serverSettings
  //     ).then(response => {
  //       response.json().then(content => {
  //         if (content.error) {
  //           console.error(content.error);
  //           reject(content.error);
  //           return [];
  //         }
  //         resolve({
  //           preview: content.preview,
  //         });
  //       });
  //     });
  //   });
  // }
}
