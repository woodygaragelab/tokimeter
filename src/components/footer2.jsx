import React from "react";
import "./header1.css";
import Paper                  from '@material-ui/core/Paper';
import BottomNavigation       from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon            from '@material-ui/icons/Restore';
import FavoriteIcon           from '@material-ui/icons/Favorite';
import LocationOnIcon         from '@material-ui/icons/LocationOn';

function Footer2(props) {
  const [value, setValue] = React.useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
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
    </Paper>
  );
}

export default Footer2;
