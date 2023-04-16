import {useState, useEffect, useRef} from 'react';
import './leaflet.css';

import L, { LeafletMouseEvent } from 'leaflet';

export default function Map()
{
  const [didSetMap, setDidSetMap] = useState(false);

    useEffect(() => {

        const script = document.createElement('script');
      
        script.src = "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js";
        script.async = true;
      
        document.body.appendChild(script);

        if(didSetMap === false)
        {
          console.log("rice krispy");

          let map = L.map('leafletmap').setView([42.056, -87.675], 16);

          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

          map.on('click', function(e) {mapClicked(e)});

          setDidSetMap(true);
        }
      
        return () => {
          document.body.removeChild(script);
        }
      }, [didSetMap]);

    return (
        <div className="map-container" id="leafletmap">
        </div>
    );
}

function mapClicked(e : LeafletMouseEvent)
{
  let latlng = e.latlng;
  console.log("you clicked: " + latlng);
}