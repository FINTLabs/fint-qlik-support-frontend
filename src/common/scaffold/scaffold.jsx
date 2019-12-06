import SupportContainer from "../../feature/support/ticket_container";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {makeStyles, useTheme} from "@material-ui/styles";
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import VigoLogo from '../../assets/vigo-logo-no-iks.svg';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from '@material-ui/icons/Dashboard';
import Drawer from "@material-ui/core/Drawer";
import NewInvoice from '@material-ui/icons/NoteAdd';
import LogOut from '@material-ui/icons/ExitToApp';
import InvoiceHistory from '@material-ui/icons/History';
import Routes from './routes';
import {Link} from 'react-router-dom';

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
        marginLeft: -drawerWidth,
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
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }
    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <img src={VigoLogo} alt="Vigo logo" className={classes.vigoLogo}/>
                    <Typography variant="h6" noWrap>
                        Tickets
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <Link to="/" className={classes.menuLink}>
                        <ListItem button>
                            <ListItemIcon><DashboardIcon/></ListItemIcon>
                            <ListItemText primary="Dashboard"/>
                        </ListItem>
                    </Link>
                    <Divider/>
                    <Link to={"/opprett-ticket"} className={classes.menuLink}>
                        <ListItem button>
                            <ListItemIcon><NewInvoice/></ListItemIcon>
                            <ListItemText primary="Opprett ticket"/>
                        </ListItem>
                    </Link>
                    <Link to="/ticket-historikk" className={classes.menuLink}>
                        <ListItem button>
                            <ListItemIcon><InvoiceHistory/></ListItemIcon>
                            <ListItemText primary="Mine tickets"/>
                        </ListItem>
                    </Link>
                    <Link to="/logg-ut" className={classes.menuLink}>
                        <ListItem button>
                            <ListItemIcon><LogOut/></ListItemIcon>
                            <ListItemText primary="Logg ut"/>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader}/>
                <Routes/>
            </main>
        </div>
    );
}