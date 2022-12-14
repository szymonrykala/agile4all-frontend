import { IconButton, List, ListItem, ListItemButton, ListItemContent, ListItemDecorator, Typography } from "@mui/joy";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import React, { ReactNode } from "react";


interface ICollapsibleListItem {
    header: ReactNode,
    children: ReactNode[],
    open?: boolean
}


export default function CollapsibleListItem(props: ICollapsibleListItem) {
    const [open, setOpen] = React.useState<boolean>(Boolean(props.open));

    return (
        <>
            <ListItem sx={{ width: 'fit-content' }}>
                <ListItemContent >
                    <Typography >
                        {props.header}&nbsp;&nbsp;
                    </Typography>
                </ListItemContent>

                <IconButton
                    color={open ? 'neutral' : 'primary'}
                    sx={{ borderRadius: '100%' }}
                    onClick={() => setOpen(!open)}
                >
                    {
                        open ?
                            <ArrowUpwardIcon />
                            : <ArrowDownwardIcon />
                    }
                </IconButton>
            </ListItem>
            <ListItem nested sx={{
                display: open ? 'flex' : 'none',
                marginBottom: 1.5
            }}>
                <List sx={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'stretch',
                    justifyContent: 'flex-start'
                }}>
                    {
                        props.children.map((node, id) => (
                            <ListItem
                                key={id}
                                sx={{
                                    maxWidth: '400px',
                                }}
                            >
                                {node}
                            </ListItem>
                        ))
                    }
                </List>
            </ListItem>
        </>
    )
}
