import React from "react";
import { useHistory }         from 'react-router-dom';
import BottomNavigation       from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TimelineIcon           from '@material-ui/icons/Timeline';
import FavoriteIcon           from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon  from '@material-ui/icons/ChatBubbleOutline';
import AppBar                 from '@material-ui/core/AppBar';

function Footer(props) {
  const [value, setValue] = React.useState(1);
  const history = useHistory();
  const navigate = (value)=> {
    if      (value==0) { history.push({ pathname: '/graphpage' });   }
    else if (value==1) { history.push({ pathname: '/homepage' });   }
    else if (value==2) { history.push({ pathname: '/textpage' });   }
    else               { history.push({ pathname: '/heartpage' });  }
  };

  return (
    <AppBar position="fixed" color="primary" style={{top: "auto", bottom: 0}}>
    <BottomNavigation
      showLabels
      value={Number(props.pageid)}
      onChange={(event, newValue) => {
        setValue(newValue);
        navigate(newValue);
      }}
    >
      <BottomNavigationAction label="Heart Rate" icon={<TimelineIcon />} />
      <BottomNavigationAction label="Score"      icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Message"    icon={<ChatBubbleOutlineIcon />} />
    </BottomNavigation>
    </AppBar>
  );
}

export default Footer;