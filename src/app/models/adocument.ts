// A document = Artifact Document
export interface ADocument {
    doc_id:number;
    version:string;
    comment:string;
    user_id:number;
    user_email: string;
    user_full_name: string;
    data:String | ArrayBuffer;
    date_uploaded:string;
    data_modified:string;
    art_id:number;
    date_created:string;
    date_modified:string;
    type:string;
    modified: string;
    file_size: number;
}
