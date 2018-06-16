import { Fragment } from 'react';
import { compose, lifecycle } from 'recompose';
import { updateCurrentLocation } from './reducer-handlers';
import { connect } from 'react-redux';

let success = (pos, updateCurrentLocation) => {
    let crd = pos.coords;
    updateCurrentLocation({ lat: crd.latitude, long: crd.longitude })
}


let LocationDumb = compose(
    lifecycle({
        componentDidMount() {
            window.navigator.geolocation.watchPosition((pos) => 
                success(pos, this.props.updateCurrentLocation));
            
        }
    }),
)(() => Fragment);

let mapStateToProps = (state) => 
    ({

    })

let mapDispatchToProps = (dispatch) =>
    ({
        updateCurrentLocation: (res) => dispatch(updateCurrentLocation(res))
    })

let Location = connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationDumb);

export default Location;
