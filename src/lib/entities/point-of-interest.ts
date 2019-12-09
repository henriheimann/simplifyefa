/**
 * Class defining a point of interest returned by stop finder requests.
 */
export class PointOfInterest {

	/**
	 * Tries to parse the point of interest for a given stop entry.
	 * @param entry Entry to parse the point of interest of
	 */
	public static parseFromStopEntry(entry: any): PointOfInterest {
		return new PointOfInterest(
			entry['type'],
			entry['name'],
			Number(entry['stateless'])
		)
	}

	/**
	 * Type of the point of interest, 'station' for stations
	 */
	public type: string

	/**
	 * Name of the point of interest
	 */
	public name: string

	/**
	 * EFA stop identifier for the point of interest
	 */
	public stopId: number

	/**
	 * Constructs a new operator object.
	 */
	constructor(type: string, name: string, stopId: number) {
		this.type = type
		this.name = name
		this.stopId = stopId
	}
}
