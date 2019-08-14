import { HttpError } from '../errors';
import { Measurement } from '../measurements/measurement';

/**
 * Compute statistics for given measurements
 * @param {Measurement} measurements
 * @param {String[]} metrics
 * @param {String[]} stats
 * @return {*}
 * The logic of the entire opeartioin below
 * Given the measurements for the metrics and choice of statistics requested
 * approach by looping through the metrics array using map method get each metric.
 * Get the (min, max, average) value for each of
 * the metric by using using reduce method to get 
 * values if none were collected then marl them as undefined
 * Now using the retreived array of statistics. Since we know the 0,1,2 elements 
 * correspond to min, max, average return the specific statistic object for the metric.
 * flatten arrays of all reterun object arrays and also remove any null 
 * in the final return object.
 */
export function computeStats(measurements, metrics, stats) {
  if(metrics == null || stats == null) {return [];}
  var statObject = metrics.map( (metric) => {
      const metricObject = measurements.map( (measurement) => {
        return  measurement.value.metrics.get(metric);
      }).reduce((acc, val, index) => {
          acc[0] = ( acc[0] === undefined || val < acc[0] ) ? val: acc[0]
          acc[1] = ( acc[1] === undefined || val > acc[1] ) ? val : acc[1]
          acc[2]  = ( acc[0] === undefined &&  acc[1] === undefined)?undefined:(acc[0] +  acc[1])/2
          return acc;
        },[]).map( (statVal, index) => {
            if(statVal == undefined) return [];
            const mappedStats= stats.map((elm) =>{
              if(elm == "min")
              {
                return (index == 0)? {"metric": metric, "stat": "min", "value": statVal }: [];
              }
              if(elm == "max")
              {
                return (index == 1)? {"metric": metric, "stat": "max", "value": statVal }: [];
              }
              if(elm == "average")
              {
                return (index == 2)? {"metric": metric, "stat": "average", "value": statVal }: [];
              }
          });
          return [].concat.apply([], mappedStats);
      });
      return [].concat.apply([], metricObject);
  });

  return [].concat.apply([], statObject).filter( (el) => {return el != null;});
  //throw new HttpError(501);
}
