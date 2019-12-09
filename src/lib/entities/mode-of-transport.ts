/**
 * Possible modes of transports (MOTs) that can be used as filters when performing requests to the EFA endpoint.
 */
export enum ModeOfTransport {
	/**
	 * Combination of {@link REGIONAL_RAILWAY}, {@link NATIONAL_RAILWAY}, {@link INTERNATIONAL_RAILWAY} and
	 * {@link HIGH_SPEED_RAILWAY}
	 */
	RAILWAY = 0,

	/**
	 * S-Bahnen
	 */
	URBAN_RAILWAY = 1,

	/**
	 * U-Bahnen
	 */
	METRO = 2,

	/**
	 * Stadtbahnen
	 */
	CITY_RAILWAY = 3,

	/**
	 * Straßenbahnen
	 */
	TRAM = 4,

	/**
	 * Stadtbusse
	 */
	CITY_BUS = 5,

	/**
	 * Regionalbusse
	 */
	REGIONAL_BUS = 6,

	/**
	 * Expressbusse
	 */
	EXPRESS_BUS = 7,

	/**
	 * Seil- und Zahnradbahnen
	 */
	CABLE_AND_COG_RAILWAY = 8,

	/**
	 * AST und Rufbusse
	 */
	AST_ON_CALL_BUS = 10,

	/**
	 * Schwebebahnen
	 */
	SUSPENSION_RAILWAY = 11,

	/**
	 * Airplanes
	 */
	AIRPLANE = 12,

	/**
	 * Regional trains such as IRE, RE and RB
	 */
	REGIONAL_RAILWAY = 13,

	/**
	 * 'National' trains such as IR and D
	 */
	NATIONAL_RAILWAY = 14,

	/**
	 * 'International' trains such as IC and EC
	 */
	INTERNATIONAL_RAILWAY = 15,

	/**
	 * High speed trains such as ICE
	 */
	HIGH_SPEED_RAILWAY = 16,

	/**
	 * Rail replacements services
	 */
	RAIL_REPLACEMENT_SERVICE = 17,

	/**
	 * Shuttlezüge
	 */
	SHUTTLE_RAILWAY = 18,

	/**
	 * Bürgerbusse
	 */
	CITIZENS_BUS = 19,
}

/**
 * The count of modes of transport, should always be one higher than the maximum element in {@link ModeOfTransport}.
 */
const MODE_OF_TRANSPORT_COUNT = 20

/**
 * Returns the part of every a query string to EFA filtering the request for the given modes of transport.
 * @param modes Modes to enable in the query
 * @return Dictionary to append to the query string
 */
export function getMotFilterQueryString(modes: ModeOfTransport[]): { [key: string]: string } {
	const motDictionary: { [index: string]: string } = {}

	for (let modeIndex = 0; modeIndex < MODE_OF_TRANSPORT_COUNT; modeIndex++) {
		if (modes.indexOf(modeIndex) !== -1) {
			motDictionary[`inclMOT_${modeIndex}`] = '1'
		} else {
			motDictionary[`inclMOT_${modeIndex}_disabled`] = '1'
		}
	}

	return motDictionary
}
