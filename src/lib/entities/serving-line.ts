/**
 * Class describing a line serving a departure.
 */
export class ServingLine {

	/**
	 * Parses the serving line for a given departure entry.
	 * @param entry The entry to parse the serving line of.
	 */
	public static parseFromDepartureEntry(entry: any): ServingLine {
		return new ServingLine(
			entry['servingLine']['trainName'],
			entry['servingLine']['trainNum'],
			entry['servingLine']['trainType'],
			entry['servingLine']['number'],
			entry['servingLine']['symbol'],
			entry['servingLine']['direction'],
			entry['servingLine']['directionFrom'],
			entry['servingLine']['destID']
		)
	}

	/**
	 * Constructs a new serving line object.
	 */
	constructor(
		public trainName: string | undefined,
		public trainNumber: string | undefined,
		public trainType: string | undefined,
		public lineNumber: string,
		public lineSymbol: string,
		public directionTo: string,
		public directionFrom: string,
		public destinationStopId: number) {
	}
}
