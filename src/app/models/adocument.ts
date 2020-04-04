// A document = Artifact Document
export interface ADocument {
    doc_id:number;
    version:String;
    comment:String;
    user_id:number;
    data:ArrayBuffer;
    date_uploaded:String;
    data_modified:String;
    art_id:number;
}
