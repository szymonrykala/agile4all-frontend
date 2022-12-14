import Modal from "../common/Modal";
import { Badge, Button, Card, Chip, Divider, IconButton, Option, Select, Sheet, Typography } from "@mui/joy";
import { TaskStatus } from "../../models/task";
import Link from "../common/Link";
import StatusChip from "./StatusChip";
import NamedAvatar from "./NamedAvatar";
import { ReactNode } from "react";
import DescriptionIcon from '@mui/icons-material/Description';
import { AddCircleOutlined } from "@mui/icons-material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UploadIcon from '@mui/icons-material/Upload';


interface ITitledSection {
    title: string,
    children: ReactNode,
    inline?: boolean
}

function TitledSection(props: ITitledSection) {
    return (
        <Sheet>
            {props.inline || <Typography level='body3'>
                {props.title}
            </Typography>}
            <Typography
                level='body2'
            >
                {props.inline && <Typography level='body3'>
                    {props.title}&nbsp;
                </Typography>}

                {props.children}
            </Typography>
        </Sheet>
    )
}


export default function TaskModal() {
    return (
        <Modal
            title=''
            description=''
            sx={{
                width: '500px',

            }}
        >
            <NamedAvatar />


            <TitledSection title='Status:' inline>
                <Sheet sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <StatusChip status={TaskStatus.TODO} />

                    <Select
                        size="sm"
                        defaultValue={TaskStatus.TODO}
                        placeholder="update"
                        sx={{ minWidth: 120 }}
                    >
                        <Option value={TaskStatus.DONE}>Done!</Option>
                        <Option value={TaskStatus.IN_PROGRESS}>In progress</Option>
                        <Option value={TaskStatus.TODO}>To Do</Option>
                        <Option value={TaskStatus.ARCHIVED}>archived</Option>
                    </Select>

                </Sheet>
            </TitledSection>

            <TitledSection title='Title:' inline>
                <Link to='/users/:id_ot_the__user/tasks/:task_id'>
                    A4A-34-
                </Link>
                Zrobi?? co?? takiiego suuuperrr Zrobi?? co?? takiiego suuuperrr Zrobi?? co?? takiiego suuuperrr
            </TitledSection>

            <TitledSection title='Description:'>
                Opis taska kt??ry czasem potrafibyc\n
                bardzo wyczerpuj??cy\n
                no i wgl mog?? by?? linki itpfdp
                og??lnie mega du??o tre??ci, ale i
                Opis taska kt??ry czasem potrafibyc
                bardzo wyczerpuj??cy
                Opis taska kt??ry czasem potrafibycog??lnie mega du??o tre??ci, ale i mega ma??o te?? tak??e luzog??lnie mega du??o tre??ci, ale i mega ma??o te?? tak??e luzog??lnie mega du??o tre??ci, ale i mega ma??o te?? tak??e luzog??lnie mega du??o tre??ci, ale i mega ma??o te?? tak??e luz
                bardzo wyczerpuj??cy
                no i wgl mog?? by?? linki itpfdp
                og??lnie mega du??o tre??ci, ale i
                Opis taska kt??ry czasem potrafibyc
                bardzo wyczerpuj??cy
                no i wgl mog?? by?? linki itpfdp
                og??lnie mega du??o tre??ci, ale i
                no i wgl mog?? by?? linki itpfdp
                og??lnie mega du??o tre??ci, ale i mega ma??o te?? tak??e luz
            </TitledSection>
            <Divider />
            <Sheet sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                {
                    [2, 5, 56, 4].map(n =>
                        <Sheet key={n}
                            sx={{
                                position: 'relative'
                            }}
                        >
                            <IconButton
                                variant="plain"
                                size="lg"
                                color="neutral"
                            >
                                <DescriptionIcon color='primary' sx={{ fontSize: 50 }} />
                            </IconButton>
                            <IconButton
                                variant="soft"
                                size="sm"
                                color="danger"
                                sx={{
                                    position: 'absolute',
                                    top: '-7px',
                                    left: '-7px',
                                    borderRadius: '100%'
                                }}
                                onClick={() => alert('napewno chcesz usun?????')}
                            >
                                <DeleteForeverIcon
                                    sx={{ fontSize: '25px' }}
                                    color='warning'
                                />
                            </IconButton>
                        </Sheet>
                    )
                }
                <Sheet>
                    <IconButton variant="soft" size="lg">
                        <UploadIcon fontSize="large" />
                    </IconButton>
                    
                </Sheet>
            </Sheet>
        </Modal>
    )
}