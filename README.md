# SimplifyEFA

## Installation
You can install using npm.
```shell script
npm install simplifyefa
```


## Endpoint
The EFA endpoint can be set when creating an instance of the SimplifyEfa class, the endpoint in the example below is set
by default when you omit the parameter:
```typescript
const simplifyEfa = new SimplifyEfa('https://openservice-test.vrr.de/static02')
```


## Departure Monitor
The departure monitor requests the next departures for the given stop id starting at the given time. Only departures
of services matching the given [modes of transport](#modes-of-transport) are requested. Stop ids can be obtained
using the [station finder](#station-finder). The example below lists the next 40 regional train and S-Bahn departures
out of Düsseldorf Hbf, also informing about delays:
```typescript
simplifyEfa.departureMonitor(20018235, new Date(), [ModeOfTransport.REGIONAL_RAILWAY], 40)
  .then((departures) => {
    for (const departure of departures) {
      console.log(`${departure.servingLine.lineNumber} leaving for
                   ${departure.servingLine.directionTo} at ${departure.dateTime}`)

      // Check if we have real-time data and there is a delay.
      if (departure.realDateTime !== undefined &&
          departure.realDateTime != departure.dateTime) {
        console.log(` > Delayed! Actual time of departure is ${departure.realDateTime}`)
      }
    }
  })
  .catch(function (error) {
    // Request failed
  });
```


## Modes of Transport
Filtering departures is possible with the values of the mode of transport enumeration:

| Enumeration Value  | German Translation | Comments           |
|:-------------------|:-------------------|:-------------------|
| RAILWAY | Züge | Combination of<br>REGIONAL_RAILWAY,<br>NATIONAL_RAILWAY,<br>INTERNATIONAL_RAILWAY<br>and HIGH_SPEED_RAILWAY |
| URBAN_RAILWAY | S-Bahnen | |
| METRO | U-Bahnen | |
| CITY_RAILWAY | Stadtbahnen | |
| TRAM | Straßenbahnen | |
| CITY_BUS | Stadtbusse | |
| REGIONAL_BUS | Regionalbusse | |
| EXPRESS_BUS | Expressbusse | |
| CABLE_AND_COG_RAILWAY | Seil- und Zahnradbahnen | |
| AST_ON_CALL_BUS | AST und Rufbusse | |
| SUSPENSION_RAILWAY | Schwebebahnen | |
| AIRPLANE | Flugzeuge | |
| REGIONAL_RAILWAY | IRE, RE, RB | |
| NATIONAL_RAILWAY | IR, D | |
| INTERNATIONAL_RAILWAY | IC, EC |  |
| HIGH_SPEED_RAILWAY | ICE |  |
| RAIL_REPLACEMENT_SERVICE | Schienenersatzverkehr | |
| SHUTTLE_RAILWAY | Shuttlezüge | |
| CITIZENS_BUS | Bürgerbusse | |


## Station Finder
The station finder allows requesting station information for a given query string. It can be used to find the stop ids
required for requests to the departure monitor. The search algorithm isn't as good, while searching for
'Düsseldorf Hbf' returns the only one correct station, searching for 'Düsseldorf Derendorf' does return multiple
stations but not the one we are searching for. An example usage is given below:
```typescript
simplifyEfa.stationFinder('Düsseldorf Hbf')
  .then((stations) => {
    for (const station of stations) {
      console.log(`Found ${station.name} with id ${station.stopId}`)
    }
  })
  .catch(function (error) {
    // Request failed
 });
```


## Status
For the moment, the wrapper has only been tested against the EFA endpoint of the VRR, which is also used by default
when constructing a SimplifyEfa object. Also, only the station finder and departure monitor functionality have been
implemented for now.


## Links
- Official EFA documentation by the Verkehrsverbund Rhein-Ruhr (VRR): [Link](https://openvrr.de/pages/api)
- Documentation of the EFA JSON interface by Münsterhack: [Link](https://www.muensterhack.de/themes/mshack/assets/docs/2015_EFA-API.pdf)
- Wikipedia article about EFA: [Link](https://de.wikipedia.org/wiki/Elektronische_Fahrplanauskunft_(Software))
