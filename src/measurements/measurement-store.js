import { Measurement } from './measurement';
import { HttpError } from '../errors';
import {getValueOf, getValuesInRangeOf}  from '../utils/array-helper'; 
let measurements = [];
/**
 * Add new measurement
 * @param {Measurement} measurement to be added
 */

export function add(measurement) {
  console.log(measurement.timestamp);
  const valueToInsert = {
            key: measurement.timestamp.valueOf(),
            value: measurement
  };
 measurements.splice(0, 0, valueToInsert);
}

/**
 * Get existing measurement
 * @param {Date} timestamp when measurement was taken
 * @returns {Measurement} measurement for the particular date
 */
export function fetch(timestamp) {
    return getValueOf(measurements,new Date(timestamp).valueOf())
}

/**
 * Get the measurements within the given date range
 * @param {Date} start Lower bound for the query, inclusive
 * @param {Date} end Upper bound for the query, exclusive
 */
export function queryDateRange(from, to) {
    return getValuesInRangeOf(measurements, from, to);
}
