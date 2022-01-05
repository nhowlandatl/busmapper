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
import Select from "react-select";
import { Alert } from "react-bootstrap";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

// Known bus routes are set from JSON file
const busLinesArray = busLines;

const App: React.VFC = () => {
  // State declarations
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(12); // initial zoom
  // default center to San Francisco
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 37.7749,
    lng: -122.4194,
  });
  const [filterSelection, setFilterSelection] = useState({
    value: null,
    label: null,
  });
  const [noBussesFound, setNoBussesFound] = useState(false);
  const [filteredBusArray, setfilteredBusArray] = useState<any>([]);

  const changeFilter = (selected) => {
    setFilterSelection(selected);
  };

  // route 650 has no matches (for testing)
  useEffect(() => {
    getBusLocationsByLine(); // This is be executed when `filterSelection` state changes
  }, [filterSelection]);

  // Functions
  const isBusMatchesFound = (busArray) => {
    const matchingBusArray =
      busArray.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity.filter(
        (bus) => bus.MonitoredVehicleJourney.LineRef == filterSelection.value
      );
    // If there are busses currently on this route, map each busses latitude/longtitude to state
    if (matchingBusArray.length >= 1) {
      console.log(matchingBusArray);
      setfilteredBusArray(
        matchingBusArray.map((filteredBus) => ({
          name: filteredBus.MonitoredVehicleJourney.PublishedLineName,
          latitude: parseInt(
            filteredBus.MonitoredVehicleJourney.VehicleLocation.Latitude
          ),
          longitude: parseInt(
            filteredBus.MonitoredVehicleJourney.VehicleLocation.Longitude
          ),
        }))
      );
      return matchingBusArray;
    } else return false;
  };

  // Retrieve bus locations by route from metro API
  const getBusLocationsByLine = () => {
    fetch(
      "http://api.511.org/transit/VehicleMonitoring?api_key=1c38da56-2d7a-4e1e-b99f-b37964deb878&agency=SF"
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
          {filteredBusArray.map((marker) => {
            return (
              <Marker
                position={{
                  lat: marker.latitude,
                  lng: marker.longitude,
                }}
                key={marker.id}
              ></Marker>
            );
          })}
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
