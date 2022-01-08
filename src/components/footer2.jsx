import React from "react";
import "./header1.css";
//import Paper                  from '@material-ui/core/Paper';
import BottomNavigation       from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon            from '@material-ui/icons/Restore';
import FavoriteIcon           from '@material-ui/icons/Favorite';
import LocationOnIcon         from '@material-ui/icons/LocationOn';
import AppBar from '@material-ui/core/AppBar';


function Footer2(props) {
  const [value, setValue] = React.useState(0);

  return (
    <AppBar position="fixed" color="primary" style={{top: "auto", bottom: 0}}>
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Heart Rate" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Score" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Message" icon={<LocationOnIcon />} />
    </BottomNavigation>
    </AppBar>
  );
}

export default Footer2;
