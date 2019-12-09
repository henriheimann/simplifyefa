import * as requestPromise from 'request-promise-native'
import { Departure } from './entities/departure'
import { getMotFilterQueryString, ModeOfTransport } from './entities/mode-of-transport'
import { PointOfInterest } from './entities/point-of-interest'

/**
 * Class describing a wrapper for the EFA.
 */
export class SimplifyEfa {

	/**
	 * Returns the common part of every query string to EFA.
	 * @return Common query string dictionary
	 */
	private static getCommonQueryString(): { [key: string]: string } {
		return {
			sessionID: '0',
			outputFormat: 'JSON',
			stateless: '1',
			locationServerActive: '1',
			coordOutputFormat: 'WGS84[DD.DDDDD]',
			coordOutputFormatTail: '5'
		}
	}

	/**
	 * Endpoint base URL
	 */
	private readonly efaEndpointBaseUrl: string

	/**
	 * Constructs a wrapper for an EFA endpoint with the given base URL.
	 * @param efaEndpointBaseUrl Endpoint base URL
	 */
	constructor(efaEndpointBaseUrl = 'https://openservice-test.vrr.de/static02') {
		this.efaEndpointBaseUrl = efaEndpointBaseUrl
	}

	/**
	 * Requests the next departures for the given station starting at the given time. Only departures of services
	 * matching the given modes of transport are requested.
	 * @param stopId EFA stop identifier for the station
	 * @param dateTime Starting date time to request the departures for
	 * @param modes Filter for modes of transport
	 * @param limit Number of departures to request
	 */
	public async departureMonitor(stopId: number, dateTime: Date, modes: ModeOfTransport[], limit: number):
		Promise<Departure[]> {

		// Base query string of common dictionary.
		const queryString = SimplifyEfa.getCommonQueryString()

		// Assign departure monitor specific parameters.
		Object.assign(queryString, {
			limit: String(limit),
			useRealtime: '1',
			type_dm: 'stopId',
			name_dm: String(stopId),
			itdTimeHour: String(dateTime.getHours()),
			itdTimeMinute: String(dateTime.getMinutes()),
			itdDateDay: String(dateTime.getDate()),
			itdDateMonth: String(dateTime.getMonth() + 1), // JS months start at 0
			itdDateYear: String(dateTime.getFullYear()),
			mode: 'direct',
			includedMeans: '1',
		})

		// Add the dictionary entries for filtering the modes of transport.
		Object.assign(queryString, getMotFilterQueryString(modes))

		// Perform the actual request.
		const response = await requestPromise.get({
			uri: this.efaEndpointBaseUrl + '/XML_DM_REQUEST',
			qs: queryString,
			json: true
		})

		const departureList = []

		// Build the list of departures.
		if (response['departureList'] !== null) {
			for (const entry of response['departureList']) {
				departureList.push(Departure.parseDepartureListEntry(entry))
			}
		}

		return departureList
	}

	/**
	 * Requests the points of interest for the given query string.
	 * @param query Query string to search for
	 */
	public async stationFinder(query: string): Promise<PointOfInterest[]> {

		// Base query string of common dictionary.
		const queryString = SimplifyEfa.getCommonQueryString()

		// Assign departure monitor specific parameters.
		Object.assign(queryString, {
			type_sf: 'stopId',
			name_sf: query
		})

		// Perform the actual request.
		const response = await requestPromise.get({
			uri: this.efaEndpointBaseUrl + '/XML_STOPFINDER_REQUEST',
			qs: queryString,
			json: true
		})

		const pointOfInterestList = []

		// Build the list of departures.
		if (response['stopFinder']['points'] !== null) {
			const points = response['stopFinder']['points']
			if (Array.isArray(points)) {
				for (const entry of points) {
					pointOfInterestList.push(PointOfInterest.parseFromStopEntry(entry))
				}
			} else {
				if (points['point'] !== null) {
					pointOfInterestList.push(PointOfInterest.parseFromStopEntry(points['point']))
				}
			}
		}

		return pointOfInterestList
	}
}
