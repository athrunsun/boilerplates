import { describe, it, expect } from '@jest/globals';

import * as commonUtils from '@/utils/common';

describe('commonUtils', () => {
    it('isArray() tests', () => {
        expect(commonUtils.isArray([])).toBe(true);
        expect(commonUtils.isArray({ a: '1' })).toBe(false);
    });

    it('isEmpty() tests', () => {
        expect(commonUtils.isEmpty(null)).toBe(true);
        expect(commonUtils.isEmpty('')).toBe(true);
        expect(commonUtils.isEmpty({})).toBe(true);
        expect(commonUtils.isEmpty([])).toBe(true);
        expect(commonUtils.isEmpty({ a: '1' })).toBe(false);
    });
});
