import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { PlacesOfInterest, Districts } from '../../images/SVG/Places'
import Card from "@material-ui/core/es/Card/Card"
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader"
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const Image = process.env.REACT_APP_MAP_IMAGE_URL

const styles = (theme) => ({
    Modal: {
        top: 100,
        left:(window.innerWidth / 2) - (1371 / 2)
    },
    District : {
        fill: '#BBB',
        fillOpacity: '0.7',
        opacity: '0.7'
    },
    activeDistrict: {
        fill: '#2f7bbb',
        fillopacity: '0.2',
        opacity: '0.8',
    },
    hoveredDisctrict: {
        fill: '#FFF',
        fillopacity: '0.2',
        opacity: '0.2',
    },
    place: {
        stroke: "#000000",
        opacity: "0.7",
        strokeWidth: "5",
        fill: "#ffffff",
        zIndex: 2000
    },
    hoveredPlace: {
        stroke: "#000000",
        opacity: "0.8",
        fillOpacity: 0.2,
        strokeWidth: "5",
        fill: "#ffffff",
        zIndex: 2000
    },
    paper: {
        padding: theme.spacing.unit,
    },
    popover: {
        pointerEvents: 'none',
    },
    popperClose: {
        pointerEvents: 'none',
    },
});


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDistrict: '',
            hoveredDistrict: '',
            hoveredPlace: '',
            modalOpen: false,
            anchorEl: null,
            anchorDistrict: null,
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChooseDistrict = this.handleChooseDistrict.bind(this);
        this.handleHoverDistrict = this.handleHoverDistrict.bind(this);
        this.handleUnhoverDistrict = this.handleUnhoverDistrict.bind(this);
        this.handleHoverPlace = this.handleHoverPlace.bind(this);
        this.handleUnhoverPlace = this.handleUnhoverPlace.bind(this);
    }
    handleOpen() {
        this.setState({...this.state, modalOpen: true });
    };
    handleClose() {
        this.setState({...this.state, modalOpen: false, anchorEl: null });
    };
    handleChooseDistrict(districtName) {
        this.setState({
            ...this.state, activeDistrict: districtName
        });
        this.props.handleResidenceChange(districtName);
    }
    handleHoverDistrict(event, districtName) {
        if (districtName !== this.state.activeDistrict) {
            this.setState({
                ...this.state, hoveredDistrict: districtName, anchorDistrict: event.target
            });
        }
    }
    handleUnhoverDistrict(districtName) {
        this.setState({
            ...this.state, hoveredDistrict: '', anchorDistrict: null
        });
    }
    handleHoverPlace(event, place) {
        this.setState({ ...this.state, anchorEl: event.target, hoveredPlace: place });
    }
    handleUnhoverPlace() {
        this.setState({ ...this.state, anchorEl: null, hoveredPlace: ''});
    }

    render() {
        const { hoveredDistrict, activeDistrict, hoveredPlace, anchorEl, anchorDistrict } = this.state;
        const { classes, districts, attractions } = this.props;
        let popover
        if (hoveredPlace !== '') {
            popover = attractionPopOver(classes, anchorEl, hoveredPlace, this.handleUnhoverPlace, attractions)
        } else {
            popover = districtPopOver(classes, anchorDistrict, hoveredDistrict, this.handleUnhoverDistrict, districts)
        }
        return (
            <React.Fragment>
                <Button onClick={this.handleOpen}>Karte öffnen</Button>
                <Modal
                    className={classes.Modal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                >
                    <div style={{width: 1371, height: 600, backgroundImage: `url(${Image})`}}>
                        {popover}
                        <svg width="1371" height="600" id="overlay" >
                            <defs>
                                <filter id="svg_14_blur">
                                    <feGaussianBlur stdDeviation="1.4" in="SourceGraphic"/>
                                </filter>
                            </defs>
                            <g>
                                {Districts.map((element, key) => {
                                    let className = classes.District;
                                    if (hoveredDistrict === element.name) {
                                        className = classes.hoveredDisctrict;
                                    }
                                    if (activeDistrict === element.name) {
                                        className = classes.activeDistrict;
                                    }
                                    return (
                                        <path key={key} id={element.name} d={element.data}
                                            onClick={() => this.handleChooseDistrict(element.name)}
                                            onMouseOver={(e) => this.handleHoverDistrict(e, element.name)}
                                            onMouseLeave={() => this.handleUnhoverDistrict(element.name)}
                                            className={className}
                                            strokeWidth="5" stroke="#000000" />
                                    )
                                })}
                                {PlacesOfInterest.map((element, key) => {
                                    let className = hoveredPlace === element.name ? classes.hoveredPlace : classes.place;
                                    return (
                                        <rect
                                            key={key} id={element.name} {...element}
                                            onMouseEnter={(event) => this.handleHoverPlace(event, element.name)}
                                            onMouseOut={this.handleUnhoverPlace}
                                            className={className} filter="url(#svg_14_blur)"
                                            />
                                    )
                                })}
                            </g>
                        </svg>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

function attractionPopOver(classes = {}, anchorEl, hoveredPlace, handlePopoverClose = () => {}, attractions = {}) {
    const open = !!anchorEl;
    if (!open) {
        return null
    }

    let hoveredAttraction = attractions[hoveredPlace]
    return getPopover(classes, open, anchorEl, hoveredAttraction.img, hoveredAttraction.Name, hoveredAttraction.Beschreibung, handlePopoverClose)
}

function districtPopOver(classes = {}, anchorEl, district, handlePopoverClose = () => {}, districts = {}) {
    const open = !!anchorEl;
    if (!open) {
        return null
    }
    let hoveredDistrict
    districts.forEach(districtData => {
        if (districtData.name === district) {
            hoveredDistrict = districtData
        }
    })
    return getPopover(classes, open, anchorEl, hoveredDistrict.img, hoveredDistrict.name, hoveredDistrict.beschreibung, handlePopoverClose, hoveredDistrict.bewohner)
}

function getPopover(classes = {}, open, anchorEl, img, name, descr, handlePopoverClose = () => {}, residentsCount = null) {
    let residents
    if (residentsCount !== null) {
        residents = <CardContent>Spielercharaktere: {residentsCount}</CardContent>
    }
    return (
        <Popover
            id="mouse-over-popover"
            className={classes.popover}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
            <Paper
                className={classes.paper}
                style={{width: 300}}
            >
                <Card>
                    <CardMedia
                        image={process.env.REACT_APP_MAP_IMAGES_BASE_URL + img + ".png"}
                        style={{height: 50, width: 70}}
                        title={name}
                    />
                    <CardHeader title={name}/>
                    <CardContent>
                        {descr}
                    </CardContent>
                    {residents }
                </Card>
            </Paper>
        </Popover>)
}

Map.propTypes = {
    classes: PropTypes.object.isRequired,
    handleResidenceChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Map);