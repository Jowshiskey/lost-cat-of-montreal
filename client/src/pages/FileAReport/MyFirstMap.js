import {AdvancedMarker, APIProvider, Map, MapCameraChangedEvent  } from '@vis.gl/react-google-maps';
import React from 'react';
import { useState } from 'react';
import { FileAreportContext } from '../../Context/FileAreportContext';
// import {AdvancedMarker} from './advanced-marker';
// const { GOOGLE_MAPS_API_KEY } = process.env;
const GOOGLE_MAPS_API_KEY = 

const mapStyle = {
        width: '100%',
        height: '20vh',
        gestureHandling:'greedy',
        disableDefaultUI:true,
        margin: "auto",
        marginBottom: "1rem",
}
const MONTREALCENTER = { lat: 45.533290, lng: -73.621629 }
const MONTREAL_BOUNDS = {north: 45.5,south: 45,west: -74,east: -73,};



const MyFirstMap = () => {
    
    const { markerPos,setMarkerPos } = React.useContext(FileAreportContext);

    const handleDragEnd=(e)=>{

        const newLat = e.latLng.lat();
        const newLng = e.latLng.lng();
        const newMarkerPos = { lat:newLat, lng:newLng};
        setMarkerPos(newMarkerPos);
    }

    return (
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
            <Map
                mapId="873be4bef6f469c6"
                defaultZoom={11}
                defaultCenter={ MONTREALCENTER }
                onCameraChanged={ (ev:MapCameraChangedEvent)=>console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom) }
                style={mapStyle} 
                >
                <AdvancedMarker position={markerPos} draggable={true} onDragEnd={handleDragEnd}/>
            </Map>
        </APIProvider>
        )
}
export default MyFirstMap