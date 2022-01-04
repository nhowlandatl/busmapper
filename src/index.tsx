/*
 * Copyright 2021 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, no-unused-vars */
import "./style.css";

import * as React from "react";
import * as ReactDom from "react-dom";
import { useState, useEffect } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import busLines from "./busLines2";
import individualBusses from "./individualBusses";
import Select from "react-select";
import { Alert } from "react-bootstrap";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const busLinesArray = busLines;
const individualBussesArray = individualBusses;

// TODO:
// 1. Extract the t.Id value from user select on dropdown menu, which is the
// the line name/number
// done!

// 2. Use that value and return all items where individualBusses.MonitoredVehicleJourney.LineRef == t.Id, and append
// individualBusses.MonitoredVehicleJourney.VehicleLocation.Longitude
// and individualBusses.MonitoredVehicleJourney.VehicleLocation.Latitude to filteredArray list
// so that it is a list of name/value object pairs, e.g.,
// filteredArray[0] {
// longitude: 100,
// latitude: -50
//}
// 3. Use that array of longitudes/latitudes to show markers on Google maps API

const App: React.VFC = () => {
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(12); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 37.7749,
    lng: -122.4194,
  });
  const [filterSelection, setFilterSelection] = useState({
    value: null,
    label: null,
  });
  const [noBussesFound, setNoBussesFound] = useState(false);
  const [filteredBusArray, setfilteredBusArray] = useState([]);

  const changeFilter = (selected) => {
    setFilterSelection(selected);
  };

  // route 650 has no matches (for testing)
  useEffect(() => {
    getBusLocationsByLine(); // This is be executed when `filterSelection` state changes
  }, [filterSelection]);

  const isBusMatchesFound = (busArray) => {
    const matchingBusArray =
      busArray.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity.filter(
        (bus) => bus.MonitoredVehicleJourney.LineRef == filterSelection.value
      );
    // If there are busses currently on this route, map each busses longtitude/latitude to state
    if (matchingBusArray.length >= 1) {
      console.log(matchingBusArray);
      setfilteredBusArray(
        matchingBusArray.map((filteredBus) => ({
          longitude:
            filteredBus.MonitoredVehicleJourney.VehicleLocation.Longitude,
          latitude:
            filteredBus.MonitoredVehicleJourney.VehicleLocation.Latitude,
        }))
      );
      return matchingBusArray;
    } else return false;
  };

  // Retrieve bus locations by route from metro API
  const getBusLocationsByLine = () => {
    fetch(
      "http://api.511.org/transit/VehicleMonitoring?api_key=1c38da56-2d7a-4e1e-b99f-b37964deb878&agency=AC"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(filterSelection);
          if (isBusMatchesFound(result)) {
            setNoBussesFound(false);
            console.log("True: matches found");
          } else {
            setNoBussesFound(true);
            console.log("False: no matches found");
          }
        },
        (error) => {
          console.log("there was an error: " + error);
        }
      );
  };

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  // busLinesArray.forEach(function (element) {
  //   busLineSelectMenu.push({ label: element, value: element });
  // });

  // return list of busline code name + public name
  // const busLines = (
  //   <div>
  //     {busLinesArray.map((item, i) => {
  //       return (
  //         <option key={i} value={item.Name}>
  //           {item.Name}
  //         </option>
  //       );
  //     })}
  //   </div>
  // );
  const form = (
    <div
      style={{
        padding: "1rem",
        flexBasis: "250px",
        height: "100%",
        overflow: "auto",
      }}
    >
      {/* Work in progress */}
      <Select
        options={busLinesArray.map((t) => ({
          value: t.Id,
          label: "Line " + t.Id + " " + `(${t.Name})`,
        }))}
        placeholder="Filter bus line"
        onChange={changeFilter}
      />
      {/* Use bus route L san pablo transbay to return true */}
      <div>
        {noBussesFound === true && (
          <div>No busses found. Try filtering on another route.</div>
        )}
      </div>
      {clicks.map((latLng, i) => (
        <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
      ))}
      <button onClick={() => setClicks([])}>Clear</button>
    </div>
  );

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Wrapper apiKey={"YOUR_API_KEY"} render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
        >
          {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </Map>
      </Wrapper>
      {/* Basic form for controlling center and zoom of map. */}
      {form}
    </div>
  );
};
interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

window.addEventListener("DOMContentLoaded", () => {
  ReactDom.render(<App />, document.getElementById("root"));
});

export {};
