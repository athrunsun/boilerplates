import { describe, it, expect } from '@jest/globals';

import * as urlUtils from '@/utils/url';

describe('urlUtils', () => {
    it('createUrl() tests', () => {
        expect(urlUtils.createUrlWithoutServerAddress('/collection/all')).toBe('/collection/all');
        expect(urlUtils.createUrlWithoutServerAddress('collection/all')).toBe('/collection/all');

        expect(urlUtils.createUrlWithoutServerAddress('collection/:collectionId', { collectionId: 11 })).toBe(
            '/collection/11',
        );

        expect(
            urlUtils.createUrlWithoutServerAddress('/part1/:collectionId/part2/:itemId', {
                collectionId: 10,
                itemId: 20,
            }),
        ).toBe('/part1/10/part2/20');

        expect(urlUtils.createUrlWithoutServerAddress(['part1', 'part2'], {}, { q1: 'q1', q2: 'a2' })).toBe(
            '/part1/part2?q1=q1&q2=a2',
        );

        expect(
            urlUtils.createUrlWithServerAddress(
                'http://okampfer.fake.org',
                ['part1', 'part2', ':part3'],
                { part3: 'part3value' },
                { q1: 'q1', q2: '//a2' },
            ),
        ).toBe('http://okampfer.fake.org/part1/part2/part3value?q1=q1&q2=%2F%2Fa2');
    });
});
