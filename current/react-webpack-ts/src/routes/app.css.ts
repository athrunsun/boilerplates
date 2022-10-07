import { style, globalStyle } from '@vanilla-extract/css';

const container = style({
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#eee',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
});

const logo = style({
    width: '15rem',
    height: '15rem',
});

globalStyle(`${container} > div`, {
    display: 'flex',
    fontSize: '2rem',
    color: '#aaa',
    padding: '1rem',
    backgroundColor: '#ccc',
    borderRadius: '0.8rem',
});

globalStyle(`${container} > div:not(:last-child)`, {
    marginBottom: '1rem',
});

export { container, logo };
