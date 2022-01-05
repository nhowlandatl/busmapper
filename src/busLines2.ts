// "PublicCode" is the bus line for public use
const busLines = [
    {
        "Id": "15",
        "Name": "BAYVIEW HUNTERS POINT EXPRESS",
        "TransportMode": "bus",
        "PublicCode": "15",
        "SiriLineRef": "15",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "37",
        "Name": "CORBETT",
        "TransportMode": "bus",
        "PublicCode": "37",
        "SiriLineRef": "37",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "48",
        "Name": "QUINTARA-24TH STREET",
        "TransportMode": "bus",
        "PublicCode": "48",
        "SiriLineRef": "48",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "67",
        "Name": "BERNAL HEIGHTS",
        "TransportMode": "bus",
        "PublicCode": "67",
        "SiriLineRef": "67",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "F",
        "Name": "MARKET & WHARVES",
        "TransportMode": "metro",
        "PublicCode": "F",
        "SiriLineRef": "F",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "J",
        "Name": "CHURCH",
        "TransportMode": "metro",
        "PublicCode": "J",
        "SiriLineRef": "J",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "KT",
        "Name": "INGLESIDE-THIRD",
        "TransportMode": "metro",
        "PublicCode": "KT",
        "SiriLineRef": "KT",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "N",
        "Name": "JUDAH",
        "TransportMode": "metro",
        "PublicCode": "N",
        "SiriLineRef": "N",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "7",
        "Name": "HAIGHT-NORIEGA",
        "TransportMode": "bus",
        "PublicCode": "7",
        "SiriLineRef": "7",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "9R",
        "Name": "SAN BRUNO RAPID",
        "TransportMode": "bus",
        "PublicCode": "9R",
        "SiriLineRef": "9R",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "27",
        "Name": "BRYANT",
        "TransportMode": "bus",
        "PublicCode": "27",
        "SiriLineRef": "27",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "KBUS",
        "Name": "INGLESIDE BUS",
        "TransportMode": "bus",
        "PublicCode": "KBUS",
        "SiriLineRef": "KBUS",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "TBUS",
        "Name": "THIRD BUS SHUTTLE",
        "TransportMode": "bus",
        "PublicCode": "TBUS",
        "SiriLineRef": "TBUS",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "30",
        "Name": "STOCKTON",
        "TransportMode": "bus",
        "PublicCode": "30",
        "SiriLineRef": "30",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "54",
        "Name": "FELTON",
        "TransportMode": "bus",
        "PublicCode": "54",
        "SiriLineRef": "54",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "45",
        "Name": "UNION-STOCKTON",
        "TransportMode": "bus",
        "PublicCode": "45",
        "SiriLineRef": "45",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "38R",
        "Name": "GEARY RAPID",
        "TransportMode": "bus",
        "PublicCode": "38R",
        "SiriLineRef": "38R",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "43",
        "Name": "MASONIC",
        "TransportMode": "bus",
        "PublicCode": "43",
        "SiriLineRef": "43",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "39",
        "Name": "COIT",
        "TransportMode": "bus",
        "PublicCode": "39",
        "SiriLineRef": "39",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "12",
        "Name": "FOLSOM-PACIFIC",
        "TransportMode": "bus",
        "PublicCode": "12",
        "SiriLineRef": "12",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "55",
        "Name": "DOGPATCH",
        "TransportMode": "bus",
        "PublicCode": "55",
        "SiriLineRef": "55",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "714",
        "Name": "BART EARLY BIRD",
        "TransportMode": "bus",
        "PublicCode": "714",
        "SiriLineRef": "714",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "LBUS",
        "Name": "TARAVAL BUS",
        "TransportMode": "bus",
        "PublicCode": "LBUS",
        "SiriLineRef": "LBUS",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "28",
        "Name": "19TH AVENUE",
        "TransportMode": "bus",
        "PublicCode": "28",
        "SiriLineRef": "28",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "NBUS",
        "Name": "JUDAH BUS",
        "TransportMode": "bus",
        "PublicCode": "NBUS",
        "SiriLineRef": "NBUS",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "33",
        "Name": "ASHBURY-18TH ST",
        "TransportMode": "bus",
        "PublicCode": "33",
        "SiriLineRef": "33",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "5",
        "Name": "FULTON",
        "TransportMode": "bus",
        "PublicCode": "5",
        "SiriLineRef": "5",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "52",
        "Name": "EXCELSIOR",
        "TransportMode": "bus",
        "PublicCode": "52",
        "SiriLineRef": "52",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "58",
        "Name": "LAKE MERCED",
        "TransportMode": "bus",
        "PublicCode": "58",
        "SiriLineRef": "58",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "66",
        "Name": "QUINTARA",
        "TransportMode": "bus",
        "PublicCode": "66",
        "SiriLineRef": "66",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "56",
        "Name": "RUTLAND",
        "TransportMode": "bus",
        "PublicCode": "56",
        "SiriLineRef": "56",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "57",
        "Name": "PARKMERCED",
        "TransportMode": "bus",
        "PublicCode": "57",
        "SiriLineRef": "57",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "C",
        "Name": "CALIFORNIA STREET CABLE CAR",
        "TransportMode": "cableway",
        "PublicCode": "C",
        "SiriLineRef": "C",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "PM",
        "Name": "POWELL-MASON CABLE CAR",
        "TransportMode": "cableway",
        "PublicCode": "PM",
        "SiriLineRef": "PM",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "M",
        "Name": "OCEAN VIEW",
        "TransportMode": "metro",
        "PublicCode": "M",
        "SiriLineRef": "M",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "PH",
        "Name": "POWELL-HYDE CABLE CAR",
        "TransportMode": "cableway",
        "PublicCode": "PH",
        "SiriLineRef": "PH",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "14R",
        "Name": "MISSION RAPID",
        "TransportMode": "bus",
        "PublicCode": "14R",
        "SiriLineRef": "14R",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "8",
        "Name": "BAYSHORE",
        "TransportMode": "bus",
        "PublicCode": "8",
        "SiriLineRef": "8",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "14",
        "Name": "MISSION",
        "TransportMode": "bus",
        "PublicCode": "14",
        "SiriLineRef": "14",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "9",
        "Name": "SAN BRUNO",
        "TransportMode": "bus",
        "PublicCode": "9",
        "SiriLineRef": "9",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "19",
        "Name": "POLK",
        "TransportMode": "bus",
        "PublicCode": "19",
        "SiriLineRef": "19",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "22",
        "Name": "FILLMORE",
        "TransportMode": "bus",
        "PublicCode": "22",
        "SiriLineRef": "22",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "25",
        "Name": "TREASURE ISLAND",
        "TransportMode": "bus",
        "PublicCode": "25",
        "SiriLineRef": "25",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "29",
        "Name": "SUNSET",
        "TransportMode": "bus",
        "PublicCode": "29",
        "SiriLineRef": "29",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "44",
        "Name": "O'SHAUGHNESSY",
        "TransportMode": "bus",
        "PublicCode": "44",
        "SiriLineRef": "44",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "24",
        "Name": "DIVISADERO",
        "TransportMode": "bus",
        "PublicCode": "24",
        "SiriLineRef": "24",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "38",
        "Name": "GEARY",
        "TransportMode": "bus",
        "PublicCode": "38",
        "SiriLineRef": "38",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "49",
        "Name": "VAN NESS-MISSION",
        "TransportMode": "bus",
        "PublicCode": "49",
        "SiriLineRef": "49",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "90",
        "Name": "SAN BRUNO OWL",
        "TransportMode": "bus",
        "PublicCode": "90",
        "SiriLineRef": "90",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "L-OWL",
        "Name": "OWL TARAVAL",
        "TransportMode": "bus",
        "PublicCode": "L-OWL",
        "SiriLineRef": "L-OWL",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "91",
        "Name": "3RD-19TH AVE OWL",
        "TransportMode": "bus",
        "PublicCode": "91",
        "SiriLineRef": "91",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "5R",
        "Name": "FULTON RAPID",
        "TransportMode": "bus",
        "PublicCode": "5R",
        "SiriLineRef": "5R",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "N-OWL",
        "Name": "OWL JUDAH",
        "TransportMode": "bus",
        "PublicCode": "N-OWL",
        "SiriLineRef": "N-OWL",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "18",
        "Name": "46TH AVENUE",
        "TransportMode": "bus",
        "PublicCode": "18",
        "SiriLineRef": "18",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "1",
        "Name": "CALIFORNIA",
        "TransportMode": "bus",
        "PublicCode": "1",
        "SiriLineRef": "1",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "23",
        "Name": "MONTEREY",
        "TransportMode": "bus",
        "PublicCode": "23",
        "SiriLineRef": "23",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "31",
        "Name": "BALBOA",
        "TransportMode": "bus",
        "PublicCode": "31",
        "SiriLineRef": "31",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "35",
        "Name": "EUREKA",
        "TransportMode": "bus",
        "PublicCode": "35",
        "SiriLineRef": "35",
        "Monitored": true,
        "OperatorRef": "SF"
    },
    {
        "Id": "36",
        "Name": "TERESITA",
        "TransportMode": "bus",
        "PublicCode": "36",
        "SiriLineRef": "36",
        "Monitored": true,
        "OperatorRef": "SF"
    }
];

export default busLines;
