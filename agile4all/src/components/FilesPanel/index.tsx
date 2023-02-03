import { Sheet, IconButton } from "@mui/joy";
import FileModel from "../../models/file";
import UploadIcon from '@mui/icons-material/Upload';
import File from './File';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FilesApi, UsersApi } from "../../client";
import { UUID } from "../../models/common";
import { QueryParams } from "../../client/interface";


interface IFilesPanel {
    files: FileModel[],
    projectId?: UUID,
    taskId?: UUID
}

export default function FilesPanel(props: IFilesPanel) {
    const [files, setFiles] = useState<FileModel[]>(props.files)
    const userId = useMemo(() => UsersApi.getSavedUserId(), []);
    const fileInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null)

    const queryParams: QueryParams = useMemo(() => {
        const params: QueryParams = {}

        if (props.projectId) params['projectId'] = props.projectId;
        if (props.taskId) params['taskId'] = props.taskId
        return params
    }, [props])


    const fetchFiles = useCallback(async () => {
        const resp = await FilesApi.getAll(queryParams) as unknown as FileModel[]
        setFiles(resp)

    }, [queryParams])

    useEffect(() => {
        fetchFiles()
    }, [fetchFiles])



    const uploadFile = useCallback(async () => {
        if (!fileInputRef?.current) return;

        const file = fileInputRef.current.files?.item(0)
        if (!file) {
            alert('problem z załadowaniem pliku');
            return;
        }

        const newFile: FileModel = {
            id: Number(file.name),
            name: file.name,
            link: `https://myapp.com/files/${file.name}`,
            userId: userId,
            modificationDate: new Date().toLocaleDateString()
        }

        try {
            await FilesApi.uploadFile(file, queryParams)
            setFiles([...files, newFile])
            fileInputRef.current.value = ''
            fetchFiles()
        } catch (err) {
            setFiles([])
            fileInputRef.current.value = ''
            alert(err)
        }

    }, [files, setFiles, userId, fetchFiles, queryParams]);



    useEffect(() => {
        if (!fileInputRef?.current) return;
        const fileInput = fileInputRef.current

        fileInput.addEventListener('change', uploadFile)

        return () => {
            fileInput.removeEventListener('change', uploadFile)
        }
    }, [uploadFile])



    const loadFile = useCallback(() => {
        if (fileInputRef?.current) {
            console.log(fileInputRef.current)
            fileInputRef.current.click()
        }

    }, []);



    const deleteFile = useCallback(async (fileId: UUID) => {

        await FilesApi.delete(fileId)
        setFiles(files.filter(({ id }) => id !== fileId));

    }, [files, setFiles]);



    return (
        <Sheet sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: 'inherit',
        }}>
            {
                files.map((file, index) => <File key={index}
                    data={file}
                    onDelete={deleteFile}
                />)
            }
            <Sheet sx={{ bgcolor: 'inherit' }}>
                <input style={{ display: 'none' }} type='file' ref={fileInputRef} />
                <IconButton
                    onClick={loadFile}
                    variant="soft"
                    size="lg"
                >
                    <UploadIcon fontSize="large" />
                </IconButton>
            </Sheet>
        </Sheet>
    )
}