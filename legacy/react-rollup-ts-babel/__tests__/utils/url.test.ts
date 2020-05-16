import * as urlUtils from '@app/utils/url';

describe('urlUtil', () => {
    it('createUri() tests', () => {
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
        expect(urlUtils.createUrlWithoutServerAddress('/part1/part2', {}, { q1: 'q1', q2: 'a2' })).toBe(
            '/part1/part2?q1=q1&q2=a2',
        );
    });
});
