import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";
import clsx from 'clsx';
import VigoLogo from '../../assets/vigo-logo-no-iks.svg';
import Routes from './routes';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    vigoLogo: {
        height: '35px',
        paddingRight: theme.spacing(1),
    },
    menuLink: {
        textDecoration: 'none',
        color: 'rgba(0, 0, 0, 0.87)',
    },
    organisationButton: {
        background: 'red',
    },
}));

export default function Scaffold() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: false,
                })}
            >
                <Toolbar>
                    <img src={VigoLogo} alt="Vigo logo" className={classes.vigoLogo}/>
                    <Typography variant="h6" noWrap>
                        Tickets
                    </Typography>
                </Toolbar>
            </AppBar>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: false,
                })}
            >
                <div className={classes.drawerHeader}/>
                <Routes/>
            </main>
        </div>
    );
}