import {
  OMS_METRIC_CONFIGS,
  OMS_WEIGHT_BOYS,
  OMS_WEIGHT_GIRLS,
  OMS_HEIGHT_BOYS,
  OMS_HEIGHT_GIRLS,
  OMS_HEAD_CIRCUMFERENCE_BOYS,
  OMS_HEAD_CIRCUMFERENCE_GIRLS,
  getOmsPercentiles
} from './oms-growth-data';

describe('OMS Growth Data Constants', () => {
  it('should define configurations for all 3 metrics with proper units and labels', () => {
    expect(OMS_METRIC_CONFIGS.WEIGHT).toBeDefined();
    expect(OMS_METRIC_CONFIGS.WEIGHT.unit).toBe('kg');
    expect(OMS_METRIC_CONFIGS.HEIGHT).toBeDefined();
    expect(OMS_METRIC_CONFIGS.HEIGHT.unit).toBe('cm');
    expect(OMS_METRIC_CONFIGS.HEAD_CIRCUMFERENCE).toBeDefined();
    expect(OMS_METRIC_CONFIGS.HEAD_CIRCUMFERENCE.unit).toBe('cm');
  });

  it('should have 61 monthly points (0 to 60 months) for all datasets', () => {
    expect(OMS_WEIGHT_BOYS.length).toBe(61);
    expect(OMS_WEIGHT_GIRLS.length).toBe(61);
    expect(OMS_HEIGHT_BOYS.length).toBe(61);
    expect(OMS_HEIGHT_GIRLS.length).toBe(61);
    expect(OMS_HEAD_CIRCUMFERENCE_BOYS.length).toBe(61);
    expect(OMS_HEAD_CIRCUMFERENCE_GIRLS.length).toBe(61);
  });

  it('should verify strictly ascending percentiles P3 <= P15 <= P50 <= P85 <= P97 across all points', () => {
    const allDatasets = [
      OMS_WEIGHT_BOYS,
      OMS_WEIGHT_GIRLS,
      OMS_HEIGHT_BOYS,
      OMS_HEIGHT_GIRLS,
      OMS_HEAD_CIRCUMFERENCE_BOYS,
      OMS_HEAD_CIRCUMFERENCE_GIRLS
    ];

    allDatasets.forEach(dataset => {
      dataset.forEach((pt, index) => {
        expect(pt.ageMonths).toBe(index);
        expect(pt.p3).toBeLessThanOrEqual(pt.p15);
        expect(pt.p15).toBeLessThanOrEqual(pt.p50);
        expect(pt.p50).toBeLessThanOrEqual(pt.p85);
        expect(pt.p85).toBeLessThanOrEqual(pt.p97);
      });
    });
  });

  it('should verify official WHO birth baseline values', () => {
    // Boys birth
    const boyW0 = OMS_WEIGHT_BOYS[0];
    expect(boyW0.p3).toBe(2.5);
    expect(boyW0.p50).toBe(3.3);
    expect(boyW0.p97).toBe(4.3);

    const boyH0 = OMS_HEIGHT_BOYS[0];
    expect(boyH0.p3).toBe(46.3);
    expect(boyH0.p50).toBe(49.9);
    expect(boyH0.p97).toBe(53.4);

    const boyHc0 = OMS_HEAD_CIRCUMFERENCE_BOYS[0];
    expect(boyHc0.p3).toBe(32.1);
    expect(boyHc0.p50).toBe(34.5);
    expect(boyHc0.p97).toBe(36.9);

    // Girls birth
    const girlW0 = OMS_WEIGHT_GIRLS[0];
    expect(girlW0.p3).toBe(2.4);
    expect(girlW0.p50).toBe(3.2);
    expect(girlW0.p97).toBe(4.2);

    const girlH0 = OMS_HEIGHT_GIRLS[0];
    expect(girlH0.p3).toBe(45.6);
    expect(girlH0.p50).toBe(49.1);
    expect(girlH0.p97).toBe(52.7);

    const girlHc0 = OMS_HEAD_CIRCUMFERENCE_GIRLS[0];
    expect(girlHc0.p3).toBe(31.7);
    expect(girlHc0.p50).toBe(33.9);
    expect(girlHc0.p97).toBe(36.1);
  });

  it('should correctly return dataset by sex and metric using getOmsPercentiles', () => {
    expect(getOmsPercentiles('MALE', 'WEIGHT')).toBe(OMS_WEIGHT_BOYS);
    expect(getOmsPercentiles('FEMALE', 'WEIGHT')).toBe(OMS_WEIGHT_GIRLS);
    expect(getOmsPercentiles('MALE', 'HEIGHT')).toBe(OMS_HEIGHT_BOYS);
    expect(getOmsPercentiles('FEMALE', 'HEIGHT')).toBe(OMS_HEIGHT_GIRLS);
    expect(getOmsPercentiles('MALE', 'HEAD_CIRCUMFERENCE')).toBe(OMS_HEAD_CIRCUMFERENCE_BOYS);
    expect(getOmsPercentiles('FEMALE', 'HEAD_CIRCUMFERENCE')).toBe(OMS_HEAD_CIRCUMFERENCE_GIRLS);
  });
});
