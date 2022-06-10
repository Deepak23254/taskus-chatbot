import { useState, useEffect } from "react";
import {global} from '../config/global';
const useWidget = (userid) => {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch(global.API_HOST+"/widget/"+userid)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [userid]);

  return [data];
};

export default useWidget;