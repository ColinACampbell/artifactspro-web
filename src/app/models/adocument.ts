// A document = Artifact Document
export interface ADocument {
    doc_id:number;
    version:String;
    comment:String;
    user_id:number;
    user_email: string;
    user_full_name: string;
    data:String | ArrayBuffer;
    date_uploaded:String;
    data_modified:String;
    art_id:number;
    date_created:String;
    date_modified:String;
    type:String;
    modified: String;
    file_size: number;
}
