import { Operator } from './operator'
import { ServingLine } from './serving-line'

export class Departure {

	public static parseDepartureListEntry(entry: any): Departure {
		return new Departure(
			entry['stopName'],
			entry['stopID'],
			Departure.parseDateFromEntry(entry, 'dateTime'),
			Departure.parseDateFromEntryOrUndefined(entry, 'realDateTime'),
			Operator.tryParseFromDepartureEntry(entry),
			ServingLine.parseFromDepartureEntry(entry),
		)
	}

	private static parseDateFromEntry(entry: any, dateTimeKey: string): Date {
		return new Date(
			entry[dateTimeKey]['year'],
			entry[dateTimeKey]['month'],
			entry[dateTimeKey]['day'],
			entry[dateTimeKey]['hour'],
			entry[dateTimeKey]['minute'],
		)
	}

	private static parseDateFromEntryOrUndefined(entry: any, dateTimeKey: string): Date | undefined {
		if (dateTimeKey in entry) {
			return Departure.parseDateFromEntry(entry, dateTimeKey)
		} else {
			return undefined
		}
	}

	constructor(
		public stopName: string,
		public stopId: number,
		public dateTime: Date,
		public realDateTime: Date | undefined,
		public operator: Operator | undefined,
		public servingLine: ServingLine) {
	}
}
