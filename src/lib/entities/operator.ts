/**
 * Class defining a transport operator such as Deutsche Bahn or Abellio.
 */
export class Operator {

	/**
	 * Tries to parse the operator for a given departure entry.
	 * @param entry Entry to parse the operator of
	 */
	public static tryParseFromDepartureEntry(entry: any): Operator | undefined {
		if ('operator' in entry) {
			return new Operator(
				entry['operator']['code'],
				entry['operator']['name']
			)
		} else {
			return undefined
		}
	}

	/**
	 * Two-letter code for the operator
	 */
	public code: string

	/**
	 * Fully qualified operator name
	 */
	public name: string

	/**
	 * Constructs a new operator object.
	 */
	constructor(code: string, name: string) {
		this.code = code
		this.name = name
	}
}
