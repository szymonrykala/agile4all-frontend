import { UUID } from "../models/common"
import { TaskStatus } from "../models/task"
import ApiClient from "./ApiClient"
import { QueryParams } from "./interface"


export interface ICreateFileData {
    title: string,
    description: string,
    userId: UUID,
}

export interface IUpdateFileData {
    title: string,
    description: string,
    userId: string,
    status: TaskStatus
}



export default class FilesClient extends ApiClient<{}, {}> {

    public path: string = '/files'

    async uploadFile(file: File, queryParams: QueryParams = {}) {
        const data = new FormData()
        data.append('file', file)

        return this._fetch({
            method: 'POST',
            endpoint: this.path + '?' + new URLSearchParams(queryParams as any).toString(),
            formData: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
}