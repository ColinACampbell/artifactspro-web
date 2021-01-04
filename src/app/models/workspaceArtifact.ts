import { Timestamp } from "rxjs";

export interface WorkspaceArtifact
{
    is_secured : number,
    work_space_id : number,
    work_space_artifacts_id : number,
    art_id : number,
    created_at : Timestamp<number>
}